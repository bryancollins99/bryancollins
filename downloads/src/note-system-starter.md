# The Plain-Text Note System

A note system you own for good. No app lock-in, no subscription, no export button you will one day need and not find.

Bryan Collins · bryancollins.com

---

## Why plain text

Every note app I have used since 2010 is either gone, bought, or now costs more than it did. Evernote, OneNote, Roam, Notion. The notes I still have are the ones I kept as plain text files in a folder.

Plain text survives because nothing owns it. A `.md` file opens in any editor on any machine in any year. That is the whole argument.

This is the system I use. It takes about twenty minutes to set up.

---

## 1. The folder structure

Four folders. No more.

```
notes/
  inbox/        everything lands here first, unsorted
  notes/        permanent notes, one idea each
  sources/      books, articles, videos, podcasts
  drafts/       things becoming articles
```

The rule that makes it work: **`inbox/` is allowed to be a mess, and the other three are not.** You capture without thinking, and you file when you have thirty seconds spare. Most systems die because they demand you file at capture time, which is exactly when you have no attention to spare.

---

## 2. The naming convention

```
YYYY-MM-DD-short-hyphenated-title.md
```

Examples:

```
2026-03-14-compound-interest-applies-to-audiences.md
2026-03-14-book-atomic-habits-clear.md
2026-04-02-why-my-second-drafts-are-faster.md
```

Why the date first: your file browser sorts chronologically for free, and you can always find a note by roughly when you had the thought, even when you have forgotten what you called it.

Why hyphens, not spaces: every tool, script, and URL handles them without escaping.

Why no numbers or IDs: the classic Zettelkasten used numeric IDs because Luhmann was working with paper. You are not. Search does that job now.

---

## 3. The three note types

Every note is one of three things. If it is two things, it is two notes.

### Source notes

What someone else said. Lives in `sources/`.

```markdown
# Atomic Habits — James Clear

Type: book
Read: 2026-03-14

## What it argues
Habits compound. Small changes look like nothing for months and then
look like everything.

## Quotes worth keeping
p.18 "You do not rise to the level of your goals. You fall to the
level of your systems."

## What I disagree with
The identity chapter overstates it. Changing what you believe about
yourself is a result of behaviour change, not reliably a cause.
```

### Permanent notes

What **you** think, in your own words, one idea per file. Lives in `notes/`.

The test: could a stranger read this note on its own, with no other context, and understand the idea? If not, it is not finished.

```markdown
# Compound interest applies to audiences

An audience grows the way money does: nothing visible for a long
period, then a curve that looks sudden but was not.

This is why most people quit at month seven. The curve has not
arrived yet and there is no signal that says it will.

The practical consequence: judge the inputs, not the outputs, for
the first year. Did you publish? That is the metric. Views are a
lagging indicator of a decision you made months ago.

Related: 2026-03-14-book-atomic-habits-clear.md
```

### Draft notes

Things becoming articles. Lives in `drafts/`. These are allowed to be bad.

---

## 4. Linking

One line at the bottom of a note:

```
Related: 2026-03-14-book-atomic-habits-clear.md
```

That is it. Plain filenames. Any editor with search will find backlinks by searching the filename. You do not need a graph view. Nobody has ever written a better article because of a graph view.

---

## 5. Backup

```
cd ~/notes
git init
git add -A
git commit -m "notes"
```

Run those last two lines whenever you think of it. Push to a private repo if you want off-machine backup. Your entire life's thinking, versioned, free, and readable in forty years.

---

## 6. Ten prompts that turn notes into drafts

Paste these into Claude, ChatGPT, or Gemini with the note text attached. They work because they operate on *your* thinking, not on the model's.

1. Here are six notes I wrote over the last month. What is the argument they are circling that I have not stated directly?

2. This note makes a claim. Give me the strongest counterargument, then tell me whether the claim survives it.

3. Turn this permanent note into an article outline. Keep my wording for the central claim; suggest structure only.

4. I have these three unrelated notes. Is there a connection I am missing, or are they genuinely unrelated? Say so plainly if they are.

5. Read this source note. What question does this book leave unanswered that I could answer from experience?

6. This draft is 900 words and flabby. Cut it to 500 without losing any claim.

7. Which of these notes is the one a reader would actually pay for, and why?

8. I wrote this note eight months ago. Given what I now think, what is wrong with it?

9. Give me five openings for this piece. No questions, no "in this article".

10. What am I assuming in this note that I have not checked?

---

## Where to go next

This is the free starter. If you want the full system — the capture workflow, the weekly review, the template pack, and the scripts I use to turn a folder of notes into a publishable draft — that is **The Zettelkasten for Creators Kit**.

bryancollins.com/zettelkasten-kit

---

© Bryan Collins · bryancollins.com
