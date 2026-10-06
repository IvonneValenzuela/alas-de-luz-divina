---
name: close-feature
description: Close out a finished feature — mark spec.md's acceptance criteria and Status as done with real evidence, and move the feature's line to "Done" in the constitution roadmap. Never runs the Playwright suite itself, relies on plan-tests'/verify-tasks' evidence instead. Run after verify-tasks confirms tasks.md is fully checked with no open discrepancies.
---

# Close feature

The last step before a feature is truly done: reconcile `spec.md` against
reality and record the feature as done in the constitution roadmap. This
runs *after* `tasks.md` is settled — it does not itself audit implementation
work, [[verify-tasks]] already did that.

## Scope

- Reads: `spec.md`, `tasks.md` (for cross-checking and to locate the two
  closing-task lines), the actual code/content the feature touches.
- Writes: `spec.md`, `spec/constitution/constitution.md`, and `tasks.md` —
  but `tasks.md` may only be touched to check off the two closing-related
  task lines (see Step 6). Nothing else in `tasks.md` is ever added,
  reworded, checked, or unchecked by this skill.
- Never opens `plan.md` for editing.
- Never runs `npx playwright test`, not even scoped to one file (see
  Step 2). This environment is memory-constrained and a fresh Playwright
  run has crashed the session more than once. `plan-tests` owns running
  Playwright, scoped safely and with its own crash handling, per
  `/AGENTS.md`.

## Step 0 — Confirm the precondition

This skill assumes `verify-tasks` already ran and `tasks.md` is fully
checked with no open discrepancies. Don't assume that silently:

- If `verify-tasks` was run earlier in this same session and confirmed a
  clean result, that's enough — proceed.
- Otherwise, open `tasks.md` yourself and check: is every box `[x]`? Do any
  of those checkmarks look stale or unverified (a task claiming something
  was done that a quick look says wasn't)? If anything is unchecked or
  looks questionable, stop and tell the user — ask them to run `verify-tasks`
  first, or confirm explicitly that it's fine to proceed anyway. Don't close
  a feature whose task list you have reason to doubt.

## Step 1 — Identify the target feature

Same resolution as `verify-tasks`: accept an arg naming the feature (`001`,
`001-about-paula`, or a path), or infer it from the current git branch name
or recently touched `spec/features/NNN-name/` folder. Ask the user if it's
ambiguous rather than guessing.

## Step 2 — Read spec.md and gather evidence

Read `spec.md` in full — every acceptance criterion, the Status field, and
the Content/Out-of-scope sections for context.

For each acceptance criterion, verify it the same way `verify-tasks` does:
not from conversation memory, but from real evidence —

- Cross-check against `tasks.md`: does a completed task line actually cover
  this criterion?
- Read the real, current code or content the criterion describes (the
  component, the data file, the CSS) and confirm it matches what the
  criterion says, not just that something-shaped exists.
- Where relevant and cheap, run a check (`npm run lint`, `npm run build`)
  rather than assume. Never run `npx playwright test` yourself (see Scope).
  For a criterion whose evidence is a passing test, treat `plan-tests`' last
  recorded result, or a discrepancy `verify-tasks` already flagged, as the
  evidence instead of re-running the suite.

## Step 3 — Mark acceptance criteria

For each `- [ ]` line in `spec.md`:

- **Evidence found** → mark `[x]`.
- **No evidence, or only partial** → leave unchecked, and say so plainly in
  your final summary along with what's missing. Don't check a box to make
  the list look done — if criteria are left unchecked, the feature isn't
  actually ready to close, and you should say that rather than proceeding
  to Steps 4–5 as if it were.

If you're under ~80% sure a criterion is genuinely met, ask the user or
leave it unchecked — don't guess it into a checkmark.

## Step 4 — Update spec.md's Status field

Only if every acceptance criterion is now checked (either already was, or
you just verified it): update the `**Status:**` line to reflect the feature
is done, matching whatever convention the file already uses for that field
(check other closed features' `spec.md` under `spec/features/` for the
exact wording this project uses, if any exist — don't invent a new
convention).

If criteria remain unchecked, leave Status alone and explain why in the
summary.

## Step 5 — Update the constitution roadmap

Only proceed here once Step 4 actually updated Status to done.

Open `spec/constitution/constitution.md`. Find this feature's line —
it'll be under "Next" or "Backlog / Ideas" or wherever it currently sits.
Move it into the "Done" section, keeping the same one-line
description style already used for other entries there (bold short name,
em dash, one factual sentence — match whatever the existing "Done" bullets
actually look like rather than inventing a new format). Remove it from
its old location; don't leave a duplicate.

Don't reword, expand, or editorialize the description beyond what's needed
to fit the "Done" section's existing phrasing style.

## Step 6 — Check off the closing tasks in tasks.md

Only proceed here once Steps 4 and 5 actually happened (Status updated,
constitution line moved). At that point this skill has direct, first-hand
evidence of having just done that exact work itself — not a claim it's
inferring or trusting from elsewhere — so it may check off the two
`tasks.md` lines that describe it:

- The line for re-checking/marking spec.md's acceptance criteria as done.
- The line for updating constitution.md to move the feature to "Done".

These may be a single combined line or two separate ones, and this
project's exact phrasing may differ — find the line(s) in `tasks.md` that
describe this closing work by meaning, not by exact string match, and mark
only those `[x]`. Do not touch any other line in `tasks.md` — no other
checkbox, no wording, nothing added. If you can't find a line that clearly
describes this closing work, leave `tasks.md` untouched and say so in the
summary rather than guessing which line it is.

If Step 4 or Step 5 didn't happen (criteria left unchecked, feature not
actually closed), skip this step entirely — there's no first-hand evidence
of closing work to check off.

## Step 7 — Summarize

Before finishing, tell the user plainly:
- Which acceptance criteria got newly checked, and what evidence backed each.
- Any acceptance criteria left unchecked, and what's missing — and if any
  are unchecked, that the feature was **not** closed (spec.md Status left
  alone, constitution.md untouched, tasks.md untouched) and why.
- The exact Status change made to `spec.md`, if any.
- The exact move made in `constitution.md` (from which section to "Done"),
  if any.
- Which `tasks.md` line(s), if any, got checked off in Step 6, quoted
  verbatim — or, if none were found to check, say that plainly too.