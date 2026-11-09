#!/usr/bin/env node
// Self-test for R268 signup attribution (netlify/functions/subscribe.mjs,
// resources/subscribe.js, and scripts/kit_to_resend_sync.py).
// Asserts cases (a)-(k) + client subscribe.js DOM stub + kit_to_resend_sync.py stub.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { setEnvironmentContext } from "@netlify/blobs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

process.env.RESEND_API_KEY = "re_test_fake_key_do_not_use";
const { default: handler } = await import(path.join(ROOT, "netlify/functions/subscribe.mjs"));

const SEGMENT_ID = "389c476f-521e-444d-9932-770c5a443645";

function makeReq(formObj, headersObj = {}) {
  const body = new URLSearchParams(formObj).toString();
  const headers = new Headers({
    "content-type": "application/x-www-form-urlencoded",
    origin: "https://bryancollins.com",
    referer: "https://bryancollins.com/newsletter/posts/test-slug?utm_source=x",
    ...headersObj,
  });
  return new Request("https://bryancollins.com/.netlify/functions/subscribe", {
    method: "POST",
    headers,
    body,
  });
}

function installFetchMock(responder) {
  const calls = [];
  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;
    const method = (init.method || (typeof input === "object" && input.method) || "GET").toUpperCase();
    let parsedBody = undefined;
    if (init.body !== undefined) {
      try {
        parsedBody = JSON.parse(init.body);
      } catch {
        parsedBody = init.body;
      }
    }
    const call = { url, method, body: parsedBody, rawBody: init.body };
    calls.push(call);
    return responder(call, calls);
  };
  return calls;
}

function jsonResp(status, data = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// (a) New-contact POST body carries all label keys and omits empty ones
// ---------------------------------------------------------------------------
{
  const calls = installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_1" });
    return jsonResp(200, { ok: true });
  });

  const res = await handler(
    makeReq({
      email: "reader@example.com",
      lane: "hub",
      form: "hub-newsletter",
      signup_utm_source: "Newsletter",
      signup_utm_medium: "Email",
      // signup_utm_campaign intentionally omitted to prove empty keys are omitted
      signup_referrer: "Google.com",
      ph_id: "ph-abc12345-xyz",
    })
  );

  assert.equal(res.status, 303);
  const postCall = calls.find((c) => c.url === "https://api.resend.com/contacts" && c.method === "POST");
  assert.ok(postCall, "Expected POST /contacts");
  assert.deepEqual(postCall.body.properties, {
    lane: "hub",
    source_surface: "bryancollins@hub-newsletter",
    signup_page: "/newsletter/posts/test-slug",
    signup_utm_source: "newsletter",
    signup_utm_medium: "email",
    signup_referrer: "google.com",
  });
  assert.equal("signup_utm_campaign" in postCall.body.properties, false, "Empty UTM key must be omitted");
  console.log("PASS (a): new-contact POST body carries all label keys and omits empty ones");
}

// ---------------------------------------------------------------------------
// (b) A 4xx (400/422) on the POST retries with {lane} only and still redirects 303
// ---------------------------------------------------------------------------
{
  let postAttempts = 0;
  const calls = installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") {
      postAttempts += 1;
      if (postAttempts === 1) return jsonResp(422, { message: "unknown property" });
      return jsonResp(201, { id: "c_2" });
    }
    return jsonResp(200, { ok: true });
  });

  const res = await handler(
    makeReq({
      email: "retry@example.com",
      lane: "claude",
      form: "claude-inline",
    })
  );

  assert.equal(res.status, 303);
  const postCalls = calls.filter((c) => c.url === "https://api.resend.com/contacts" && c.method === "POST");
  assert.equal(postCalls.length, 2, "Expected initial POST + 1 retry POST");
  assert.deepEqual(postCalls[1].body.properties, { lane: "claude" });
  const confirmed = calls.find((c) => c.url.includes("posthog.com") && c.body?.event === "Signup Confirmed");
  assert.equal(confirmed.body.properties.labelled, false, "Retry without labels must set labelled=false");
  console.log("PASS (b): 4xx on POST retries with {lane} only and still redirects 303");
}

