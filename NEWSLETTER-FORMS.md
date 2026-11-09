# Newsletter forms

Every email form on bryancollins.com posts to `netlify/functions/subscribe.mjs`, which
writes to Resend. Kit (formerly ConvertKit) is retired as the sender; it stays on its
free plan only as a Creator Network intake, synced weekly into Resend.

Plan of record: `~/.claude/handoff/kit-to-resend-2026-10-28/PRD-kit-to-resend-migration.md`.
Attribution PRD: `~/.claude/handoff/signup-attribution-2026-11-09/bryancollins-PRD-1-signup-attribution.md` (R268).

## What the function does

1. Rejects posts whose Origin/Referer is not a bryancollins.com host (403).
2. Fakes success for bots: `website` honeypot filled, or `elapsed` under 2.5 s.
3. Throttles to 5 signups per IP per hour (Netlify Blobs, fails open).
4. Creates the Resend contact in segment `Bryan Collins Newsletter`
   (`389c476f-521e-444d-9932-770c5a443645`) with `lane` and the attribution properties
   (`source_surface`, `signup_page`, `signup_utm_*`, `signup_referrer`). An existing
   contact is added to the segment, its account-wide `unsubscribed` flag is never
   touched, and only empty attribution properties are filled.
5. Emails the lane's download, when the lane has one.
6. Fires `Signup Confirmed` to PostHog on every successful write (new or repeat). For a
   reader new to the newsletter only: fires `bc.subscribed` (the `BC 1 · Welcome`
   automation) and a PostHog `Email Signup` event (`$host = bryancollins.com`, `lane`,
   plus attribution labels).
7. Redirects (303) to `/thank-you?lane=<lane>&form=<form_id>`.

Without `RESEND_API_KEY` it is a dry run: guards run, nothing is written.

## Attribution labels

Every site in the account uses the **same keys on every site** and the `<site>@<slug>`
identifier convention (`bryancollins@<slug>` here).

| Resend contact property | PostHog property | Value |
|---|---|---|
| `source_surface` (fallback `unknown`) | `form_id` | `bryancollins@<slug>`, e.g. `bryancollins@hub-newsletter`, `bryancollins@claude-inline`, `bryancollins@kit-sync` |
| `signup_page` | `signup_page` | page pathname only, no query string, max 120 chars |
| `signup_utm_source` / `_medium` / `_campaign` | `utm_source` / `utm_medium` / `utm_campaign` | from the page's address query at signup time |
| `signup_referrer` | `signup_referrer` | referring website's **host only**, e.g. `google.com`, `linkedin.com` |
| (none) | `site` | `bryancollins` |

Rules:
- **ID convention:** `<site>@<slug>`. `resources/subscribe.js` derives `<slug>` from
  `data-form` when present, otherwise `<lane>-<id of nearest ancestor section[id], else "inline">`
  (e.g. `hub-newsletter` for end-of-post bands, `claude-inline` for the starter-pack form).
  If JS is off or `form` is invalid, the server falls back to `bryancollins@<lane>`.
- **Set-if-empty (first touch wins):** On an existing contact, only attribution keys that
  are empty (`null`, `""`, absent, or `"unknown"`) are PATCHed. A stored `"unknown"`
  counts as empty. Nothing already set is overwritten, and `lane` is never included in
  the fill-empty PATCH.
- **First touch across sites:** Because Become a Writer Today (BAWT) and other properties
  share Resend contacts in the same account, `source_surface` records the reader's first
  touch across sites, not "which form on this list".
- **`source` is never touched:** Resend's `source` property is owned by Content Economy
  account-wide.

## Lanes

| Lane | Pages | Download emailed |
|---|---|---|
| `ai-prompts` | 101-ai-prompts-yt, simple-black-optin | 101 AI Prompts (Google Doc) |
| `medium` | 101-ai-prompts-medium | 101 AI Prompts |
| `linkedin` | 101-ai-prompts-ln | 101 AI Prompts |
| `apollo` | 101-ai-prompts-apollo | 101 AI Prompts |
| `note` | note-system-yt | Plain-Text Note System PDF |
| `claude` | claude-code-yt | Claude Code Starter Pack PDF |
| `linkedin-hooks` | linkedin-hooks, linkedin-hooks-yt | none yet |
| `mba` | mba | none yet |
| `poc` | poc | none yet |
| `chatgpt` | chatgpt | none yet |
| `hub` | index, books, projects, videos, skills/* | none (welcome automation) |
| `newsletter` | newsletter, newsletter.bryancollins.com | none (welcome automation) |

"None yet" lanes delivered whatever their Kit incentive was set to, which Kit's API
does not expose. Add the asset to `LANES` in the function once the link is known.

## Environment

- `RESEND_API_KEY` (required to write). Sending needs the `bryancollins.com` domain
  verified in Resend.
- `RESEND_SEGMENT_ID`, `FROM_EMAIL`, `POSTHOG_API_KEY`: optional overrides.

## Testing

```bash
netlify dev
curl -i -X POST http://localhost:8888/.netlify/functions/subscribe \
  -H 'Origin: http://localhost:8888' -d 'email=you@example.com&lane=note'
# expect 303 Location: /thank-you?lane=note&form=bryancollins%40note
curl -i -X POST http://localhost:8888/.netlify/functions/subscribe -d 'email=a@b.co'
# expect 403 (no Origin)
node scripts/subscribe-attribution-selftest.mjs
```
