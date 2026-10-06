---
name: verify-tasks
description: Reconcile a feature's tasks.md against what was genuinely implemented this session — check off completed tasks, log unplanned work, flag stale checkmarks. Never runs the Playwright suite itself, relies on plan-tests' last recorded result instead. Use before committing a finished feature in a spec/features/NNN-name/ structure.
---

# Verify tasks

Before a feature gets committed, reconcile its `tasks.md` with reality: what the
session actually built, not what was planned or claimed in conversation. This
closes the loop on spec-driven work without letting the checklist drift from
the code.

## Scope

- Reads: `tasks.md`, `spec.md` for the target feature.
- Writes: `tasks.md` only.
- Never opens `plan.md` for editing — it documents the *approach*, not
  progress, and isn't this skill's concern. Leave it untouched even if it
  looks stale.
- Never edits `spec.md` — if a task says something like "mark spec.md
  acceptance criteria as done," verify whether that actually happened and
  report it; don't do it yourself as a side effect of this skill.
- Never runs `npx playwright test`, not even scoped to one file (see Step 3).
  This environment is memory-constrained and a fresh Playwright run has
  crashed the session more than once. `plan-tests` owns running Playwright,
  scoped safely and with its own crash handling, per `/AGENTS.md`.

## Step 1 — Identify the target feature

Args may name a feature (`001`, `001-about-paula`, or a path to its folder).
If given, resolve it under `spec/features/`.

If no args:
- Check the current git branch name for a slug matching a
  `spec/features/NNN-name/` folder.
- Otherwise look at which feature folder's files show up in
  `git diff`/`git status` or were touched earlier in this session.
- If still ambiguous, ask the user rather than guessing which feature they mean.

## Step 2 — Read the source material

Read `spec.md` (for acceptance criteria and scope — what "done" means for
this feature) and `tasks.md` (the checklist to reconcile) in full.

## Step 3 — Gather real evidence

Do not trust conversation summary or memory of what "should" have happened.
Verify against artifacts that actually exist:

- `git log`/`git diff` for the session's commits and working-tree changes,
  scoped to files this feature would touch.
- Read the actual changed files (components, data files, tests) — confirm
  content matches what a task describes, not just that a file with the right
  name exists.
- If a task's completion hinges on a command passing (`npm run lint`,
  `npm run build`, etc.) and it's safe/cheap to run, run it rather than
  assuming. Never run `npx playwright test` yourself, that's `plan-tests`'
  job (see Scope). Treat `plan-tests`' last recorded result as evidence for
  a test-related task instead, or ask the user to confirm tests currently
  pass if you genuinely need that confirmation and no recent result exists.

## Step 4 — Reconcile each existing task line

For every checkbox in `tasks.md`:

- **Unchecked, evidence found** → mark `[x]`.
- **Unchecked, no evidence or only partial** → leave unchecked. Note in your
  summary what's missing — don't fabricate completion to clear the list.
- **Already `[x]`** → spot-check it against evidence too. If it turns out
  *not* to be genuinely done, don't silently uncheck it (that overrides a
  prior human decision without discussion) — flag the discrepancy in your
  summary and let the user decide.

If you're under ~80% sure a task is genuinely done, ask the user or leave it
unchecked with a note — don't guess it into a checkmark.

## Step 5 — Capture unplanned work

Diff what the session actually built against what `tasks.md` describes. Real,
verified work that doesn't map to any existing task line goes under a
section at the end of `tasks.md` titled:

```
## Additional work done beyond the original plan
```

Create this section if it doesn't exist; append to it if it does. Each entry
is a checked `- [x]` bullet, phrased as a factual statement of what was
built (matching the style of existing task lines) — never speculative,
never something you can't point to a concrete change for.

## Step 6 — Summarize for review

Before finishing, tell the user plainly:
- Which tasks got newly checked off, and why (what evidence).
- Which tasks are still unchecked, and what's missing.
- Any discrepancies found (a task marked done that isn't).
- What got added under "Additional work done beyond the original plan."

This mirrors the project's existing review convention — the point is the
user can check the reconciliation against the source of truth (spec, code,
client content) before committing, not that the skill's edits are final by
default.