// ---------------------------------------------------------------------------
// (c) & (d) Existing contact with source_surface already set vs empty/unknown
// is PATCHed correctly, and no `lane` is in the fill-empty PATCH
// ---------------------------------------------------------------------------
{
  // Subcase 1: source_surface already set -> skipped in PATCH; empty keys filled; no `lane` in PATCH
  const calls1 = installFetchMock((call) => {
    if (call.url.endsWith("/segments") && call.method === "GET") {
      return jsonResp(200, { data: [{ id: SEGMENT_ID }] });
    }
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") {
      return jsonResp(200, {
        id: "c_existing_1",
        unsubscribed: false,
        properties: {
          lane: "hub",
          source_surface: "upgrade:bawt",
          signup_page: "",
        },
      });
    }
    return jsonResp(200, { ok: true });
  });

  const res1 = await handler(
    makeReq({
      email: "existing1@example.com",
      lane: "claude",
      form: "claude-inline",
      signup_utm_source: "youtube",
    })
  );
  assert.equal(res1.status, 303);
  const patch1 = calls1.find((c) => c.url.endsWith("/contacts/c_existing_1") && c.method === "PATCH");
  assert.ok(patch1, "Expected fill-empty PATCH for signup_page and signup_utm_source");
  assert.equal("source_surface" in patch1.body.properties, false, "Already-set source_surface must not be overwritten");
  assert.equal("lane" in patch1.body.properties, false, "Fill-empty PATCH must never include lane");
  assert.equal(patch1.body.properties.signup_page, "/newsletter/posts/test-slug");
  assert.equal(patch1.body.properties.signup_utm_source, "youtube");

  // Subcase 2: source_surface is "unknown" -> treated as empty and filled; no `lane` in fill-empty PATCH
  const calls2 = installFetchMock((call) => {
    if (call.url.endsWith("/segments") && call.method === "GET") {
      return jsonResp(200, { data: [{ id: SEGMENT_ID }] });
    }
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") {
      return jsonResp(200, {
        id: "c_existing_2",
        unsubscribed: false,
        properties: {
          lane: "hub",
          source_surface: "unknown",
          signup_page: "/already-set",
        },
      });
    }
    return jsonResp(200, { ok: true });
  });

  const res2 = await handler(
    makeReq({
      email: "existing2@example.com",
      lane: "note",
      form: "note-inline",
    })
  );
  assert.equal(res2.status, 303);
  const patch2 = calls2.find((c) => c.url.endsWith("/contacts/c_existing_2") && c.method === "PATCH");
  assert.ok(patch2, "Expected fill-empty PATCH when source_surface is 'unknown'");
  assert.deepEqual(patch2.body.properties, {
    source_surface: "bryancollins@note-inline",
  });
  assert.equal("lane" in patch2.body.properties, false, "No lane in fill-empty PATCH");
  console.log("PASS (c): existing contact PATCH skips set properties and fills empty or 'unknown'");
  console.log("PASS (d): no `lane` in the fill-empty PATCH");
}

// ---------------------------------------------------------------------------
// (e) An invalid `form` falls back to `bryancollins@<lane>`
// ---------------------------------------------------------------------------
{
  const calls = installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_e" });
    return jsonResp(200, { ok: true });
  });

  const res = await handler(
    makeReq({
      email: "fallback@example.com",
      lane: "note",
      form: "INVALID FORM SLUG WITH SPACES & <script>",
    })
  );
  assert.equal(res.status, 303);
  const postCall = calls.find((c) => c.url === "https://api.resend.com/contacts" && c.method === "POST");
  assert.equal(postCall.body.properties.source_surface, "bryancollins@note");
  console.log("PASS (e): invalid `form` falls back to `bryancollins@<lane>`");
}

// ---------------------------------------------------------------------------
// (f) No Referer pathname omits `signup_page`
// ---------------------------------------------------------------------------
{
  const calls = installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_f" });
    return jsonResp(200, { ok: true });
  });

  const reqNoReferer = new Request("https://bryancollins.com/.netlify/functions/subscribe", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://bryancollins.com",
    }),
    body: new URLSearchParams({ email: "noref@example.com", lane: "hub", form: "hub-newsletter" }).toString(),
  });

  const res = await handler(reqNoReferer);
  assert.equal(res.status, 303);
  const postCall = calls.find((c) => c.url === "https://api.resend.com/contacts" && c.method === "POST");
  assert.equal("signup_page" in postCall.body.properties, false, "signup_page must be omitted when Referer is absent");
  const confirmed = calls.find((c) => c.url.includes("posthog.com") && c.body?.event === "Signup Confirmed");
  assert.equal(confirmed.body.properties.labelled, false, "Without signup_page, labelled must be false");
  console.log("PASS (f): no Referer omits `signup_page`");
}

