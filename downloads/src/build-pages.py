#!/usr/bin/env python3
"""Generate the YouTube lane opt-in pages and their thank-you pages.

    python3 build-pages.py

Writes six files into the repo root. Every page clones the structure, palette and
Kit-embed pattern of 101-ai-prompts-yt.html, which is the only opt-in page on the
site with measured conversions (19 Kit subscribers in the 59 days to 2026-09-15).

Form strategy (Bryan's call, 2026-09-17): no new Kit forms. Every bryancollins.com
lane reuses the one existing YouTube form, `426c2157ed` ("YouTube (AI Prompts)",
id 7308877). A Kit form has exactly one incentive email and one redirect, so the
asset CANNOT be delivered per-lane by Kit.

Delivery therefore happens on the thank-you page instead. Each opt-in page stamps
its lane into localStorage on load; `/thank-you.html` (the form's existing redirect
target) reads the stamp and surfaces the matching PDF. No Kit configuration changes,
so the live /101-ai-prompts-yt funnel is untouched, which matters because it is
mid-measurement until 2026-10-13.

Lane B (writers and books) is NOT here. It goes to becomeawritertoday.com on Resend,
since that is the writing audience and BAWT already owns a hardened capture endpoint.
"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(os.path.dirname(HERE))  # downloads/src -> downloads -> repo root

PLACEHOLDER = "REPLACE_WITH_KIT_FORM_UID"
# The one live YouTube Kit form. Shared by every bryancollins.com lane.
SHARED_UID = "426c2157ed"

LANES = [
    {
        "slug": "note-system-yt",
        "thanks": "thank-you",
        "uid": SHARED_UID,
        "lane": "note",
        "title": "The Plain-Text Note System",
        "meta_title": "The Plain-Text Note System (Free) - Bryan Collins",
        "meta_desc": ("Free: the four-folder note system I use. Plain text files you own for good, "
                      "the naming convention, the three note types, and ten prompts that turn "
                      "notes into drafts."),
        "sub": "The four-folder system I use. Plain files you own for good.",
        "pdf": "note-system-starter-6p3n9k2.pdf",
        "pages": 6,
        "benefits": [
            "Four folders and one naming rule, set up in twenty minutes",
            "The three note types, with a real example of each",
            "Ten prompts that turn a folder of notes into a first draft",
            "No app to buy, nothing to migrate, nothing that can shut down",
        ],
        "upsell": ("Want the full system, the weekly review and the template pack? "
                   "That is <a href=\"/zettelkasten-kit\">The Zettelkasten for Creators Kit</a>."),
    },
    {
        "slug": "claude-code-yt",
        "thanks": "thank-you",
        "uid": PLACEHOLDER,
        "lane": "claude",
        "title": "The Claude Code Starter Pack",
        "meta_title": "The Claude Code Starter Pack (Free) - Bryan Collins",
        "meta_desc": ("Free: the Claude Code setup I wish I had on day one. The CLAUDE.md template, "
                      "the eleven commands worth learning, and the three mistakes that cost me days."),
        "sub": "The setup I wish someone had handed me on day one.",
        "pdf": "claude-code-starter-8h5r4t1.pdf",
        "pages": 5,
        "benefits": [
            "The CLAUDE.md template that stops you re-explaining your project every morning",
            "The eleven commands worth learning, and the one everybody underuses",
            "Five habits that separate a good session from a wasted one",
            "The three mistakes I made, so you can skip them",
        ],
        "upsell": ("My skills are public, free and MIT licensed at "
                   "<a href=\"https://github.com/bryancollins99/agent-skills\">"
                   "github.com/bryancollins99/agent-skills</a>."),
    },
]

STYLE = """        html { overflow-y: scroll; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background-color: #EDEDEE;
            color: #1B1B1D;
        }
        .hero-gradient { background: linear-gradient(135deg, #956FA6 0%, #7d5e8d 100%); }
        .hero-text { color: white; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); }
        .benefit-icon { color: #F3C972; }
        .social-proof { border-color: #A6B6CF; }
        .cta-button {
            background: #F3C972; color: #1B1B1D; font-weight: 700;
            transition: all 0.3s ease; display: inline-block;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 16px 32px; font-size: 1.125rem; letter-spacing: 0.025em; border-radius: 8px;
        }
        .cta-button:hover {
            background: #eab94a; transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }"""


def head(title, desc, canonical, extra_robots=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">{extra_robots}
    <meta property="og:url" content="https://bryancollins.com/{canonical}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{desc}" />
    <meta property="og:type" content="website" />

    <link rel="preload" as="style" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"></noscript>
    <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></noscript>

    <!-- Privacy-friendly analytics by Plausible -->
    <script async src="https://stats.bryancollins.com/js/pa-bvsz2TfQenbKYMWpBJ7eS.js"></script>
    <script>
      window.plausible=window.plausible||function(){{(plausible.q=plausible.q||[]).push(arguments)}},plausible.init=plausible.init||function(i){{plausible.o=i||{{}}}};
      plausible.init()
    </script>
    <script defer src="resources/analytics.js"></script>

    <style>
{STYLE}
    </style>
    <link rel="canonical" href="https://bryancollins.com/{canonical}">
</head>"""


def optin(lane):
    benefits = "\n".join(
        f"""                            <div class="flex items-start">
                                <i class="fas fa-check-circle benefit-icon text-xl mt-0.5 flex-shrink-0"></i>
                                <p class="ml-4 text-lg">{b}</p>
                            </div>""" for b in lane["benefits"])

    if lane["uid"] == PLACEHOLDER:
        form = f"""                            <!-- NOT LIVE YET. This lane needs its own Kit form so the right
                                 asset is delivered and the redirect lands on
                                 /{lane['thanks']}. Swap the UID in both places below,
                                 then remove this comment and the noindex tag in <head>. -->
                            <div class="border-2 border-dashed rounded-lg p-6 text-center" style="border-color:#A6B6CF;">
                                <p class="text-base font-semibold">Form pending</p>
                                <p class="text-sm mt-1" style="opacity:.7;">Kit form UID not yet wired for this lane.</p>
                            </div>"""
    else:
        form = (f"""                            <script async data-uid="{lane['uid']}" """
                f"""src="https://become-a-writer-today.kit.com/{lane['uid']}/index.js"></script>""")

    robots = ("\n    <meta name=\"robots\" content=\"noindex\">"
              if lane["uid"] == PLACEHOLDER else "")

    # The shared Kit form can only redirect to ONE page, so the page cannot tell
    # /thank-you.html which asset was promised. Stamp the lane here, on load rather
    # than on submit, because the Kit embed renders its own form in its own script
    # and there is no reliable submit hook to attach to. A visitor who never
    # subscribes just carries a harmless key: the only way to reach /thank-you is
    # through the form.
    stamp = f"""    <script>
      try {{ localStorage.setItem('bc_lm', '{lane["lane"]}'); }} catch (e) {{}}
    </script>"""

    return f"""{head(lane['meta_title'], lane['meta_desc'], lane['slug'], robots)}
<body>
{stamp}
    <main class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-2xl">
            <div class="bg-white rounded-xl overflow-hidden shadow-xl">
                <div class="hero-gradient px-8 py-12 text-center">
                    <h1 class="hero-text text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">{lane['title']}</h1>
                    <p class="hero-text text-xl sm:text-2xl max-w-xl mx-auto">{lane['sub']}</p>
                </div>

                <div class="px-8 py-10">
                    <div class="space-y-8">
                        <p class="text-center text-sm" style="opacity:.6;">Free · {lane['pages']}-page PDF · instant download</p>

                        <div class="space-y-4 max-w-lg mx-auto">
{benefits}
                        </div>

                        <div class="max-w-lg mx-auto mt-8">
{form}
                            <p class="text-sm text-center mt-3" style="color: #1B1B1D; opacity: 0.7;">We respect your privacy. Unsubscribe anytime.</p>
                        </div>

                        <div class="text-center pt-6 mt-8 social-proof border-t">
                            <p class="text-base"><span class="font-semibold">Join 12,000+ readers</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-center text-xs mt-8" style="color: #1B1B1D; opacity: 0.5;">&copy; Bryan Collins. All rights reserved. &middot; <a href="/privacy">Privacy</a></p>
        </div>
    </main>
</body>
</html>
"""


BEGIN = "<!-- LEAD-MAGNET-DOWNLOAD:BEGIN (generated by downloads/src/build-pages.py) -->"
END = "<!-- LEAD-MAGNET-DOWNLOAD:END -->"


def download_block():
    """The lane-aware download panel injected into the shared /thank-you.html.

    Every bryancollins.com lane shares one Kit form, so the form always redirects
    here and cannot say which asset was promised. This reads the stamp the opt-in
    page left in localStorage and reveals the matching PDF.

    It degrades on purpose: private windows, cleared storage and a viewer arriving
    from an older funnel all leave no stamp, so the panel then offers EVERY asset
    rather than nothing. Nobody who subscribed should ever hit a dead end.
    """
    assets = ",\n".join(
        f"      {l['lane']}: {{ title: {l['title']!r}, pdf: '/downloads/{l['pdf']}' }}"
        for l in LANES)
    return f"""{BEGIN}
<div id="lm-download" class="max-w-lg mx-auto mb-10" hidden>
  <div class="rounded-xl p-6 text-center" style="background:#EDEDEE;">
    <p class="text-sm font-semibold uppercase tracking-wider mb-2" style="color:#956FA6;">Your download</p>
    <h2 id="lm-title" class="text-2xl font-bold mb-4"></h2>
    <div id="lm-links"></div>
    <p class="text-sm mt-4" style="opacity:.7;">A copy is on its way to your inbox too.</p>
  </div>
</div>
<script>
  (function () {{
    var ASSETS = {{
{assets}
    }};
    var lane = null;
    try {{ lane = localStorage.getItem('bc_lm'); }} catch (e) {{}}
    var box = document.getElementById('lm-download');
    var links = document.getElementById('lm-links');
    var title = document.getElementById('lm-title');
    if (!box || !links || !title) return;

    function button(a) {{
      var el = document.createElement('a');
      el.className = 'cta-button';
      el.style.margin = '6px';
      el.setAttribute('href', a.pdf);
      el.setAttribute('download', '');
      el.textContent = 'Download ' + a.title;
      return el;
    }}

    var picked = lane && ASSETS[lane];
    if (picked) {{
      title.textContent = picked.title;
      links.appendChild(button(picked));
    }} else {{
      // No stamp: offer everything rather than guess wrong.
      title.textContent = 'Grab your guides';
      Object.keys(ASSETS).forEach(function (k) {{ links.appendChild(button(ASSETS[k])); }});
    }}
    box.hidden = false;
  }})();
</script>
{END}"""


def patch_thanks():
    path = os.path.join(SITE, "thank-you.html")
    html = open(path).read()
    block = download_block()
    if BEGIN in html and END in html:
        start = html.index(BEGIN)
        stop = html.index(END) + len(END)
        html = html[:start] + block + html[stop:]
    else:
        # First run: drop it in immediately after <body>, above the existing copy.
        anchor = html.index("<body>") + len("<body>")
        html = html[:anchor] + "\n" + block + "\n" + html[anchor:]
    open(path, "w").write(html)
    return path


if __name__ == "__main__":
    for lane in LANES:
        path = os.path.join(SITE, f"{lane['slug']}.html")
        body = optin(lane)
        with open(path, "w") as fh:
            fh.write(body)
        state = "PENDING" if lane["uid"] == PLACEHOLDER else f"live on {lane['uid']}"
        print(f"wrote {lane['slug']}.html  ({len(body)} bytes)  {state}")
    print("patched " + os.path.basename(patch_thanks()))
