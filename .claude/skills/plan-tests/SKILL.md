---
name: plan-tests
description: Derive Playwright test cases from a feature's acceptance criteria, confirm scope with the user, write them, then run only this feature's file on chromium and fix any test bugs it finds, reporting app bugs without touching application code. Prioritizes observable user behavior over exhaustive per-criterion coverage, never proposes a case that only verifies an implementation or visual detail, and leaves touch/gesture interactions to the user's manual QA (plain mobile-width layout checks still get automated). Invoked as /plan-tests <feature-name> [optional scenarios]. Use when a feature's implementation is done and it's time to write its tests.
---

# Plan tests

Turn acceptance criteria into a deliberate, confirmed list of test cases, not a reflexive one-test-per-criterion dump, then write them and run them. Follow the sequence below in order, don't skip or collapse steps even if it looks like it'll be trivial for a given feature.

## Scope

- Reads: `spec.md` for the named feature (or user-supplied criteria), existing test file(s) for the feature, the project's `AGENTS.md`/`CLAUDE.md`, the actual implementation being tested.
- Writes: the feature's Playwright test file(s), and a shared page object file if the project's POM convention uses one. May also rewrite a line in its own just-written test file to fix a test bug found in Step 8, never anything else.
- Runs (Step 8 only): `npx playwright test`, scoped to this feature's file(s) only, on the `chromium` project only, never the full suite and never other browsers.
- Never touches application code under any circumstance, an app bug found in Step 8 gets reported, not fixed by this skill.
- Requires explicit user confirmation of the test list (Step 4-5) before any test code is written (Step 6).

## Step 1 — Read the acceptance criteria