// ---------------------------------------------------------------------------
// (g) & (h) Every PostHog payload carries `$host`; `Signup Confirmed` fires on
// success and not on failure; `Signup Failed` carries `reason` for invalid_email,
// forbidden_origin, rate_limited, resend_lookup_failed, resend_write_failed,
// bot_honeypot, too_fast, dry_run_no_key
// ---------------------------------------------------------------------------
{
  const allPostHogCalls = [];

  // 1. Successful write -> Signup Confirmed + Email Signup
  {
    const calls = installFetchMock((call) => {
      if (call.url.includes("posthog.com")) allPostHogCalls.push(call);
      if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
      if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_ok" });
      return jsonResp(200, { ok: true });
    });
    const res = await handler(makeReq({ email: "ok@example.com", lane: "hub", form: "hub-newsletter" }));
    assert.equal(res.status, 303);
    const phEvents = calls.filter((c) => c.url.includes("posthog.com")).map((c) => c.body.event);
    assert.ok(phEvents.includes("Signup Confirmed"), "Expected Signup Confirmed on success");
    assert.ok(phEvents.includes("Email Signup"), "Expected Email Signup on new contact");
    assert.equal(phEvents.includes("Signup Failed"), false);
  }

  // Helper to run a failing/early-return request and check Signup Failed reason
  async function assertFailedReason(req, expectedStatus, expectedReason, customResponder) {
    const calls = installFetchMock((call, all) => {
      if (call.url.includes("posthog.com")) allPostHogCalls.push(call);
      if (customResponder) return customResponder(call, all);
      return jsonResp(200, { ok: true });
    });
    const res = await handler(req, { ip: "203.0.113.9" });
    assert.equal(res.status, expectedStatus, `Expected status ${expectedStatus} for ${expectedReason}`);
    const ph = calls.filter((c) => c.url.includes("posthog.com"));
    assert.equal(
      ph.some((c) => c.body.event === "Signup Confirmed"),
      false,
      `Signup Confirmed must NOT fire on ${expectedReason}`
    );
    const failed = ph.find((c) => c.body.event === "Signup Failed");
    assert.ok(failed, `Expected Signup Failed for ${expectedReason}`);
    assert.equal(failed.body.properties.reason, expectedReason);
    return res;
  }

  // invalid_email
  await assertFailedReason(makeReq({ email: "not-an-email", lane: "hub" }), 400, "invalid_email");

  // forbidden_origin
  await assertFailedReason(
    makeReq({ email: "ok@example.com", lane: "hub" }, { origin: "https://evil.example.com", referer: "https://evil.example.com/" }),
    403,
    "forbidden_origin"
  );

  // bot_honeypot (still redirects 303)
  await assertFailedReason(makeReq({ email: "ok@example.com", lane: "hub", website: "http://spam.test" }), 303, "bot_honeypot");

  // too_fast (still redirects 303)
  await assertFailedReason(makeReq({ email: "ok@example.com", lane: "hub", elapsed: "500" }), 303, "too_fast");

  // rate_limited (via Netlify Blobs mock)
  setEnvironmentContext({
    edgeURL: "https://blobs.test",
    uncachedEdgeURL: "https://blobs.test",
    siteID: "site-1",
    token: "tok-1",
  });
  await assertFailedReason(
    makeReq({ email: "ok@example.com", lane: "hub" }),
    429,
    "rate_limited",
    (call) => {
      if (call.url.includes("blobs.test")) {
        return jsonResp(200, { count: 5, windowStart: Date.now() });
      }
      return jsonResp(200, {});
    }
  );
  setEnvironmentContext({});

  // resend_lookup_failed
  await assertFailedReason(
    makeReq({ email: "ok@example.com", lane: "hub" }),
    502,
    "resend_lookup_failed",
    (call) => {
      if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(500);
      return jsonResp(200, {});
    }
  );

  // resend_write_failed (also checks (j) below)
  const fail502Res = await assertFailedReason(
    makeReq({ email: "ok@example.com", lane: "hub" }),
    502,
    "resend_write_failed",
    (call) => {
      if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
      if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(500);
      return jsonResp(200, {});
    }
  );

  // dry_run_no_key
  delete process.env.RESEND_API_KEY;
  await assertFailedReason(makeReq({ email: "ok@example.com", lane: "hub" }), 303, "dry_run_no_key");
  process.env.RESEND_API_KEY = "re_test_fake_key_do_not_use";

  assert.ok(allPostHogCalls.length >= 9, "Expected PostHog calls across all scenarios");
  for (const c of allPostHogCalls) {
    assert.equal(c.body.properties.$host, "bryancollins.com", "Every PostHog payload must carry $host='bryancollins.com'");
    assert.equal(c.body.properties.site, "bryancollins");
  }
  console.log("PASS (g): every PostHog payload carries `$host: 'bryancollins.com'`");
  console.log("PASS (h): `Signup Confirmed` fires only on success; `Signup Failed` carries all required reasons");

  // -------------------------------------------------------------------------
  // (j) A Resend 502 returns the `fail()` page with role="alert", never thank-you
  // -------------------------------------------------------------------------
  assert.equal(fail502Res.status, 502);
  assert.equal(fail502Res.headers.get("location"), null);
  const failHtml = await fail502Res.text();
  assert.ok(failHtml.includes('role="alert"'), "fail() page must include role='alert'");
  console.log("PASS (j): Resend 502 returns fail() page with role='alert', never thank-you redirect");
}

