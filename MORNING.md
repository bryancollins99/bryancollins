> **CORRECTION (2026-07-03) — read first.** The premise below is wrong. The March offer was NOT "promised then never delivered." It was a live **pre-order** page that 305 people saw and **zero bought**. Demand at the point of payment was tested and it failed; only *interest* was proven. This overturns this doc's core claim ("demand proven / IOU to clear") and its revenue estimate (revised down from $585-1,365 to a realistic $0-585). The product still ships, reframed as an honest retry ("this time you can look before you pay"), not an apology. Sales page and launch email have been corrected. Everything after this line is the original, mistaken analysis, kept as a dated snapshot.

# MORNING.md — overnight mission report (2026-07-01)

## TL;DR

I built and shipped **The Builder's Pipeline**: the $39 product you promised the
list on 14 March, that 305 people clicked on, and that never existed. Six
genericised, tested scripts + six no-code Claude prompts + templates + samples
+ a beginner-proof guide, a sales page in the site's design language, launch
emails, and a delivery flow. Two 5-minute actions from you make it live:
mint the payment link and upload the zip.

## What exists now

| Artefact | Where |
|---|---|
| Product (32 files, all compile, personal-refs stripped) | `~/src/builders-pipeline/` (git repo, committed) |
| Deliverable zip (66KB) | `~/src/builders-pipeline-v1.0.zip` |
| Sales page | `builders-pipeline.html` on branch `feat/builders-pipeline` → https://bryancollins.com/builders-pipeline.html once merged |
| Delivery/thanks page (noindex, Plausible purchase event) | `builders-pipeline-thanks.html` |
| Products page now has something buyable | `products.html` (new "Available now" card) |
| Warm-up + launch (3 subjects) + follow-up + YT community post | `LAUNCH-EMAILS.md` |
| Mission logs | `DECISIONS.md`, `AUDIT.md`, `AUDIT-INVENTORY.md`, `OPPORTUNITIES.md`, `EVAL.md` |

Nothing touched main or the live site. Nothing was sent to the list. Live site
regression-checked: all key pages 200, unchanged.

## Why this beat the alternatives

Ten candidates scored in `OPPORTUNITIES.md`. This one won because it's the only
candidate with **measured demand at its exact price**: 305 unique clicks (7.8%
of openers) on "Get The Builder's Pipeline ($39)" in March — the biggest
product-click event in your Kit account — against a purchase ledger showing the
product was never delivered. Everything else on the board was inference.
Bonus: the code already existed in your vault; tonight was genericising,
documenting, testing, and packaging, plus honest go-to-market.

## Revenue, anchored to observed data (not list-size fantasy)

Your actual history: $197 launches sell ~3 units; $20-47 sells steadily;
historical campaign ceiling ≈ $600. Against that:

- **Conservative:** 15 sales = **$585** (5% of the March clickers convert)
- **Base:** 25-35 sales = **$975-1,365** (apology + warm-up + 3 sends re-trigger most of the March intent)
- **Ceiling:** ~60 sales ≈ $2,340 (would be your best campaign ever; don't plan on it)

Not life-changing money. What it actually buys: the first working product loop
on this brand (page → payment → delivery → tagged buyers), a warm buyer
segment for the natural $49 sequel (your Zettelkasten + Claude Code operating
system, runner-up in the scan), and the IOU cleared.

## Your two 5-minute actions before launch

1. **Payment:** create the payment link and replace
   `https://buy.stripe.com/REPLACE_WITH_BUILDERS_PIPELINE_LINK` (2 spots in
   `builders-pipeline.html`). Recommended: a **Kit Commerce product** instead of
   a bare Stripe link — Stripe's already wired to Kit, Kit hosts the file,
   delivers the download email, and tags buyers automatically (solves delivery
   + buyer segmentation in one move). Upload `builders-pipeline-v1.0.zip` to it.
2. **API key:** the ANTHROPIC_API_KEY in `~/src/zettelkasten/scripts/.env` is
   **dead** (rejected by the API tonight) — your own Friday scripts are
   currently broken too. Mint a new key before running the pipeline on your
   real worklog for the launch P.S.

## Send plan (drafts in LAUNCH-EMAILS.md, nothing scheduled)

| Day | Send | Notes |
|---|---|---|
| Day 0 | Warm-up: gives away the full Friday content prompt, zero ask | pure value; proves the method before the pitch |
| Day 3 | Launch: leads with the apology to the 305, single buy CTA | 3 subject variants; P.S. carries a make-it-true-or-delete instruction |
| Day 3 | YouTube community post | in the same file |
| Day 7 | Follow-up: real usage + honest limitation, final dedicated email | template forbids invented testimonials |

## What's fragile

- **Scripts are compile-tested and dry-run tested, not live-API tested** — the
  end-to-end run hit the dead key (the beginner-facing error message worked
  perfectly, for what it's worth). Twenty minutes with a fresh key on the
  synthetic config in scratchpad validates all six for real.
- **The Kit draft edit-URL** printed by schedule-newsletter.py is best-effort
  (Kit doesn't document the URL scheme); one manual click-test before shipping.
- **30-day refund promise** on the page is a new commitment I made for you.
  If you won't honour it, delete it before merging (and expect a conversion hit).
- **`claude-sonnet-5` as default model** in config.example.yaml could not be
  live-validated (dead key). Verify with the fresh key.
- The live Kit newsletter page (https://newsletter.bryancollins.com) hero reads
  "An newsletter aobut AI-built businesses" — two typos, editable only in the
  Kit dashboard, worth fixing before you send anything.

## Regression fixes bundled on the branch

- Homepage + projects page were still selling Prompt Writing Studio at "$197
  one-time payment" two months after "closing forever" — both now say
  enrollment closed.
- `builders-pipeline-thanks.html` blocked in robots.txt; sales page added to
  sitemap.xml.

## The decision you're most likely to disagree with

**I lead both the sales page and the launch email with a public apology** for
the broken March promise ("I owed 305 of you an apology"), and I bound you to
two public integrity commitments: no scarcity ever on this product ("$39 today
and $39 next month") and 30-day refunds. You might prefer to quietly launch
without re-surfacing the failure. I did it anyway because (a) 305 people
watched the promise break, and pretending it didn't happen reads worse to the
exact people most likely to buy, (b) your list just sat through a
"closing-forever" hard-sell in May, and the apology-plus-zero-scarcity framing
is the only launch shape that doesn't pattern-match to it, and (c) the click
data says this audience rewards honest field reports 4-5x over pitch energy.
The apology IS the field report.

If you overrule it: the page section is `<!-- The honest bit -->` in
builders-pipeline.html and the email needs a new opening; the product stands
either way.
