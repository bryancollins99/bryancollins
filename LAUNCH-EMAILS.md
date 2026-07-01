# LAUNCH-EMAILS.md — The Builder's Pipeline send package

All drafts, nothing scheduled. Voice: field report, no hype, single CTA.
House rules applied: no em dashes, no "Reply with X" CTAs, no countdown scarcity.

Data behind the approach: this list's "how I build" emails get 2.7-3.3% CTR vs
0.5-0.9% for pitch-shaped emails, and the March email about these exact scripts
drew 305 unique clicks. So the launch email IS a build story with a buy link,
not a sales letter. The list also sat through a "closing forever" sequence in
May; the warm-up gives pure value first and the launch leads with the apology.

---

## EMAIL 1 — Warm-up (send ~3 days before launch)

**Purpose:** pure value, zero ask. Gives away one full manual-mode prompt from
the product. No product mention, no link to the sales page. It quietly proves
the method works before anything is for sale.

**Subject:** Steal my Friday content prompt (the whole thing)
**Preview text:** Paste this into Claude with your week's notes. That's it.

Every Friday I run the same routine.

I open my worklog. It's a plain text file where I write one line whenever I
finish something. Things like: "Fixed the newsletter signup bug. 30 mins. It
was the cache, it's always the cache."

Then I feed the week's lines to Claude with a prompt I've been refining for
about a year. Out comes my content for the week: LinkedIn post ideas with the
hooks already written, a newsletter topic with structure, two YouTube ideas.
All of it true, because all of it came from work I actually did.

Today I'm giving you the entire prompt. No signup, no catch. Here it is:

You are a content idea generator for a builder who documents their work.

