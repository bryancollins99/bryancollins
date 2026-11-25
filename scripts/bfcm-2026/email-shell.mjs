// scripts/bfcm-2026/email-shell.mjs
//
// Strict Resend-compliant HTML email shells (table-based layout, 100% inline CSS,
// explicit bgcolor, web-safe font stacks, zero JavaScript, zero <style> tags).

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function p(html, font = "Arial,Helvetica,sans-serif", color = "#111827") {
  return `<p style="margin-top:0;margin-bottom:16px;font-family:${font};font-size:16px;line-height:26px;color:${color};">${html}</p>`;
}

export function h2(text, font = "Arial,Helvetica,sans-serif", color = "#111827") {
  return `<h2 style="margin-top:24px;margin-bottom:10px;font-family:${font};font-size:19px;line-height:26px;font-weight:bold;color:${color};">${esc(text)}</h2>`;
}

export function ctaButton({ label, href, bg = "#111827", fg = "#FFFFFF", font = "Arial,Helvetica,sans-serif" }) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;margin-bottom:20px;"><tr><td align="center" bgcolor="${bg}" style="background-color:${bg};border-radius:6px;padding-top:13px;padding-bottom:13px;padding-left:22px;padding-right:22px;"><a href="${href}" style="font-family:${font};font-size:15px;line-height:20px;font-weight:bold;color:${fg};text-decoration:none;display:inline-block;">${esc(label)}</a></td></tr></table>`;
}

export function bulletList(items, font = "Arial,Helvetica,sans-serif", color = "#111827") {
  const rows = items
    .map(
      (item) =>
        `<tr><td valign="top" style="padding-top:0;padding-bottom:8px;padding-right:10px;font-family:${font};font-size:16px;line-height:24px;color:${color};">&bull;</td><td valign="top" style="padding-top:0;padding-bottom:8px;font-family:${font};font-size:16px;line-height:24px;color:${color};">${item}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:16px;">${rows}</table>`;
}

export function calloutBox({ title, bodyHtml, border = "#E5E7EB", bg = "#F9FAFB", font = "Arial,Helvetica,sans-serif" }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bg}" style="background-color:${bg};border:1px solid ${border};border-radius:6px;margin-top:8px;margin-bottom:20px;"><tr><td style="padding-top:16px;padding-bottom:16px;padding-left:18px;padding-right:18px;font-family:${font};font-size:15px;line-height:24px;color:#111827;"><div style="font-family:${font};font-size:16px;line-height:22px;font-weight:bold;color:#111827;margin-bottom:6px;">${esc(title)}</div>${bodyHtml}</td></tr></table>`;
}

