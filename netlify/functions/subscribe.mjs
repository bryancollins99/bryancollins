// Newsletter capture for bryancollins.com -> Resend. Replaces every Kit form on the site.
// PRD: ~/.claude/handoff/kit-to-resend-2026-10-28/PRD-kit-to-resend-migration.md (Phase 3).
//
// A plain HTML form POST (works without JS) to /.netlify/functions/subscribe with
// `email`, `lane`, an optional `elapsed` (ms since page load, set by
// /resources/subscribe.js) and the `website` honeypot. Answers 303 to the lane's
// thank-you page.
//
// Abuse guards, ported from bawt-astro src/pages/api/subscribe.ts. A bot here lands
// contacts in a capped Resend plan shared by every site, so they are mandatory:
//   1. Same-origin: the Origin (or Referer) host must be a bryancollins.com host.
//      Requests with neither header (curl/scripts) are rejected.
//   2. Honeypot: `website` filled -> pretend success, write nothing.
//   3. Minimum-time: `elapsed` present and under 2.5 s -> pretend success.
//   4. Per-IP counter in Netlify Blobs, 5 per hour. Fails OPEN on any Blobs error.
//
// The lane is the ONLY caller-controlled routing input, and it is looked up in
// LANES below. Subject, asset link and redirect are server-side, never from the form.
//
// "New to the list" means the contact did not exist OR was not yet in the
// Bryan Collins Newsletter segment (the ~5,430 BAWT readers already exist in Resend).
// Only then do we fire `bc.subscribed` (the BC 1 · Welcome automation) and the
// PostHog `Email Signup` event. Resend starts a new automation run per event with
// no per-contact dedupe, so a repeat signup must never re-fire it (BAWT, 2026-08-15).
// An existing contact is never flipped to unsubscribed:false: that flag is
// account-wide and would resubscribe someone who left Become a Writer Today.
import { getStore } from "@netlify/blobs";

const KEY = process.env.RESEND_API_KEY || process.env.RESEND_API;
// Segment names are code keys in this account; the id is pinned, env can override.
const SEGMENT = process.env.RESEND_SEGMENT_ID || "389c476f-521e-444d-9932-770c5a443645";
const FROM = process.env.FROM_EMAIL || "Bryan Collins <bryan@bryancollins.com>";
const SUBSCRIBED_EVENT = "bc.subscribed";
// Public project token (it ships in every site's snippet). EU project 229393.
const POSTHOG_KEY = process.env.POSTHOG_API_KEY || "phc_pBxJ3BtqHYzDS52caeqcRBzEmSd697fSc6BwCfnrLTXR";

const AI_PROMPTS = {
  title: "101 AI Prompts",
  url: "https://docs.google.com/document/d/1kTTgA-6WCUMOB21zpqgyLREyq2bRurmG1RsOcj6iYX4/edit?usp=sharing",
};
const NOTE = { title: "The Plain-Text Note System", url: "https://bryancollins.com/downloads/note-system-starter-6p3n9k2.pdf" };
const CLAUDE = { title: "The Claude Code Starter Pack", url: "https://bryancollins.com/downloads/claude-code-starter-8h5r4t1.pdf" };

// lane -> where to send the reader, and what (if anything) to email them.
// asset null = no delivery email; the BC 1 · Welcome automation is their first email.
// linkedin-hooks, mba, poc and chatgpt delivered whatever Kit's incentive was set to,
// which the API cannot read. They land on /thank-you, which links the AI prompts doc
// exactly as it did under Kit, until their own asset links are added here.
const LANES = {
  "ai-prompts":     { thanks: "/thank-you", asset: AI_PROMPTS },
  medium:           { thanks: "/thank-you", asset: AI_PROMPTS },
  linkedin:         { thanks: "/thank-you", asset: AI_PROMPTS },
  apollo:           { thanks: "/thank-you", asset: AI_PROMPTS },
  note:             { thanks: "/thank-you", asset: NOTE },
  claude:           { thanks: "/thank-you", asset: CLAUDE },
  "linkedin-hooks": { thanks: "/thank-you", asset: null },
  mba:              { thanks: "/thank-you", asset: null },
  poc:              { thanks: "/thank-you", asset: null },
  chatgpt:          { thanks: "/thank-you", asset: null },
  hub:              { thanks: "/thank-you", asset: null },
  newsletter:       { thanks: "/thank-you", asset: null },
};

