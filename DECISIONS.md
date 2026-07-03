# DECISIONS.md — Overnight mission log (2026-07-01)

Mission: identify + build the best sellable asset bryancollins.com supports.
Constraints (override everything): 16K email list + ~11K YT subs (writing-era audience),
low sales orientation (23rd pct) — no calls/DMs/outbound, product-led + inbound only,
no SEO-dependent plays. Fully unattended.

---

## D-001 — Working location
Repo located at `~/src/bryancollins` (static HTML, Netlify, main clean).
All mission artefacts (DECISIONS.md, AUDIT.md, OPPORTUNITIES.md, EVAL.md, MORNING.md)
written to repo root. Build work will go on a branch, NOT main — Bryan ratifies in the morning.

## D-002 — Phase 0 method
Read core positioning pages inline (index, products, newsletter, work-with-me, now, README,
PRD, RECOMMENDATIONS, CONVERTKIT docs) + dispatch one read-only Explore agent to inventory
every page (title, purpose, CTA, email-capture mechanism, staleness signals). Also fetch the
LIVE site homepage to confirm deployed state matches repo.

## D-003 — Ground truth from Kit (2026-07-01)
- Active list = 10,909 (not 16K; 16K likely includes cold/cancelled). Net 90-day growth = 0 (241 in / 241 out).
- Open rate stable 32–36% (~3,600–3,900 opens/send).
- CLICK PATTERN (load-bearing): "how I build" workflow emails = 2.7–3.3% CTR;
  product-pitch emails (PWS closing sequence, Apr–May 2026) = 0.5–0.9% CTR. 4–5× gap.
- PWS ran a "closing forever" hard-sell sequence ending 2026-05-02. The list was pitched
  hard 8 weeks ago. Next ask must NOT look like another manufactured-scarcity launch.
- Newsletter already repositioned: recent sends are Claude Code / AI-built-business content.
  The "bridge" from writing-era to builder-era has already been walked in the email channel;
  the SITE lags the newsletter, not vice versa.
- Live regression note: newsletter.bryancollins.com (Kit-hosted) hero reads
  "An newsletter aobut AI-built businesses" — two typos on the live subscribe page.

## D-004 — Conversion math baseline for Phase 1 scoring
Use active list 10,909; ~3,700 openers/send; treat 1–3% conversion as % of BUYING-intent
clickers, not raw list. Conservative model: launch sequence reaches ~5,500 unique openers
across 3 sends; 0.5–1.0% of openers purchase a well-fit low-priced product = 28–55 sales.

## D-005 — The Builder's Pipeline (smoking gun, 2026-03-14)
Broadcast 23239385 ("I automated my content calendar with 6 Python scripts") PROMISED a
$39 one-time product: a clone-and-run GitHub repo of Bryan's 6 content-automation scripts.
305 unique clicks on the buy link (7.8% of openers — biggest product-click event in the
account). Purchase ledger: ZERO Builder's Pipeline sales. The product URL
(newsletter.becomeawritertoday.com/products/the-builders-pipeline) no longer resolves.
Demand proven; fulfilment apparently never shipped.
All 6 scripts EXIST in ~/src/zettelkasten/scripts/ (2,626 lines, env-based secrets, only
2 files carry personal references). Packaging is a one-night job.

## D-006 — Purchase-history reality check for revenue estimates
Last 9 months of Kit purchases: $197 launches sell ~3 units; $97 challenge sold 5;
$20–47 products sell steadily in ones-and-twos. Historical ceiling per campaign ≈ $600.
Any Phase 5 revenue estimate must anchor to OBSERVED sales, not list-size arithmetic.
The 305-click Builder's Pipeline event is the one signal that a $39 product could beat
that ceiling (305 clicks × 5–15% page conversion = 15–45 sales = $585–$1,755).
