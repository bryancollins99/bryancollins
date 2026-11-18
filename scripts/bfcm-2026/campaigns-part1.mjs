// scripts/bfcm-2026/campaigns-part1.mjs
//
// Campaign emails 1 to 6:
//  1-2. Become a Writer Today (BAWT · newsletter, 7db2686b-5e9c-4782-886e-7ccb3c5fe674)
//  3-4. Bryan Collins Personal Brand (Bryan Collins Newsletter, 389c476f-521e-444d-9932-770c5a443645 + Kit)
//  5-6. Leinster Insider (Leinster Insider · newsletter, 726f5926-ad5f-4f79-a77c-9a7408578623 + County Planning lists)

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
    offerType: "5-Pack Vault Bundle ($49 vs $118) + Verified Editing Deals",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 13:00 UTC",
    from: "Become a Writer Today <bryan@becomeawritertoday.com>",
    replyTo: ["bryan@becomeawritertoday.com"],
    subject: "All 5 writing packs in one download (plus 3 Black Friday deals worth checking)",
    previewText: "Get the complete Become a Writer Today download vault for $49, plus honest notes on ProWritingAid and Grammarly.",
    previewPageUrl: "https://deploy-preview-276--becomeawriter.netlify.app/black-friday/",
    livePageUrl: "https://becomeawritertoday.com/black-friday/",
    html: wrapBawtEmail({
      title: "The Writers' Black Friday Vault",
      previewText: "Get the complete Become a Writer Today download vault for $49, plus honest notes on ProWritingAid and Grammarly.",
      kicker: "Black Friday to Cyber Monday",
      bodyHtml: [
        p("Most Black Friday roundups for writers dump fifty software coupons in your lap and hope you click three of them. You do not need fifty new apps.", SERIF, "#1C1917"),
        p("If you want practical files you can actually use on a draft this weekend, I put together two things on a single page for Black Friday through Cyber Monday.", SERIF, "#1C1917"),
        h2("1. The Complete Writer's Download Vault ($49, normally $118)", SERIF, "#1C1917"),
        p("For the next four days, you can grab all five paid downloads from Become a Writer Today in one purchase. You pay once, no subscription, and all five zip files arrive in a single email:", SERIF, "#1C1917"),
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
          label: "Open the Writers' Black Friday Vault ($49)",
          href: "https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-bf",
          bg: "#B23A48",
          fg: "#FFFFFF",
          font: SERIF,
        }),
        h2("2. Three editing and craft deals that only drop once a year", SERIF, "#1C1917"),
        p("If you have been waiting to upgrade your editing tool, Black Friday week is the one time of year prices genuinely move:", SERIF, "#1C1917"),
        bulletList(
          [
            "<a href=\"https://becomeawritertoday.com/try-prowritingaid/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">ProWritingAid</a> runs up to 50% off its Annual and Lifetime plans. Best choice if you write novels, memoir or longform books in Scrivener or Word.",
            "<a href=\"https://becomeawritertoday.com/try-grammarly/\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">Grammarly Pro</a> cuts its annual plan for Black Friday. Fastest option if you file articles, newsletters and client work across Google Docs and browsers.",
            "<a href=\"https://tfr-affiliate-hub.netlify.app/e/masterclass\" style=\"color:#B23A48;font-weight:bold;text-decoration:underline;\">MasterClass</a> runs its holiday membership offer, covering craft classes from Margaret Atwood, Neil Gaiman, Judy Blume and Salman Rushdie.",
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

If you want practical files you can actually use on a draft this weekend, I put together two things on one page for Black Friday through Cyber Monday.

1. THE COMPLETE WRITER'S DOWNLOAD VAULT ($49, NORMALLY $118)

For the next four days, you can grab all five paid downloads from Become a Writer Today in one purchase. You pay once, no subscription, and all five zip files arrive in a single email:

- Writers' Deadline Database ($29 value): verified contest, literary magazine, residency and conference deadlines in offline CSV sheets and calendar files.
- The Zettelkasten for Creators Kit ($29 value): a plain-Markdown note folder, five templates and cleanup scripts.
- Claude Code for Writers ($29 value): persistent voice memory, research folders and safe draft workflows.
- Filler-Word Killer Editor Pack ($19 value): scan a whole manuscript folder for filler and crutch words in one pass.
- Prompt & Word-Bank Pack ($12 value): offline Markdown word banks, genre prompts and show-don't-tell tables.

Open the Writers' Black Friday Vault:
https://becomeawritertoday.com/black-friday/?utm_source=resend&utm_medium=email&utm_campaign=bfcm-2026-bf

2. THREE EDITING AND CRAFT DEALS THAT ONLY DROP ONCE A YEAR

- ProWritingAid (up to 50% off Annual and Lifetime plans, best for book-length drafts in Scrivener or Word):
https://becomeawritertoday.com/try-prowritingaid/

- Grammarly Pro (Black Friday annual plan cut, fastest for articles, newsletters and client copy):
https://becomeawritertoday.com/try-grammarly/

- MasterClass (holiday membership offer, craft classes from Margaret Atwood, Neil Gaiman and Judy Blume):
https://tfr-affiliate-hub.netlify.app/e/masterclass

If the free contest pages and browser word tools on the site already cover what you need, keep using them. Everything free stays free.

Write on,
Bryan Collins

Disclosure: the external tool links above are affiliate links. If you buy through them I may earn a commission at no extra cost to you.

Become a Writer Today, Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
  },

  {
    id: "bawt-cm-2026",
    property: "Become a Writer Today",
    segmentName: "BAWT · newsletter",
    segmentId: "7db2686b-5e9c-4782-886e-7ccb3c5fe674",
    audienceNote: "~5,700 writers",
    offerType: "Cyber Monday Final Call ($49 Vault + ProWritingAid/Grammarly)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 15:00 UTC",
    from: "Become a Writer Today <bryan@becomeawritertoday.com>",
    replyTo: ["bryan@becomeawritertoday.com"],
    subject: "Closing tonight: the 5-pack Writer's Vault ($49)",
    previewText: "Last call for the bundled Writers' Deadline Database, Zettelkasten Kit, Claude Code guide and editor packs.",
    previewPageUrl: "https://deploy-preview-276--becomeawriter.netlify.app/black-friday/",
    livePageUrl: "https://becomeawritertoday.com/black-friday/",
    html: wrapBawtEmail({
      title: "Closing tonight: the 5-pack Writer's Vault",
      previewText: "Last call for the bundled Writers' Deadline Database, Zettelkasten Kit, Claude Code guide and editor packs.",
      kicker: "Cyber Monday Final Call",
      bodyHtml: [
        p("A quick reminder before I take down the Cyber Week page tonight.", SERIF, "#1C1917"),
        p("Until midnight, all five Become a Writer Today downloads are bundled together for <strong>$49 one-time</strong> instead of $118 bought separately. Everything arrives as plain-text Markdown, CSV, calendar and Python files you keep on your own computer:", SERIF, "#1C1917"),
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
          label: "Grab all 5 packs for $49 before midnight",
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

Until midnight, all five Become a Writer Today downloads are bundled together for $49 one-time instead of $118 bought separately. Everything arrives as plain-text Markdown, CSV, calendar and Python files you keep on your own computer:

- Writers' Deadline Database (all four submission datasets + .ics calendars)
- The Zettelkasten for Creators Kit (starter vault + 5 templates)
- Claude Code for Writers (voice memory + book/newsletter CLAUDE.md briefs)
- Filler-Word Killer Editor Pack (batch CLI manuscript checker + 8 JSON lists)
- Prompt & Word-Bank Pack (every site word bank + genre prompts offline)

Grab all 5 packs for $49 before midnight:
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
    offerType: "Solo Operator 4-Kit Stack ($69 vs $146) + AI Builder Stack",
    sendSlot: "Black Friday · Fri 27 Nov 2026, 10:00 UTC",
    from: "Bryan Collins <bryan@bryancollins.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Why I stopped buying $997 courses (and my $69 Cyber Week stack)",
    previewText: "Four plain-text Markdown and Claude Code kits I use every day to run nine sites without a team.",
    previewPageUrl: "https://bryancollins.com/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapPersonalEmail({
      title: "Why I stopped buying $997 courses",
      previewText: "Four plain-text Markdown and Claude Code kits I use every day to run nine sites without a team.",
      bodyHtml: [
        p("Every November my inbox fills up with $997 video courses promising to teach me an operating system for content or AI."),
        p("I bought plenty of them in my thirties. Almost every one sat at 18% completion while I went back to work."),
        p("When I started rebuilding my portfolio with Claude Code this year, I stopped keeping ideas inside SaaS dashboards and course portals. Everything that runs my week lives in plain Markdown files and small Python scripts on my Mac: my note vault, my voice memory files, my Friday content pipeline, and my prose checker."),
        p("For Black Friday through Cyber Monday, I bundled all four of those working kits onto one page for <strong>$69 one-time</strong> (normally $146 bought separately):"),
        bulletList([
          "<strong>The Builder's Pipeline ($39):</strong> six scripts and prompts that turn one-line daily build notes into a week of LinkedIn posts, newsletter drafts and YouTube ideas.",
          "<strong>Claude Code for Writers ($39):</strong> zero-terminal quickstart, persistent <code>MEMORY.md</code> voice rules, undo safety, and three ready-to-fill <code>CLAUDE.md</code> project briefs.",
          "<strong>The Zettelkasten for Creators Kit ($39):</strong> git-backed plain-Markdown starter vault, five note templates and three cleanup scripts.",
          "<strong>Filler-Word Killer Editor Pack ($29):</strong> batch CLI prose checker for an entire folder of Markdown drafts plus eight editable word lists.",
        ]),
        ctaButton({
          label: "See the Solo Operator Stack ($69)",
          href: "https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-bf",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("On the same page I listed the four paid tools that survived my SaaS cull this year and run genuine Cyber Week offers: <a href=\"https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated\" style=\"color:#0052FF;text-decoration:underline;\">Lovable</a> for rapid app prototypes, <a href=\"https://becomeawritertoday.com/try-grammarly/\" style=\"color:#0052FF;text-decoration:underline;\">Grammarly Pro</a> for fast copy checks, <a href=\"https://tfr-affiliate-hub.netlify.app/e/kit-formerly-convertkit\" style=\"color:#0052FF;text-decoration:underline;\">Kit</a> for Creator Network referrals, and <a href=\"https://tfr-affiliate-hub.netlify.app/e/teachable\" style=\"color:#0052FF;text-decoration:underline;\">Teachable</a> for hosting digital products (all affiliate links)."),
        p("Write on,<br>Bryan Collins"),
      ].join("\n"),
    }),
    text: `Every November my inbox fills up with $997 video courses promising to teach me an operating system for content or AI.

I bought plenty of them in my thirties. Almost every one sat at 18% completion while I went back to work.

When I started rebuilding my portfolio with Claude Code this year, I stopped keeping ideas inside SaaS dashboards and course portals. Everything that runs my week lives in plain Markdown files and small Python scripts on my Mac: my note vault, my voice memory files, my Friday content pipeline, and my prose checker.

For Black Friday through Cyber Monday, I bundled all four of those working kits onto one page for $69 one-time (normally $146 bought separately):

- The Builder's Pipeline ($39): six scripts and prompts that turn one-line daily build notes into a week of LinkedIn posts, newsletter drafts and YouTube ideas.
- Claude Code for Writers ($39): zero-terminal quickstart, persistent MEMORY.md voice rules, undo safety, and three CLAUDE.md project briefs.
- The Zettelkasten for Creators Kit ($39): git-backed plain-Markdown starter vault, five note templates and three cleanup scripts.
- Filler-Word Killer Editor Pack ($29): batch CLI prose checker for an entire folder of Markdown drafts plus eight editable word lists.

See the Solo Operator Stack ($69):
https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-bf

On the same page I listed the four paid tools that survived my SaaS cull this year and run Cyber Week offers:
- Lovable: https://tfr-affiliate-hub.netlify.app/e/lovable-labs-incorporated
- Grammarly Pro: https://becomeawritertoday.com/try-grammarly/
- Kit: https://tfr-affiliate-hub.netlify.app/e/kit-formerly-convertkit
- Teachable: https://tfr-affiliate-hub.netlify.app/e/teachable
(All four are affiliate links.)

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
    offerType: "Cyber Monday Last Call ($69 Operator Stack)",
    sendSlot: "Cyber Monday · Mon 30 Nov 2026, 16:00 UTC",
    from: "Bryan Collins <bryan@bryancollins.com>",
    replyTo: ["bryan@bryancollins.com"],
    subject: "Last call tonight: my 4 Claude Code and Markdown kits ($69)",
    previewText: "The Solo Operator bundle comes down at midnight, back to $146 across individual pages tomorrow.",
    previewPageUrl: "https://bryancollins.com/black-friday.html",
    livePageUrl: "https://bryancollins.com/black-friday.html",
    html: wrapPersonalEmail({
      title: "Last call tonight: my 4 Claude Code and Markdown kits",
      previewText: "The Solo Operator bundle comes down at midnight, back to $146 across individual pages tomorrow.",
      bodyHtml: [
        p("Quick note before Cyber Monday wraps up tonight."),
        p("At midnight I am taking down the $69 bundle page that packages my four plain-text kits together (The Builder's Pipeline, Claude Code for Writers, The Zettelkasten for Creators Kit, and the Filler-Word Killer Editor Pack). Tomorrow they go back to $146 across their individual pages."),
        p("If you want to spend December setting up a clean Markdown note vault, a repeatable Claude Code memory setup, and a 20-minute Friday content workflow you own on disk with zero SaaS subscriptions, grab the stack here:"),
        ctaButton({
          label: "Get all 4 kits for $69 before midnight",
          href: "https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-cm",
          bg: "#111827",
          fg: "#FCD34D",
        }),
        p("Every kit comes with a 14-day no-questions refund if you open the zip files and decide the workflow does not fit how you work."),
        p("Write on,<br>Bryan Collins"),
      ].join("\n"),
    }),
    text: `Quick note before Cyber Monday wraps up tonight.

At midnight I am taking down the $69 bundle page that packages my four plain-text kits together (The Builder's Pipeline, Claude Code for Writers, The Zettelkasten for Creators Kit, and the Filler-Word Killer Editor Pack). Tomorrow they go back to $146 across their individual pages.

If you want to spend December setting up a clean Markdown note vault, a repeatable Claude Code memory setup, and a 20-minute Friday content workflow you own on disk with zero SaaS subscriptions, grab the stack here:

https://bryancollins.com/black-friday.html?utm_source=resend&utm_medium=email&utm_campaign=bc-bfcm-2026-cm

Every kit comes with a 14-day no-questions refund if you open the zip files and decide the workflow does not fit how you work.

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
    subject: "Run a business or event in Leinster? Our 2-for-1 Christmas and New Year pass",
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
    subject: "Own your county planning page on Leinster Insider in 2027 (EUR 99/mo founding lock)",
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
];
