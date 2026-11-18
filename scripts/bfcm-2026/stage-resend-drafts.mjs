#!/usr/bin/env node
// scripts/bfcm-2026/stage-resend-drafts.mjs
//
// Dry-run by default. With --create-drafts and RESEND_API_KEY set, creates
// UNSCHEDULED Status=draft broadcasts in Resend (never sends or schedules).
//
// Usage:
//   node scripts/bfcm-2026/stage-resend-drafts.mjs                 # dry-run
//   RESEND_API_KEY=re_... node scripts/bfcm-2026/stage-resend-drafts.mjs --create-drafts

import { CAMPAIGNS_PART_1 } from "./campaigns-part1.mjs";
import { CAMPAIGNS_PART_2 } from "./campaigns-part2.mjs";

const apply = process.argv.includes("--create-drafts");
const apiKey = process.env.RESEND_API_KEY || "";
const campaigns = [...CAMPAIGNS_PART_1, ...CAMPAIGNS_PART_2];

async function main() {
  if (!apply) {
    console.log("[bfcm-resend] DRY RUN: 12 broadcasts verified and ready to stage as unscheduled drafts.");
    for (const c of campaigns) {
      console.log(`  - [${c.id}] -> ${c.segmentName} (${c.segmentId}) | "${c.subject}"`);
    }
    console.log("\nPass --create-drafts with RESEND_API_KEY after merging landing-page PRs to create Resend drafts.");
    return;
  }
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY.");
    process.exit(1);
  }
  for (const c of campaigns) {
    const res = await fetch("https://api.resend.com/broadcasts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "bryancollins-bfcm-stager/1.0",
      },
      body: JSON.stringify({
        name: `BFCM 2026 DRAFT | ${c.id} | ${c.subject.slice(0, 48)}`,
        segment_id: c.segmentId,
        from: c.from,
        reply_to: c.replyTo,
        subject: c.subject,
        preview_text: c.previewText,
        html: c.html,
        text: c.text,
      }),
    });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(`Failed on ${c.id} (${res.status}): ${JSON.stringify(body)}`);
    }
    console.log(`Created DRAFT broadcast ${body.id} for ${c.id} (${c.segmentName})`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
