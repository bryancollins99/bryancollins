// scripts/bfcm-2026/campaigns-part2.mjs
//
// Campaign emails 7 to 12:
//  7. Tri-Fuel Magic (Tri-Fuel · newsletter, 85a7b202-ab77-4bec-8cfd-5925b0d3a2d3)
//  8. AI Flash Report (AI Flash Report · newsletter, e5f436a2-86f0-42bc-a277-5f8733bcc7eb)
//  9. Prompt Writing Studio (PromptWritingStudio · newsletter, 8758d410-436e-49f5-b20f-a0623a976242)
// 10-11. TenderWatch.ie NON-DISCOUNT (Tenderwatch · newsletter, 7e80858a-80e0-4eef-b6a3-780ab6541bc2 + Pro waitlist d38a0c6b)
// 12. Vendors.ie NON-DISCOUNT (Vendors · newsletter, ed4b926c-07ef-43a8-a4af-c11b001969b3)

import { p, h2, ctaButton, bulletList, calloutBox, wrapBrandCardEmail } from "./email-shell.mjs";

export const CAMPAIGNS_PART_2 = [
  {
    id: "trifuel-bf-2026",
    property: "My Triathlon Calculator (Tri-Fuel Magic)",
    segmentName: "Tri-Fuel · newsletter",
    segmentId: "85a7b202-ab77-4bec-8cfd-5925b0d3a2d3",
    audienceNote: "42 contacts (~32 active triathletes & runners)",
    offerType: "25% Off Hexis (Code Tri25) + 2027 Winter Gut-Training Planner",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 14:00 UTC",
    from: "My Triathlon Calculator <hello@send.mytriathloncalculator.com>",
    replyTo: ["hello@send.mytriathloncalculator.com"],
    subject: "Your 2027 winter gut-training setup (plus 25% off Hexis)",
    previewText: "Set your winter base carb targets before spring build starts, and save 25% on Hexis daily carb-coding.",
    previewPageUrl: "https://deploy-preview-79--mytriathloncalculator.netlify.app/winter-fuel-pack/",
    livePageUrl: "https://mytriathloncalculator.com/winter-fuel-pack/",
    html: wrapBrandCardEmail({
      title: "2027 Winter Base & Race Fueling Kit",
      previewText: "Set your winter base carb targets before spring build starts, and save 25% on Hexis daily carb-coding.",
      brandName: "My Triathlon Calculator",
      kicker: "2027 Off-Season Fueling & Cyber Week Partner Offer",
      accentColor: "#2563EB",
      bodyHtml: [
        p("Most age-groupers spend Black Friday weekend shopping for carbon wheels and wait until two weeks before their spring 70.3 to practice race-rate carbohydrate intake."),
        p("High-carb absorption is trainable, and November indoor turbo rides are the easiest place all year to build gut tolerance without race stress. We put together a new <strong>2027 Winter Base and Race Fueling Kit</strong> page with two practical tools:"),
        bulletList([
          "<strong>Interactive Winter Gut-Training Progression:</strong> select Sprint, Olympic, 70.3 or Full Ironman to see exact g/hr carbohydrate targets for November-December base rides versus January-February build bricks.",
          "<strong>25% off Hexis daily carb-coding (code Tri25):</strong> our nutrition partner <a href=\"https://www.gj4bt5vt.com/T58MD/3QQG7/?uid=3&sub2=email-bfcm2026&sub3=cyber-week\" style=\"color:#2563EB;font-weight:bold;text-decoration:underline;\">Hexis</a> syncs with TrainingPeaks, Garmin and Strava to adjust your daily meal targets around every workout.",
          "<strong>Spec-first gear guides:</strong> comparing GPS triathlon watches, bike computers or wetsuits in weekend clearance sales? Check battery life, multi-band GPS and sizing on our site guides before checkout.",
        ]),
        ctaButton({
          label: "Open the 2027 Winter Fueling Kit + 25% Hexis Code",
          href: "https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026",
          bg: "#2563EB",
          fg: "#FFFFFF",
        }),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Disclosure: Hexis is a compensated partner. If you sign up through our link using code Tri25, we may earn a commission at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `Most age-groupers spend Black Friday weekend shopping for carbon wheels and wait until two weeks before their spring 70.3 to practice race-rate carbohydrate intake.

High-carb absorption is trainable, and November indoor turbo rides are the easiest place all year to build gut tolerance without race stress. We put together a 2027 Winter Base and Race Fueling Kit page for Cyber Weekend:

- Interactive Winter Gut-Training Progression: pick Sprint, Olympic, 70.3 or Full Ironman to see g/hr carbohydrate targets for Nov-Dec base versus Jan-Feb build sessions.
- 25% off Hexis daily carb-coding with code Tri25: syncs with TrainingPeaks, Garmin and Strava to adjust daily carbs around every session (https://www.gj4bt5vt.com/T58MD/3QQG7/?uid=3&sub2=email-bfcm2026&sub3=cyber-week).
- Independent Watch, Bike Computer and Wetsuit spec guides on the site if you are comparing clearance deals this weekend.

Open the 2027 Winter Fueling Kit:
https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026

Disclosure: Hexis is a compensated partner. If you sign up through our link, we may earn a commission at no extra cost to you.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "aifr-cm-2026",
    property: "AI Flash Report",
    segmentName: "AI Flash Report · newsletter",
    segmentId: "e5f436a2-86f0-42bc-a277-5f8733bcc7eb",
    audienceNote: "35 contacts (active weekly frontier model tracker readers)",
    offerType: "Cyber Monday Builder Stack ($69 Claude Code Operator Bundle + Lovable)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 14:30 UTC",
    from: "AI Flash Report <alerts@send.aiflashreport.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Cyber Monday note: frontier API costs fell, wrapper subscriptions did not",
    previewText: "How we replaced half our monthly AI SaaS bill with local Markdown + Claude Code scripts.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "Cyber Monday Builder Note",
      previewText: "How we replaced half our monthly AI SaaS bill with local Markdown + Claude Code scripts.",
      brandName: "AI Flash Report",
      kicker: "Cyber Monday Special Note · Frontier Models & Builder Tooling",
      accentColor: "#0052FF",
      bodyHtml: [
        p("If you follow our weekly model tracker on <a href=\"https://aiflashreport.com/changes/\" style=\"color:#0052FF;text-decoration:underline;\">AI Flash Report</a>, you have watched per-token inference prices drop steadily across 2026 while wrapper SaaS apps keep charging $29 to $99 a month per seat."),
        p("Behind AI Flash Report, our small Dublin publishing group runs nine sites using plain-text Markdown files, Python scripts and Claude Code skills instead of recurring SaaS wrappers."),
        p("Until midnight tonight (Cyber Monday), our founder Bryan Collins has bundled all four of those local plain-text and Claude Code kits together for <strong>$69 one-time</strong> (normally $146 across individual kits):"),
        bulletList([
          "<strong>The Builder's Pipeline:</strong> six Python scripts and prompts that turn daily commit/worklog lines into weekly social and newsletter drafts.",
          "<strong>Claude Code for Writers &amp; Operators:</strong> persistent <code>MEMORY.md</code> setup, undo safety and three starter <code>CLAUDE.md</code> project specs.",
          "<strong>The Zettelkasten for Creators Kit:</strong> git-backed plain-Markdown vault and cleanup scripts.",
          "<strong>Filler-Word Killer Editor Pack:</strong> local CLI prose linter + eight editable JSON dictionaries.",
        ]),
        ctaButton({
          label: "Inspect the $69 Cyber Monday Builder Stack",
          href: "https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026",
          bg: "#0052FF",
          fg: "#FFFFFF",
        }),
        p("Also worth checking today: <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">Lovable</a> for rapid full-stack UI prototyping from a prompt (affiliate link), or our independent Irish B2B software benchmarks at <a href=\"https://vendors.ie/ai-tools-ireland\" style=\"color:#0052FF;text-decoration:underline;\">Vendors.ie</a>."),
      ].join("\n"),
    }),
    text: `If you follow our weekly model tracker on AI Flash Report (https://aiflashreport.com/changes/), you have watched per-token inference prices drop steadily across 2026 while wrapper SaaS apps keep charging $29 to $99 a month per seat.

Behind AI Flash Report, our Dublin publishing group runs nine sites using plain-text Markdown files, Python scripts and Claude Code skills instead of recurring SaaS wrappers.

Until midnight tonight (Cyber Monday), our founder Bryan Collins has bundled all four of those local plain-text and Claude Code kits together for $69 one-time (normally $146):

- The Builder's Pipeline: six Python scripts and prompts turning daily build logs into weekly drafts.
- Claude Code for Writers & Operators: persistent MEMORY.md setup, undo safety and three CLAUDE.md project specs.
- The Zettelkasten for Creators Kit: git-backed plain-Markdown vault and cleanup scripts.
- Filler-Word Killer Editor Pack: local CLI prose linter + eight editable JSON dictionaries.

Inspect the $69 Cyber Monday Builder Stack:
https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026

Also worth checking today: Lovable for rapid UI prototyping from a prompt (affiliate link: https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated), and Irish B2B AI benchmarks at https://vendors.ie/ai-tools-ireland.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "pws-bf-2026",
    property: "Prompt Writing Studio",
    segmentName: "PromptWritingStudio · newsletter",
    segmentId: "8758d410-436e-49f5-b20f-a0623a976242",
    audienceNote: "21 contacts (Claude Code / MCP / prompt practitioners)",
    offerType: "4-Kit Claude Code & Plain-Text Bundle ($69, Zero Retired Course CTAs)",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 15:00 UTC",
    from: "Prompt Writing Studio <hello@send.promptwritingstudio.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Skip giant prompt packs this Black Friday (use project memory files instead)",
    previewText: "Four downloadable Claude Code and plain-Markdown kits for $69 one-time through Cyber Monday.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "From Prompt Packs to Claude Code Memory Files",
      previewText: "Four downloadable Claude Code and plain-Markdown kits for $69 one-time through Cyber Monday.",
      brandName: "Prompt Writing Studio",
      kicker: "Black Friday to Cyber Monday · Practical Agent & Markdown Kits",
      accentColor: "#111827",
      bodyHtml: [
        p("Copy-paste prompt libraries aged badly over the last twelve months. Pasting a 400-word mega-prompt into a fresh chat window every morning loses to a clean local folder with a <code>CLAUDE.md</code> brief and persistent session memory."),
        p("We retired our old video courses this year in favour of small, local plain-text kits you download once and own on disk. For Black Friday through Cyber Monday, Bryan Collins has bundled all four kits together for <strong>$69 one-time</strong> (save $77 off the $146 separate price):"),
        bulletList([
          "<strong>Claude Code for Writers &amp; Operators ($39):</strong> zero-terminal setup, persistent <code>MEMORY.md</code> voice rules and three starter project briefs.",
          "<strong>The Builder's Pipeline ($39):</strong> six Python scripts turning daily worklogs into content drafts.",
          "<strong>The Zettelkasten for Creators Kit ($39):</strong> git-friendly Markdown note vault + five templates.",
          "<strong>Filler-Word Killer Editor Pack ($29):</strong> CLI prose tighten-up script + editable JSON lists.",
        ]),
        ctaButton({
          label: "Get the 4-Kit Claude Code & Markdown Stack ($69)",
          href: "https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Prefer free guides? Our Claude Code, MCP and sub-agent reference guides on <a href=\"https://promptwritingstudio.com/\" style=\"color:#0052FF;text-decoration:underline;\">PromptWritingStudio.com</a> remain free, and if you want a visual app builder to pair with them, check <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;text-decoration:underline;\">Lovable's Cyber Week offer</a> (affiliate link)."),
      ].join("\n"),
    }),
    text: `Copy-paste prompt libraries aged badly over the last twelve months. Pasting a 400-word mega-prompt into a fresh chat window every morning loses to a clean local folder with a CLAUDE.md brief and persistent session memory.

We retired our old video courses in favour of small, local plain-text kits you download once and own on disk. For Black Friday through Cyber Monday, Bryan Collins has bundled all four kits together for $69 one-time (normally $146):

- Claude Code for Writers & Operators ($39): zero-terminal setup, persistent MEMORY.md voice rules and three starter project briefs.
- The Builder's Pipeline ($39): six Python scripts turning daily worklogs into content drafts.
- The Zettelkasten for Creators Kit ($39): git-friendly Markdown note vault + five templates.
- Filler-Word Killer Editor Pack ($29): CLI prose tighten-up script + editable JSON lists.

Get the 4-Kit Stack ($69 through Cyber Monday):
https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026

Our Claude Code, MCP and sub-agent guides at https://promptwritingstudio.com/ remain free. For rapid visual app prototyping, see Lovable (affiliate link: https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated).

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "tenderwatch-q1-bf-2026",
    property: "TenderWatch.ie (STRICTLY NON-DISCOUNT)",
    segmentName: "Tenderwatch · newsletter (+ Pro waitlist)",
    segmentId: "7e80858a-80e0-4eef-b6a3-780ab6541bc2",
    audienceNote: "~550+ Irish B2B suppliers (64% open, 36% click) + 8 waitlist firms",
    offerType: "NON-DISCOUNT: 2027 Q1 Bid-Readiness Concierge Pass (10 Slots at EUR 490/yr)",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 09:00 UTC",
    from: "Tenderwatch <alerts@tenderwatch.ie>",
    replyTo: ["bryan@tenderwatch.ie"],
    subject: "Why we do not discount TenderWatch Pro (and 10 Q1 setup slots before 4 Dec)",
    previewText: "Every member pays EUR 490/yr. Join before 4 December and we build your Q1 alerts, rival watches and expiry dossier by hand.",
    previewPageUrl: "https://deploy-preview-602--tenderwatchirl.netlify.app/q1-readiness",
    livePageUrl: "https://www.tenderwatch.ie/q1-readiness",
    html: wrapBrandCardEmail({
      title: "2027 Q1 Bid-Readiness Onboarding Pass",
      previewText: "Every member pays EUR 490/yr. Join before 4 December and we build your Q1 alerts, rival watches and expiry dossier by hand.",
      brandName: "TenderWatch.ie",
      kicker: "Q1 2027 Public Procurement Readiness · Zero-Discount Policy",
      accentColor: "#174A2C",
      bodyHtml: [
        p("A quick note before Black Friday emails take over your inbox today."),
        p("We do not run Black Friday discounts on TenderWatch Pro. Every member pays the same annual rate of <strong>EUR 490 a year</strong>, because cutting the price in November would be unfair to the Irish and Northern Ireland businesses already paying full rate."),
        p("Where suppliers actually lose public contracts is rarely EUR 100 on a subscription. It is finding out about a re-tendered framework three days before deadline, or letting a new tool sit unconfigured over December while Q1 notices go live."),
        p("So for up to <strong>10 businesses joining TenderWatch Pro before Friday 4 December</strong>, we are bundling a complete <strong>done-for-you Q1 2027 Bid-Readiness Setup</strong> into the standard EUR 490 annual membership at no extra charge:"),
        bulletList([
          "<strong>48-hour white-glove alert setup:</strong> tell us what you sell and the counties you cover (ROI + Northern Ireland). We configure up to 10 standing semantic alerts and 5 named competitor award watches in your account for you.",
          "<strong>Bespoke H1 2027 Expiring-Contracts Dossier (PDF + Excel CSV):</strong> every recorded public contract over EUR 100k in your sector estimated to expire between January and June 2027, with buyer spend and incumbent winners, delivered before Christmas.",
          "<strong>2026 VAT invoice + 30-day money-back guarantee:</strong> allocate remaining 2026 business-development budget cleanly, lock in the EUR 490 annual rate, and get a full refund within 30 days if the pack does not surface contracts worth chasing.",
        ]),
        ctaButton({
          label: "Claim 1 of 10 Q1 Bid-Readiness Slots (EUR 490/yr)",
          href: "https://www.tenderwatch.ie/q1-readiness?utm_source=digest&utm_medium=email&utm_campaign=tw-q1-readiness-bf",
          bg: "#174A2C",
          fg: "#FFFFFF",
        }),
        calloutBox({
          title: "Publishing a tender as a public body, charity or CLG?",
          border: "#D1FAE5",
          bg: "#F0FDF4",
          bodyHtml:
            "Book a standard <strong>EUR 149 + VAT Featured Tender</strong> before 4 December and we will include an extra <strong>Closing-Week Reminder mention</strong> in the Monday digest ahead of your submission deadline at no extra cost (purchase orders welcome): <a href=\"https://www.tenderwatch.ie/advertise?utm_source=digest&utm_medium=email&utm_campaign=q1-closing-reminder#book\" style=\"color:#174A2C;font-weight:bold;text-decoration:underline;\">see Featured Tender details</a>.",
        }),
      ].join("\n"),
    }),
    text: `A quick note before Black Friday emails take over your inbox today.

We do not run Black Friday discounts on TenderWatch Pro. Every member pays the same annual rate of EUR 490 a year, because cutting the price in November would be unfair to the Irish and Northern Ireland businesses already paying full rate.

Where suppliers actually lose public contracts is rarely EUR 100 on a subscription. It is finding out about a re-tendered framework three days before deadline, or letting a new tool sit unconfigured over December while Q1 notices go live.

For up to 10 businesses joining TenderWatch Pro before Friday 4 December, we are bundling a complete done-for-you Q1 2027 Bid-Readiness Setup into the standard EUR 490 annual membership at no extra charge:

1. 48-hour white-glove alert setup: tell us what you sell and the counties you cover (ROI + Northern Ireland). We configure up to 10 standing semantic alerts and 5 named competitor award watches for you.
2. Bespoke H1 2027 Expiring-Contracts Dossier (PDF + Excel CSV): every recorded public contract over EUR 100k in your sector estimated to expire between January and June 2027, with buyer spend and incumbent winners, delivered before Christmas.
3. 2026 VAT invoice + 30-day money-back guarantee: allocate remaining 2026 budget cleanly, lock in the EUR 490 annual rate, and request a full refund within 30 days if it does not show you contracts worth chasing.

Claim 1 of 10 Q1 Bid-Readiness Slots (EUR 490/yr):
https://www.tenderwatch.ie/q1-readiness?utm_source=digest&utm_medium=email&utm_campaign=tw-q1-readiness-bf

PUBLISHING A TENDER AS A PUBLIC BODY, CHARITY OR CLG?
Book a standard EUR 149 + VAT Featured Tender before 4 December and receive a complimentary Closing-Week Reminder mention in the Monday digest ahead of your deadline (purchase orders welcome):
https://www.tenderwatch.ie/advertise?utm_source=digest&utm_medium=email&utm_campaign=q1-closing-reminder#book

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "tenderwatch-q1-cm-2026",
    property: "TenderWatch.ie (STRICTLY NON-DISCOUNT — Waitlist & High-Intent)",
    segmentName: "Tenderwatch · Pro waitlist",
    segmentId: "d38a0c6b-77be-4dfb-b57d-cb7567cbe70d",
    audienceNote: "8 commercial waitlist firms (Deloitte, EMM Security, Southern Scientific, etc.)",
    offerType: "NON-DISCOUNT: Direct Waitlist Note for Q1 Concierge Setup (EUR 490/yr)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 09:30 UTC",
    from: "Bryan Collins <bryan@tenderwatch.ie>",
    replyTo: ["bryan@tenderwatch.ie"],
    subject: "Your Q1 2027 Irish tender watchlist + expiring contracts dossier",
    previewText: "You joined the TenderWatch Pro waitlist earlier this year. We opened 10 done-for-you Q1 setup slots before Christmas.",
    previewPageUrl: "https://deploy-preview-602--tenderwatchirl.netlify.app/q1-readiness",
    livePageUrl: "https://www.tenderwatch.ie/q1-readiness",
    html: wrapBrandCardEmail({
      title: "Your Q1 2027 TenderWatch Pro Setup",
      previewText: "You joined the TenderWatch Pro waitlist earlier this year. We opened 10 done-for-you Q1 setup slots before Christmas.",
      brandName: "TenderWatch.ie",
      kicker: "Pro Waitlist Priority Note · Closes Friday 4 December",
      accentColor: "#174A2C",
      bodyHtml: [
        p("You put your name down on the TenderWatch Pro waitlist earlier this year while we were finishing Northern Ireland buyer coverage and the Contract Expiry Radar."),
        p("Both are now live. Before December winds down and Q1 local-authority, HSE and ETB tenders hit in January, I have opened <strong>10 done-for-you Q1 onboarding slots</strong> at the standard <strong>EUR 490 annual Pro rate</strong> (no monthly tier, no Black Friday price games, 2026 VAT invoice included)."),
        p("Join before Friday 4 December and within 48 hours I will configure your standing sector alerts across eTenders, TED and Find a Tender (NI), add 5 rival supplier award watches, and send over a custom PDF and Excel CSV of every public contract over EUR 100k in your sector estimated to expire in the first half of 2027."),
        ctaButton({
          label: "Inspect the Q1 Bid-Readiness Pass (EUR 490/yr)",
          href: "https://www.tenderwatch.ie/q1-readiness?utm_source=waitlist&utm_medium=email&utm_campaign=tw-q1-readiness-cm",
          bg: "#174A2C",
          fg: "#FFFFFF",
        }),
        p("As always, every annual membership carries a straightforward 30-day full-refund guarantee if the alerts and bid pack are not a fit for your pipeline."),
        p("Bryan Collins<br>Founder, TenderWatch.ie"),
      ].join("\n"),
    }),
    text: `You put your name down on the TenderWatch Pro waitlist earlier this year while we were finishing Northern Ireland buyer coverage and the Contract Expiry Radar.

Both are now live. Before December winds down and Q1 local-authority, HSE and ETB tenders hit in January, I have opened 10 done-for-you Q1 onboarding slots at the standard EUR 490 annual Pro rate (no monthly tier, no Black Friday price games, 2026 VAT invoice included).

Join before Friday 4 December and within 48 hours I will configure your standing sector alerts across eTenders, TED and Find a Tender (NI), add 5 rival supplier award watches, and send over a custom PDF and Excel CSV of every public contract over EUR 100k in your sector estimated to expire in the first half of 2027.

Inspect the Q1 Bid-Readiness Pass (EUR 490/yr):
https://www.tenderwatch.ie/q1-readiness?utm_source=waitlist&utm_medium=email&utm_campaign=tw-q1-readiness-cm

Every annual membership carries a straightforward 30-day full-refund guarantee if the alerts and bid pack are not a fit for your pipeline.

Bryan Collins
Founder, TenderWatch.ie

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "vendors-q1-brief-2026",
    property: "Vendors.ie (STRICTLY NON-DISCOUNT — Hold Gate Respected)",
    segmentName: "Vendors · newsletter",
    segmentId: "ed4b926c-07ef-43a8-a4af-c11b001969b3",
    audienceNote: "72 contacts (~69 real Irish & international B2B buyers/vendors; unscheduled per 100-sub gate)",
    offerType: "NON-DISCOUNT: Free 24-Month SaaS Renewal Trap Calculator + 48h Q1 Vendor Verification (EUR 99/yr)",
    sendSlot: "UNSCHEDULED DRAFT (Hold until Bryan approves or 100-real-sub gate clears) · Fri 27 Nov 2026",
    from: "Vendors.ie <hello@vendors.ie>",
    replyTo: ["hello@vendors.ie"],
    subject: "Before your Irish team signs a '50% off' annual software contract this week",
    previewText: "Run our free 24-month EUR renewal and FX check, or claim your Vendors.ie record with 48-hour Q1 verification.",
    previewPageUrl: "https://deploy-preview-1445--vendorsie.netlify.app/q1-software-audit",
    livePageUrl: "https://vendors.ie/q1-software-audit",
    html: wrapBrandCardEmail({
      title: "Cyber Week Software Contract Check & Q1 Vendor Readiness",
      previewText: "Run our free 24-month EUR renewal and FX check, or claim your Vendors.ie record with 48-hour Q1 verification.",
      brandName: "Vendors.ie",
      kicker: "Irish B2B Software Intelligence · Year-End Contract Brief",
      accentColor: "#0F172A",
      bodyHtml: [
        p("Between Black Friday and Cyber Monday, US and UK software vendors push steep introductory discounts on annual plans."),
        p("Before an Irish finance lead or founder puts a corporate card down on a '50% off first year' deal, check three numbers that rarely appear on the promo banner: the automatic Year-2 list-price jump once your data is migrated, the 2.25% non-EUR card FX spread on USD or GBP billing, and whether the discounted tier supports IE VAT reverse-charge invoicing and EU/EEA data residency."),
        p("We built a free, deterministic <strong>24-Month Software Renewal and FX Check</strong> on Vendors.ie so you can model the true euro cost in thirty seconds, alongside our daily <a href=\"https://vendors.ie/pricing-changes\" style=\"color:#0052FF;text-decoration:underline;\">Irish software price change log</a>:"),
        ctaButton({
          label: "Run the 24-Month Cyber Week Contract Check (Free)",
          href: "https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-q1-audit",
          bg: "#0F172A",
          fg: "#FFFFFF",
        }),
        calloutBox({
          title: "For Software Vendors & Irish CRO-Registered Firms (EUR 99/yr, No Discount)",
          bodyHtml:
            "January is peak software-switching season for Irish SMEs starting a new tax year. We never discount our <strong>EUR 99/year founding claim rate</strong>, and paying never affects rankings, scores or compliance verdicts. Claim your profile by Cyber Monday (30 November) and we include <strong>priority 48-hour manual verification and done-for-you profile setup</strong> (screenshots, EUR pricing and compliance links live before December budget sign-offs): <a href=\"https://vendors.ie/q1-software-audit#vendor-q1-readiness\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">claim with 48h Q1 setup</a>.",
        }),
      ].join("\n"),
    }),
    text: `Between Black Friday and Cyber Monday, US and UK software vendors push steep introductory discounts on annual plans.

Before an Irish finance lead or founder puts a corporate card down on a '50% off first year' deal, check three numbers that rarely appear on the promo banner: the automatic Year-2 list-price jump once your data is migrated, the 2.25% non-EUR card FX spread on USD or GBP billing, and whether the discounted tier supports IE VAT reverse-charge invoicing and EU/EEA data residency.

We built a free, deterministic 24-Month Software Renewal and FX Check on Vendors.ie so you can model the true euro cost in thirty seconds:

https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-q1-audit

You can also inspect confirmed published price movements on our daily watchlist at https://vendors.ie/pricing-changes.

FOR SOFTWARE VENDORS & IRISH CRO-REGISTERED FIRMS (EUR 99/YR, NO DISCOUNT)
January is peak software-switching season for Irish SMEs starting a new tax year. We never discount our EUR 99/year founding claim rate, and paying never affects rankings, scores or compliance verdicts. Claim your profile by Cyber Monday (30 November) and we include priority 48-hour manual verification and done-for-you profile setup:
https://vendors.ie/q1-software-audit#vendor-q1-readiness

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },
];