// ---------------------------------------------------------------------------
// (i) A UTM value containing `@` or a space is dropped; a full URL in
// `signup_referrer` is dropped
// ---------------------------------------------------------------------------
{
  const calls = installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_i" });
    return jsonResp(200, { ok: true });
  });

  const res = await handler(
    makeReq({
      email: "filter@example.com",
      lane: "hub",
      form: "hub-newsletter",
      signup_utm_source: "leaked@example.com",
      signup_utm_medium: "has space",
      signup_utm_campaign: "valid_campaign-2026",
      signup_referrer: "https://google.com/search?q=test",
    })
  );
  assert.equal(res.status, 303);
  const postCall = calls.find((c) => c.url === "https://api.resend.com/contacts" && c.method === "POST");
  assert.equal("signup_utm_source" in postCall.body.properties, false, "UTM with @ must be dropped");
  assert.equal("signup_utm_medium" in postCall.body.properties, false, "UTM with space must be dropped");
  assert.equal(postCall.body.properties.signup_utm_campaign, "valid_campaign-2026");
  assert.equal("signup_referrer" in postCall.body.properties, false, "Full URL in signup_referrer must be dropped");
  console.log("PASS (i): UTM with `@` or space and full URL in `signup_referrer` are dropped");
}

// ---------------------------------------------------------------------------
// (k) The redirect carries `form=`
// ---------------------------------------------------------------------------
{
  installFetchMock((call) => {
    if (call.url.includes("api.resend.com/contacts/") && call.method === "GET") return jsonResp(404);
    if (call.url === "https://api.resend.com/contacts" && call.method === "POST") return jsonResp(201, { id: "c_k" });
    return jsonResp(200, { ok: true });
  });

  const res = await handler(
    makeReq({
      email: "redir@example.com",
      lane: "claude",
      form: "claude-inline",
    })
  );
  assert.equal(res.status, 303);
  const loc = res.headers.get("location");
  assert.equal(loc, "/thank-you?lane=claude&form=bryancollins%40claude-inline");
  console.log("PASS (k): redirect Location carries `lane=` and `form=`");
}