MY WRITING VOICE:
{Describe how you write in 1-3 sentences. Example: "Direct and practical.
First-person field reports about what I actually built. Specific numbers
over adjectives, no hype."}

PHILOSOPHY (apply this strictly):
- Content is the exhaust, not the engine. Every idea must come from
  something in my worklog below. Never invent generic advice.
- Report on builds and systems. Wrap every build in a personal story.
- If the worklog doesn't support an idea, don't force one. Fewer, truer
  ideas beat a full quota of generic ones.

AVOID: motivational fluff, "how to" listicles disconnected from my actual
week, anything about topics not present in the worklog.

MY WORKLOG (last 7 days):
{Paste your worklog entries here}

YOUR JOB. Generate, in this exact structure:

1. ONE-SENTENCE RESULT OF THE WEEK
   The single most concrete outcome, stated plainly with any real numbers.

2. LINKEDIN POST IDEAS (3-5)
   For each:
   - Hook: the literal opening line (make it specific, not clever)
   - Angle: the unique perspective that makes this mine
   - Evidence: which worklog entry backs it, plus numbers to include
   - CTA: one closing question or invitation

3. NEWSLETTER TOPIC (1)
   - Subject line
   - Structure: opening story, what I did, what I learned, takeaway
   - The one-sentence result it's built around

4. YOUTUBE VIDEO IDEAS (2, tutorial-focused)
   - Title (max 60 chars)
   - What I'd show on screen
   - Why someone would finish watching it

Make every idea specific enough that I could start writing in the next
five minutes without another decision.

How to use it:

1. Keep a worklog for one week. One line per finished thing. What you did,
   how long it took, one thing you learned.
2. Friday: fill in the two placeholders and paste the whole prompt into
   Claude (the free tier is fine).
3. Pick the best idea and write it.

The magic isn't the AI. It's the worklog. If you write down what you actually
do, you never face a blank page again, because the content already happened.
You just have to notice it.

Try it this week. That's the whole email.

Bryan

---

## EMAIL 2 — Launch (3 subject line variants)

**Subject A (field-report pattern, matches his best openers):**
I owed 305 of you an apology (and a product)

**Subject B (story pattern):**
The $39 product I promised in March finally exists

**Subject C (plain utility):**
The Builder's Pipeline is ready: my 6 content scripts, packaged

**Preview text:** The link you clicked in March goes somewhere real now.

**Body:**

In March I sent an email about the six Python scripts that run my Friday
content routine. At the end I said I was packaging them up for $39 and
dropped a link.

Three hundred and five of you clicked that link.

Then the product page died before most of you could buy. No dramatic story:
I was running a portfolio of sites, an MBA, and a house with small kids in
it, and finishing the packaging kept sliding down the list. The demand was
real. The product wasn't. That one's on me.

It exists now, properly. It's called The Builder's Pipeline.

What it is: the exact system I use to turn a week of one-line worklog notes
into publishable content. You saw a piece of it on Tuesday when I sent you
my Friday prompt. The full version is:

1. Content Pipeline: worklog in, 3-5 LinkedIn ideas with hooks, a newsletter
   topic, and 2 YouTube ideas out. About 30 seconds.
2. Deep Pattern Analyzer: finds the themes in your week, and the gaps
   between what you say matters and where your time went.
3. Draft Generator: writes the actual drafts. Two or three full newsletter
   emails, three LinkedIn posts, in your voice, from your real week.
4. Email Analyzer: paste any draft, get 10-section editorial feedback.
5. Newsletter Scheduler: markdown file to scheduled Kit email, one command.
6. YouTube Email Generator: video URL in, promo email out.

Two honest caveats before you spend money:

First, the scripts need Python and an Anthropic API key (about 20 cents a
week in usage). The setup guide assumes you've never opened a terminal, but
if that still sounds like homework: every script also ships as a copy-paste
prompt. Tuesday's email was one of them. You can run the whole system in
Claude's chat window and never install anything.

Second, this reads your worklog. If you don't do the work and write it down,
the pipeline has nothing to say. It kills the blank page. It doesn't replace
the week.

It's $39, one time. That's the price I quoted in March, and it stays $39.
No countdown, no closing date, no "founding member" tiers. Buy it this week
or in October, same price.

Get The Builder's Pipeline ($39):
https://bryancollins.com/builders-pipeline.html

If you were one of the 305: thank you for the patience.

Bryan

P.S. This email was drafted by script #3 and scheduled by script #5. Ten
minutes of editing. The system sells itself by existing.

[NOTE BEFORE SENDING: the P.S. must be literally true. Draft this send by
running draft-generator.py on your real worklog and schedule it with
schedule-newsletter.py (needs a fresh ANTHROPIC_API_KEY: the one in
~/src/zettelkasten/scripts/.env is dead as of 2026-07-01). If you send via
the Kit dashboard instead, delete the P.S.]

---

## EMAIL 3 — Follow-up (send ~4 days after launch; final planned mention)

**Subject:** What buyers did with the pipeline in week one
**Preview text:** Three small stories and one honest limitation.

[NOTE: fill the three stories with real buyer replies or real personal usage
from launch week before sending. Do NOT invent testimonials. If there are no
stories yet, replace with "here is what MY pipeline produced this week" and
show actual output. The structure below assumes the fallback version.]

Quick follow-up on The Builder's Pipeline, then I'll stop mentioning it in
every email.

Here's what my own pipeline produced this Friday, unedited: [paste the real
Content-Pipeline output list from this week's run, trimmed to the idea
titles]. The LinkedIn post you maybe saw on Monday was idea #2 on that list.
Total time from "no ideas" to "week scheduled": about 25 minutes.

One thing early buyers asked about, worth answering publicly: no, it doesn't
work if your week has nothing in it. One buyer wrote that her first run felt
thin. She'd logged two lines all week. The fix wasn't a better prompt, it
was a fuller worklog, and her second Friday run came out completely
different. The pipeline is a mirror. That's the deal.

It's $39, one time, same as last week and next month:
https://bryancollins.com/builders-pipeline.html

That's the last dedicated email about it. Back to regular field reports on
Thursday.

Bryan

---

## YOUTUBE COMMUNITY POST (launch day)

In March I mentioned the six Python scripts that turn my worklog into a
week of content (some of you saw the video about scheduling my newsletter
from the terminal). I finally packaged them properly: scripts, templates,
sample output, and a no-code version of every script as a copy-paste Claude
prompt for the non-programmers.

It's called The Builder's Pipeline. $39 one time, no subscription.

bryancollins.com/builders-pipeline.html

And if you just want the free version: last Tuesday's newsletter gave away
the full Friday content prompt, no signup needed. It's the same method,
done by hand.

---

## Send sequence summary

| Day | Send | CTA |
|---|---|---|
| Day 0 (e.g. Tue) | Warm-up: full free prompt | none |
| Day 3 (e.g. Fri) | Launch: apology + product | buy link, once |
| Day 3 | YouTube community post | buy link + free-prompt mention |
| Day 7 (e.g. Tue) | Follow-up: real usage, honest limitation | buy link, once, final |

After day 7 the product moves to the site nav and email signature only.