If the feature has a `spec.md` (e.g. `spec/features/NNN-<feature-name>/spec.md`, or wherever this project's spec convention specifies), read the acceptance criteria in full. If the user passed criteria or scenarios directly at invocation instead, use those as the source of truth. If neither exists, no spec file and nothing supplied, stop and ask the user what the acceptance criteria actually are rather than inventing them.

## Step 2 — Read existing tests for this feature

Find and read any test file(s) that already cover this feature. Understand exactly what's already properly verified (a real passing assertion, not a stub or a `.skip`). This is read-only, don't propose tests for anything already properly covered.

## Step 3 — Analyze coverage gaps and propose test cases

Compare the acceptance criteria against what Step 2 found already covered. For each criterion that's uncovered or only partially covered, think about what would genuinely verify it, not the first thing that comes to mind, and not a test for every possible angle either. A criterion doesn't automatically need its own dedicated test, if it's genuinely verified as part of another case's assertions, that's enough, don't split it out just to have a one-to-one mapping. But never let that merging hide a real, uncovered gap either.

Before adding any case to the list, ask: would a real user, or a screen reader, actually notice if this specific assertion failed? If the honest answer is no, the case is testing something internal rather than behavior, drop it or reframe it around the user-observable behavior it's meant to protect.

Rules for this list:
- Never propose a test for something already properly covered.
- Never propose filler cases just to make the list longer or look thorough.
- Never propose testing something the acceptance criteria don't actually require, no bonus scenarios sneaked in ahead of Step 4.
- Never propose a case that only verifies an implementation or visual detail, exact computed CSS values (`getComputedStyle` comparisons), pixel measurements, or internal class names unrelated to behavior, are not user-observable outcomes and are fragile besides. If a criterion is genuinely about visual consistency, prefer testing it through the applied class or design token (per `/AGENTS.md`'s token convention) rather than a runtime style comparison, that verifies intent instead of a brittle rendering detail.
- Never propose a test that simulates a touch or gesture interaction (`hasTouch: true`, `.tap()`, swipes, or similar), even when an acceptance criterion is specifically about that interaction, the user tests those by hand across real devices herself. Flag that criterion explicitly in Step 4 as left for her manual QA instead of silently dropping it. This exclusion is narrow, it does not cover a plain layout check at a mobile viewport width that involves no touch simulation (a horizontal-overflow check via `scrollWidth`/`clientWidth`, for instance), those stay in scope and get automated like any other criterion.
- Each proposed case should map to a specific criterion (or a specific gap in one), be able to say which. When a criterion actually bundles more than one distinct requirement (count/presence is not the same thing as content-fidelity, for instance "all twelve render" and "text matches the source exactly" are two separate claims even inside one bullet), a case that only satisfies one of them must never be labeled as covering the criterion in full. Name precisely which part it covers, and if any part is left unaddressed, that gap gets its own case or is flagged explicitly in Step 4, never rolled up as "covered" under the full criterion's number.

## Step 4 — Present the list and ask for more

Show the user the full proposed list, each with a one-line note precisely describing what the case actually verifies, not just the full criterion number if the case only covers part of it. Then explicitly ask: **"Are there any additional scenarios you want tested beyond this list?"**

Ask this every time, even when the proposed list already looks complete, never skip the question because the list seems exhaustive.

## Step 5 — Wait for the user's answer

Do not proceed to writing tests until the user responds. If they add scenarios, apply the same rigor from Step 3 to write a clear case that actually verifies the scenario, don't just transcribe their wording into a test name. If they add something that duplicates or overlaps an existing proposed case, say so and confirm how to handle both.

## Step 6 — Write the tests

Only after the user confirms the final list:

- Check `AGENTS.md`/`CLAUDE.md` for this project's documented Page Object Model convention before writing anything.
- Reuse or extend the existing shared page object(s) for locators that already exist there. Only add new locators inline in the test file if no matching page object exists yet and the convention doesn't call for adding it to the shared one, when in doubt, extend the shared object rather than duplicating locators inline.
- Write idiomatic, reliable Playwright + TypeScript: prefer web-first assertions (`expect(locator).toBeVisible()`, `.toHaveText()`, etc.) over manual waits, arbitrary `page.waitForTimeout`, or other flaky patterns.
- Extend an existing test file for this feature if one exists, only create a new one if none does.
- Never hardcode a literal value (question text, a price, a name, a description) as a test constant when that value already lives in a project data file (`client/data/*.ts`, per this project's convention). Import the real data and reference it directly (`faqItems[0].question`, not a copied string), so the test can never drift from the source when the data changes. This mirrors `implement-task`'s no-hardcoded-values check, just applied to test data instead of component code. Reserve local constants for values that genuinely don't come from a data file, a CSS class name, a fixed route, a synthetic input for a form.
- When Step 3's touch/gesture rule routes a criterion to the user's manual QA instead of an automated test, leave an explicit comment in the test file naming that criterion, grouped together near the top of the file if there's more than one. This is the only record of that decision review-tests can ever see, it never reads this conversation, only files, so without the comment the exclusion is invisible to it later and gets reported as a plain gap. Example: // Left for manual QA (not automated): AC4's touch/tap interaction — see /AGENTS.md's touch/gesture exclusion.

## Step 7 — Summarize scenario → test mapping

After writing, list which proposed and user-added scenarios ended up as which actual test name(s), so the user can cross-check the confirmed list against what actually got written. Call out explicitly if any scenario ended up merged into another test or split across more than one, so nothing silently disappears from the mapping. Do the same for any criterion routed to the user's manual QA instead of an automated test (per Step 3's touch/gesture rule), name it explicitly in the summary rather than let it quietly vanish from the list.

## Step 8 — Run this feature's tests, and only this feature's tests

Run the file(s) written or extended in Step 6, scoped explicitly to those file(s), never the full suite, and restricted to the `chromium` project only:

```bash
npx playwright test <path-to-this-feature's-spec-file> --project=chromium --reporter=line
```

**All pass** — report the result plainly (total run, all passed) and stop, the feature's tests are done.

**A test fails** — diagnose it as one of three things, and say explicitly which:
- **Test bug** — the test itself is wrong (a stale selector, a wrong expected value, a genuine timing issue), not the application. This is within this skill's Scope to fix, since it only touches the test file it just wrote. Fix it, rerun, and report what changed. If a fix doesn't resolve it after a couple of tries, stop and explain what's still failing rather than keep guessing.
- **Resource-constrained crash** — a test (or the file) crashes only when run together with the others, not in isolation, and the failure points to this environment running out of memory or similar resource pressure, not a wrong selector or expected value. This is still a kind of test bug, but never chase it with a repeated full-file rerun to confirm the fix worked, that repeats the exact action that caused the crash and risks losing the session again. Apply one targeted fix (e.g. `test.slow()` on the affected test) at most once, then stop, report what crashed and what was changed, and let the user decide when to rerun, don't rerun the file again yourself to double-check.
- **App bug** — the test is correctly written and the real, current behavior of the application doesn't match it. This is never fixed by this skill, application code is outside its Scope entirely. Stop, report exactly what's broken and why, and let the user decide what to do next (send it to `implement-task`, or confirm the test's expectation itself needs to change because the requirement changed).

Never blur these, a failure only gets "fixed" here if it's a test bug or a resource-constrained crash, each with its own limit on how many times to retry. An app bug always gets reported, never patched around by loosening the test's assertion.