// -- Same-origin gate ---------------------------------------------------------
const ALLOWED_HOSTS = new Set([
  "bryancollins.com", "www.bryancollins.com", "newsletter.bryancollins.com",
  "join.bryancollins.com", "bryancollins.netlify.app", "localhost", "127.0.0.1",
]);
function allowedHost(h) {
  // Deploy previews / branch deploys: <context>--bryancollins.netlify.app (site 1571a0c8)
  return ALLOWED_HOSTS.has(h) || h.endsWith("--bryancollins.netlify.app");
}
function originAllowed(req) {
  for (const name of ["origin", "referer"]) {
    const v = req.headers.get(name);
    if (!v) continue;
    try { return allowedHost(new URL(v).hostname); } catch { return false; }
  }
  return false;
}

// -- Per-IP throttle via Netlify Blobs (fail-open) ----------------------------
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
async function rateLimited(req, context) {
  const ip = context?.ip || req.headers.get("x-nf-client-connection-ip")
    || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  if (!ip) return false;
  try {
    const store = getStore({ name: "subscribe-throttle", consistency: "strong" });
    const key = ip.replace(/[^a-zA-Z0-9:.]/g, "_");
    const now = Date.now();
    const cur = await store.get(key, { type: "json" });
    if (cur && now - cur.windowStart < RATE_WINDOW_MS) {
      if (cur.count >= RATE_LIMIT) return true;
      await store.setJSON(key, { count: cur.count + 1, windowStart: cur.windowStart });
    } else {
      await store.setJSON(key, { count: 1, windowStart: now });
    }
    return false;
  } catch (e) {
    console.warn("subscribe throttle unavailable (fail-open):", e?.message);
    return false;
  }
}

// -- Resend -------------------------------------------------------------------
const RESEND = "https://api.resend.com";
const auth = () => ({ Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" });

// The contact record, null when it does not exist, undefined when the lookup failed.
async function getContact(email) {
  try {
    const r = await fetch(`${RESEND}/contacts/${encodeURIComponent(email)}`, { headers: auth() });
    if (r.status === 200) return await r.json();
    if (r.status === 404) return null;
    return undefined;
  } catch { return undefined; }
}

async function inSegment(contactId) {
  const r = await fetch(`${RESEND}/contacts/${contactId}/segments`, { headers: auth() });
  if (!r.ok) throw new Error(`segment lookup ${r.status}`);
  const body = await r.json();
  return (body.data || []).some(s => s.id === SEGMENT);
}

// Returns { ok, isNew }. ok:false only when the contact write itself failed.
async function upsertContact(email, lane) {
  const existing = await getContact(email);
  if (existing === undefined) return { ok: false, status: "lookup" };

  if (existing === null) {
    const r = await fetch(`${RESEND}/contacts`, {
      method: "POST", headers: auth(),
      body: JSON.stringify({ email, unsubscribed: false, segments: [{ id: SEGMENT }], properties: { lane } }),
    });
    if (!r.ok) return { ok: false, status: r.status };
    return { ok: true, isNew: true };
  }

  if (await inSegment(existing.id)) return { ok: true, isNew: false };
  const r = await fetch(`${RESEND}/contacts/${existing.id}/segments/${SEGMENT}`, { method: "POST", headers: auth() });
  if (!r.ok) return { ok: false, status: r.status };
  // Record the lane on an existing contact too, so the newsletter can segment by it.
  // Non-fatal: the segment membership is the KPI.
  await fetch(`${RESEND}/contacts/${existing.id}`, {
    method: "PATCH", headers: auth(), body: JSON.stringify({ properties: { lane } }),
  }).catch(e => console.warn("lane property update failed (non-fatal):", e?.message));
  // Someone who left every list (unsubscribed account-wide) cannot receive a broadcast,
  // so they are not a new reader: no welcome, and no Email Signup in the kill-gate metric.
  return { ok: true, isNew: !existing.unsubscribed };
}

function deliveryHtml(asset) {
  return `<!doctype html><html lang="en"><body style="margin:0;padding:24px 16px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <div style="max-width:580px;margin:0 auto;font-size:16px;line-height:1.68;color:#111827;">
    <p style="margin:0 0 16px;">Hi there,</p>
    <p style="margin:0 0 16px;">Here is the download you asked for: <a href="${asset.url}" style="color:#2563eb;font-weight:600;text-decoration:underline;">${asset.title}</a>.</p>
    <p style="margin:0 0 16px;">You are also on my newsletter. I write about what I am building with AI coding agents, what broke, and what I would do differently.</p>
    <p style="margin:0 0 24px;">Best,<br /><strong>Bryan Collins</strong></p>
    <div style="padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;line-height:1.55;">
      Consistent Publishing Ltd &middot; CRO 742884 &middot; Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland
    </div>
  </div>
</body></html>`;
}

function sendDelivery(email, asset) {
  return fetch(`${RESEND}/emails`, {
    method: "POST", headers: auth(),
    body: JSON.stringify({
      from: FROM, to: [email], subject: `Your download: ${asset.title}`,
      html: deliveryHtml(asset),
      text: `Hi there,\n\nHere is the download you asked for, ${asset.title}:\n${asset.url}\n\nYou are also on my newsletter. I write about what I am building with AI coding agents, what broke, and what I would do differently.\n\nBest,\nBryan Collins`,
    }),
  }).then(r => { if (!r.ok) console.warn("delivery email failed (non-fatal):", r.status); })
    .catch(e => console.warn("delivery email failed (non-fatal):", e?.message));
}

function fireSubscribed(email, lane, path) {
  return fetch(`${RESEND}/events/send`, {
    method: "POST", headers: auth(),
    body: JSON.stringify({ event: SUBSCRIBED_EVENT, email, payload: { lane, path } }),
  }).catch(e => console.warn("bc.subscribed event failed (non-fatal):", e?.message));
}

// Server-side capture: distinct_id is a hash, never the address.
async function captureSignup(email, lane, path) {
  try {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.toLowerCase()));
    const id = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
    await fetch("https://eu.i.posthog.com/i/v0/e/", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY, event: "Email Signup", distinct_id: `bc_${id}`,
        properties: { $host: "bryancollins.com", $pathname: path, lane, $process_person_profile: false },
      }),
    });
  } catch (e) { console.warn("PostHog capture failed (non-fatal):", e?.message); }
}

