---
name: plan-and-task-generator
description: Generates plan.md and tasks.md for a feature from its spec.md, matching the project's established structural conventions, then pauses for review and names the exact next command. Never writes application code itself, that's implement-task's job. Invoked as /plan-and-task-generator <feature-name>.
---

# Plan and task generator

Translates an approved `spec.md` into an implementation plan and a task list, following this project's established structure and conventions. This skill only plans, it never implements, [[implement-task]] handles execution once the user approves this skill's output.

## Scope

- Reads: the feature's `spec.md`, `/AGENTS.md` (stack, conventions, design tokens, testing convention), the most recently closed feature's `plan.md` and `tasks.md` as a structural reference.
- Writes: `plan.md` and `tasks.md` for the named feature. Never touches `spec.md`, `constitution.md`, or any application code, writing code is out of scope for this skill entirely.

## Step 1 — Read the spec

Read the named feature's `spec.md` in full: acceptance criteria, content, out-of-scope notes.

## Step 2 — Read project conventions

Read `/AGENTS.md` for stack, design tokens, file structure, and any convention relevant to this feature (e.g. the responsive rule, testing convention, Don't list).

## Step 3 — Find a structural reference

Look at the most recently closed feature's `plan.md` and `tasks.md` under `spec/features/`. Use their section structure and level of detail as a reference for tone and format. Don't force this feature's plan into headings that don't fit what it actually needs, adapt the sections to this feature's content while keeping the same overall shape and phasing style.

## Step 4 — Check confidence before writing

If anything needed to write an accurate plan or task list isn't at least 80% clear from `spec.md` and `AGENTS.md`, stop and ask rather than filling in a guess, per `/AGENTS.md`'s workflow rule.

## Step 5 — Write plan.md and tasks.md

Write both files. `tasks.md` must end with a task line covering closing work (marking `spec.md`'s acceptance criteria done and moving the feature to "Done" in `constitution.md`), so `close-feature` can later find and check it off.

## Step 6 — Stop and wait

Present a short summary of both files, then end the message by stating plainly that generation is done and that running `/implement-task <feature-name> execute` will begin implementation once the user has reviewed both files. Never leave this implicit, always name the exact command. Do not implement anything under any circumstance, that's entirely outside this skill's scope, always wait for the user to move to `implement-task`.
