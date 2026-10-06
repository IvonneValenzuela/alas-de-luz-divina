---
name: review-tests
description: Read-only audit of a feature's tests (Playwright E2E and Vitest Unit/Component) against its spec.md acceptance criteria and its confirmed test-plan.md, classifies coverage (including cases the plan deliberately left out or routed to manual QA), checks every planned case was actually written, catches data drift, flags POM violations. Invoked as /review-tests <feature-name> [optional additional scenarios]. Use as the final check before closing a feature.
---

# Review tests

A read-only audit that catches drift between what a feature's tests assert and what the code/data actually does now. Unlike `write-tests`, this skill never writes or modifies files, it only reports findings and waits.

## Scope

- Reads: `spec.md` for the named feature, the feature's confirmed `test-plan.md` if one exists, the feature's test file(s) at every level (Playwright E2E and Vitest Unit/Component), the project's `AGENTS.md`/`CLAUDE.md`, the actual data/config files any test asserts literal values against, the project's shared page object file(s).
- Writes: nothing. Never edits the test file, never edits spec.md, never edits anything else. This is an audit.
- Only audits this feature's own tests against this feature's own spec (and any scenarios the user adds at invocation), it is not a general code review of the application.

## Step 1 — Read the acceptance criteria

Read the named feature's `spec.md` acceptance criteria list in full. Then look for this feature's section in the confirmed test plan at the path this project's `AGENTS.md` documents (eg `tests/test-plan/test-plan.md`, one section per feature, headed with the feature's folder name). If it exists, read that section in full too, especially its test case IDs, its Left out section, and any case marked for manual QA: it records the user's own decisions about what gets automated, at which level, and what doesn't. If it doesn't exist (features tested before this workflow), say so in the report and audit against `spec.md` alone.

If the user points to a different test case document instead, treat only this feature's section of it as its test plan, and leave every other section untouched. If it's unclear which section belongs to this feature, ask rather than guessing.

## Step 2 — Read the tests

Read every test file for this feature, Playwright and Vitest alike, in full: every test, every assertion, and every comment, not just the file names. A comment left by `write-tests` naming a case as left for manual QA is real evidence for Step 4, read for those too, not just assertions.

## Step 3 — Fold in user-provided scenarios

If the user listed additional scenarios directly in the invocation, treat each one exactly like a spec.md acceptance criterion, same classification in Step 4, same rigor everywhere else. The "don't invent coverage" rule in Step 8 only limits what this skill adds on its own initiative, it never limits what the user explicitly asked to be checked.

## Step 4 — Classify every criterion

Go through EVERY criterion, spec.md's plus any user-provided ones, one by one. Before settling on Partially covered or Not covered, check whether the unmet portion is a documented decision (below), that check comes first. For each, classify it explicitly as one of:

- **Fully covered**: a real assertion, at any level, verifies exactly what the criterion describes.
- **Partially covered**: some part of what the criterion describes is checked, but not all of it, and the missing part is not a documented decision. Say specifically what's missing.
- **Left out by decision**: the unmet part is explicitly listed in `test-plan.md`'s Left out section, or marked there for manual QA, or named in a manual QA comment in the test file. Only use this when that record actually exists and names this criterion or this part of it, never infer intent on your own. If the criterion mixes an automated part with a part left out, evaluate the automated part normally and note the left-out part separately; if the automated part is fully met, the criterion overall is Fully covered.
- **Not covered**: no test touches this criterion at all, and no record marks it as a deliberate decision.

For features with no `test-plan.md`, tested under the retired `plan-tests` skill, one legacy rule still applies: that skill never automated visual/pixel assertions (computed colors, shapes, exact spacing or position), so an unmet part that is purely visual counts as Left out by decision, citing "legacy plan-tests policy" as the record.

List every criterion by name with its classification. Don't summarize as "looks mostly fine" or group multiple criteria together, each gets its own line.

If a test plan exists, also check the other direction: every case ID it lists, whatever prefix the plan uses (for example FOOTER-01 or TC01), should map to a real test or to a manual QA comment. Report any planned case with neither as **Planned but not written**.

## Step 5 — Cross-check literal values against real data

For any literal value a test asserts (a name, price, label, or similar) that corresponds to a specific entry in a data/config file, look up that entry's actual current value in the real file and compare. The failure mode this catches is a copy-paste mismatch, a value from one entry asserted against a different entry's test (e.g. a test for therapy B asserting therapy A's price). Report every mismatch found, with the asserted value and the actual current value, file and line for each.

## Step 6 — Check Page Object Model discipline

These checks apply to E2E files only, Vitest files don't use page objects.
Check `AGENTS.md`/`CLAUDE.md` first for this project's documented POM convention, then apply it:

- Flag any locator written inline in a test that appears more than once (within this file or across this feature's test files), or that duplicates a locator already defined in the project's shared page object, it should live in the page object instead.
- Flag repeated per-test setup (e.g. instantiating a page object in every single test) that should instead live once in `beforeEach` with a shared variable.

## Step 7 — Report and stop

Present findings grouped by category: coverage classification (Step 4, including any Left out by decision and Planned but not written entries), data mismatches (Step 5), POM violations (Step 6). In the summary, count Left out by decision entries on their own line, separate from Fully/Partially/Not covered counts, so they don't read as coverage gaps. List any Planned but not written cases on their own line too. Do not rewrite the test file, do not edit spec.md, do not fix anything yourself. Wait for the user's explicit go-ahead before any change is made, this skill's job ends at the report.

## Step 8 — Don't invent coverage

Never propose or imply a test case beyond what spec.md's criteria, the confirmed test-plan.md, and any user-provided scenarios from Step 3 actually require, no "you might also want to test..." additions, if it's not in the criteria and the user didn't ask for it, it's out of scope for this audit.