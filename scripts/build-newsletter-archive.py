#!/usr/bin/env python3
"""Build the static newsletter archive (the issues Kit published on newsletter.bryancollins.com).

    python3 scripts/build-newsletter-archive.py --import <kit list_posts dumps...>   # refresh data/
    python3 scripts/build-newsletter-archive.py                                       # build pages

Kit is retired, so its hosted newsletter site goes with it. The published issues are
kept here instead:
  /newsletter/archive              every issue, newest first
  /newsletter/posts/<kit slug>     one page per issue; the slug is Kit's, so old
                                   newsletter.bryancollins.com/posts/<slug> links 301 here
Source of truth after the import: data/newsletter-archive.json (cleaned HTML, no Kit
tracking, footers or scripts). Page shell and signup band come from build-hub.py.
"""
import argparse
import datetime as dt
import html
import importlib.util
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "newsletter-archive.json")

_spec = importlib.util.spec_from_file_location("hub", os.path.join(ROOT, "scripts", "build-hub.py"))
hub_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(hub_mod)


# ---------------------------------------------------------------- import + clean

def clean(content):
    m = re.search(r"<body[^>]*>(.*)</body>", content, re.S | re.I)
    s = m.group(1) if m else content
    s = re.sub(r"<style\b.*?</style>", "", s, flags=re.S | re.I)
    s = re.sub(r"<script\b.*?</script>", "", s, flags=re.S | re.I)
    s = re.sub(r"<!--.*?-->", "", s, flags=re.S)
    # Kit's email footer: postal address plus unsubscribe/preferences links into Kit.
    s = re.sub(r"<p\b[^>]*>(?:(?!</p>).)*?convertkit-mail(?:(?!</p>).)*?</p>", "", s, flags=re.S | re.I)
    s = re.sub(r'<a\b[^>]*href="[^"]*convertkit-mail[^"]*"[^>]*>(.*?)</a>', r"\1", s, flags=re.S | re.I)
    # Open-tracking pixels.
    s = re.sub(r'<img\b[^>]*(?:width="1"|height="1")[^>]*>', "", s, flags=re.I)
    s = re.sub(r'\s(?:contenteditable|data-[\w-]+)="[^"]*"', "", s)
    s = s.replace("​", "")
    return s.strip()


def import_dumps(paths):
    posts = {}
    for p in paths:
        d = json.loads(open(p).read())
        if isinstance(d, list):
            d = json.loads(d[0]["text"])
        for x in d["posts"]:
            posts[x["id"]] = x
    out = []
    for x in posts.values():
        if x["status"] != "published" or not x.get("slug"):
            continue
        out.append({
            "slug": x["slug"],
            "title": x.get("title") or "Untitled issue",
            "date": (x.get("published_at") or x.get("sent_at") or x["created_at"])[:10],
            "thumbnail": x.get("thumbnail_url") or "",
            "html": clean(x.get("content") or ""),
        })
    out.sort(key=lambda r: (r["date"], r["slug"]), reverse=True)
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    with open(DATA, "w") as f:
        json.dump(out, f, ensure_ascii=False, indent=0)
        f.write("\n")
    print(f"imported {len(out)} published issues -> {os.path.relpath(DATA, ROOT)}")


# ---------------------------------------------------------------- build

def write(rel, text):
    # Not hub_mod.write: its private-path guard is for generated hub pages. These issues
    # were already public on Kit, so they are written as published.
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(text)
    return rel


def text_summary(h, n=155):
    t = html.unescape(re.sub(r"<[^>]+>", " ", h))
    t = re.sub(r"\s+", " ", t).strip()
    return t if len(t) <= n else t[: n - 1].rsplit(" ", 1)[0] + "…"


def fmt(d):
    return dt.date.fromisoformat(d).strftime("%-d %b %Y")


def build():
    issues = json.load(open(DATA))
    hub = json.load(open(os.path.join(ROOT, "data", "hub.json")))
    esc = hub_mod.esc
    written = []

    for i, it in enumerate(issues):
        path = f"/newsletter/posts/{it['slug']}"
        nav = []
        if i + 1 < len(issues):
            o = issues[i + 1]
            nav.append(f'<a href="/newsletter/posts/{o["slug"]}">Older: {esc(o["title"])}</a>')
        if i > 0:
            n = issues[i - 1]
            nav.append(f'<a href="/newsletter/posts/{n["slug"]}">Newer: {esc(n["title"])}</a>')
        body = f"""<article class="block issue">
    <p class="muted"><a href="/newsletter/archive">Newsletter archive</a> · {fmt(it['date'])}</p>
    <h1>{esc(it['title'])}</h1>
    <div class="issue-body">
{it['html']}
    </div>
    <p class="issue-nav">{' · '.join(nav)}</p>
</article>
{hub_mod.newsletter(hub, "Get the next issue")}"""
        jsonld = {"@context": "https://schema.org", "@type": "BlogPosting", "headline": it["title"],
                  "datePublished": it["date"], "author": {"@type": "Person", "name": "Bryan Collins"},
                  "url": hub_mod.SITE + path}
        written.append(write(f"newsletter/posts/{it['slug']}.html",
                                     hub_mod.page(path, f"{it['title']} · Bryan Collins", text_summary(it["html"]),
                                                  body, hub, jsonld=jsonld)))

    rows, year = [], None
    for it in issues:
        y = it["date"][:4]
        if y != year:
            if year:
                rows.append("</ul>")
            rows.append(f'<h2 class="group-title">{y}</h2><ul class="archive-list">')
            year = y
        rows.append(f'<li><a href="/newsletter/posts/{it["slug"]}">{esc(it["title"])}</a> '
                    f'<span class="meta">{fmt(it["date"])}</span></li>')
    rows.append("</ul>")
    body = f"""<section class="block">
    <h1>Newsletter archive</h1>
    <p class="muted">{len(issues)} issues on writing, AI and building things with Claude Code. Newest first.</p>
    {''.join(rows)}
</section>
{hub_mod.newsletter(hub, "Get the next issue")}"""
    written.append(write("newsletter/archive.html",
                                 hub_mod.page("/newsletter/archive", "Newsletter archive · Bryan Collins",
                                              f"Every issue of Bryan Collins's newsletter, {len(issues)} so far.", body, hub)))
    print(f"wrote {len(written)} pages")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--import", dest="dumps", nargs="+")
    a = ap.parse_args()
    if a.dumps:
        import_dumps(a.dumps)
    build()
