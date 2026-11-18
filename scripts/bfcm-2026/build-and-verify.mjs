#!/usr/bin/env node
// scripts/bfcm-2026/build-and-verify.mjs
//
// Deterministically compiles all 12 Black Friday / Cyber Monday 2026 campaign
// emails into standalone .html + .txt payloads, enforces strict Resend and
// house-voice lint checks, and builds bfcm-2026-review.html (noindex operator
// inbox previewer).

import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CAMPAIGNS_PART_1 } from "./campaigns-part1.mjs";
import { CAMPAIGNS_PART_2 } from "./campaigns-part2.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.join(__dirname, "out");
mkdirSync(OUT_DIR, { recursive: true });

export const ALL_CAMPAIGNS = [...CAMPAIGNS_PART_1, ...CAMPAIGNS_PART_2];

assert.equal(ALL_CAMPAIGNS.length, 12, "Expected 12 campaign emails across 8 lists");

for (const c of ALL_CAMPAIGNS) {
  for (const field of ["subject", "previewText", "html", "text"]) {
    assert.ok(c[field] && c[field].length > 10, `${c.id}: missing ${field}`);
    assert.equal(
      /[—–]/.test(c[field]),
      false,
      `${c.id}: em-dash or en-dash found in ${field}`,
    );
  }
  assert.ok(c.html.includes("<!DOCTYPE html>"), `${c.id}: missing DOCTYPE`);
  assert.ok(c.html.includes("<table"), `${c.id}: must use table-based HTML`);
  assert.equal(/<style/i.test(c.html), false, `${c.id}: <style> tag forbidden in Resend HTML`);
  assert.ok(c.html.includes("{{{RESEND_UNSUBSCRIBE_URL}}}"), `${c.id}: missing HTML unsubscribe placeholder`);
  assert.ok(c.text.includes("{{{RESEND_UNSUBSCRIBE_URL}}}"), `${c.id}: missing text unsubscribe placeholder`);
  assert.equal(/amazon\.(com|co\.uk)/i.test(c.html + c.text), false, `${c.id}: Amazon links forbidden in email`);
  assert.equal(/go\.becomeawritertoday\.com/i.test(c.html + c.text), false, `${c.id}: dead go.becomeawritertoday.com host`);

  writeFileSync(path.join(OUT_DIR, `${c.id}.html`), c.html, "utf8");
  writeFileSync(path.join(OUT_DIR, `${c.id}.txt`), c.text, "utf8");
}

const manifest = ALL_CAMPAIGNS.map(({ html, text, ...meta }) => ({
  ...meta,
  htmlFile: `scripts/bfcm-2026/out/${meta.id}.html`,
  textFile: `scripts/bfcm-2026/out/${meta.id}.txt`,
}));
writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

// Build operator review gallery (noindex, unlisted)
const payloadJson = JSON.stringify(ALL_CAMPAIGNS).replace(/</g, "\\u003c");

const reviewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BFCM 2026 Campaign Review &amp; Inbox Previewer (Unpublished)</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f3f4f6; color: #111827; }
    header { background: #0b0b0c; color: #fafafa; padding: 16px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }
    header h1 { font-size: 18px; margin: 0; font-weight: 700; }
    .badge { background: #fcd34d; color: #18181b; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 999px; }
    .pages-bar { background: #18181b; color: #d4d4d8; padding: 10px 24px; font-size: 13px; display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; border-bottom: 1px solid #27272a; }
    .pages-bar a { color: #fcd34d; text-decoration: underline; font-weight: 600; }
    .layout { display: grid; grid-template-columns: 340px 1fr; min-height: calc(100vh - 96px); }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
    .sidebar { background: #ffffff; border-right: 1px solid #e5e7eb; overflow-y: auto; }
    .item { display: block; width: 100%; text-align: left; padding: 14px 18px; border: 0; border-bottom: 1px solid #f3f4f6; background: transparent; cursor: pointer; font: inherit; }
    .item:hover { background: #f9fafb; }
    .item.active { background: #fef9c3; border-left: 4px solid #eab308; padding-left: 14px; }
    .item-prop { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #6b7280; }
    .item-subj { font-size: 14px; font-weight: 600; color: #111827; margin-top: 3px; line-height: 1.35; }
    .item-slot { font-size: 12px; color: #4b5563; margin-top: 4px; }
    .viewer { padding: 24px; max-width: 920px; }
    .meta-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px 20px; margin-bottom: 16px; }
    .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px 20px; font-size: 13.5px; }
    .meta-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; }
    .tabs { display: flex; gap: 8px; margin-bottom: 12px; }
    .tab { padding: 8px 14px; border-radius: 6px; border: 1px solid #d1d5db; background: #ffffff; font-size: 13px; font-weight: 600; cursor: pointer; }
    .tab.active { background: #111827; color: #ffffff; border-color: #111827; }
    iframe { width: 100%; height: 680px; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
    pre { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; margin: 0; }
  </style>
</head>
<body>
  <header>
    <h1>Black Friday &amp; Cyber Monday 2026 Campaign Pack (12 Emails &middot; 6 Site Previews)</h1>
    <span class="badge">UNPUBLISHED &middot; NOTHING SENT OR MERGED</span>
  </header>
  <div class="pages-bar">
    <strong>Landing Page Previews:</strong>
    <a href="/black-friday.html" target="_blank" rel="noopener">1. BryanCollins ($69 Stack)</a>
    <a href="https://deploy-preview-276--becomeawriter.netlify.app/black-friday/" target="_blank" rel="noopener">2. BAWT ($49 Vault)</a>
    <a href="https://deploy-preview-201--leinsterinsider.netlify.app/sponsor/cyber-week/" target="_blank" rel="noopener">3. Leinster Insider (2-for-1 Local Pass)</a>
    <a href="https://deploy-preview-79--mytriathloncalculator.netlify.app/winter-fuel-pack/" target="_blank" rel="noopener">4. Tri-Fuel (25% Hexis + Planner)</a>
    <a href="https://deploy-preview-602--tenderwatchirl.netlify.app/q1-readiness" target="_blank" rel="noopener">5. TenderWatch (Non-Discount Q1 Pass)</a>
    <a href="https://deploy-preview-1445--vendorsie.netlify.app/q1-software-audit" target="_blank" rel="noopener">6. Vendors.ie (Non-Discount Renewal Check)</a>
  </div>
  <div class="layout">
    <div class="sidebar" id="sidebar"></div>
    <div class="viewer">
      <div class="meta-card" id="meta"></div>
      <div class="tabs">
        <button class="tab active" id="btn-html" type="button">Rendered HTML Email</button>
        <button class="tab" id="btn-text" type="button">Plain-Text Version</button>
      </div>
      <iframe id="frame" title="Rendered email preview"></iframe>
      <pre id="plain" hidden></pre>
    </div>
  </div>
  <script>
    const CAMPAIGNS = ${payloadJson};
    let currentIdx = 0;
    let mode = 'html';
    const sidebar = document.getElementById('sidebar');
    const meta = document.getElementById('meta');
    const frame = document.getElementById('frame');
    const plain = document.getElementById('plain');
    const btnHtml = document.getElementById('btn-html');
    const btnText = document.getElementById('btn-text');

    function render() {
      const c = CAMPAIGNS[currentIdx];
      sidebar.innerHTML = CAMPAIGNS.map((item, idx) =>
        '<button type="button" class="item ' + (idx === currentIdx ? 'active' : '') + '" data-idx="' + idx + '">' +
        '<div class="item-prop">' + item.property + '</div>' +
        '<div class="item-subj">' + item.subject + '</div>' +
        '<div class="item-slot">' + item.sendSlot + '</div>' +
        '</button>'
      ).join('');

      meta.innerHTML =
        '<div style="font-size:18px;font-weight:700;margin-bottom:4px;">' + c.subject + '</div>' +
        '<div style="font-size:14px;color:#4b5563;margin-bottom:14px;">Preview text: ' + c.previewText + '</div>' +
        '<div class="meta-grid">' +
        '<div><div class="meta-label">From</div>' + c.from.replace(/</g, '&lt;') + '</div>' +
        '<div><div class="meta-label">Target Resend Segment</div>' + c.segmentName + '<br><code style="font-size:11.5px;">' + c.segmentId + '</code></div>' +
        '<div><div class="meta-label">Audience &amp; Offer</div>' + c.audienceNote + '<br><strong>' + c.offerType + '</strong></div>' +
        '<div><div class="meta-label">Destination Preview</div><a href="' + c.previewPageUrl + '" target="_blank" rel="noopener" style="color:#2563eb;font-weight:600;">Open offer page preview &rarr;</a></div>' +
        '</div>';

      if (mode === 'html') {
        frame.hidden = false;
        plain.hidden = true;
        frame.srcdoc = c.html;
        btnHtml.classList.add('active');
        btnText.classList.remove('active');
      } else {
        frame.hidden = true;
        plain.hidden = false;
        plain.textContent = c.text;
        btnText.classList.add('active');
        btnHtml.classList.remove('active');
      }
    }

    sidebar.addEventListener('click', (e) => {
      const btn = e.target.closest('.item');
      if (!btn) return;
      currentIdx = Number(btn.dataset.idx);
      render();
    });
    btnHtml.addEventListener('click', () => { mode = 'html'; render(); });
    btnText.addEventListener('click', () => { mode = 'text'; render(); });
    render();
  </script>
</body>
</html>
`;

writeFileSync(path.join(REPO_ROOT, "bfcm-2026-review.html"), reviewHtml, "utf8");
console.log(`Built & verified ${ALL_CAMPAIGNS.length} emails (0 em/en dashes, 0 Amazon links, table-based HTML) + bfcm-2026-review.html`);