// -- Handler ------------------------------------------------------------------
const redirect = (to) => new Response(null, { status: 303, headers: { Location: to } });
const thanks = (lane) => `${LANES[lane].thanks}?lane=${encodeURIComponent(lane)}`;
const fail = (status, msg) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Subscribe</title><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 16px;line-height:1.6"><p>${msg}</p><p><a href="javascript:history.back()">Go back</a></p></body>`,
  { status, headers: { "content-type": "text/html; charset=utf-8" } });

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let form;
  try {
    const type = req.headers.get("content-type") || "";
    form = type.includes("application/json")
      ? await req.json()
      : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch { return fail(400, "That did not go through. Please try again."); }

  const email = String(form.email || form.email_address || "").trim();
  const lane = Object.hasOwn(LANES, form.lane) ? form.lane : "hub";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return fail(400, "That email address does not look right. Please check it and try again.");
  }
  if (!originAllowed(req)) return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { "content-type": "application/json" } });

  // Bots get a normal-looking success and nothing is written.
  if (typeof form.website === "string" && form.website.trim() !== "") return redirect(thanks(lane));
  const elapsed = form.elapsed === undefined || form.elapsed === "" ? null : Number(form.elapsed);
  if (elapsed !== null && Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2500) return redirect(thanks(lane));

  if (await rateLimited(req, context)) return fail(429, "Too many signups from this connection. Please try again in an hour.");

  if (!KEY) { console.log("subscribe dry-run (no RESEND_API_KEY):", lane); return redirect(thanks(lane)); }

  let path = "/";
  try { path = new URL(req.headers.get("referer")).pathname; } catch { /* keep "/" */ }

  let result;
  try { result = await upsertContact(email, lane); } catch (e) { result = { ok: false, status: e?.message }; }
  if (!result.ok) {
    console.error("subscribe: Resend contact write failed", result.status);
    return fail(502, "Something went wrong on our side. Please try again in a minute.");
  }

  const jobs = [];
  if (LANES[lane].asset) jobs.push(sendDelivery(email, LANES[lane].asset));
  if (result.isNew) jobs.push(fireSubscribed(email, lane, path), captureSignup(email, lane, path));
  await Promise.all(jobs);

  return redirect(thanks(lane));
};