// ---------------------------------------------------------------------------
// Client script check: resources/subscribe.js creates hidden inputs and sends
// `Form Submitted` on a `bc-subscribe` form, and ignores untracked forms
// ---------------------------------------------------------------------------
{
  const scriptCode = fs.readFileSync(path.join(ROOT, "resources/subscribe.js"), "utf8");
  const listeners = {};
  const beacons = [];

  function makeForm({ isBcSubscribe, lane = "hub", sectionId = "newsletter" }) {
    const inputs = {
      lane: { name: "lane", value: lane },
      elapsed: { name: "elapsed", value: "" },
    };
    return {
      dataset: {},
      parentElement: sectionId ? { tagName: "SECTION", id: sectionId } : null,
      matches(sel) {
        if (sel === "form.bc-subscribe") return Boolean(isBcSubscribe);
        if (sel === 'form[name="contact"]') return false;
        if (sel === 'form.bc-subscribe, form[name="contact"]') return Boolean(isBcSubscribe);
        return false;
      },
      querySelector(sel) {
        const m = sel.match(/^input\[name="([^"]+)"\]$/);
        return m ? inputs[m[1]] || null : null;
      },
      appendChild(el) {
        inputs[el.name] = el;
      },
      _inputs: inputs,
    };
  }

  const sandbox = {
    Date,
    Math,
    String,
    Boolean,
    JSON,
    URL,
    decodeURIComponent,
    location: {
      hostname: "bryancollins.com",
      pathname: "/newsletter/posts/sample-issue",
      search: "?utm_source=linkedin&utm_medium=social&utm_campaign=r268",
    },
    navigator: {
      sendBeacon(url, payload) {
        beacons.push({ url, payload: JSON.parse(payload) });
        return true;
      },
    },
    window: {},
    document: {
      readyState: "complete",
      referrer: "https://www.linkedin.com/feed/",
      addEventListener(type, fn) {
        listeners[type] = fn;
      },
      createElement(tag) {
        return { tagName: tag.toUpperCase(), type: "", name: "", value: "" };
      },
      querySelectorAll() {
        return [];
      },
    },
  };

  vm.runInNewContext(scriptCode, sandbox);

  // 1. Submit an untracked form (e.g. calculator form) -> no hidden inputs, no beacon
  const otherForm = makeForm({ isBcSubscribe: false });
  listeners.submit({ target: otherForm });
  assert.equal(beacons.length, 0, "Untracked form must not trigger Form Submitted");
  assert.equal("form" in otherForm._inputs, false, "Untracked form must not receive hidden inputs");

  // 2. Submit a bc-subscribe form -> hidden inputs created and Form Submitted sent
  const bcForm = makeForm({ isBcSubscribe: true, lane: "hub", sectionId: "newsletter" });
  listeners.submit({ target: bcForm });
  assert.equal(bcForm._inputs.form?.value, "hub-newsletter");
  assert.equal(bcForm._inputs.signup_utm_source?.value, "linkedin");
  assert.equal(bcForm._inputs.signup_utm_medium?.value, "social");
  assert.equal(bcForm._inputs.signup_utm_campaign?.value, "r268");
  assert.equal(bcForm._inputs.signup_referrer?.value, "www.linkedin.com");
  assert.match(bcForm._inputs.ph_id?.value || "", /^[a-z0-9-]{8,40}$/);
  assert.equal(beacons.length, 1);
  assert.equal(beacons[0].payload.event, "Form Submitted");
  assert.equal(beacons[0].payload.properties.$host, "bryancollins.com");
  assert.equal(beacons[0].payload.properties.form_id, "bryancollins@hub-newsletter");
  assert.equal(beacons[0].payload.properties.signup_page, "/newsletter/posts/sample-issue");
  console.log("PASS (subscribe.js): creates hidden inputs and sends Form Submitted only on tracked forms");
}

// ---------------------------------------------------------------------------
// Python sync check: scripts/kit_to_resend_sync.py sets source_surface on new
// contacts and PATCHes only source_surface when empty/unknown on existing contacts
// ---------------------------------------------------------------------------
{
  const pyCheck = `
import sys
sys.path.insert(0, ${JSON.stringify(path.join(ROOT, "scripts"))})
import kit_to_resend_sync as k

k.time.sleep = lambda _: None
calls = []
def fake_resend(method, path, body=None):
    calls.append((method, path, body))
    if method == "GET":
        if "new%40example.com" in path:
            return 404, {}
        if "empty%40example.com" in path:
            return 200, {"id": "c_empty", "unsubscribed": True, "properties": {"lane": "hub", "source_surface": "unknown"}}
        if "set%40example.com" in path:
            return 200, {"id": "c_set", "unsubscribed": False, "properties": {"lane": "hub", "source_surface": "bryancollins@hub-newsletter"}}
    return 200, {"id": "c_new"}

k.resend = fake_resend
rows = [
    {"email": "new@example.com", "created_at": "2026-11-09T00:00:00Z", "first_name": "New"},
    {"email": "empty@example.com", "created_at": "2026-11-09T00:00:00Z", "first_name": "Empty"},
    {"email": "set@example.com", "created_at": "2026-11-09T00:00:00Z", "first_name": "Set"},
]
counts, _ = k.sync(rows, dry_run=False)
assert counts == {"read": 3, "created": 1, "existing": 2, "invalid": 0}, counts

post_calls = [c for c in calls if c[0] == "POST" and c[1] == "/contacts"]
assert len(post_calls) == 1
assert post_calls[0][2]["properties"] == {
    "lane": "kit-intake",
    "kit_source": "kit-sync",
    "source_surface": "bryancollins@kit-sync",
}

patch_calls = [c for c in calls if c[0] == "PATCH"]
assert len(patch_calls) == 1, patch_calls
assert patch_calls[0][1] == "/contacts/c_empty"
assert patch_calls[0][2] == {"properties": {"source_surface": "bryancollins@kit-sync"}}
print("PASS (kit_to_resend_sync.py): new contact has source_surface and existing contact PATCH touches only source_surface")
`;
  const out = execFileSync("python3", ["-c", pyCheck], { encoding: "utf8" }).trim();
  console.log(out);
}
