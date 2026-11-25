// scripts/bfcm-2026/campaigns-part1.mjs
//
// Campaign emails 1 to 9 (3 per site):
//  1-3. Become a Writer Today (BAWT · newsletter, 7db2686b-5e9c-4782-886e-7ccb3c5fe674)
//  4-6. Bryan Collins Personal Brand (Bryan Collins Newsletter, 389c476f-521e-444d-9932-770c5a443645 + Kit)
//  7-9. Leinster Insider (Leinster Insider · newsletter, 726f5926-ad5f-4f79-a77c-9a7408578623 + County Planning lists)

import {
  p,
  h2,
  ctaButton,
  bulletList,
  calloutBox,
  wrapPersonalEmail,
  wrapBawtEmail,
  wrapBrandCardEmail,
} from "./email-shell.mjs";

const SERIF = "Georgia,'Times New Roman',Times,serif";

export const CAMPAIGNS_PART_1 = [
  {
    id: "bawt-bf-2026",
    property: "Become a Writer Today",
    segmentName: "BAWT · newsletter",
    segmentId: "7db2686b-5e9c-4782-886e-7ccb3c5fe674",
    audienceNote: "~5,700 writers (70% open, 10% click)",
    offerType: "5-Pack Vault Bundle ($59 vs $118, save $59) + Verified Editing Deals",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 13:00 UTC",
    from: "Become a Writer Today <bryan@becomeawritertoday.com>",
    replyTo: ["bryan@becomeawritertoday.com"],
    subject: "5 writing packs for $59 (normally $118)",
    previewText: "Get the complete Become a Writer Today download vault for $59 (save $59), plus honest notes on ProWritingAid and Grammarly.",
    previewPageUrl: "https://deploy-preview-276--becomeawriter.netlify.app/black-friday/",
    livePageUrl: "https://becomeawritertoday.com/black-friday/",
    html: wrapBawtEmail({
      title: "The Writers' Black Friday Vault",
      previewText: "Get the complete Become a Writer Today download vault for $59 (save $59), plus honest notes on ProWritingAid and Grammarly.",
      kicker: "Black Friday to Cyber Monday",
      bodyHtml: [
        p("Most Black Friday roundups for writers dump fifty software coupons in your lap and hope you click three of them. You do not need fifty new apps.", SERIF, "#1C1917"),
        p("If you want practical files you can actually use on a draft this weekend, I put together two things on a single page for Black Friday through Cyber Monday.", SERIF, "#1C1917"),
        h2("1. The Complete Writer's Download Vault ($59, normally $118)", SERIF, "#1C1917"),
        p("For the next four days, you can grab all five paid downloads from Become a Writer Today in one purchase (50% off, saving $59). You pay once, no subscription, and all five zip files arrive in a single email:", SERIF, "#1C1917"),
        bulletList(
          [
            "<strong>Writers' Deadline Database ($29 value):</strong> every verified contest, literary magazine, residency and conference deadline in offline CSV sheets and genre calendar files.",
            "<strong>The Zettelkasten for Creators Kit ($29 value):</strong> a plain-Markdown note folder, five templates and cleanup scripts so you never start from a blank screen.",
            "<strong>Claude Code for Writers ($29 value):</strong> how to set up persistent voice memory, research folders and safe draft workflows without being a programmer.",
            "<strong>Filler-Word Killer Editor Pack ($19 value):</strong> scan a whole manuscript folder for hedges, crutch words and padding in one pass.",
            "<strong>Prompt &amp; Word-Bank Pack ($12 value):</strong> offline Markdown word banks, genre prompts and show-don't-tell tables.",
          ],
          SERIF,
          "#1C1917",
        ),
        ctaButton({
          label: "Open the Writers' Black Friday Vault ($59)",
          href: "https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-bf",
          bg: "#B23A48",
          fg: "#FFFFFF",
          font: SERIF,
        }),
        h2("2. The Creator White Space Challenge ($97, 30-day email course)", SERIF, "#1C1917"),
        p("If your real bottleneck is not tools, it is finding protected time and mental space to work on your book, newsletter or creative project in 2027, doors are also open for <strong>The Creator White Space Challenge ($97)</strong>.", SERIF, "#1C1917"),
        p("Each morning for 30 days, you get one short, actionable email lesson ending with a practical Creative Action Plan. No bloated video portal. Try it for a few days and reply for a full refund if it is not a fit.", SERIF, "#1C1917"),
        h2("3. Two editing deals that only drop once a year", SERIF, "#1C1917"),
        p("If you have been waiting to upgrade your editing tool, Black Friday week is the one time of year prices genuinely move:", SERIF, "#1C1917"),
        bulletList(
          [
            "<a href=\"https://becomeawritertoday.com/try-prowritingaid/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">ProWritingAid</a> runs up to 50% off its Annual and Lifetime plans. Best choice if you write novels, memoir or longform books in Scrivener or Word.",
            "<a href=\"https://becomeawritertoday.com/try-grammarly/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">Grammarly Pro</a> cuts its annual plan for Black Friday. Fastest option if you file articles, newsletters and client work across Google Docs and browsers.",
          ],
          SERIF,
          "#1C1917",
        ),
        p("If the free contest pages and browser word tools on Become a Writer Today already cover what you need, keep using them. Everything free on the site stays free.", SERIF, "#1C1917"),
        p("Write on,<br>Bryan Collins", SERIF, "#1C1917"),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#78716C;">Disclosure: the external tool links above are affiliate links. If you buy through them I may earn a commission at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `Most Black Friday roundups for writers dump fifty software coupons in your lap and hope you click three of them. You do not need fifty new apps.

If you want practical files you can actually use on a draft this weekend, I put together two things on a single page for Black Friday through Cyber Monday.

1. THE COMPLETE WRITER'S DOWNLOAD VAULT ($59, NORMALLY $118, SAVE $59)

For the next four days, you can grab all five paid downloads from Become a Writer Today in one purchase (50% off, saving $59). You pay once, no subscription, and all five zip files arrive in a single email:

- Writers' Deadline Database ($29 value): verified contest, literary magazine, residency and conference deadlines in offline CSV sheets and calendar files.
- The Zettelkasten for Creators Kit ($29 value): a plain-Markdown note folder, five templates and cleanup scripts.
- Claude Code for Writers ($29 value): persistent voice memory, research folders and safe draft workflows.
- Filler-Word Killer Editor Pack ($19 value): scan a whole manuscript folder for filler and crutch words in one pass.
- Prompt & Word-Bank Pack ($12 value): offline Markdown word banks, genre prompts and show-don't-tell tables.

Open the Writers' Black Friday Vault:
https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-bf

2. THE CREATOR WHITE SPACE CHALLENGE ($97, 30-DAY EMAIL COURSE)

If your real bottleneck is not tools, it is finding protected time and mental space to work on your book, newsletter or creative project in 2027, doors are also open for The Creator White Space Challenge ($97). Each morning for 30 days, you get one short, actionable email lesson ending with a practical Creative Action Plan. Try it for a few days and reply for a full refund if it is not a fit:
https://becomeawritertoday.com/black-friday/#creator-white-space

3. TWO EDITING DEALS THAT ONLY DROP ONCE A YEAR

- ProWritingAid (up to 50% off Annual and Lifetime plans, best for book-length drafts in Scrivener or Word):
https://becomeawritertoday.com/try-prowritingaid/

- Grammarly Pro (Black Friday annual plan cut, fastest for articles, newsletters and client copy):
https://becomeawritertoday.com/try-grammarly/

If the free contest pages and browser word tools on the site already cover what you need, keep using them. Everything free stays free.

Write on,
Bryan Collins

Disclosure: the external tool links above are affiliate links. If you buy through them I may earn a commission at no extra cost to you.

Become a Writer Today, Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bawt-sat-2026",
    property: "Become a Writer Today",
    segmentName: "BAWT · newsletter",
    segmentId: "7db2686b-5e9c-4782-886e-7ccb3c5fe674",
    audienceNote: "~5,700 writers",
    offerType: "Creator White Space Challenge ($97) + 5-Pack Vault Reminder",
    sendSlot: "Saturday · Sat 28 Nov 2026, 13:00 UTC",
    from: "Become a Writer Today <bryan@becomeawritertoday.com>",
    replyTo: ["bryan@becomeawritertoday.com"],
    subject: "30 mornings to protect your 2027 writing time",
    previewText: "30 daily morning emails to carve out protected time and mental space for your book, newsletter or creative project.",
    previewPageUrl: "https://deploy-preview-276--becomeawriter.netlify.app/black-friday/#creator-white-space",
    livePageUrl: "https://becomeawritertoday.com/black-friday/#creator-white-space",
    html: wrapBawtEmail({
      title: "The Creator White Space Challenge",
      previewText: "30 daily morning emails to carve out protected time and mental space for your book, newsletter or creative project.",
      kicker: "Cyber Weekend · 30-Day Email Course",
      bodyHtml: [
        p("Most writers I speak with do not have an ideas problem. They have a time and mental-bandwidth problem.", SERIF, "#1C1917"),
        p("If you want to finish a book, build a newsletter or Substack, or launch a creative project in 2027 without burning out, doors are open through Monday night for <strong>The Creator White Space Challenge ($97)</strong>.", SERIF, "#1C1917"),
        p("It is a 30-day daily email course. Each morning you get one short, practical lesson that ends with a concrete Creative Action Plan you can finish in a busy day. No bloated video portal.", SERIF, "#1C1917"),
        calloutBox({
          title: "What past participants said",
          border: "#E7E2DA",
          bg: "#FAF7F2",
          font: SERIF,
          bodyHtml:
            "\"You communicate each lesson so clearly and with a length that makes reading each email easy to fit into any busy day. I also love how you end each challenge with a Creative Action Plan in specific, practical steps.\" (Patricia)<br><br>\"I've been knowing that I am building something worth sharing. I am really glad I signed up for this course.\" (Craig)",
        }),
        ctaButton({
          label: "Join the Creator White Space Challenge ($97)",
          href: "https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-sat#creator-white-space",
          bg: "#B23A48",
          fg: "#FFFFFF",
          font: SERIF,
        }),
        p("Try it for a few days. If it is not a fit, reply to any email for a full refund. And if you also want all five Become a Writer Today downloadable packs bundled together ($59 vs $118, saving $59), they are on the same page until midnight UTC on Monday.", SERIF, "#1C1917"),
        p("Write on,<br>Bryan Collins", SERIF, "#1C1917"),
      ].join("\n"),
    }),
    text: `Most writers I speak with do not have an ideas problem. They have a time and mental-bandwidth problem.

If you want to finish a book, build a newsletter or Substack, or launch a creative project in 2027 without burning out, doors are open through Monday night for The Creator White Space Challenge ($97).

It is a 30-day daily email course. Each morning you get one short, practical lesson that ends with a concrete Creative Action Plan you can finish in a busy day. No bloated video portal.

Patricia wrote: "You communicate each lesson so clearly and with a length that makes reading each email easy to fit into any busy day. I also love how you end each challenge with a Creative Action Plan in specific, practical steps."

Craig wrote: "I am really glad I signed up for this course."

Join the Creator White Space Challenge ($97):
https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-sat#creator-white-space

Try it for a few days. If it is not a fit, reply to any email for a full refund. All five Become a Writer Today downloadable packs ($59 vs $118, saving $59) are on the same page until midnight UTC on Monday.

Write on,
Bryan Collins

Become a Writer Today, Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bawt-cm-2026",
    property: "Become a Writer Today",
    segmentName: "BAWT · newsletter",
    segmentId: "7db2686b-5e9c-4782-886e-7ccb3c5fe674",
    audienceNote: "~5,700 writers",
    offerType: "Cyber Monday Final Call ($59 Vault + ProWritingAid/Grammarly)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 15:00 UTC",
    from: "Become a Writer Today <bryan@becomeawritertoday.com>",
    replyTo: ["bryan@becomeawritertoday.com"],
    subject: "Midnight cutoff: 5 writing packs for $59",
    previewText: "Last call for the bundled Writers' Deadline Database, Zettelkasten Kit, Claude Code guide and editor packs (save $59).",
    previewPageUrl: "https://deploy-preview-276--becomeawriter.netlify.app/black-friday/",
    livePageUrl: "https://becomeawritertoday.com/black-friday/",
    html: wrapBawtEmail({
      title: "Closing tonight: the 5-pack Writer's Vault",
      previewText: "Last call for the bundled Writers' Deadline Database, Zettelkasten Kit, Claude Code guide and editor packs (save $59).",
      kicker: "Cyber Monday Final Call",
      bodyHtml: [
        p("A quick reminder before I take down the Cyber Week page tonight.", SERIF, "#1C1917"),
        p("Until midnight, all five Become a Writer Today downloads are bundled together for <strong>$59 one-time</strong> instead of $118 bought separately (50% off, saving $59). Everything arrives as plain-text Markdown, CSV, calendar and Python files you keep on your own computer:", SERIF, "#1C1917"),
        bulletList(
          [
            "Writers' Deadline Database (all four submission datasets + .ics calendars)",
            "The Zettelkasten for Creators Kit (starter vault + 5 templates)",
            "Claude Code for Writers (voice memory + book/newsletter CLAUDE.md briefs)",
            "Filler-Word Killer Editor Pack (batch CLI manuscript checker + 8 JSON lists)",
            "Prompt &amp; Word-Bank Pack (every site word bank + genre prompts offline)",
          ],
          SERIF,
          "#1C1917",
        ),
        ctaButton({
          label: "Grab all 5 packs for $59 before midnight",
          href: "https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-cm",
          bg: "#B23A48",
          fg: "#FFFFFF",
          font: SERIF,
        }),
        p("Tonight is also the cutoff for the annual Black Friday discounts on <a href=\"https://becomeawritertoday.com/try-prowritingaid/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">ProWritingAid</a> (50% off Lifetime and Annual) and <a href=\"https://becomeawritertoday.com/try-grammarly/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">Grammarly Pro</a> if you plan to edit a manuscript over the winter.", SERIF, "#1C1917"),
        p("Back to our normal Thursday Deadline Digest later this week.", SERIF, "#1C1917"),
        p("Write on,<br>Bryan Collins", SERIF, "#1C1917"),
        `<p style="margin-top:0;margin-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#78716C;">Disclosure: the ProWritingAid and Grammarly links are affiliate links. If you buy through them I may earn a commission at no extra cost to you.</p>`,
      ].join("\n"),
    }),
    text: `A quick reminder before I take down the Cyber Week page tonight.

Until midnight, all five Become a Writer Today downloads are bundled together for $59 one-time instead of $118 bought separately (50% off, saving $59). Everything arrives as plain-text Markdown, CSV, calendar and Python files you keep on your own computer:

- Writers' Deadline Database (all four submission datasets + .ics calendars)
- The Zettelkasten for Creators Kit (starter vault + 5 templates)
- Claude Code for Writers (voice memory + book/newsletter CLAUDE.md briefs)
- Filler-Word Killer Editor Pack (batch CLI manuscript checker + 8 JSON lists)
- Prompt & Word-Bank Pack (every site word bank + genre prompts offline)

Grab all 5 packs for $59 before midnight:
https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-cm

Tonight is also the cutoff for the annual Black Friday discounts on ProWritingAid (https://becomeawritertoday.com/try-prowritingaid/) and Grammarly Pro (https://becomeawritertoday.com/try-grammarly/) if you plan to edit a manuscript over the winter.

Back to our normal Thursday Deadline Digest later this week.

Write on,
Bryan Collins

Disclosure: the ProWritingAid and Grammarly links are affiliate links. If you buy through them I may earn a commission at no extra cost to you.

Become a Writer Today, Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bc-bf-2026",
    property: "bryancollins.com (Personal Brand + Kit)",
    segmentName: "Bryan Collins Newsletter",
    segmentId: "389c476f-521e-444d-9932-770c5a443645",
    audienceNote: "~774 engaged AI builders & creators",
    offerType: "The Solo Operator Repo ($79 Private GitHub Access, normally $149)",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 10:00 UTC",
    from: "Bryan Collins <bryan@bryancollins.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Why I ditched $997 courses for 1 private repo ($79)",
    previewText: "Private GitHub access to my sanitised .claude/ skills, Builder's Pipeline, Zettelkasten vault and 9-site Astro blueprint.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapPersonalEmail({
      title: "Why I ditched $997 courses for 1 private repo",
      previewText: "Private GitHub access to my sanitised .claude/ skills, Builder's Pipeline, Zettelkasten vault and 9-site Astro blueprint.",
      bodyHtml: [
        p("Every November my inbox fills up with $997 video courses promising to teach me an operating system for content or AI."),
        p("I bought plenty of them in my thirties. Almost every one sat at 18% completion while I went back to work."),
        p("When I rebuilt my portfolio with Claude Code this year, I stopped keeping workflows inside SaaS dashboards and course portals. Everything that runs my week lives in git: my Claude Code skills and hooks, my Friday content pipeline, my plain-Markdown note vault, and the Astro + Netlify + Stripe site blueprint behind my nine sites."),
        p("For Black Friday through Cyber Monday, I am opening private GitHub access to <strong>The Solo Operator Repo</strong> (<code>bryancollins99/solo-operator-stack</code>) for <strong>$79 one-time</strong> (normally $149):"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills including <code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code> and <code>/log</code>.",
          "<strong>The Builder's Pipeline:</strong> scripts turning daily <code>Coding-Log.md</code> lines into Friday LinkedIn posts, newsletter drafts and YouTube ideas.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown note vault and cleanup scripts with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
          "<strong>Lifetime <code>git pull</code> updates through 2027:</strong> GitHub collaborator invite after Stripe checkout, zero subscription, 14-day refund.",
        ]),
        ctaButton({
          label: "Get The Solo Operator Repo ($79 one-time)",
          href: "https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-bf",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("On the same page I listed the three paid tools that survived my SaaS cull this year and run genuine Cyber Week offers: <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;text-decoration:underline;\">Lovable</a> for rapid app prototypes, <a href=\"https://becomeawritertoday.com/try-grammarly/\" style=\"color:#0052FF;text-decoration:underline;\">Grammarly Pro</a> for fast copy checks, and <a href=\"https://tfr-affiliate-hub.netlify.app/e/kit-formerly-convertkit\" style=\"color:#0052FF;text-decoration:underline;\">Kit</a> for Creator Network referrals (all affiliate links)."),
        p("Write on,<br>Bryan Collins"),
      ].join("\n"),
    }),
    text: `Every November my inbox fills up with $997 video courses promising to teach me an operating system for content or AI.

I bought plenty of them in my thirties. Almost every one sat at 18% completion while I went back to work.

When I rebuilt my portfolio with Claude Code this year, I stopped keeping workflows inside SaaS dashboards and course portals. Everything that runs my week lives in git: my Claude Code skills and hooks, my Friday content pipeline, my plain-Markdown note vault, and the Astro + Netlify + Stripe site blueprint behind my nine sites.

For Black Friday through Cyber Monday, I am opening private GitHub access to The Solo Operator Repo (bryancollins99/solo-operator-stack) for $79 one-time (normally $149):

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: scripts turning daily Coding-Log.md lines into Friday LinkedIn posts, newsletter drafts and YouTube ideas.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown note vault and cleanup scripts with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.
- Lifetime git pull updates through 2027: GitHub collaborator invite after Stripe checkout, zero subscription, 14-day refund.

Get The Solo Operator Repo ($79 one-time):
https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-bf

On the same page I listed the three paid tools that survived my SaaS cull this year and run Cyber Week offers:
- Lovable: https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated
- Grammarly Pro: https://becomeawritertoday.com/try-grammarly/
- Kit: https://tfr-affiliate-hub.netlify.app/e/kit-formerly-convertkit
(All three are affiliate links.)

Write on,
Bryan Collins

Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bc-sat-2026",
    property: "bryancollins.com (Personal Brand + Kit)",
    segmentName: "Bryan Collins Newsletter",
    segmentId: "389c476f-521e-444d-9932-770c5a443645",
    audienceNote: "~774 engaged AI builders & creators",
    offerType: "Saturday Walkthrough: Inside The Solo Operator Repo ($79 Private GitHub Access)",
    sendSlot: "Saturday · Sat 28 Nov 2026, 11:00 UTC",
    from: "Bryan Collins <bryan@bryancollins.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Inside the private GitHub repo running my 9 sites",
    previewText: "No 40-hour video portal: clone bryancollins99/solo-operator-stack with sanitised .claude/ skills, pipeline scripts and Astro blueprint.",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapPersonalEmail({
      title: "Inside The Solo Operator Repo",
      previewText: "No 40-hour video portal: clone bryancollins99/solo-operator-stack with sanitised .claude/ skills, pipeline scripts and Astro blueprint.",
      bodyHtml: [
        p("A few readers asked what actually arrives when you join The Solo Operator Repo ($79 Cyber Week one-time, normally $149)."),
        p("There is no course login and no 40 hours of Zoom replays. After Stripe checkout you receive a private GitHub collaborator invite to <code>bryancollins99/solo-operator-stack</code>. Clone it once, adapt it to your own repos, and pull updates through 2027:"),
        bulletList([
          "<strong>Sanitised <code>.claude/</code> Skills &amp; Hooks Pack:</strong> gitleaks-clean production skills (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>).",
          "<strong>The Builder's Pipeline:</strong> daily <code>Coding-Log.md</code> to Friday LinkedIn, newsletter and YouTube scripts.",
          "<strong>Zettelkasten Starter Vault + Hygiene Scripts:</strong> plain-Markdown note vault with zero SaaS lock-in.",
          "<strong>Portfolio Site Blueprint:</strong> stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.",
        ]),
        ctaButton({
          label: "Inspect The Solo Operator Repo ($79 through Monday)",
          href: "https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-sat",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Normally $149. Lifetime <code>git pull</code> updates through 2027, zero subscription, 14-day refund on request."),
        p("Write on,<br>Bryan Collins"),
      ].join("\n"),
    }),
    text: `A few readers asked what actually arrives when you join The Solo Operator Repo ($79 Cyber Week one-time, normally $149).

There is no course login and no 40 hours of Zoom replays. After Stripe checkout you receive a private GitHub collaborator invite to bryancollins99/solo-operator-stack. Clone it once, adapt it to your own repos, and pull updates through 2027:

- Sanitised .claude/ Skills & Hooks Pack: gitleaks-clean production skills (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log).
- The Builder's Pipeline: daily Coding-Log.md to Friday LinkedIn, newsletter and YouTube scripts.
- Zettelkasten Starter Vault + Hygiene Scripts: plain-Markdown note vault with zero SaaS lock-in.
- Portfolio Site Blueprint: stripped-down Astro + Netlify + Resend + Stripe webhook starter behind running nine sites solo.

Inspect The Solo Operator Repo ($79 through Monday midnight UTC):
https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-sat

Normally $149. Lifetime git pull updates through 2027, zero subscription, 14-day refund on request.

Write on,
Bryan Collins

Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bc-cm-2026",
    property: "bryancollins.com (Personal Brand + Kit)",
    segmentName: "Bryan Collins Newsletter",
    segmentId: "389c476f-521e-444d-9932-770c5a443645",
    audienceNote: "~774 engaged AI builders & creators",
    offerType: "Cyber Monday Last Call ($79 Private GitHub Repo, normally $149)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 16:00 UTC",
    from: "Bryan Collins <bryan@bryancollins.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "The private repo behind my 9 sites ($79 ends tonight)",
    previewText: "Cyber Week $79 access to bryancollins99/solo-operator-stack ends at midnight UTC tonight (normally $149).",
    previewPageUrl: "https://deploy-preview-16--bryancollins.netlify.app/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapPersonalEmail({
      title: "The private repo behind my 9 sites ($79 ends tonight)",
      previewText: "Cyber Week $79 access to bryancollins99/solo-operator-stack ends at midnight UTC tonight (normally $149).",
      bodyHtml: [
        p("Quick note before Cyber Monday wraps up tonight."),
        p("At midnight UTC I am closing the <strong>$79 Cyber Week launch price</strong> for <strong>The Solo Operator Repo</strong> (private GitHub access to <code>bryancollins99/solo-operator-stack</code>, normally $149)."),
        p("You get the sanitised <code>.claude/</code> skills and hooks pack (<code>/prd</code>, <code>/prd-critic</code>, <code>/qa-loop</code>, <code>/swarm-check</code>, <code>/pre-commit-review</code>, <code>/commit</code>, <code>/log</code>), The Builder's Pipeline, the Zettelkasten starter vault, the Astro + Netlify + Resend + Stripe site blueprint, and lifetime <code>git pull</code> updates through 2027:"),
        ctaButton({
          label: "Get Private Repo Access ($79 before midnight)",
          href: "https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-cm",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Zero recurring subscription and a 14-day no-questions refund if you clone the repo and decide it does not fit how you build."),
        p("Write on,<br>Bryan Collins"),
      ].join("\n"),
    }),
    text: `Quick note before Cyber Monday wraps up tonight.

At midnight UTC I am closing the $79 Cyber Week launch price for The Solo Operator Repo (private GitHub access to bryancollins99/solo-operator-stack, normally $149).

You get the sanitised .claude/ skills and hooks pack (/prd, /prd-critic, /qa-loop, /swarm-check, /pre-commit-review, /commit, /log), The Builder's Pipeline, the Zettelkasten starter vault, the Astro + Netlify + Resend + Stripe site blueprint, and lifetime git pull updates through 2027:

https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-cm

Zero recurring subscription and a 14-day no-questions refund if you clone the repo and decide it does not fit how you build.

Write on,
Bryan Collins

Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "leinster-sbs-2026",
    property: "Leinster Insider",
    segmentName: "Leinster Insider · newsletter",
    segmentId: "726f5926-ad5f-4f79-a77c-9a7408578623",
    audienceNote: "~1,643 Leinster subscribers across 12 counties",
    offerType: "Small Business Saturday 2-for-1 Local Sponsor Pass (No Rate Cut)",
    sendSlot: "Small Business Saturday · Sat 28 Nov 2026, 10:30 UTC",
    from: "Leinster Insider <info@leinsterinsider.ie>",
    replyTo: ["info@leinsterinsider.ie"],
    subject: "2-for-1 Leinster feature: December + January included",
    previewText: "Book a December feature or event slot by Cyber Monday and get a bonus January 2027 placement included.",
    previewPageUrl: "https://deploy-preview-201--leinsterinsider.netlify.app/sponsor/cyber-week/",
    livePageUrl: "https://leinsterinsider.ie/sponsor/cyber-week/",
    html: wrapBrandCardEmail({
      title: "Small Business Saturday & 2027 Local Sponsor Pass",
      previewText: "Book a December feature or event slot by Cyber Monday and get a bonus January 2027 placement included.",
      brandName: "Leinster Insider",
      kicker: "Small Business Saturday to Cyber Monday · 12 Counties",
      accentColor: "#1F2937",
      bodyHtml: [
        p("Every weekend hundreds of business owners, event organisers, estate agents and tradespeople across Dublin, Kildare, Wicklow, Meath, Wexford, Kilkenny and the wider province read Leinster Insider."),
        p("Rather than cutting ad rates for Black Friday weekend, we opened a four-day <strong>Small Business Saturday Pass</strong> that doubles the placements you get across Christmas and the New Year:"),
        calloutBox({
          title: "1. Festive + New Year Business Feature (EUR 299 one-off)",
          bodyHtml:
            "Get a dedicated feature in a December weekly issue written in our voice, a permanent link on your town or county guide on leinsterinsider.ie, <strong>plus a bonus placement in a January 2027 New Year edition at no extra cost</strong>.",
        }),
        calloutBox({
          title: "2. Christmas & January Event Pass (EUR 99 one-off)",
          bodyHtml:
            "Promote a market, gig, festival, open day or family show in a weekly issue with its own shareable event page on leinsterinsider.ie, <strong>plus a bonus closing-weekend reminder in our Saturday events section</strong>.",
        }),
        ctaButton({
          label: "Get Featured in This Newsletter (2-for-1 Pass)",
          href: "https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-sbs",
          bg: "#111827",
          fg: "#FFFFFF",
        }),
        p("Want a quick self-serve link on a smaller budget? You can also place your local business permanently on the <a href=\"https://leinsterinsider.ie/board/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-sbs\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">Leinster Business Spotlight board</a> from EUR 10."),
        p("Planning a winter break closer to home? Compare weekend hotel rates across Dublin, Kilkenny, Wexford and Wicklow via <a href=\"https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotel-Search%3Fdestination%3DLeinster%2C+Ireland&camref=1011l5KuqL&creativeref=1100l68075&adref=PZMuVay0EQ\" style=\"color:#0052FF;text-decoration:underline;\">Expedia stays in Leinster</a> (affiliate link)."),
      ].join("\n"),
    }),
    text: `Every weekend hundreds of business owners, event organisers, estate agents and tradespeople across Dublin, Kildare, Wicklow, Meath, Wexford, Kilkenny and the wider province read Leinster Insider.

Rather than cutting ad rates for Black Friday weekend, we opened a four-day Small Business Saturday Pass that doubles the placements you get across Christmas and the New Year:

1. FESTIVE + NEW YEAR BUSINESS FEATURE (EUR 299 ONE-OFF)
Get a dedicated feature in a December weekly issue written in our voice, a permanent link on your town or county guide on leinsterinsider.ie, plus a bonus placement in a January 2027 New Year edition at no extra cost.

2. CHRISTMAS & JANUARY EVENT PASS (EUR 99 ONE-OFF)
Promote a market, gig, festival, open day or family show in a weekly issue with its own shareable event page on leinsterinsider.ie, plus a bonus closing-weekend reminder in our Saturday events section.

Get Featured in This Newsletter (closes Cyber Monday 30 November):
https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-sbs

On a smaller budget? Place your business permanently on the Leinster Business Spotlight board from EUR 10:
https://leinsterinsider.ie/board/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-sbs

Planning a winter night away? Compare Leinster weekend stays on Expedia (affiliate link):
https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotel-Search%3Fdestination%3DLeinster%2C+Ireland&camref=1011l5KuqL&creativeref=1100l68075&adref=PZMuVay0EQ

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "leinster-county-cm-2026",
    property: "Leinster Insider (County Property & Planning Segments)",
    segmentName: "Leinster - Dublin / Kildare / Wicklow / Meath + Planning segments",
    segmentId: "2980be79-94ec-49a1-9c5f-9d5011af10cf",
    audienceNote: "13 County Property & Planning segments (architects, movers, homeowners, agents)",
    offerType: "Founding County Planning Sponsor Rate Lock (EUR 99/mo)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 11:00 UTC",
    from: "Leinster Insider <info@leinsterinsider.ie>",
    replyTo: ["info@leinsterinsider.ie"],
    subject: "1 sponsor per Leinster county for 2027 (EUR 99/mo)",
    previewText: "One founding sponsor slot per county for estate agents, architects, surveyors, solicitors and builders.",
    previewPageUrl: "https://deploy-preview-201--leinsterinsider.netlify.app/sponsor/cyber-week/",
    livePageUrl: "https://leinsterinsider.ie/sponsor/cyber-week/",
    html: wrapBrandCardEmail({
      title: "Founding County Planning Sponsor (2027 Rate Lock)",
      previewText: "One founding sponsor slot per county for estate agents, architects, surveyors, solicitors and builders.",
      brandName: "Leinster Insider · Property & Planning",
      kicker: "Cyber Monday Closing Notice · 1 Sponsor Per County",
      accentColor: "#1F2937",
      bodyHtml: [
        p("If you work in property, architecture, surveying, conveyancing or construction in Leinster, our county planning pages and weekly planning digests put your firm directly in front of homeowners and buyers tracking applications in your area."),
        p("Until midnight tonight (Cyber Monday, 30 November), you can lock in the <strong>Founding County Planning Sponsor rate of EUR 99 a month for the next 12 months</strong>:"),
        bulletList([
          "Your firm named at the top of your county planning page on leinsterinsider.ie with a direct link.",
          "Standing sponsor placement in every weekly county planning email.",
          "One founding sponsor per county, cancel any time with no long-term lock-in.",
        ]),
        ctaButton({
          label: "Claim Your County Sponsor Slot (EUR 99/mo)",
          href: "https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=planning-digest&utm_medium=email&utm_campaign=li-bfcm-2026-county",
          bg: "#111827",
          fg: "#FFFFFF",
        }),
        p("Buying, renting or reviewing a lease yourself before year-end? Use our free official-data tools any time: the <a href=\"https://leinsterinsider.ie/rent-review/\" style=\"color:#0052FF;text-decoration:underline;\">RTB Rent-Review Evidence Pack</a>, <a href=\"https://leinsterinsider.ie/compare/\" style=\"color:#0052FF;text-decoration:underline;\">Town Price &amp; Yield Comparison</a>, and <a href=\"https://leinsterinsider.ie/find-your-town/\" style=\"color:#0052FF;text-decoration:underline;\">Commute Finder</a>."),
      ].join("\n"),
    }),
    text: `If you work in property, architecture, surveying, conveyancing or construction in Leinster, our county planning pages and weekly planning digests put your firm directly in front of homeowners and buyers tracking applications in your area.

Until midnight tonight (Cyber Monday, 30 November), you can lock in the Founding County Planning Sponsor rate of EUR 99 a month for the next 12 months:

- Your firm named at the top of your county planning page on leinsterinsider.ie with a direct link.
- Standing sponsor placement in every weekly county planning email.
- One founding sponsor per county, cancel any time with no long-term lock-in.

Claim Your County Sponsor Slot (EUR 99/mo):
https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=planning-digest&utm_medium=email&utm_campaign=li-bfcm-2026-county

Buying, renting or reviewing a lease yourself before year-end? Use our free official-data tools any time:
- RTB Rent-Review Evidence Pack: https://leinsterinsider.ie/rent-review/
- Town Price & Yield Comparison: https://leinsterinsider.ie/compare/
- Commute Finder: https://leinsterinsider.ie/find-your-town/

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "leinster-cm-final-2026",
    property: "Leinster Insider",
    segmentName: "Leinster Insider · newsletter",
    segmentId: "726f5926-ad5f-4f79-a77c-9a7408578623",
    audienceNote: "~1,643 Leinster subscribers across 12 counties",
    offerType: "Cyber Monday Final Call: 2-for-1 Local Sponsor Pass + EUR 99/mo County Lock",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 17:30 UTC",
    from: "Leinster Insider <info@leinsterinsider.ie>",
    replyTo: ["info@leinsterinsider.ie"],
    subject: "Final hours: 2-for-1 Leinster pass + 12 county slots",
    previewText: "Closes at midnight UTC: book a December feature or event and get January included, or lock in a EUR 99/mo county planning slot.",
    previewPageUrl: "https://deploy-preview-201--leinsterinsider.netlify.app/sponsor/cyber-week/",
    livePageUrl: "https://leinsterinsider.ie/sponsor/cyber-week/",
    html: wrapBrandCardEmail({
      title: "Final Hours: 2-for-1 Leinster Pass & 2027 County Slots",
      previewText: "Closes at midnight UTC: book a December feature or event and get January included, or lock in a EUR 99/mo county planning slot.",
      brandName: "Leinster Insider",
      kicker: "Cyber Monday Final Call · Closes Midnight UTC",
      accentColor: "#1F2937",
      bodyHtml: [
        p("Quick final reminder before we close the Cyber Week page at midnight tonight (Monday 30 November)."),
        p("We do not discount Leinster Insider ad rates. Instead, bookings placed before midnight UTC get extra placements or a 12-month founding rate lock across 2027:"),
        bulletList([
          "<strong>Festive + New Year Business Feature (EUR 299 one-off):</strong> one December issue feature written in our voice, a permanent town or county guide link, plus a bonus January 2027 placement included.",
          "<strong>Christmas &amp; January Event Pass (EUR 99 one-off):</strong> a weekly issue slot plus a shareable event page and a bonus closing-weekend reminder.",
          "<strong>Founding County Planning Sponsor (EUR 99/mo):</strong> one firm per Leinster county pinned at the top of your county planning page and weekly planning digest for 12 months. Cancel any time.",
        ]),
        ctaButton({
          label: "Claim a Slot Before Midnight UTC",
          href: "https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-cm-final",
          bg: "#111827",
          fg: "#FFFFFF",
        }),
        p("Smaller budget? You can still add a permanent listing to the <a href=\"https://leinsterinsider.ie/board/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-cm-final\" style=\"color:#0052FF;font-weight:bold;text-decoration:underline;\">Leinster Business Spotlight board</a> from EUR 10 any day of the year."),
      ].join("\n"),
    }),
    text: `Quick final reminder before we close the Cyber Week page at midnight tonight (Monday 30 November).

We do not discount Leinster Insider ad rates. Instead, bookings placed before midnight UTC get extra placements or a 12-month founding rate lock across 2027:

- Festive + New Year Business Feature (EUR 299 one-off): one December issue feature written in our voice, a permanent town or county guide link, plus a bonus January 2027 placement included.
- Christmas & January Event Pass (EUR 99 one-off): a weekly issue slot plus a shareable event page and a bonus closing-weekend reminder.
- Founding County Planning Sponsor (EUR 99/mo): one firm per Leinster county pinned at the top of your county planning page and weekly planning digest for 12 months. Cancel any time.

Claim a Slot Before Midnight UTC:
https://leinsterinsider.ie/sponsor/cyber-week/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-cm-final

Smaller budget? Add a permanent listing to the Leinster Business Spotlight board from EUR 10:
https://leinsterinsider.ie/board/?utm_source=newsletter&utm_medium=email&utm_campaign=li-bfcm-2026-cm-final

Consistent Publishing Ltd, CRO 742884, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },
];
