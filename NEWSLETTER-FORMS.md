# Newsletter forms

Every email form on bryancollins.com posts to `netlify/functions/subscribe.mjs`, which
writes to Resend. Kit (formerly ConvertKit) is retired as the sender; it stays on its
free plan only as a Creator Network intake, synced weekly into Resend.

Plan of record: `~/.claude/handoff/kit-to-resend-2026-10-28/PRD-kit-to-resend-migration.md`.

## What the function does

1. Rejects posts whose Origin/Referer is not a bryancollins.com host (403).
2. Fakes success for bots: `website` honeypot filled, or `elapsed` under 2.5 s.
3. Throttles to 5 signups per IP per hour (Netlify Blobs, fails open).
4. Creates the Resend contact in segment `Bryan Collins Newsletter`
   (`389c476f-521e-444d-9932-770c5a443645`) with property `lane`. An existing contact
   is added to the segment; its account-wide `unsubscribed` flag is never touched.
5. Emails the lane's download, when the lane has one.
6. For a reader new to the newsletter only: fires `bc.subscribed` (the
   `BC 1 · Welcome` automation) and a PostHog `Email Signup` event
   (`$host = bryancollins.com`, `lane`).
7. Redirects (303) to `/thank-you?lane=<lane>`.

Without `RESEND_API_KEY` it is a dry run: guards run, nothing is written.

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
# expect 303 Location: /thank-you?lane=note
curl -i -X POST http://localhost:8888/.netlify/functions/subscribe -d 'email=a@b.co'
# expect 403 (no Origin)
```
