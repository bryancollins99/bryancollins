#!/usr/bin/env node
// scripts/bfcm-2026/create-stripe-bundles.mjs
//
// Dry-run by default. With --apply and STRIPE_SECRET_KEY set, creates the $69 USD
// one-time Stripe Product + Price + Payment Link for "The Solo Operator's Claude
// Code & Plain-Text Stack (All 4 Kits)" on bryancollins.com.

const apply = process.argv.includes("--apply");
const secretKey = process.env.STRIPE_SECRET_KEY || "";

const SPEC = {
  productName: "The Solo Operator's Claude Code & Plain-Text Stack (All 4 Kits)",
  statementDescriptor: "BRYAN COLLINS STACK",
  unitAmountCents: 6900,
  currency: "usd",
  metadata: {
    slug: "solo-operator-stack-2026",
    site: "bryancollins.com",
    campaign: "bfcm-2026",
  },
  afterCompletionUrl: "https://bryancollins.com/thank-you.html?bundle=operator-stack",
};

async function stripePost(endpoint, params) {
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Stripe ${endpoint} ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function main() {
  if (!apply) {
    console.log("[bfcm-stripe] DRY RUN (pass --apply with STRIPE_SECRET_KEY to mint live $69 Payment Link):");
    console.log(JSON.stringify(SPEC, null, 2));
    return;
  }
  if (!secretKey) {
    console.error("Missing STRIPE_SECRET_KEY.");
    process.exit(1);
  }
  const prod = await stripePost("products", {
    name: SPEC.productName,
    statement_descriptor: SPEC.statementDescriptor,
    "metadata[slug]": SPEC.metadata.slug,
    "metadata[site]": SPEC.metadata.site,
    "metadata[campaign]": SPEC.metadata.campaign,
  });
  const price = await stripePost("prices", {
    product: prod.id,
    unit_amount: String(SPEC.unitAmountCents),
    currency: SPEC.currency,
  });
  const link = await stripePost("payment_links", {
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
    "automatic_tax[enabled]": "true",
    "metadata[slug]": SPEC.metadata.slug,
    "metadata[site]": SPEC.metadata.site,
    "after_completion[type]": "redirect",
    "after_completion[redirect][url]": SPEC.afterCompletionUrl,
  });
  console.log(JSON.stringify({ created: true, payment_link_id: link.id, checkout_url: link.url }, null, 2));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