export function wrapPersonalEmail({ title, previewText, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>${esc(title)}</title></head>
<body style="margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;background-color:#FFFFFF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#FFFFFF;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background-color:#FFFFFF;"><tr><td align="center" style="padding-top:28px;padding-bottom:28px;padding-left:18px;padding-right:18px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;"><tr><td>
${bodyHtml}
<p style="margin-top:20px;margin-bottom:0;padding-top:14px;border-top:1px solid #E5E7EB;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Consistent Publishing Ltd &middot; Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland &middot; <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#6B7280;text-decoration:underline;">Unsubscribe</a></p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

export function wrapBawtEmail({ title, previewText, kicker, bodyHtml }) {
  const serif = "Georgia,'Times New Roman',Times,serif";
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>${esc(title)}</title></head>
<body style="margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;background-color:#FAF7F2;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#FAF7F2;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FAF7F2" style="background-color:#FAF7F2;"><tr><td align="center" style="padding-top:28px;padding-bottom:28px;padding-left:16px;padding-right:16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="max-width:560px;background-color:#FFFFFF;border-top:3px solid #B23A48;border-radius:6px;"><tr><td style="padding-top:28px;padding-bottom:28px;padding-left:26px;padding-right:26px;">
<div style="font-family:${serif};font-size:18px;line-height:24px;color:#1C1917;margin-bottom:6px;">Become a Writer <span style="color:#B23A48;">Today</span></div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;color:#B23A48;margin-bottom:18px;">${esc(kicker)}</div>
${bodyHtml}
<p style="margin-top:22px;margin-bottom:0;padding-top:14px;border-top:1px solid #E7E2DA;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#78716C;">Become a Writer Today &middot; Consistent Publishing Ltd, Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland &middot; <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#78716C;text-decoration:underline;">Unsubscribe</a></p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

export function wrapBrandCardEmail({ title, previewText, brandName, kicker, accentColor = "#174A2C", bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>${esc(title)}</title></head>
<body style="margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;background-color:#F4F5F7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#F4F5F7;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F5F7" style="background-color:#F4F5F7;"><tr><td align="center" style="padding-top:28px;padding-bottom:28px;padding-left:16px;padding-right:16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="max-width:580px;background-color:#FFFFFF;border-top:4px solid ${accentColor};border-radius:6px;"><tr><td style="padding-top:28px;padding-bottom:28px;padding-left:26px;padding-right:26px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;letter-spacing:1.2px;text-transform:uppercase;font-weight:bold;color:${accentColor};margin-bottom:4px;">${esc(brandName)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#6B7280;margin-bottom:18px;">${esc(kicker)}</div>
${bodyHtml}
<p style="margin-top:22px;margin-bottom:0;padding-top:14px;border-top:1px solid #E5E7EB;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6B7280;">Consistent Publishing Ltd &middot; CRO 742884 &middot; Landscape House, Baldonnell Business Park, Dublin D22 P3K7, Ireland &middot; <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#6B7280;text-decoration:underline;">Unsubscribe</a></p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

// Vendors.ie ven-style2 shell matching netlify/functions/lib/templates.mjs + weekly-personal.mjs (R345)
export function vendorsDataCard({ heading, subheading, subColor = "#0F172A", rows }) {
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding-top:6px;padding-bottom:6px;color:#64748B;border-top:1px solid #E2E8F0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;">${esc(k)}</td><td align="right" style="padding-top:6px;padding-bottom:6px;border-top:1px solid #E2E8F0;font-family:'Courier New',Courier,monospace;color:#0F172A;font-size:14px;line-height:20px;font-weight:bold;">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E2E8F0;border-radius:8px;margin-top:4px;margin-bottom:20px;"><tr><td style="padding-top:18px;padding-bottom:18px;padding-left:18px;padding-right:18px;">
<p style="margin-top:0;margin-bottom:4px;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:24px;font-weight:bold;color:#0F172A;">${esc(heading)}</p>
<p style="margin-top:0;margin-bottom:14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;font-weight:bold;color:${subColor};">${esc(subheading)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}</table>
</td></tr></table>`;
}

export function vendorsToolBlock({ kicker, title, body, href, cta, note }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F8FAFC" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;margin-top:22px;margin-bottom:20px;"><tr><td style="padding-top:18px;padding-bottom:18px;padding-left:18px;padding-right:18px;">
<p style="margin-top:0;margin-bottom:4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#64748B;">${esc(kicker)}</p>
<p style="margin-top:0;margin-bottom:6px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#0F172A;">${esc(title)}</p>
<p style="margin-top:0;margin-bottom:14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#334155;">${esc(body)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="#0B5FFF" style="background-color:#0B5FFF;border-radius:6px;padding-top:11px;padding-bottom:11px;padding-left:18px;padding-right:18px;"><a href="${href}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;font-weight:bold;color:#FFFFFF;text-decoration:none;display:inline-block;">${esc(cta)}</a></td></tr></table>
${note ? `<p style="margin-top:10px;margin-bottom:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#64748B;">${esc(note)}</p>` : ""}
</td></tr></table>`;
}

export function wrapVendorsEmail({ title, previewText, kicker, bodyHtml, signoffHtml = `<p style="margin-top:24px;margin-bottom:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#0F172A;">Vendors.ie Data Desk</p>` }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>${esc(title)}</title></head>
<body class="ven-style2" style="margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;background-color:#FFFFFF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#FFFFFF;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="background-color:#FFFFFF;"><tr><td align="center" style="padding-top:32px;padding-bottom:32px;padding-left:20px;padding-right:20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;"><tr><td>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:20px;font-weight:bold;color:#0B5FFF;margin-bottom:16px;">Vendors<span style="color:#0F172A;">.ie</span></div>
${kicker ? `<p style="margin-top:0;margin-bottom:14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#64748B;">${esc(kicker)}</p>` : ""}
${bodyHtml}
${signoffHtml}
<p style="margin-top:12px;margin-bottom:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#64748B;"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#64748B;text-decoration:underline;">Unsubscribe from all Vendors.ie email</a></p>
<div style="border-top:1px solid #F1F5F9;padding-top:14px;margin-top:20px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#94A3B8;">Consistent Publishing Ltd, Dublin &middot; CRO 742884 &middot; <a href="https://vendors.ie" style="color:#94A3B8;text-decoration:underline;">vendors.ie</a></div>
</td></tr></table>
</td></tr></table>
</body></html>`;
}
