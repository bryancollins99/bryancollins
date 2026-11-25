// scripts/bfcm-2026/campaigns-part2.mjs
//
// Campaign emails 12 to 26 (3 per site):
// 12-14. Tri-Fuel Magic (Tri-Fuel · newsletter, 85a7b202-ab77-4bec-8cfd-5925b0d3a2d3)
// 15-17. AI Flash Report (AI Flash Report · newsletter, e5f436a2-86f0-42bc-a277-5f8733bcc7eb)
// 18-20. Prompt Writing Studio (PromptWritingStudio · newsletter, 8758d410-436e-49f5-b20f-a0623a976242)
// 21-23. TenderWatch.ie NON-DISCOUNT (Tenderwatch · newsletter, 7e80858a-80e0-4eef-b6a3-780ab6541bc2 + Pro waitlist d38a0c6b)
// 24-26. Vendors.ie NON-DISCOUNT (Vendors · newsletter, ed4b926c-07ef-43a8-a4af-c11b001969b3, ven-style2 template)

import {
  p,
  h2,
  ctaButton,
  bulletList,
  calloutBox,
  wrapBrandCardEmail,
  wrapVendorsEmail,
  vendorsDataCard,
  vendorsToolBlock,
} from "./email-shell.mjs";

export const CAMPAIGNS_PART_2 = [
  {
    id: "trifuel-bf-2026",
    property: "My Triathlon Calculator (Tri-Fuel Magic)",
    segmentName: "Tri-Fuel · newsletter",
    segmentId: "85a7b202-ab77-4bec-8cfd-5925b0d3a2d3",
    audienceNote: "42 contacts (~32 active triathletes & runners)",
    offerType: "40% Off Annual Hexis (Code TRIBF40, up from 25%) + 2027 Winter Fueling Kit",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 14:00 UTC",
    from: "My Triathlon Calculator <hello@send.mytriathloncalculator.com>",
    replyTo: ["hello@send.mytriathloncalculator.com"],
    subject: "Your 2027 winter fueling kit (plus 40% off Hexis)",
    previewText: "Hexis bumped our reader code to 40% off annual plans with code TRIBF40 through 11:59am UTC on 1 December.",
    previewPageUrl: "https://deploy-preview-79--mytriathloncalculator.netlify.app/winter-fuel-pack/",
    livePageUrl: "https://mytriathloncalculator.com/winter-fuel-pack/",
    html: wrapBrandCardEmail({
      title: "40% Off Annual Hexis + 2027 Winter Base Fueling Kit",
      previewText: "Hexis bumped our reader code to 40% off annual plans with code TRIBF40 through 11:59am UTC on 1 December.",
      brandName: "My Triathlon Calculator",
      kicker: "Black Friday Partner Offer · Code TRIBF40 Ends 1 Dec 11:59am UTC",
      accentColor: "#2563EB",
      bodyHtml: [
        p("Most age-groupers spend Black Friday weekend shopping for carbon wheels and wait until two weeks before their spring 70.3 to practice race-rate carbohydrate intake."),
        p("High-carb absorption is trainable, and November indoor turbo rides are the easiest place all year to build gut tolerance. For Black Friday week, our nutrition partner <strong>Hexis bumped our reader discount from the usual 25% off to 40% off annual subscriptions</strong> with code <strong>TRIBF40</strong> (valid through 11:59am UTC on Tuesday 1 December)."),
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;margin-bottom:18px;"><tr><td align="center"><a href="https://www.gj4bt5vt.com/T58MD/3QQG7/?uid=3&sub2=email-bfcm2026&sub3=tribf40"><img src="https://mytriathloncalculator.com/images/hexis-bf-2026-tribf40.jpg" alt="Hexis Black Friday: Go annual and save 40% with code TRIBF40" width="280" style="display:block;width:280px;max-width:100%;height:auto;border-radius:10px;border:0;" /></a></td></tr></table>`,
        bulletList([
          "<strong>40% off annual Hexis (code TRIBF40, up from 25%):</strong> <a href=\"https://www.gj4bt5vt.com/T58MD/3QQG7/?uid=3&sub2=email-bfcm2026&sub3=tribf40\" style=\"color:#2563EB;font-weight:bold;text-decoration:underline;\">Hexis</a> syncs with TrainingPeaks, Garmin and Strava to adjust your daily carb targets around hard, easy and rest days.",
          "<strong>Interactive 2027 Winter Gut-Training Planner:</strong> pick Sprint, Olympic, 70.3 or Full Ironman on our kit page to see exact g/hr carb targets for Nov-Dec base versus Jan-Feb build bricks.",
          "<strong>Spec-first gear guides:</strong> comparing GPS watches, bike computers or wetsuits in weekend sales? Check battery life, multi-band GPS and sizing on our site guides before checkout.",
        ]),
        ctaButton({
          label: "Open the Winter Fueling Kit + 40% Hexis Code (TRIBF40)",
          href: "https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-1",
          bg: "#2563EB",
          fg: "#FFFFFF",
        }),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Disclosure: Hexis is a compensated partner. If you subscribe through our link using code TRIBF40, we may earn a commission at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `Most age-groupers spend Black Friday weekend shopping for carbon wheels and wait until two weeks before their spring 70.3 to practice race-rate carbohydrate intake.

For Black Friday week, our nutrition partner Hexis bumped our reader discount from the usual 25% off to 40% off annual subscriptions with code TRIBF40 (valid through 11:59am UTC on Tuesday 1 December).

- 40% off annual Hexis (code TRIBF40, up from our usual 25%): syncs with TrainingPeaks, Garmin and Strava to adjust your daily carbs around every session (https://www.gj4bt5vt.com/T58MD/3QQG7/?uid=3&sub2=email-bfcm2026&sub3=tribf40).
- Interactive 2027 Winter Gut-Training Planner: pick Sprint, Olympic, 70.3 or Full Ironman to see g/hr carbohydrate targets for Nov-Dec base versus Jan-Feb build sessions.
- Independent Watch, Bike Computer and Wetsuit spec guides on the site if you are comparing clearance deals this weekend.

Open the 2027 Winter Fueling Kit:
https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-1

Disclosure: Hexis is a compensated partner. If you sign up through our link, we may earn a commission at no extra cost to you.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "trifuel-sun-2026",
    property: "My Triathlon Calculator (Tri-Fuel Magic)",
    segmentName: "Tri-Fuel · newsletter",
    segmentId: "85a7b202-ab77-4bec-8cfd-5925b0d3a2d3",
    audienceNote: "42 contacts (~32 active triathletes & runners)",
    offerType: "Sunday Winter Base Gut-Training Guide + 40% Hexis Reminder (TRIBF40)",
    sendSlot: "Sunday · Sun 29 Nov 2026, 15:00 UTC",
    from: "My Triathlon Calculator <hello@send.mytriathloncalculator.com>",
    replyTo: ["hello@send.mytriathloncalculator.com"],
    subject: "The December turbo ride that saves your spring 70.3",
    previewText: "Why 75 to 95g/hr on a 70.3 starts on a 90-minute December trainer ride, plus code TRIBF40 for 40% off annual Hexis.",
    previewPageUrl: "https://deploy-preview-79--mytriathloncalculator.netlify.app/winter-fuel-pack/",
    livePageUrl: "https://mytriathloncalculator.com/winter-fuel-pack/",
    html: wrapBrandCardEmail({
      title: "Winter Base Gut-Training Targets",
      previewText: "Why 75 to 95g/hr on a 70.3 starts on a 90-minute December trainer ride, plus code TRIBF40 for 40% off annual Hexis.",
      brandName: "My Triathlon Calculator",
      kicker: "2027 Base Fueling · Hexis 40% Offer Live",
      accentColor: "#2563EB",
      bodyHtml: [
        p("If you are racing a 70.3 or Full Ironman in 2027, trying to jump straight to 80 to 100g of carbs per hour in May is a fast way to end up walking the run with GI distress."),
        p("Two sessions a fortnight on the indoor trainer over December and January are enough to keep your gut transporters adapted without adding extra junk miles. Our interactive <strong>Winter Gut-Training Progression</strong> gives you exact Nov-Dec and Jan-Feb targets for Sprint, Olympic, 70.3 and Ironman."),
        p("If you want daily meal-by-meal carb periodisation between those sessions, Hexis's Black Friday offer (<strong>40% off annual plans with code TRIBF40</strong>, up from our usual 25%) is still open through Tuesday 1 December at 11:59am UTC."),
        ctaButton({
          label: "Check Your 2027 Targets + Claim 40% Off Hexis",
          href: "https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-2",
          bg: "#2563EB",
          fg: "#FFFFFF",
        }),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Disclosure: Hexis is a compensated partner. Using code TRIBF40 through our link supports My Triathlon Calculator at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `If you are racing a 70.3 or Full Ironman in 2027, trying to jump straight to 80 to 100g of carbs per hour in May is a fast way to end up walking the run with GI distress.

Two sessions a fortnight on the indoor trainer over December and January are enough to keep your gut transporters adapted. Pick your 2027 distance on our Winter Fueling Kit page to see your exact Nov-Dec and Jan-Feb g/hr targets.

Hexis's Black Friday offer (40% off annual plans with code TRIBF40, up from our usual 25% off) stays open through Tuesday 1 December at 11:59am UTC.

Check your 2027 targets + claim 40% off Hexis:
https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-2

Disclosure: Hexis is a compensated partner.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "trifuel-cm-2026",
    property: "My Triathlon Calculator (Tri-Fuel Magic)",
    segmentName: "Tri-Fuel · newsletter",
    segmentId: "85a7b202-ab77-4bec-8cfd-5925b0d3a2d3",
    audienceNote: "42 contacts (~32 active triathletes & runners)",
    offerType: "Cyber Monday Final Call: 40% Off Annual Hexis (Code TRIBF40 Ends 1 Dec 11:59am UTC)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 17:00 UTC",
    from: "My Triathlon Calculator <hello@send.mytriathloncalculator.com>",
    replyTo: ["hello@send.mytriathloncalculator.com"],
    subject: "Code TRIBF40 expires tomorrow morning",
    previewText: "Last chance to lock in 40% off annual Hexis (up from our usual 25%) before code TRIBF40 expires at 11:59am UTC on 1 Dec.",
    previewPageUrl: "https://deploy-preview-79--mytriathloncalculator.netlify.app/winter-fuel-pack/",
    livePageUrl: "https://mytriathloncalculator.com/winter-fuel-pack/",
    html: wrapBrandCardEmail({
      title: "Final Call: 40% Off Annual Hexis",
      previewText: "Last chance to lock in 40% off annual Hexis (up from our usual 25%) before code TRIBF40 expires at 11:59am UTC on 1 Dec.",
      brandName: "My Triathlon Calculator",
      kicker: "Cyber Monday Final Reminder · Ends 1 Dec 11:59am UTC",
      accentColor: "#2563EB",
      bodyHtml: [
        p("Quick Cyber Monday reminder before the window closes tomorrow morning."),
        p("Our Black Friday Hexis code <strong>TRIBF40</strong> (<strong>40% off annual subscriptions</strong>, up from our year-round 25% reader discount) expires at <strong>11:59am UTC tomorrow, Tuesday 1 December</strong>."),
        p("If you want personalised daily carb-coding synced to your Garmin, Strava or TrainingPeaks calendar for your 2027 build, lock in the annual rate before tomorrow morning:"),
        ctaButton({
          label: "Claim 40% Off Annual Hexis (Code TRIBF40)",
          href: "https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-cm",
          bg: "#2563EB",
          fg: "#FFFFFF",
        }),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Disclosure: Hexis is a compensated partner. If you subscribe through our link using code TRIBF40, we may earn a commission at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `Quick Cyber Monday reminder before the window closes tomorrow morning.

Our Black Friday Hexis code TRIBF40 (40% off annual subscriptions, up from our year-round 25% reader discount) expires at 11:59am UTC tomorrow, Tuesday 1 December.

Lock in 40% off annual Hexis (code TRIBF40):
https://mytriathloncalculator.com/winter-fuel-pack/?utm_source=resend&utm_medium=email&utm_campaign=tf-bfcm-2026-cm

Disclosure: Hexis is a compensated partner.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "aifr-bf-2026",
    property: "AI Flash Report",
    segmentName: "AI Flash Report · newsletter",
    segmentId: "e5f436a2-86f0-42bc-a277-5f8733bcc7eb",
    audienceNote: "35 contacts (active weekly frontier model tracker readers)",
    offerType: "Black Friday Launch: The Solo Operator Repo ($79 Private GitHub Access, normally $149) + Lovable",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 14:30 UTC",
    from: "AI Flash Report <alerts@send.aiflashreport.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "We replaced half our AI SaaS bill with one private repo",
    previewText: "Private GitHub access to the sanitised .claude/ skills, pipeline scripts, Zettelkasten vault and Astro blueprint behind 9 sites ($79).",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "One Private GitHub Repo Instead of Monthly AI Wrappers",
      previewText: "Private GitHub access to the sanitised .claude/ skills, pipeline scripts, Zettelkasten vault and Astro blueprint behind 9 sites ($79).",
      brandName: "AI Flash Report",
      kicker: "Black Friday to Cyber Monday · The Solo Operator Repo",
      accentColor: "#0052FF",
      bodyHtml: [
        p("Every week on <a href=\"https://aiflashreport.com/changes/\" style=\"color:#0052FF;text-decoration:underline;\">AI Flash Report</a> we track frontier model releases and pricing cuts. One pattern stood out all year: raw API costs fell fast, while monthly AI wrapper subscriptions kept piling up."),
        p("Inside our Dublin publishing group, we run nine sites from git using Claude Code skills, local Markdown files and small Python scripts instead of paying $29 to $99 a month per wrapper app."),
        p("For Black Friday through Cyber Monday, our founder Bryan Collins opened private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) for <strong>$79 one-time</strong> (normally $149):"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>).",
          "<strong>The Builder's Pipeline:</strong> daily <code>Coding-Log.md</code> to Friday LinkedIn, newsletter and YouTube scripts.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown vault with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
          "<strong>Lifetime <code>git pull</code> updates through 2027:</strong> zero subscription, 14-day refund.",
        ]),
        ctaButton({
          label: "Get The Solo Operator Repo ($79 one-time)",
          href: "https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026-bf",
          bg: "#0052FF",
          fg: "#FFFFFF",
        }),
        p("If you also want a fast visual prototype builder for weekend experiments, <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">Lovable</a> is running a Cyber Week offer (affiliate link)."),
      ].join("\n"),
    }),
    text: `Every week on AI Flash Report (https://aiflashreport.com/changes/) we track frontier model releases and pricing cuts. One pattern stood out all year: raw API costs fell fast, while monthly AI wrapper subscriptions kept piling up.

Inside our Dublin publishing group, we run nine sites from git using Claude Code skills, local Markdown files and small Python scripts instead of paying $29 to $99 a month per wrapper app.

For Black Friday through Cyber Monday, our founder Bryan Collins opened private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) for $79 one-time (normally $149):

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: daily Coding-Log.md to Friday LinkedIn, newsletter and YouTube scripts.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown vault with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.
- Lifetime git pull updates through 2027: zero subscription, 14-day refund.

Get The Solo Operator Repo ($79 one-time):
https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026-bf

For rapid visual prototyping, check Lovable's Cyber Week offer (affiliate link):
https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "aifr-sun-2026",
    property: "AI Flash Report",
    segmentName: "AI Flash Report · newsletter",
    segmentId: "e5f436a2-86f0-42bc-a277-5f8733bcc7eb",
    audienceNote: "35 contacts (active weekly frontier model tracker readers)",
    offerType: "Sunday Deep Dive: How 9 Sites Run From One Private Claude Code Repo ($79)",
    sendSlot: "Sunday · Sun 29 Nov 2026, 14:30 UTC",
    from: "AI Flash Report <alerts@send.aiflashreport.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "How 9 sites run from one private Claude Code repo",
    previewText: "Plain files in git survive every model release. Inspect bryancollins99/solo-operator-stack before Monday midnight UTC ($79 vs $149).",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "Plain Files in Git Survive Every Model Release",
      previewText: "Plain files in git survive every model release. Inspect bryancollins99/solo-operator-stack before Monday midnight UTC ($79 vs $149).",
      brandName: "AI Flash Report",
      kicker: "Cyber Weekend Architecture Note · Closes Monday Midnight UTC",
      accentColor: "#0052FF",
      bodyHtml: [
        p("Every time a frontier model drops a new version, half the SaaS wrappers built on top of last quarter's API break or hike their renewal tier."),
        p("When your Claude Code skills, publishing scripts, note vault and site starter live in a private git repository, switching models takes one line and you never lose your stack to a closed dashboard."),
        p("Through midnight UTC tomorrow (Cyber Monday), you can get private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) for <strong>$79 one-time</strong> (normally $149):"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>).",
          "<strong>The Builder's Pipeline:</strong> daily <code>Coding-Log.md</code> to Friday LinkedIn, newsletter and YouTube scripts.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown vault with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
          "<strong>Lifetime <code>git pull</code> updates through 2027:</strong> GitHub collaborator invite after Stripe checkout.",
        ]),
        ctaButton({
          label: "Inspect The Solo Operator Repo ($79)",
          href: "https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026-sun",
          bg: "#0052FF",
          fg: "#FFFFFF",
        }),
        p("14-day refund on request if the repo does not fit your setup. You can also check our weekly model ledger any time at <a href=\"https://aiflashreport.com/changes/\" style=\"color:#0052FF;text-decoration:underline;\">aiflashreport.com/changes</a>."),
      ].join("\n"),
    }),
    text: `Every time a frontier model drops a new version, half the SaaS wrappers built on top of last quarter's API break or hike their renewal tier.

When your Claude Code skills, publishing scripts, note vault and site starter live in a private git repository, switching models takes one line and you never lose your stack to a closed dashboard.

Through midnight UTC tomorrow (Cyber Monday), you can get private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) for $79 one-time (normally $149):

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: daily Coding-Log.md to Friday LinkedIn, newsletter and YouTube scripts.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown vault with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.
- Lifetime git pull updates through 2027: GitHub collaborator invite after Stripe checkout.

Inspect The Solo Operator Repo ($79):
https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026-sun

14-day refund on request. Weekly model ledger: https://aiflashreport.com/changes/

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "aifr-cm-2026",
    property: "AI Flash Report",
    segmentName: "AI Flash Report · newsletter",
    segmentId: "e5f436a2-86f0-42bc-a277-5f8733bcc7eb",
    audienceNote: "35 contacts (active weekly frontier model tracker readers)",
    offerType: "Cyber Monday Final Call: The Solo Operator Repo ($79 Private GitHub Access, normally $149) + Lovable",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 14:30 UTC",
    from: "AI Flash Report <alerts@send.aiflashreport.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "API prices crashed. Why are wrapper bills still rising?",
    previewText: "Final hours for $79 private GitHub access to The Solo Operator Repo (normally $149), plus Lovable and Vendors.ie benchmarks.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "Cyber Monday Builder Note",
      previewText: "Final hours for $79 private GitHub access to The Solo Operator Repo (normally $149), plus Lovable and Vendors.ie benchmarks.",
      brandName: "AI Flash Report",
      kicker: "Cyber Monday Final Call · Frontier Models & Builder Tooling",
      accentColor: "#0052FF",
      bodyHtml: [
        p("If you follow our weekly model tracker on <a href=\"https://aiflashreport.com/changes/\" style=\"color:#0052FF;text-decoration:underline;\">AI Flash Report</a>, you have watched per-token inference prices drop steadily across 2026 while wrapper SaaS apps keep charging $29 to $99 a month per seat."),
        p("Behind AI Flash Report, our small Dublin publishing group runs nine sites from git using Claude Code skills, plain-text Markdown files and small Python scripts instead of recurring SaaS wrappers."),
        p("Until midnight UTC tonight (Cyber Monday), our founder Bryan Collins has opened private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) for <strong>$79 one-time</strong> (normally $149):"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>).",
          "<strong>The Builder's Pipeline:</strong> daily <code>Coding-Log.md</code> to Friday LinkedIn, newsletter and YouTube scripts.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown note vault with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
          "<strong>Lifetime <code>git pull</code> updates through 2027:</strong> zero subscription, 14-day refund.",
        ]),
        ctaButton({
          label: "Get The Solo Operator Repo ($79 before midnight)",
          href: "https://bryancollins.com/black-friday.html?utm_source=aiflashreport&utm_medium=email&utm_campaign=aifr-bfcm-2026",
          bg: "#0052FF",
          fg: "#FFFFFF",
        }),
        p("Also worth checking today: <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">Lovable</a> for rapid full-stack UI prototyping from a prompt (affiliate link), or our independent Irish B2B software benchmarks at <a href=\"https://vendors.ie/ai-tools-ireland\" style=\"color:#0052FF;text-decoration:underline;\">Vendors.ie</a>."),
      ].join("\n"),
    }),
    text: `If you follow our weekly model tracker on AI Flash Report (https://aiflashreport.com/changes/), you have watched per-token inference prices drop steadily across 2026 while wrapper SaaS apps keep charging $29 to $99 a month per seat.

Behind AI Flash Report, our Dublin publishing group runs nine sites from git using Claude Code skills, plain-text Markdown files and small Python scripts instead of recurring SaaS wrappers.

Until midnight UTC tonight (Cyber Monday), our founder Bryan Collins has opened private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) for $79 one-time (normally $149):

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: daily Coding-Log.md to Friday LinkedIn, newsletter and YouTube scripts.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown note vault with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.
- Lifetime git pull updates through 2027: zero subscription, 14-day refund.

Get The Solo Operator Repo ($79 before midnight):
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
    offerType: "The Solo Operator Repo ($79 Private GitHub Access, normally $149, Zero Retired Course CTAs)",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 15:00 UTC",
    from: "Prompt Writing Studio <hello@send.promptwritingstudio.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Stop buying 500-prompt PDFs. Clone my .claude/ repo.",
    previewText: "Private GitHub access to sanitised production Claude Code skills, hooks, pipeline scripts and Astro blueprint ($79 through Monday).",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "From Prompt PDFs to a Production .claude/ Repo",
      previewText: "Private GitHub access to sanitised production Claude Code skills, hooks, pipeline scripts and Astro blueprint ($79 through Monday).",
      brandName: "Prompt Writing Studio",
      kicker: "Black Friday to Cyber Monday · The Solo Operator Repo",
      accentColor: "#111827",
      bodyHtml: [
        p("Copy-paste prompt libraries aged badly over the last twelve months. Pasting a 400-word mega-prompt into a fresh chat window every morning loses to a clean git repository with reusable Claude Code skills, hooks and project briefs."),
        p("We retired our old video courses this year. For Black Friday through Cyber Monday, Bryan Collins opened private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) for <strong>$79 one-time</strong> (normally $149):"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>).",
          "<strong>The Builder's Pipeline:</strong> daily <code>Coding-Log.md</code> to Friday LinkedIn, newsletter and YouTube scripts.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown vault with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
          "<strong>Lifetime <code>git pull</code> updates through 2027:</strong> GitHub collaborator invite after Stripe checkout, 14-day refund.",
        ]),
        ctaButton({
          label: "Get The Solo Operator Repo ($79 one-time)",
          href: "https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Prefer free guides? Our Claude Code, MCP and sub-agent reference guides on <a href=\"https://promptwritingstudio.com/\" style=\"color:#0052FF;text-decoration:underline;\">PromptWritingStudio.com</a> remain free, and if you want a visual app builder to pair with them, check <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;text-decoration:underline;\">Lovable's Cyber Week offer</a> (affiliate link)."),
      ].join("\n"),
    }),
    text: `Copy-paste prompt libraries aged badly over the last twelve months. Pasting a 400-word mega-prompt into a fresh chat window every morning loses to a clean git repository with reusable Claude Code skills, hooks and project briefs.

We retired our old video courses this year. For Black Friday through Cyber Monday, Bryan Collins opened private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) for $79 one-time (normally $149):

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: daily Coding-Log.md to Friday LinkedIn, newsletter and YouTube scripts.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown vault with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.
- Lifetime git pull updates through 2027: GitHub collaborator invite after Stripe checkout, 14-day refund.

Get The Solo Operator Repo ($79 through Cyber Monday):
https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026

Our Claude Code, MCP and sub-agent guides at https://promptwritingstudio.com/ remain free. For rapid visual app prototyping, see Lovable (affiliate link: https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated).

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "pws-sat-2026",
    property: "Prompt Writing Studio",
    segmentName: "PromptWritingStudio · newsletter",
    segmentId: "8758d410-436e-49f5-b20f-a0623a976242",
    audienceNote: "21 contacts (Claude Code / MCP / prompt practitioners)",
    offerType: "Saturday Walkthrough: The 7 Production Claude Code Skills Inside The Solo Operator Repo ($79)",
    sendSlot: "Saturday · Sat 28 Nov 2026, 15:00 UTC",
    from: "Prompt Writing Studio <hello@send.promptwritingstudio.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "The 7 Claude Code skills inside my private repo",
    previewText: "Walkthrough of /prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit and /log inside bryancollins99/solo-operator-stack.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "The 7 Production Skills Inside The Solo Operator Repo",
      previewText: "Walkthrough of /prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit and /log inside bryancollins99/solo-operator-stack.",
      brandName: "Prompt Writing Studio",
      kicker: "Cyber Weekend Walkthrough · Private GitHub Repo",
      accentColor: "#111827",
      bodyHtml: [
        p("Most AI coding setups break down the moment you move past one-off chat prompts: agents skip verification, drift off spec, or push broken changes to main."),
        p("Inside <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>), you get the exact gitleaks-clean <code>.claude/</code> skills and hooks we use every day to spec, critique, review and ship across nine sites:"),
        bulletList([
          "<strong><code>/prd</code> + <code>/prd-critic</code>:</strong> draft tight specifications and run an automated critic gate before writing code.",
          "<strong><code>/qa-loop</code> + <code>/pre-commit-review</code>:</strong> independent diff reviews and closed-loop verification before anything merges.",
          "<strong><code>/swarm-check</code>, <code>/commit</code> &amp; <code>/log</code>:</strong> pre-flight checks for parallel agents, clean commits and daily worklog capture.",
          "<strong>Plus 3 complete companion modules:</strong> The Builder's Pipeline, the Zettelkasten Starter Vault + hygiene scripts, and the Astro + Netlify + Resend + Stripe Portfolio Site Blueprint.",
        ]),
        ctaButton({
          label: "Inspect The Solo Operator Repo ($79)",
          href: "https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026-sat",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Cyber Week price is $79 one-time (normally $149) with lifetime <code>git pull</code> updates through 2027, zero subscription, and a 14-day refund on request."),
      ].join("\n"),
    }),
    text: `Most AI coding setups break down the moment you move past one-off chat prompts: agents skip verification, drift off spec, or push broken changes to main.

Inside The Solo Operator Repo (bryancollins99/solo-operator-stack), you get the exact gitleaks-clean .claude/ skills and hooks we use every day to spec, critique, review and ship across nine sites:

- /prd + /prd-critic: draft tight specifications and run an automated critic gate before writing code.
- /qa-loop + /pre-commit-review: independent diff reviews and closed-loop verification before anything merges.
- /swarm-check, /commit & /log: pre-flight checks for parallel agents, clean commits and daily worklog capture.
- Plus 3 complete companion modules: The Builder's Pipeline, the Zettelkasten Starter Vault + hygiene scripts, and the Astro + Netlify + Resend + Stripe Portfolio Site Blueprint.

Inspect The Solo Operator Repo ($79):
https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026-sat

Cyber Week price is $79 one-time (normally $149) with lifetime git pull updates through 2027, zero subscription, and a 14-day refund on request.

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "pws-cm-2026",
    property: "Prompt Writing Studio",
    segmentName: "PromptWritingStudio · newsletter",
    segmentId: "8758d410-436e-49f5-b20f-a0623a976242",
    audienceNote: "21 contacts (Claude Code / MCP / prompt practitioners)",
    offerType: "Cyber Monday Final Call: The Solo Operator Repo ($79 Private GitHub Access, normally $149)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 16:30 UTC",
    from: "Prompt Writing Studio <hello@send.promptwritingstudio.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Closing Cyber Week access to The Solo Operator Repo tonight",
    previewText: "Cyber Week $79 private GitHub access to bryancollins99/solo-operator-stack closes at midnight UTC tonight (normally $149).",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapBrandCardEmail({
      title: "Midnight Cutoff: The Solo Operator Repo ($79)",
      previewText: "Cyber Week $79 private GitHub access to bryancollins99/solo-operator-stack closes at midnight UTC tonight (normally $149).",
      brandName: "Prompt Writing Studio",
      kicker: "Cyber Monday Final Reminder · Closes Midnight UTC",
      accentColor: "#111827",
      bodyHtml: [
        p("Quick final reminder before the Cyber Week price closes at midnight UTC tonight."),
        p("Until midnight, private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) is <strong>$79 one-time</strong> instead of $149."),
        p("Clone it once for the sanitised <code>.claude/</code> skills and hooks pack (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>), The Builder's Pipeline, the Zettelkasten Starter Vault, the Astro + Netlify + Resend + Stripe site blueprint, and lifetime <code>git pull</code> updates through 2027."),
        ctaButton({
          label: "Get Private Repo Access ($79 Before Midnight)",
          href: "https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026-cm",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Zero monthly subscription and a 14-day no-questions refund if you clone the repo and decide it is not for you. Our free Claude Code and MCP reference guides stay free on <a href=\"https://promptwritingstudio.com/\" style=\"color:#0052FF;text-decoration:underline;\">PromptWritingStudio.com</a>."),
      ].join("\n"),
    }),
    text: `Quick final reminder before the Cyber Week price closes at midnight UTC tonight.

Until midnight, private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) is $79 one-time instead of $149.

Clone it once for the sanitised .claude/ skills and hooks pack (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log), The Builder's Pipeline, the Zettelkasten Starter Vault, the Astro + Netlify + Resend + Stripe site blueprint, and lifetime git pull updates through 2027.

Get Private Repo Access ($79 Before Midnight):
https://bryancollins.com/black-friday.html?utm_source=promptwritingstudio&utm_medium=email&utm_campaign=pws-bfcm-2026-cm

Zero monthly subscription and a 14-day no-questions refund. Free guides remain at https://promptwritingstudio.com/.

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
    subject: "Why we do not run Black Friday discounts",
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
    property: "TenderWatch.ie (STRICTLY NON-DISCOUNT · Waitlist & High-Intent)",
    segmentName: "Tenderwatch · Pro waitlist",
    segmentId: "d38a0c6b-77be-4dfb-b57d-cb7567cbe70d",
    audienceNote: "8 commercial waitlist firms (Deloitte, EMM Security, Southern Scientific, etc.)",
    offerType: "NON-DISCOUNT: Direct Waitlist Note for Q1 Concierge Setup (EUR 490/yr)",
    sendSlot: "Sunday · Sun 29 Nov 2026, 09:30 UTC",
    from: "Bryan Collins <bryan@tenderwatch.ie>",
    replyTo: ["bryan@tenderwatch.ie"],
    subject: "Opening 10 done-for-you Q1 tender setups (waitlist first)",
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
    id: "tenderwatch-q1-final-2026",
    property: "TenderWatch.ie (STRICTLY NON-DISCOUNT · Final Q1 Reminder)",
    segmentName: "Tenderwatch · newsletter",
    segmentId: "7e80858a-80e0-4eef-b6a3-780ab6541bc2",
    audienceNote: "~550+ Irish B2B suppliers (64% open, 36% click)",
    offerType: "NON-DISCOUNT: Final Reminder for 10 Q1 Bid-Readiness Setup Slots (EUR 490/yr)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 16:30 UTC",
    from: "Tenderwatch <alerts@tenderwatch.ie>",
    replyTo: ["bryan@tenderwatch.ie"],
    subject: "We will build your Q1 tender alerts by hand before Christmas",
    previewText: "Same EUR 490/yr Pro rate, no discounts. Join by Friday 4 December for 48-hour setup and your H1 2027 Expiring-Contracts Dossier.",
    previewPageUrl: "https://deploy-preview-602--tenderwatchirl.netlify.app/q1-readiness",
    livePageUrl: "https://www.tenderwatch.ie/q1-readiness",
    html: wrapBrandCardEmail({
      title: "Final Reminder: 10 Q1 Bid-Readiness Setup Slots",
      previewText: "Same EUR 490/yr Pro rate, no discounts. Join by Friday 4 December for 48-hour setup and your H1 2027 Expiring-Contracts Dossier.",
      brandName: "TenderWatch.ie",
      kicker: "Cyber Monday Reminder · Closes Friday 4 December",
      accentColor: "#174A2C",
      bodyHtml: [
        p("Quick Cyber Monday note as we head into December."),
        p("We never discount TenderWatch Pro. Every annual member pays the same <strong>EUR 490/year</strong> rate (one annual plan, no monthly tier). What closes this Friday, 4 December, is our cap of <strong>10 done-for-you Q1 2027 Bid-Readiness setups</strong> so we can deliver every custom pack before Christmas:"),
        bulletList([
          "<strong>48-hour manual alert configuration:</strong> up to 10 semantic sector alerts across eTenders, TED and Find a Tender (NI) plus 5 named competitor award watches.",
          "<strong>H1 2027 Expiring-Contracts Dossier (PDF + Excel CSV):</strong> recorded public contracts over EUR 100k in your sector estimated to expire between January and June 2027, with buyer spend and incumbent winners.",
          "<strong>2026 VAT invoice + 30-day refund guarantee:</strong> allocate remaining 2026 budget cleanly and test the alerts risk-free for 30 days.",
        ]),
        ctaButton({
          label: "Claim a Q1 Setup Slot (EUR 490/yr)",
          href: "https://www.tenderwatch.ie/q1-readiness?utm_source=digest&utm_medium=email&utm_campaign=tw-q1-readiness-final",
          bg: "#174A2C",
          fg: "#FFFFFF",
        }),
        p("Public body, charity or CLG publishing a tender in December? Book a standard <strong>EUR 149 + VAT Featured Tender</strong> by 4 December and we include a bonus Closing-Week Reminder in the Monday digest at no extra charge: <a href=\"https://www.tenderwatch.ie/advertise?utm_source=digest&utm_medium=email&utm_campaign=q1-closing-reminder-final#book\" style=\"color:#174A2C;font-weight:bold;text-decoration:underline;\">book a Featured Tender</a>."),
        p("Bryan Collins<br>Founder, TenderWatch.ie"),
      ].join("\n"),
    }),
    text: `Quick Cyber Monday note as we head into December.

We never discount TenderWatch Pro. Every annual member pays the same EUR 490/year rate (one annual plan, no monthly tier). What closes this Friday, 4 December, is our cap of 10 done-for-you Q1 2027 Bid-Readiness setups so we can deliver every custom pack before Christmas:

1. 48-hour manual alert configuration: up to 10 semantic sector alerts across eTenders, TED and Find a Tender (NI) plus 5 named competitor award watches.
2. H1 2027 Expiring-Contracts Dossier (PDF + Excel CSV): recorded public contracts over EUR 100k in your sector estimated to expire between January and June 2027, with buyer spend and incumbent winners.
3. 2026 VAT invoice + 30-day refund guarantee: allocate remaining 2026 budget cleanly and test the alerts risk-free for 30 days.

Claim a Q1 Setup Slot (EUR 490/yr):
https://www.tenderwatch.ie/q1-readiness?utm_source=digest&utm_medium=email&utm_campaign=tw-q1-readiness-final

Public body, charity or CLG publishing a tender in December? Book a standard EUR 149 + VAT Featured Tender by 4 December for a bonus Closing-Week Reminder mention:
https://www.tenderwatch.ie/advertise?utm_source=digest&utm_medium=email&utm_campaign=q1-closing-reminder-final#book

Bryan Collins
Founder, TenderWatch.ie

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "vendors-bf-2026",
    property: "Vendors.ie (Email 1 of 3 · Non-Discount · ven-style2)",
    segmentName: "Vendors · newsletter",
    segmentId: "ed4b926c-07ef-43a8-a4af-c11b001969b3",
    audienceNote: "Vendors · newsletter (Bryan approved 3-email BFCM/Q1 sequence)",
    offerType: "NON-DISCOUNT: Free 24-Month Software Renewal & FX Check + Price Change Log",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 09:00 UTC",
    from: "Vendors.ie <hello@vendors.ie>",
    replyTo: ["hello@vendors.ie"],
    subject: "Three numbers missing from '50% off' annual SaaS deals",
    previewText: "Three numbers missing from Cyber Week SaaS banners: Year-2 list price, 2.25% FX card drag and IE VAT reverse-charge.",
    previewPageUrl: "https://deploy-preview-1445--vendorsie.netlify.app/q1-software-audit",
    livePageUrl: "https://vendors.ie/q1-software-audit",
    html: wrapVendorsEmail({
      title: "Cyber Week Software Contract Check",
      previewText: "Three numbers missing from Cyber Week SaaS banners: Year-2 list price, 2.25% FX card drag and IE VAT reverse-charge.",
      kicker: "Year-end contract check · 27 Nov 2026",
      bodyHtml: [
        p("Between Black Friday and Cyber Monday, US and UK software vendors push steep introductory discounts on annual plans.", "Arial,Helvetica,sans-serif", "#1E293B"),
        p("Before an Irish finance lead or founder puts a corporate card down on a '50% off first year' offer, check the three numbers that rarely appear on the promo banner:", "Arial,Helvetica,sans-serif", "#1E293B"),
        vendorsDataCard({
          heading: "What to check before signing",
          subheading: "24-month euro cost, not Year-1 headline discount",
          subColor: "#0B5FFF",
          rows: [
            ["Year-2 renewal jump", "Full list price"],
            ["USD / GBP card FX spread", "2.25% typical"],
            ["Irish VAT & compliance", "IE VAT / EU EEA"],
          ],
        }),
        vendorsToolBlock({
          kicker: "Free Contract Check",
          title: "Model the true 24-month euro cost in 30 seconds",
          body: "Enter the Cyber Week discount, normal renewal price and billing currency. The calculator shows the two-year euro total, card FX drag and a 4-point Irish VAT, SEPA and GDPR checklist.",
          href: "https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-1",
          cta: "Run the 24-Month Contract Check",
          note: "You can also inspect confirmed published price movements on our daily log at vendors.ie/pricing-changes.",
        }),
      ].join("\n"),
    }),
    text: `Between Black Friday and Cyber Monday, US and UK software vendors push steep introductory discounts on annual plans.

Before an Irish finance lead or founder puts a corporate card down on a '50% off first year' offer, check the three numbers that rarely appear on the promo banner:
- Year-2 renewal jump: automatic step-up to full list price once your data is migrated
- USD / GBP card FX spread: 2.25% typical non-EUR corporate card drag
- Irish VAT & compliance: IE VAT reverse-charge invoicing, SEPA and EU/EEA data residency

FREE CONTRACT CHECK: Model the true 24-month euro cost in 30 seconds
Run the 24-Month Contract Check: https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-1

You can also inspect confirmed published price movements on our daily log at https://vendors.ie/pricing-changes.

Vendors.ie Data Desk
Consistent Publishing Ltd, Dublin · CRO 742884 · vendors.ie
Unsubscribe from all Vendors.ie email: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "vendors-sat-2026",
    property: "Vendors.ie (Email 2 of 3 · Non-Discount · ven-style2)",
    segmentName: "Vendors · newsletter",
    segmentId: "ed4b926c-07ef-43a8-a4af-c11b001969b3",
    audienceNote: "Vendors · newsletter (Year-end supplier compliance & Company Watch)",
    offerType: "NON-DISCOUNT: EUR 19 Bulk VAT & CRO Audit + Free Company Watch / EUR 149/yr Pro",
    sendSlot: "Saturday · Sat 28 Nov 2026, 10:00 UTC",
    from: "Vendors.ie <hello@vendors.ie>",
    replyTo: ["hello@vendors.ie"],
    subject: "Before you close your 2026 supplier books",
    previewText: "Verify up to 100 Irish CRO companies or EU VAT numbers in one CSV pass, or watch key suppliers weekly.",
    previewPageUrl: "https://deploy-preview-1445--vendorsie.netlify.app/q1-software-audit",
    livePageUrl: "https://vendors.ie/tools/bulk-vat-checker",
    html: wrapVendorsEmail({
      title: "Year-End Supplier Compliance Check",
      previewText: "Verify up to 100 Irish CRO companies or EU VAT numbers in one CSV pass, or watch key suppliers weekly.",
      kicker: "Year-end supplier check · 28 Nov 2026",
      bodyHtml: [
        p("Year-end close is when finance teams and practices discover a supplier's VAT number lapsed, a Form B1 went overdue, or a contractor landed on the CRO strike-off list.", "Arial,Helvetica,sans-serif", "#1E293B"),
        p("Ahead of the 1 January 2027 Revenue Peppol Authority handover, you can screen your entire supplier or client book in one pass instead of checking numbers one by one:", "Arial,Helvetica,sans-serif", "#1E293B"),
        vendorsDataCard({
          heading: "Bulk VAT & CRO Compliance Audit",
          subheading: "One CSV upload, dated audit certificate",
          subColor: "#15803D",
          rows: [
            ["Rows per upload", "Up to 100"],
            ["Live checks", "EU VIES + CRO + Peppol"],
            ["VIES outage retries", "24h automatic"],
            ["Price (one-time)", "EUR 19"],
          ],
        }),
        vendorsToolBlock({
          kicker: "Bulk VAT & CRO Checker",
          title: "Verify up to 100 suppliers or clients at once",
          body: "Upload a CSV of Irish CRO numbers or EU VAT numbers and get a dated compliance report you can drop straight into your year-end file.",
          href: "https://vendors.ie/tools/bulk-vat-checker?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-2",
          cta: "Run a Bulk Audit (EUR 19)",
          note: "Want Friday alerts when a key supplier or customer changes status on the CRO register? Watch up to 3 companies free, or cover 25 companies with Company Watch Pro (EUR 149/year) at vendors.ie/company-watch-pro.",
        }),
      ].join("\n"),
    }),
    text: `Year-end close is when finance teams and practices discover a supplier's VAT number lapsed, a Form B1 went overdue, or a contractor landed on the CRO strike-off list.

Ahead of the 1 January 2027 Revenue Peppol Authority handover, you can screen your entire supplier or client book in one pass instead of checking numbers one by one:
- Rows per upload: Up to 100
- Live checks: EU VIES + CRO status + Peppol EN 16931
- VIES outage retries: 24h automatic
- Price: EUR 19 one-time

BULK VAT & CRO CHECKER: Verify up to 100 suppliers or clients at once
Run a Bulk Audit (EUR 19): https://vendors.ie/tools/bulk-vat-checker?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-2

Want Friday alerts when a key supplier or customer changes status on the CRO register? Watch up to 3 companies free, or cover 25 companies with Company Watch Pro (EUR 149/year):
https://vendors.ie/company-watch-pro?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-2

Vendors.ie Data Desk
Consistent Publishing Ltd, Dublin · CRO 742884 · vendors.ie
Unsubscribe from all Vendors.ie email: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "vendors-cm-2026",
    property: "Vendors.ie (Email 3 of 3 · Non-Discount · ven-style2)",
    segmentName: "Vendors · newsletter",
    segmentId: "ed4b926c-07ef-43a8-a4af-c11b001969b3",
    audienceNote: "Vendors · newsletter (Cyber Monday Q1 Vendor Readiness, EUR 99/yr non-discount)",
    offerType: "NON-DISCOUNT: EUR 99/yr Founding Vendor Claim + Priority 48h Q1 Setup",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 10:00 UTC",
    from: "Bryan Collins <hello@vendors.ie>",
    replyTo: ["hello@vendors.ie"],
    subject: "Getting your Vendors.ie profile ready for January shortlists",
    previewText: "We never discount our EUR 99/yr founding claim rate. Claim by midnight tonight for priority 48-hour setup before December sign-offs.",
    previewPageUrl: "https://deploy-preview-1445--vendorsie.netlify.app/q1-software-audit",
    livePageUrl: "https://vendors.ie/q1-software-audit#vendor-q1-readiness",
    html: wrapVendorsEmail({
      title: "Q1 Vendor Profile Readiness",
      previewText: "We never discount our EUR 99/yr founding claim rate. Claim by midnight tonight for priority 48-hour setup before December sign-offs.",
      kicker: "Q1 vendor readiness · 30 Nov 2026",
      bodyHtml: [
        p("January is peak software-switching season for Irish SMEs starting a new tax year. Buyers comparing payroll, accounting, banking and compliance tools on Vendors.ie are already shortlisting for Q1.", "Arial,Helvetica,sans-serif", "#1E293B"),
        p("We do not run Black Friday discounts on Vendors.ie listings, and paying never affects rankings, scores or compliance verdicts. The founding claim rate stays locked at <strong>EUR 99/year</strong> (standard rate EUR 49/month).", "Arial,Helvetica,sans-serif", "#1E293B"),
        p("If you claim your software profile or Irish CRO company record by midnight tonight (30 November), we include <strong>priority 48-hour manual verification and done-for-you profile setup</strong> so your logo, screenshots, EUR pricing and direct enquiry button are live before December budget sign-offs.", "Arial,Helvetica,sans-serif", "#1E293B"),
        vendorsDataCard({
          heading: "Founding Vendor Claim",
          subheading: "Locked annual rate, editorial firewall preserved",
          subColor: "#0B5FFF",
          rows: [
            ["Founding rate (locked)", "EUR 99 / year"],
            ["Standard rate", "EUR 49 / month"],
            ["Verification turnaround", "48 hours (by 30 Nov)"],
            ["Direct CTA + verified badge", "Included"],
          ],
        }),
        vendorsToolBlock({
          kicker: "Claim Your Record",
          title: "Get verified before Q1 buyer shortlists close",
          body: "Nothing on your profile changes until you review it. Claim today and we build out your verified listing with your logo, pricing, compliance links and direct enquiry button within 48 hours.",
          href: "https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-3#vendor-q1-readiness",
          cta: "Claim with 48h Q1 setup (EUR 99/yr)",
          note: "Covers both software profiles and Irish CRO-registered company records.",
        }),
      ].join("\n"),
      signoffHtml: `<p style="margin-top:24px;margin-bottom:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#0F172A;">Bryan Collins<br /><span style="color:#64748B;">Founder, Vendors.ie</span></p>`,
    }),
    text: `January is peak software-switching season for Irish SMEs starting a new tax year. Buyers comparing payroll, accounting, banking and compliance tools on Vendors.ie are already shortlisting for Q1.

We do not run Black Friday discounts on Vendors.ie listings, and paying never affects rankings, scores or compliance verdicts. The founding claim rate stays locked at EUR 99/year (standard rate EUR 49/month).

If you claim your software profile or Irish CRO company record by midnight tonight (30 November), we include priority 48-hour manual verification and done-for-you profile setup so your logo, screenshots, EUR pricing and direct enquiry button are live before December budget sign-offs.

FOUNDING VENDOR CLAIM
- Founding rate (locked): EUR 99 / year
- Standard rate: EUR 49 / month
- Verification turnaround: 48 hours (for claims by 30 Nov)
- Direct CTA button + verified badge: Included

Claim with 48h Q1 setup (EUR 99/yr):
https://vendors.ie/q1-software-audit?utm_source=resend&utm_medium=email&utm_campaign=vendors-bfcm-3#vendor-q1-readiness

Bryan Collins
Founder, Vendors.ie
Consistent Publishing Ltd, Dublin · CRO 742884 · vendors.ie
Unsubscribe from all Vendors.ie email: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },
];
