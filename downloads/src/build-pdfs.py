#!/usr/bin/env python3
"""Render the lead-magnet markdown sources to styled PDFs via headless Chrome.

    python3 build-pdfs.py [name ...]      # default: all

Sources are downloads/src/<name>.md, output is downloads/<name>-<hash>.pdf where
<hash> is a stable per-asset suffix (matches the house pattern used by the paid
downloads, so the URL is not guessable from the asset name alone).
"""
import html as _html
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Stable obfuscation suffix per asset. Never regenerate these: the URLs are live
# in YouTube descriptions and on the thank-you pages.
SUFFIX = {
    "note-system-starter": "6p3n9k2",
    "claude-code-starter": "8h5r4t1",
    "writing-career-map": "2w7c6b5",
}

CSS = """
@page { size: A4; margin: 20mm 18mm; }
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  color: #1B1B1D; line-height: 1.65; font-size: 11.5pt; margin: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
h1 { font-size: 26pt; line-height: 1.15; margin: 0 0 6pt; color: #1B1B1D; letter-spacing: -0.01em; }
h2 { font-size: 15pt; margin: 22pt 0 7pt; padding-bottom: 5pt;
     border-bottom: 2px solid #F3C972; page-break-after: avoid; }
h3 { font-size: 12.5pt; margin: 15pt 0 4pt; color: #956FA6; page-break-after: avoid; }
p { margin: 0 0 9pt; }
ul, ol { margin: 0 0 10pt; padding-left: 19pt; }
li { margin-bottom: 4pt; }
hr { border: 0; border-top: 1px solid #D8D8DA; margin: 17pt 0; }
a { color: #956FA6; text-decoration: none; }
code { font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 9.5pt;
       background: #EDEDEE; padding: 1.5pt 4pt; border-radius: 3px; }
pre { background: #1B1B1D; color: #F2F2F3; padding: 11pt 13pt; border-radius: 6px;
      overflow-x: auto; margin: 0 0 11pt; page-break-inside: avoid; }
pre code { background: none; color: inherit; padding: 0; font-size: 9pt; line-height: 1.5; }
table { border-collapse: collapse; width: 100%; margin: 0 0 12pt; font-size: 10.5pt;
        page-break-inside: avoid; }
th { background: #956FA6; color: #fff; text-align: left; padding: 6pt 9pt; font-weight: 600; }
td { border-bottom: 1px solid #DEDEE0; padding: 6pt 9pt; vertical-align: top; }
strong { font-weight: 700; }
.sub { color: #6A6A70; font-size: 10.5pt; margin-top: -2pt; }
.brandrule { height: 5px; background: #F3C972; border-radius: 3px; margin: 0 0 16pt; width: 84px; }
"""

INLINE = [
    (re.compile(r"`([^`]+)`"), lambda m: f"<code>{m.group(1)}</code>"),
    (re.compile(r"\*\*([^*]+)\*\*"), lambda m: f"<strong>{m.group(1)}</strong>"),
    (re.compile(r"\[([^\]]+)\]\(([^)]+)\)"), lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>'),
]


def inline(text):
    out = _html.escape(text)
    for pat, fn in INLINE:
        out = pat.sub(fn, out)
    return out


def convert(md):
    """Markdown subset -> HTML. Covers exactly what the source files use."""
    lines = md.split("\n")
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]

        if ln.startswith("```"):                                  # fenced code
            i += 1
            buf = []
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(_html.escape(lines[i]))
                i += 1
            i += 1
            out.append("<pre><code>" + "\n".join(buf) + "</code></pre>")
            continue

        if ln.startswith("|") and i + 1 < len(lines) and set(lines[i + 1].replace("|", "").strip()) <= set("-: "):
            head = [c.strip() for c in ln.strip().strip("|").split("|")]
            i += 2
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            t = ["<table><thead><tr>"]
            t += [f"<th>{inline(c)}</th>" for c in head]
            t.append("</tr></thead><tbody>")
            for r in rows:
                t.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
            t.append("</tbody></table>")
            out.append("".join(t))
            continue

        if re.match(r"^\s*(---|___)\s*$", ln):
            out.append("<hr>")
            i += 1
            continue

        m = re.match(r"^(#{1,4})\s+(.*)$", ln)
        if m:
            lvl = len(m.group(1))
            out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
            if lvl == 1:
                out.append('<div class="brandrule"></div>')
            i += 1
            continue

        m = re.match(r"^(\d+)\.\s+(.*)$", ln)
        if m:
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s+", lines[i]):
                items.append(re.sub(r"^\d+\.\s+", "", lines[i]))
                i += 1
            out.append("<ol>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ol>")
            continue

        if re.match(r"^[-*]\s+", ln):
            items = []
            while i < len(lines) and re.match(r"^[-*]\s+", lines[i]):
                items.append(re.sub(r"^[-*]\s+", "", lines[i]))
                i += 1
            out.append("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ul>")
            continue

        if ln.strip() == "":
            i += 1
            continue

        para = [ln]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(
                r"^(#{1,4}\s|[-*]\s|\d+\.\s|\||```|---\s*$)", lines[i]):
            para.append(lines[i])
            i += 1
        out.append(f"<p>{inline(' '.join(para))}</p>")

    return "\n".join(out)


def build(name):
    src = os.path.join(HERE, f"{name}.md")
    if not os.path.exists(src):
        raise SystemExit(f"missing source: {src}")
    with open(src) as fh:
        md = fh.read()

    title = md.split("\n", 1)[0].lstrip("# ").strip()
    page = (f"<!doctype html><html><head><meta charset='utf-8'>"
            f"<title>{_html.escape(title)}</title><style>{CSS}</style></head>"
            f"<body>{convert(md)}</body></html>")

    dest = os.path.join(OUT, f"{name}-{SUFFIX[name]}.pdf")
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as tmp:
        tmp.write(page)
        tmp_path = tmp.name
    try:
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={dest}", f"file://{tmp_path}"],
            check=True, capture_output=True, timeout=120,
        )
    finally:
        os.unlink(tmp_path)

    if not os.path.exists(dest) or os.path.getsize(dest) < 5000:
        raise SystemExit(f"FAIL: {dest} missing or suspiciously small")
    print(f"{os.path.basename(dest):<42} {os.path.getsize(dest) // 1024} KB")
    return dest


if __name__ == "__main__":
    names = sys.argv[1:] or sorted(SUFFIX)
    for n in names:
        build(n)
