---
name: review-tests
description: Read-only audit of a feature's Playwright tests against its spec.md acceptance criteria, classifies coverage (including criteria intentionally left for manual QA per plan-tests' exclusion comments, and visual/pixel assertions plan-tests never automates), catches data drift, flags POM violations. Invoked as /review-tests <feature-name> [optional additional scenarios]. Use as the final check before closing a feature.
---

# Review tests

A read-only audit that catches drift between what a feature's tests assert and what the code/data actually does now. Unlike `plan-tests`, this skill never writes or modifies files, it only reports findings and waits.

## Scope

- Reads: `spec.md` for the named feature, the feature's Playwright test file(s), the project's `AGENTS.md`/`CLAUDE.md`, the actual data/config files any test asserts literal values against, the project's shared page object file(s).
- Writes: nothing. Never edits the test file, never edits spec.md, never edits anything else. This is an audit.
- Only audits this feature's own tests against this feature's own spec (and any scenarios the user adds at invocation), it is not a general code review of the application.

## Step 1 — Read the acceptance criteria

Read the named feature's `spec.md` acceptance criteria list in full.

## Step 2 — Read the tests

Read the corresponding Playwright test file(s) for this feature in full, every test, every assertion, and every comment, not just the file names. A comment left by `plan-tests` naming a criterion as routed to manual QA (per its touch/gesture exclusion) is real evidence for Step 4, read for those too, not just assertions.

## Step 3 — Fold in user-provided scenarios

If the user listed additional scenarios directly in the invocation, treat each one exactly like a spec.md acceptance criterion, same classification in Step 4, same rigor everywhere else. The "don't invent coverage" rule in Step 8 only limits what this skill adds on its own initiative, it never limits what the user explicitly asked to be checked.

## Step 4 — Classify every criterion

Go through EVERY criterion, spec.md's plus any user-provided ones, one by one. Before settling on Partially covered or Not covered, check whether the unmet portion is actually an Excluded by policy case below, that check comes first. For each, classify it explicitly as one of:

- **Fully covered** — a real assertion verifies exactly what the criterion describes.
- **Partially covered** — some part of what the criterion describes is checked, but not all of it, and the missing part is not an Excluded by policy case. Say specifically what's missing.
- **Excluded by policy (visual/pixel assertions)** — the unmet part of this criterion is purely a color, shape, exact position/spacing, or wrapping/layout assertion, the category of thing `plan-tests` deliberately never automates (no `getComputedStyle`, no pixel matching). Apply this automatically, it does not need an exclusion comment in the test file, the policy is global to `plan-tests`, not per-feature. If a criterion is entirely visual/pixel with nothing functional to check, classify the whole criterion this way. If it mixes a functional part (href, aria-label, element count, exact text) with a visual part, evaluate the functional part normally and note the visual part as excluded by policy separately, if the functional part is fully met the criterion overall is `Fully covered`, not `Partially covered`.
- **Left for manual QA** — the test file contains an explicit comment (per `plan-tests`' Step 6) marking this criterion as intentionally routed to the user's own manual QA instead of automation. Only use this classification when that comment actually exists and actually names this criterion, never infer intent on your own just because a criterion sounds like it involves touch or mobile, an absent test with no such comment is `Not covered`, not this.
- **Not covered** — no test touches this criterion at all, it's not an Excluded by policy case, and there's no comment marking it as intentionally left for manual QA either.

List every criterion by name with its classification. Don't summarize as "looks mostly fine" or group multiple criteria together, each gets its own line.

## Step 5 — Cross-check literal values against real data

For any literal value a test asserts (a name, price, label, or similar) that corresponds to a specific entry in a data/config file, look up that entry's actual current value in the real file and compare. The failure mode this catches is a copy-paste mismatch, a value from one entry asserted against a different entry's test (e.g. a test for therapy B asserting therapy A's price). Report every mismatch found, with the asserted value and the actual current value, file and line for each.

## Step 6 — Check Page Object Model discipline

Check `AGENTS.md`/`CLAUDE.md` first for this project's documented POM convention, then apply it:

- Flag any locator written inline in a test that appears more than once (within this file or across this feature's test files), or that duplicates a locator already defined in the project's shared page object, it should live in the page object instead.
- Flag repeated per-test setup (e.g. instantiating a page object in every single test) that should instead live once in `beforeEach` with a shared variable.

## Step 7 — Report and stop

Present findings grouped by category: coverage classification (Step 4, including any Left for manual QA entries), data mismatches (Step 5), POM violations (Step 6). In the summary, count Excluded by policy entries on their own line, separate from Fully/Partially/Not covered counts, so they don't read as coverage gaps. Do not rewrite the test file, do not edit spec.md, do not fix anything yourself. Wait for the user's explicit go-ahead before any change is made, this skill's job ends at the report.

## Step 8 — Don't invent coverage

Never propose or imply a test case beyond what spec.md's criteria (plus any user-provided scenarios from Step 3) actually require, no "you might also want to test..." additions, if it's not in the criteria and the user didn't ask for it, it's out of scope for this audit.