#!/usr/bin/env python3
"""Build the bryancollins.com hub pages from data/.

Generates: index.html, videos.html, projects.html, books.html, work-with-me.html,
skills/index.html and one skills/<name>.html per skill.

Inputs (all committed, so a build needs nothing outside this repo):
  data/hub.json     profile, projects, books, work history (hand-edited)
  data/videos.json  YouTube snapshot (refresh with --videos-from)
  data/skills.json  agent-skills snapshot (refresh with --skills-from)

Refresh the snapshots, then build:
  python3 scripts/build-hub.py \
      --videos-from ~/src/youtube-cli/data/dump-YYYY-MM-DD.json \
      --skills-from /path/to/clone/of/agent-skills
  python3 scripts/build-hub.py            # build from the snapshots only

Stdlib only. Netlify has no build step, so commit the generated HTML.
"""
import argparse
import datetime as dt
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
SITE = "https://bryancollins.com"
SKILLS_REPO = "bryancollins99/agent-skills"

# Never let these reach a public page (private infra, local paths).
LEAK_PATTERNS = [r"/Users/", r"~/src", r"The-Flash-Report", r"\.claude/(?!commands)"]


def esc(s):
    return html.escape(str(s), quote=True)


# ---------------------------------------------------------------- snapshots

def iso_seconds(d):
    m = re.fullmatch(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", d or "")
    if not m:
        return 0
    h, mi, s = (int(x or 0) for x in m.groups())
    return h * 3600 + mi * 60 + s


def refresh_videos(dump_path):
    vids = json.load(open(dump_path))
    keep = []
    for v in vids:
        if v.get("privacy") != "public":
            continue
        secs = iso_seconds(v.get("duration"))
        if secs <= 60:  # Shorts
            continue
        keep.append({
            "id": v["id"],
            "title": v["title"].strip(),
            "published": v["published"][:10],
            "views": int(v.get("views") or 0),
            "minutes": round(secs / 60),
        })
    keep.sort(key=lambda v: v["published"], reverse=True)
    out = {"source": Path(dump_path).name, "count": len(keep), "videos": keep}
    (DATA / "videos.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"videos.json: {len(keep)} public long-form videos from {Path(dump_path).name}")


def refresh_skills(clone):
    clone = Path(clone)
    readme = (clone / "README.md").read_text()
    # README layout: **Group** lines, then ### `/name` blocks of prose.
    skills, group = [], None
    body = readme.split("## The skills", 1)[1].split("\n## ", 1)[0]
    cur = None
    for line in body.splitlines():
        g = re.fullmatch(r"\*\*(.+)\*\*", line.strip())
        h = re.fullmatch(r"### `/([a-z0-9-]+)`", line.strip())
        if g:
            group = g.group(1)
            cur = None
        elif h:
            cur = {"name": h.group(1), "group": group, "blurb": []}
            skills.append(cur)
        elif cur is not None:
            cur["blurb"].append(line)
    for s in skills:
        s["blurb"] = "\n".join(s["blurb"]).strip()
        f = clone / "skills" / f"{s['name']}.md"
        if not f.exists():
            sys.exit(f"README lists /{s['name']} but {f} is missing")
        s["body"] = f.read_text()
    listed = {s["name"] for s in skills}
    unlisted = sorted(p.stem for p in (clone / "skills").glob("*.md") if p.stem not in listed)
    if unlisted:
        print(f"warning: skills not in README, skipped: {', '.join(unlisted)}")
    out = {"repo": SKILLS_REPO, "snapshot": dt.date.today().isoformat(), "skills": skills}
    (DATA / "skills.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"skills.json: {len(skills)} skills")


# ---------------------------------------------------------------- markdown

def md_inline(s):
    codes = []

    def stash(m):
        codes.append(f"<code>{esc(m.group(1))}</code>")
        return f"\x00{len(codes) - 1}\x00"

    p = esc(re.sub(r"`([^`]+)`", stash, s))
    p = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", r'<a href="\2">\1</a>', p)
    p = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", p)
    p = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?![\w*])", r"<em>\1</em>", p)
    return re.sub(r"\x00(\d+)\x00", lambda m: codes[int(m.group(1))], p)


def md(text, shift=0):
    """Small Markdown subset: headings, paragraphs, lists, fences, tables."""
    lines = text.splitlines()
    out, i, para = [], 0, []

    def flush():
        if para:
            out.append(f"<p>{md_inline(' '.join(para))}</p>")
            para.clear()

    while i < len(lines):
        ln = lines[i]
        st = ln.strip()
        if st.startswith("```"):
            flush()
            i += 1
            code = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code.append(lines[i])
                i += 1
            out.append(f"<pre><code>{esc(chr(10).join(code))}</code></pre>")
        elif re.match(r"#{1,6} ", st):
            flush()
            n = min(6, len(st.split(" ")[0]) + shift)
            out.append(f"<h{n}>{md_inline(st.lstrip('#').strip())}</h{n}>")
        elif re.match(r"([-*]|\d+\.) ", st):
            flush()
            tag = "ol" if st[0].isdigit() else "ul"
            start = f' start="{st.split(".")[0]}"' if tag == "ol" and not st.startswith("1.") else ""
            items = []
            while i < len(lines) and lines[i].strip():
                s2 = lines[i].strip()
                if re.match(r"([-*]|\d+\.) ", s2):
                    items.append(re.sub(r"^([-*]|\d+\.) ", "", s2))
                elif items:
                    items[-1] += " " + s2
                i += 1
            out.append(f"<{tag}{start}>" + "".join(f"<li>{md_inline(x)}</li>" for x in items) + f"</{tag}>")
            continue
        elif st.startswith("|"):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{2,}:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                head = "".join(f"<th>{md_inline(c)}</th>" for c in rows[0])
                body = "".join("<tr>" + "".join(f"<td>{md_inline(c)}</td>" for c in r) + "</tr>" for r in rows[1:])
                out.append(f'<div class="table"><table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></div>')
            continue
        elif st.startswith(">"):
            flush()
            q = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                q.append(lines[i].strip().lstrip(">").strip())
                i += 1
            out.append(f"<blockquote>{md_inline(' '.join(q))}</blockquote>")
            continue
        elif not st:
            flush()
        else:
            para.append(st)
        i += 1
    flush()
    return "\n".join(out)


def first_sentence(s):
    s = re.sub(r"\s+", " ", re.sub(r"[`*]", "", s)).strip()
    m = re.match(r"(.+?[.!?])(\s|$)", s)
    return m.group(1) if m else s


# ---------------------------------------------------------------- layout

ANALYTICS = """    <script async src="https://stats.bryancollins.com/js/pa-bvsz2TfQenbKYMWpBJ7eS.js"></script>
    <script>
      window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
      plausible.init()
    </script>"""

NAV = [("/videos", "Videos"), ("/projects", "Projects"), ("/skills/", "Skills"),
       ("/books", "Books"), ("/work-with-me", "Work"), ("/#newsletter", "Newsletter")]


def page(path, title, desc, body, hub, jsonld=None, depth=0):
    canon = SITE + path
    nav = "".join(f'<a href="{h}">{t}</a>' for h, t in NAV)
    ld = f'\n    <script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>' if jsonld else ""
    L = hub["links"]
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{esc(title)}</title>
    <meta name="description" content="{esc(desc)}">
    <meta name="author" content="Bryan Collins">
    <link rel="canonical" href="{canon}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{canon}">
    <meta property="og:title" content="{esc(title)}">
    <meta property="og:description" content="{esc(desc)}">
    <meta property="og:image" content="{SITE}/resources/bryan-collins.jpeg">
    <meta name="twitter:card" content="summary">
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fdfdfc">
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#121211">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="stylesheet" href="/assets/hub.css">
{ANALYTICS}{ld}
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site-header">
    <a class="brand" href="/">Bryan Collins</a>
    <nav aria-label="Main">{nav}</nav>
</header>
<main id="content">
{body}
</main>
<footer class="site-footer">
    <p><a href="{L['youtube']}">YouTube</a> · <a href="{L['github']}">GitHub</a> · <a href="{L['linkedin']}">LinkedIn</a> · <a href="{L['substack']}">Substack</a> · <a href="/products">Products</a> · <a href="/mba-frameworks">Strategy tools</a> · <a href="/contact">Contact</a></p>
    <p class="muted">© {dt.date.today().year} Bryan Collins · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
</footer>
</body>
</html>
"""


# Kit's ck.5.js submits the form; a plain no-JS POST is accepted with a 302 but creates no subscriber (tested 2026-10-16).
KIT_OPTIONS = json.dumps({"settings": {"after_subscribe": {"action": "message", "success_message": "Thanks. Check your inbox to confirm your subscription.", "redirect_url": ""}, "recaptcha": {"enabled": False}}, "version": "5"})


def newsletter(hub, heading="Newsletter"):
    f = hub["kit_form"]
    return f"""<section id="newsletter" class="newsletter-band"><div class="newsletter">
    <div><h2>{esc(heading)}</h2>
    <p>What I'm building with AI coding agents, what broke, and what I'd do differently. Straight to your inbox.</p></div>
    <div>
    <form action="https://app.kit.com/forms/{f['id']}/subscriptions" method="post" class="seva-form formkit-form signup" data-sv-form="{f['id']}" data-uid="{f['uid']}" data-format="inline" data-version="5" data-options='{KIT_OPTIONS}' onsubmit="window.plausible &amp;&amp; plausible('Newsletter Signup', {{props: {{page: location.pathname}}}})">
        <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
        <div data-element="fields" class="seva-fields formkit-fields">
            <label class="sr" for="nl-email">Email address</label>
            <input id="nl-email" class="formkit-input" name="email_address" type="email" placeholder="Email address" autocomplete="email" required>
            <button type="submit" data-element="submit" class="formkit-submit"><span>Subscribe</span></button>
        </div>
    </form>
    <script src="https://f.convertkit.com/ckjs/ck.5.js" async></script>
    <p class="muted small">Unsubscribe any time. Or read the archive at <a href="{hub['links']['newsletter']}">newsletter.bryancollins.com</a>.</p>
</div></div>
</section>"""


def video_card(v):
    return f"""<li class="video">
        <a href="https://www.youtube.com/watch?v={esc(v['id'])}">
            <img src="https://i.ytimg.com/vi/{esc(v['id'])}/mqdefault.jpg" alt="" width="320" height="180" loading="lazy">
            <span class="vtitle">{esc(v['title'])}</span>
            <span class="meta">{fmt_date(v['published'])} · {v['minutes']} min</span>
        </a>
    </li>"""


def fmt_date(iso):
    d = dt.date.fromisoformat(iso)
    return d.strftime("%-d %b %Y")


def project_list(groups):
    out = []
    for g in groups:
        rows = "".join(
            f'<li class="card"><h3><a href="{esc(p["url"])}">{esc(p["name"])}</a></h3><span class="host">{esc(re.sub(r"^https?://", "", p["url"]))}</span><p>{esc(p["desc"])}</p><a class="more" href="{esc(p["url"])}">Visit site</a></li>'
            for p in g["items"])
        out.append(f'<p class="group-title">{esc(g["group"])}</p><ul class="grid">{rows}</ul>')
    return "\n".join(out)


# ---------------------------------------------------------------- pages

def build_index(hub, videos, skills):
    latest = videos[:6]
    intro = "".join(f"<p>{esc(p)}</p>" for p in hub["intro"])
    sk = "".join(
        f'<li class="card skill-card"><h3><a href="/skills/{esc(s["name"])}">/{esc(s["name"])}</a></h3><p>{esc(first_sentence(s["blurb"]))}</p><a class="more internal" href="/skills/{esc(s["name"])}">Read and install</a></li>'
        for s in skills[:6])
    books = "".join(f'<li class="card"><span class="tag">{"USA Today bestseller" if i == 0 else "Book"}</span><h3>{esc(b["title"])}</h3><p>{esc(b["desc"])}</p><a class="more" href="{esc(b["payhip"])}">Buy direct</a></li>' for i, b in enumerate(hub["books"][:3]))
    tools = "".join(f'<li class="card"><h3><a href="{esc(t["url"])}">{esc(t["name"])}</a></h3><p>{esc(t["desc"])}</p><a class="more internal" href="{esc(t["url"])}">Take a look</a></li>' for t in hub["tools"])
    body = f"""<section class="hero"><div class="hero-inner">
    <img class="avatar" src="/resources/bryan-collins-320.jpg" alt="Bryan Collins" width="132" height="132">
    <div>
    <h1>{esc(hub['tagline'])}</h1>
    {intro}
    <div class="actions"><a class="btn btn-primary" href="#newsletter">Join the newsletter</a><a class="btn btn-ghost" href="{hub['links']['youtube']}">Watch on YouTube</a><a class="btn btn-ghost" href="/work-with-me">Work with me</a></div>
    </div>
</div></section>

<section class="block">
    <div class="block-head"><h2>Latest videos</h2><a href="/videos">All videos</a></div>
    <ul class="videos">
    {''.join(video_card(v) for v in latest)}
    </ul>
</section>

<section class="block">
    <div class="block-head"><h2>What I run</h2><a href="/projects">All projects</a></div>
    {project_list(hub['projects'][:1])}
</section>

<section class="block">
    <div class="block-head"><h2>Agent skills</h2><a href="/skills/">All {len(skills)} skills</a></div>
    <p class="sub">The workflows I run Claude Code with every day, published as plain Markdown. MIT licensed, <a href="{hub['links']['skills_repo']}">on GitHub</a>.</p>
    <ul class="grid">{sk}</ul>
</section>

<section class="block">
    <div class="block-head"><h2>Tools and products</h2><a href="/products">All products</a></div>
    <ul class="grid">{tools}</ul>
</section>

<section class="block">
    <div class="block-head"><h2>Books</h2><a href="/books">All books</a></div>
    <ul class="grid">{books}</ul>
</section>

{newsletter(hub)}"""
    ld = {"@context": "https://schema.org", "@type": "Person", "name": hub["name"], "url": SITE + "/",
          "description": hub["tagline"], "image": SITE + "/resources/bryan-collins.jpeg",
          "sameAs": [hub["links"][k] for k in ("youtube", "github", "linkedin", "substack", "amazon")]}
    return page("/", "Bryan Collins", hub["tagline"], body, hub, ld)


def build_videos(hub, videos, snap):
    recent = videos[:24]
    top = sorted(videos, key=lambda v: v["views"], reverse=True)[:12]
    body = f"""<section class="hero">
    <h1>Videos</h1>
    <p class="lede">I film the builds: Claude Code, AI agents and the sites I run. Older videos cover writing tools and the craft of writing.</p>
    <div class="actions"><a class="btn btn-ghost" href="{hub['links']['youtube']}">Subscribe on YouTube</a></div>
</section>
<section class="block">
    <h2>Latest</h2>
    <ul class="videos">{''.join(video_card(v) for v in recent)}</ul>
</section>
<section class="block">
    <h2>Most watched</h2>
    <ul class="videos">{''.join(video_card(v) for v in top)}</ul>
</section>
{newsletter(hub, "Get new builds by email")}"""
    return page("/videos", "Videos · Bryan Collins",
                "Bryan Collins on YouTube: Claude Code builds, AI agent workflows, and writing tools.", body, hub)


def build_projects(hub):
    body = f"""<section class="hero">
    <h1>Projects</h1>
    <p class="lede">The sites and products I build and run. The code for the businesses stays private; the reusable parts are <a href="/skills/">open source</a>.</p>
</section>
<section class="block">{project_list(hub['projects'])}</section>
{newsletter(hub)}"""
    return page("/projects", "Projects · Bryan Collins",
                "Sites and data products built and run by Bryan Collins: Vendors.ie, Tenderwatch.ie, Leinster Insider and more.",
                body, hub)


def build_skills_index(hub, skills, snap):
    groups, out = [], []
    for s in skills:
        if s["group"] not in groups:
            groups.append(s["group"])
    for g in groups:
        rows = "".join(
            f'<li class="card skill-card"><h3><a href="/skills/{esc(s["name"])}">/{esc(s["name"])}</a></h3><p>{esc(first_sentence(s["blurb"]))}</p><a class="more internal" href="/skills/{esc(s["name"])}">Read and install</a></li>'
            for s in skills if s["group"] == g)
        out.append(f'<p class="group-title">{esc(g)}</p><ul class="grid">{rows}</ul>')
    body = f"""<section class="hero">
    <h1>Agent skills</h1>
    <p class="lede">Skills and workflows for AI coding agents, taken from my own setup and made generic so they work in any repo.</p>
    <p>Each one is a plain Markdown procedure. They ship as Claude Code slash commands, but the same text works as a Cursor rule or a prompt for any capable agent. Every skill here earned its place by catching something real. MIT licensed.</p>
    <div class="actions"><a class="btn btn-ghost" href="https://github.com/{SKILLS_REPO}">github.com/{SKILLS_REPO}</a></div>
</section>
<section class="block install">
    <h2>Install all of them</h2>
<pre><code>git clone https://github.com/{SKILLS_REPO}.git
cp agent-skills/skills/*.md ~/.claude/commands/</code></pre>
</section>
<section class="block">{''.join(out)}</section>
{newsletter(hub, "Get new skills by email")}"""
    ld = {"@context": "https://schema.org", "@type": "SoftwareSourceCode", "name": "Agent skills",
          "codeRepository": f"https://github.com/{SKILLS_REPO}", "license": "https://opensource.org/licenses/MIT",
          "author": {"@type": "Person", "name": "Bryan Collins", "url": SITE + "/"}}
    return page("/skills/", "Agent skills for Claude Code · Bryan Collins",
                "Open-source, MIT-licensed skills and slash commands for Claude Code and other AI coding agents.",
                body, hub, ld)


def build_skill(hub, s, skills):
    raw = f"https://raw.githubusercontent.com/{SKILLS_REPO}/main/skills/{s['name']}.md"
    src = f"https://github.com/{SKILLS_REPO}/blob/main/skills/{s['name']}.md"
    desc = first_sentence(s["blurb"])
    others = "".join(f'<li><a href="/skills/{esc(o["name"])}"><code>/{esc(o["name"])}</code></a></li>'
                     for o in skills if o["name"] != s["name"])
    body = f"""<nav class="crumbs"><a href="/skills/">Agent skills</a> /</nav>
<section class="hero">
    <h1><code>/{esc(s['name'])}</code></h1>
    <p class="muted">{esc(s['group'])}</p>
    {md(s['blurb'])}
</section>
<section class="block install">
    <h2>Install</h2>
<pre><code>curl -o ~/.claude/commands/{esc(s['name'])}.md \\
  {raw}</code></pre>
    <p class="small">Then run <code>/{esc(s['name'])}</code> in Claude Code. For any other agent, paste the procedure below as its instruction. <a href="{src}">View on GitHub</a>.</p>
</section>
<section class="block">
    <h2>The procedure</h2>
    <article class="prose">{md(s['body'], shift=1)}</article>
</section>
<section class="block"><h2>More skills</h2><ul class="inline">{others}</ul></section>
{newsletter(hub, "Get new skills by email")}"""
    ld = {"@context": "https://schema.org", "@type": "SoftwareSourceCode", "name": f"/{s['name']}",
          "description": desc, "codeRepository": f"https://github.com/{SKILLS_REPO}",
          "license": "https://opensource.org/licenses/MIT", "programmingLanguage": "Markdown",
          "author": {"@type": "Person", "name": "Bryan Collins", "url": SITE + "/"}}
    return page(f"/skills/{s['name']}", f"/{s['name']}: a Claude Code skill · Bryan Collins", desc, body, hub, ld)


def build_books(hub):
    rows = "".join(
        f'<li class="card"><h3>{esc(b["title"])}</h3><p>{esc(b["desc"])}</p><a class="more" href="{esc(b["payhip"])}">Buy direct</a></li>'
        for b in hub["books"])
    body = f"""<section class="hero">
    <h1>Books</h1>
    <p class="lede">Books on writing, creativity and building a creative business. Buy direct to support my work, or find them on Amazon with Kindle Unlimited.</p>
    <div class="actions"><a class="btn btn-ghost" href="{hub['links']['amazon']}">Amazon author page</a></div>
</section>
<section class="block"><ul class="grid">{rows}</ul></section>
{newsletter(hub)}"""
    return page("/books", "Books · Bryan Collins",
                "Books by USA Today bestselling author Bryan Collins on writing, creativity and creative business.", body, hub)


def build_work(hub, skills):
    w = hub["work"]
    roles = "".join(
        f'<li class="card"><p class="meta">{esc(r["dates"])}</p><h3>{esc(r["title"])}</h3><p class="muted">{esc(r["org"])}</p>'
        f'<ul>{"".join(f"<li>{esc(p)}</li>" for p in r["points"])}</ul></li>' for r in w["roles"])
    sk = "".join(f'<div class="card"><h3>{esc(g["name"])}</h3><ul>{"".join(f"<li>{esc(i)}</li>" for i in g["items"])}</ul></div>'
                 for g in w["skills"])
    L = hub["links"]
    body = f"""<section class="hero">
    <h1>{esc(w['headline'])}</h1>
    <p class="lede">{esc(w['summary'])}</p>
    <p>{esc(w['open_to'])}</p>
    <div class="actions"><a class="btn btn-ghost" href="{L['email']}">Email me</a><a class="btn btn-ghost" href="{L['linkedin']}">LinkedIn</a><a class="btn btn-ghost" href="https://clarity.fm/bryancollins">Book a call</a></div>
</section>
<section class="block">
    <h2>Proof of work</h2>
    <ul class="plain">
        <li><a href="/projects">Live products</a>. Data sites I build and operate end to end.</li>
        <li><a href="/skills/">Open-source agent skills</a>. {len(skills)} workflows I run with Claude Code, on <a href="{L['skills_repo']}">GitHub</a>.</li>
        <li><a href="/videos">Build videos</a>. The work, filmed as it happens, including what went wrong.</li>
        <li><a href="/books">Books</a>. Including a USA Today bestseller, The Power of Creativity.</li>
    </ul>
</section>
<section class="block">
    <h2>Experience</h2>
    <ul class="roles grid">{roles}</ul>
</section>
<section class="block">
    <h2>What I bring</h2>
    <div class="grid cols">{sk}</div>
</section>"""
    return page("/work-with-me", "Work with Bryan Collins",
                "Product and growth operator who builds with AI coding agents. Open to product leadership and head of growth roles.",
                body, hub)


# ---------------------------------------------------------------- main

def write(rel, text):
    for pat in LEAK_PATTERNS:
        m = re.search(pat, text)
        if m:
            sys.exit(f"refusing to write {rel}: matches private pattern {pat!r} near {text[max(0, m.start()-60):m.end()+60]!r}")
    if "—" in text:
        print(f"warning: em dash in {rel}")
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text)
    return rel


def update_sitemap(paths):
    """Add any generated page missing from sitemap.xml; bump lastmod on all of them."""
    f = ROOT / "sitemap.xml"
    xml = f.read_text()
    today = dt.date.today().isoformat()
    for path in paths:
        loc = f"<loc>{SITE}{path}</loc>"
        m = re.search(re.escape(loc) + r"\s*<lastmod>[^<]*</lastmod>", xml)
        if m:
            xml = xml.replace(m.group(0), f"{loc}\n    <lastmod>{today}</lastmod>")
        else:
            xml = xml.replace("</urlset>", f"  <url>\n    {loc}\n    <lastmod>{today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n</urlset>")
    f.write_text(xml)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--videos-from", help="youtube-cli dump-*.json to snapshot into data/videos.json")
    ap.add_argument("--skills-from", help="local clone of agent-skills to snapshot into data/skills.json")
    a = ap.parse_args()
    if a.videos_from:
        refresh_videos(a.videos_from)
    if a.skills_from:
        refresh_skills(a.skills_from)

    hub = json.load(open(DATA / "hub.json"))
    vsnap = json.load(open(DATA / "videos.json"))
    ssnap = json.load(open(DATA / "skills.json"))
    videos, skills = vsnap["videos"], ssnap["skills"]

    written = [
        write("index.html", build_index(hub, videos, skills)),
        write("videos.html", build_videos(hub, videos, vsnap)),
        write("projects.html", build_projects(hub)),
        write("books.html", build_books(hub)),
        write("work-with-me.html", build_work(hub, skills)),
        write("skills/index.html", build_skills_index(hub, skills, ssnap)),
    ]
    stale = {p.name for p in (ROOT / "skills").glob("*.html")} - {"index.html"} - {f"{s['name']}.html" for s in skills}
    for s in skills:
        written.append(write(f"skills/{s['name']}.html", build_skill(hub, s, skills)))
    for name in sorted(stale):
        (ROOT / "skills" / name).unlink()
        print(f"removed skills/{name} (no longer in agent-skills)")
    update_sitemap(["/", "/videos", "/projects", "/books", "/work-with-me", "/skills/"] + [f"/skills/{s['name']}" for s in skills])
    print(f"wrote {len(written)} pages")


if __name__ == "__main__":
    main()
