#!/usr/bin/env python3
"""Wire the three Kit form UIDs into the lane opt-in pages.

    python3 wire-forms.py --note <uid> --claude <uid> --writing <uid>
    python3 wire-forms.py --check          # what is wired right now

Kit forms cannot be created over the API, so the UIDs arrive by hand. This writes them
into build-pages.py, regenerates all six pages (which drops the noindex tag and the
"form pending" block automatically), and verifies the result.

A UID is the value of data-uid in Kit's JavaScript embed snippet, e.g. the 426c2157ed in

    <script async data-uid="426c2157ed"
            src="https://become-a-writer-today.kit.com/426c2157ed/index.js"></script>
"""
import argparse
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(os.path.dirname(HERE))
PAGES = os.path.join(HERE, "build-pages.py")

PLACEHOLDER = "REPLACE_WITH_KIT_FORM_UID"

# slug -> the flag that sets it
SLOTS = {
    "note-system-yt": "note",
    "claude-code-yt": "claude",
    "writing-career-map": "writing",
}

UID_RE = re.compile(r"^[0-9a-f]{8,12}$")


def current():
    """Map slug -> uid currently wired in build-pages.py."""
    src = open(PAGES).read()
    out = {}
    for slug in SLOTS:
        m = re.search(r'"slug":\s*"%s",\s*\n\s*"thanks":[^\n]*\n\s*"uid":\s*([^,\n]+),'
                      % re.escape(slug), src)
        if m:
            tok = m.group(1).strip()
            # An unwired slot holds the bare identifier PLACEHOLDER, not a quoted uid.
            out[slug] = PLACEHOLDER if tok == "PLACEHOLDER" else tok.strip('"')
    return out


def is_pending(uid):
    return uid in (PLACEHOLDER, "PLACEHOLDER")


def set_uid(src, slug, uid):
    pat = re.compile(r'("slug":\s*"%s",\s*\n\s*"thanks":[^\n]*\n\s*"uid":\s*)([^,\n]+)(,)'
                     % re.escape(slug))
    new, n = pat.subn(lambda m: f'{m.group(1)}"{uid}"{m.group(3)}', src)
    if n != 1:
        raise SystemExit(f"could not locate the uid slot for {slug} (matched {n} times)")
    return new


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--note", help="uid for YouTube - Note System")
    ap.add_argument("--claude", help="uid for YouTube - Claude Code")
    ap.add_argument("--writing", help="uid for YouTube - Writing Careers")
    ap.add_argument("--check", action="store_true")
    a = ap.parse_args()

    if a.check:
        for slug, uid in current().items():
            state = "PENDING" if is_pending(uid) else "wired"
            print(f"  {slug:<22} {state:<8} {uid}")
        return

    given = {"note-system-yt": a.note, "claude-code-yt": a.claude,
             "writing-career-map": a.writing}
    if not any(given.values()):
        raise SystemExit("give at least one of --note / --claude / --writing, or --check")

    src = open(PAGES).read()
    for slug, uid in given.items():
        if not uid:
            continue
        uid = uid.strip()
        if not UID_RE.match(uid):
            raise SystemExit(f"{slug}: {uid!r} does not look like a Kit form uid "
                             "(expected 8-12 lowercase hex characters)")
        src = set_uid(src, slug, uid)
        print(f"  {slug:<22} -> {uid}")
    open(PAGES, "w").write(src)

    subprocess.run([sys.executable, PAGES], check=True, cwd=HERE)

    print("\nverifying:")
    bad = 0
    for slug, uid in current().items():
        page = os.path.join(SITE, f"{slug}.html")
        html = open(page).read()
        pending = is_pending(uid)
        has_embed = f'data-uid="{uid}"' in html
        noindex = "noindex" in html
        if pending:
            print(f"  {slug:<22} still PENDING (noindex kept, form block shown)")
            continue
        if not has_embed or noindex or "Form pending" in html:
            bad += 1
            print(f"  {slug:<22} FAIL embed={has_embed} noindex={noindex}")
        else:
            print(f"  {slug:<22} ok, embed live and indexable")
    if bad:
        raise SystemExit(f"{bad} page(s) failed verification")

    print("\nnext:")
    print("  1. curl -sI the three pages once deployed, confirm 200")
    print("  2. subscribe with a real address on each and confirm the PDF arrives")
    print("  3. cd ~/src/youtube-cli && venv/bin/python3 scripts/topoffer-plan.py \\")
    print("       --dry --lanes N,B,A --ids <top-60>     # then apply")


if __name__ == "__main__":
    main()
