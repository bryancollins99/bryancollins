#!/usr/bin/env python3
"""Copy new Kit subscribers into the Resend newsletter list, once a week.

    python3 scripts/kit_to_resend_sync.py            # Kit API -> Resend (the weekly job)
    python3 scripts/kit_to_resend_sync.py --csv F    # Kit CSV export -> Resend (fallback)
    python3 scripts/kit_to_resend_sync.py --dry-run  # read and report, write nothing

Kit is on its free plan and sends nothing. It only collects Creator Network
referrals and anything an old Kit form still catches. This job moves those new
arrivals to Resend, where the newsletter goes out.

Create-only, on purpose: a contact that already exists in Resend is never
touched, so a Resend unsubscribe always wins over Kit. Re-running over the same
window creates nothing new.

Env: KIT_API_KEY (v4, kit_...), RESEND_API_KEY. State: data/kit-sync-state.json.
PRD: ~/.claude/handoff/kit-to-resend-2026-10-28 (Phase 7b).
"""
import argparse
import csv
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE = os.path.join(ROOT, "data", "kit-sync-state.json")
SEGMENT = "389c476f-521e-444d-9932-770c5a443645"  # Bryan Collins Newsletter (name is a code key)
START = "2026-10-31T00:00:00Z"  # the day the engaged Kit list was imported
OVERLAP = dt.timedelta(days=2)
MAX_CREATES = 200  # a normal week is ~7; more than this is a bot or a bug
EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
# Resend sits behind Cloudflare, which rejects urllib's default User-Agent.
UA = "bryancollins-kit-sync/1.0"


class KitRefused(Exception):
    pass


def http(method, url, headers, body=None):
    data = json.dumps(body).encode() if body is not None else None
    for attempt in range(5):
        req = urllib.request.Request(url, data=data, method=method,
                                     headers={**headers, "User-Agent": UA, "Accept": "application/json",
                                              **({"Content-Type": "application/json"} if data else {})})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                raw = r.read()
                return r.status, (json.loads(raw) if raw else {})
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                time.sleep(int(e.headers.get("Retry-After") or 2 ** attempt))
                continue
            raw = e.read()
            try:
                return e.code, json.loads(raw)
            except ValueError:
                return e.code, {"raw": raw[:300].decode(errors="replace")}
    raise RuntimeError(f"{method} {url}: gave up after retries")


def kit_new_subscribers(since):
    key = os.environ["KIT_API_KEY"]
    after = None
    while True:
        q = {"status": "active", "created_after": since, "per_page": 1000}
        if after:
            q["after"] = after
        status, body = http("GET", "https://api.kit.com/v4/subscribers?" + urllib.parse.urlencode(q),
                            {"X-Kit-Api-Key": key})
        if status in (401, 403):
            raise KitRefused(f"Kit API returned {status}: {body}")
        if status != 200:
            raise RuntimeError(f"Kit API returned {status}: {body}")
        for s in body.get("subscribers", []):
            yield {"email": s["email_address"], "created_at": s["created_at"],
                   "first_name": s.get("first_name") or ""}
        pg = body.get("pagination") or {}
        if not pg.get("has_next_page"):
            return
        after = pg["end_cursor"]


def csv_subscribers(path):
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            email = row.get("email") or row.get("Email") or row.get("email_address") or ""
            state = (row.get("status") or row.get("state") or "active").lower()
            if email and state in ("active", "subscribed", ""):
                yield {"email": email, "created_at": row.get("created_at") or "", "first_name": row.get("first_name") or ""}


def resend(method, path, body=None):
    return http(method, "https://api.resend.com" + path,
                {"Authorization": f"Bearer {os.environ['RESEND_API_KEY']}"}, body)


def sync(rows, dry_run):
    counts = {"read": 0, "created": 0, "existing": 0, "invalid": 0}
    newest = None
    for s in rows:
        counts["read"] += 1
        email = s["email"].strip().lower()
        if s["created_at"] and (newest is None or s["created_at"] > newest):
            newest = s["created_at"]
        if not EMAIL.match(email) or len(email) > 254:
            counts["invalid"] += 1
            continue
        status, _ = resend("GET", f"/contacts/{urllib.parse.quote(email)}")
        if status == 200:
            counts["existing"] += 1  # never update: a Resend unsubscribe must win
            continue
        if status != 404:
            raise RuntimeError(f"Resend contact lookup returned {status}")
        if counts["created"] >= MAX_CREATES:
            raise RuntimeError(f"More than {MAX_CREATES} new contacts in one run; stopping for a human check.")
        if not dry_run:
            status, body = resend("POST", "/contacts", {
                "email": email, "first_name": s["first_name"], "unsubscribed": False,
                "segments": [{"id": SEGMENT}], "properties": {"lane": "kit-intake", "kit_source": "kit-sync"}})
            if status not in (200, 201):
                raise RuntimeError(f"Resend contact create returned {status}: {body}")
            resend("POST", "/events/send", {"event": "bc.subscribed", "email": email,
                                            "payload": {"lane": "kit-intake", "path": "kit"}})
        counts["created"] += 1
        time.sleep(0.25)  # Resend allows 10 requests a second per account, shared with every site
    return counts, newest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    state = json.load(open(STATE)) if os.path.exists(STATE) else {"watermark": START}
    since_dt = dt.datetime.fromisoformat(state["watermark"].replace("Z", "+00:00")) - OVERLAP
    since = since_dt.strftime("%Y-%m-%dT%H:%M:%SZ")

    if a.csv:
        counts, newest = sync(csv_subscribers(a.csv), a.dry_run)
    else:
        try:
            counts, newest = sync(kit_new_subscribers(since), a.dry_run)
        except KitRefused as e:
            print(f"KIT_REFUSED {e}")
            sys.exit(3)  # the workflow opens an issue on this exit code

    print(f"since {since}: read {counts['read']}, created {counts['created']}, "
          f"already in Resend {counts['existing']}, invalid {counts['invalid']}"
          + (" (dry run)" if a.dry_run else ""))
    if not a.dry_run and not a.csv:
        state["watermark"] = max(newest or state["watermark"], state["watermark"])
        state["last_run"] = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        state["last_counts"] = counts
        os.makedirs(os.path.dirname(STATE), exist_ok=True)
        with open(STATE, "w") as f:
            json.dump(state, f, indent=2)
            f.write("\n")


if __name__ == "__main__":
    main()
