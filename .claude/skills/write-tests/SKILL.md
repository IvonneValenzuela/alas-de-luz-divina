---
name: write-tests
description: Turns an already-classified list of test cases into real, running test code, using whichever E2E framework (Playwright, Cypress, etc.) and Unit/Component framework (Vitest, Jest, etc., with the matching Testing Library binding) this project actually uses, detected rather than assumed. The list can be a confirmed test-plan.md from the analyze-test-cases skill, or any other already-classified list the user provides directly, pasted, attached, or a table, as long as each case already states its Automation level. Writes only the cases already listed (never deriving or re-classifying, that decision is already made), runs only this feature's file(s) with the matching runner, and fixes any test bugs it finds, reporting app bugs without touching application code. Invoked as /write-tests <feature-name>. Use once a feature's test cases are already classified and it's time to turn them into automation.
---

# Write tests

Turn an already-classified list of test cases into working, running test code, whatever form that list came in. This skill never designs or classifies a test case itself, that decision was already made, whether in a `test-plan.md` from `analyze-test-cases` or in any other list the user brings. Its only job is to execute that decision faithfully against this project's real conventions.

## Scope

- Reads: the feature's already-classified test cases, a confirmed `test-plan.md` from `analyze-test-cases`, or any other list the user provides directly (pasted, attached, a table), as long as each case already states its Automation level. Also reads existing test file(s) for the feature, in whatever framework(s) the project actually uses, the project's `AGENTS.md`/`CLAUDE.md`, `package.json`, and any test-tool config files, to detect that (see Step 2), and the actual implementation being tested.
- Writes: the feature's test file(s), using the project's detected E2E framework for cases classified E2E, and its detected Unit/Component framework (with the matching Testing Library binding, if any) for cases classified Unit or Component, plus a shared page object (or equivalent) file if the project's convention uses one. May also rewrite a line in its own just-written test file to fix a test bug found in Step 5, never anything else.
- Runs (Step 5 only): the project's actual E2E run command, scoped to this feature's E2E file(s) and to a single browser/project, and/or its actual Unit/Component run command, scoped to this feature's Unit/Component file(s), whichever this feature actually produced, never the full suite of either kind and never other browsers.
- Never touches application code under any circumstance, an app bug found in Step 5 gets reported, not fixed by this skill.
- Never re-classifies a case's automation level or ISTQB type, and never proposes a case that wasn't already given, that decision belongs entirely to whoever designed and confirmed the list, not to this skill.
- Never installs or introduces a new test framework without asking the user first, even when Step 2 finds none in place.

## Step 1 — Get the classified test cases

Get the list of cases to write, from whichever source the user provides: a confirmed `test-plan.md` (find and read it at the test file, or wherever the user points), or a list pasted or attached directly in the conversation, a table, a set of bullet points, anything, as long as it already states each case's Automation level. If nothing is provided and nothing can be found, stop and ask for it, don't invent test cases from scratch, that's not this skill's job.

Take each case's Automation level exactly as given, regardless of source. If something looks genuinely wrong once you see the real implementation (for instance, the list expected two components but they turned out to already be merged into one), flag that to the user rather than silently reclassifying, the list is the source of truth, not this skill's judgment.

If the source list covers more than one component or feature (a shared document, not one file per feature), filter to only the cases belonging to the feature named in this invocation (e.g. `/write-tests hero` only touches Hero's rows) and leave the rest untouched, don't write tests for every component in a shared file in one run just because they were all in the same source. If it's unclear which rows belong to the named feature, ask rather than guessing.

## Step 2 — Detect the project's test stack, and read existing tests

Before writing anything, determine what this project actually uses, don't assume Playwright or Vitest/React Testing Library by default just because they're common. Check, in order: `package.json` (dependencies and devDependencies), config files (`playwright.config.*`, `cypress.config.*`, `vitest.config.*`, `jest.config.*`, or equivalent), and any existing test files' import statements, which confirm what's actually in use versus merely installed. This covers three things: which E2E framework (Playwright, Cypress, or another), which Unit/Component runner (Vitest, Jest, or another), and, if the project does component-level testing at all, which Testing Library binding matches its UI framework (`@testing-library/react`, `/vue`, `/angular`, `/svelte`, or another).

If more than one real candidate is present, or nothing is detected and the project has no test files yet, ask the user which to use rather than installing or assuming one. Once confirmed for a project, this doesn't need re-detecting on every run, document it in `AGENTS.md`/`CLAUDE.md` if it isn't already, so this skill (and any other, like `analyze-test-cases`) can read it directly next time instead of re-deriving it.

Find and read any test file(s) that already cover this feature, in whichever framework(s) the project uses. Understand exactly what's already properly verified. This is read-only. If the list came from `analyze-test-cases`, this should already line up with its "Already covered" section, don't rewrite anything already properly covered, whether or not the source list called it out explicitly.

## Step 3 — Write the tests

For each case in the list, route it to the matching subsection below by its stated Automation level. The patterns described assume Playwright (E2E) and Vitest + a Testing Library binding (Unit/Component), since that's the most common combination, if Step 2 detected a different stack for this project, apply the same underlying principles in that framework's own idioms instead, don't force Playwright/Vitest syntax onto a project that uses something else.

### For E2E cases

- Check `AGENTS.md`/`CLAUDE.md` for this project's documented Page Object (or equivalent abstraction) convention before writing anything. If none is documented there, and no existing page object file survives to infer it from either, propose a structure (e.g. one shared page object per page/route, an exported class with locators as readonly properties and an `open()` method), confirm it with the user, then document it in `AGENTS.md` before writing the first test, so it's fixed for every future run instead of reinvented per feature.
- Reuse or extend the existing shared page object(s)/support commands for locators or selectors that already exist there. Only add new ones inline in the test file if no matching abstraction exists yet and the convention doesn't call for adding it to the shared one, when in doubt, extend the shared one rather than duplicating locators inline.
- Write idiomatic, reliable code in the detected framework: prefer web-first, auto-retrying assertions (Playwright's `expect(locator).toBeVisible()`, `.toHaveText()`, or that framework's equivalent, e.g. Cypress's `cy.get(...).should(...)`) over manual waits, arbitrary sleeps, or other flaky patterns.
- Extend an existing E2E test file for this feature if one exists, only create a new one if none does.

### For Unit and Component cases

Before writing the first Unit or Component test in a project that doesn't have one yet, confirm the detected runner (e.g. `vitest`), the matching Testing Library binding for this project's UI framework (e.g. `@testing-library/react`), `@testing-library/user-event` or that binding's equivalent, and a DOM environment (`jsdom` or `happy-dom`) are installed and configured (a `test` block in `vite.config.ts`, or a separate config file for the detected runner). If any of this is missing, stop and tell the user exactly what to install and configure, don't write a test that has no working runner behind it yet.

- Check `AGENTS.md`/`CLAUDE.md` for this project's documented Unit/Component test convention (file location, naming) before writing anything. If none is documented yet, colocate the test file next to what it covers (e.g. `ComponentName.test.tsx` / `utilName.test.ts`), confirm that with the user, then add it to `AGENTS.md` so it's documented for next time instead of reinvented per feature.
- Unit tests: import the function directly, no rendering, no Testing Library import. Assert on the return value or thrown error, not on any DOM.
- Component tests: use that binding's `render` and its `userEvent.setup()` (or equivalent) for interactions, never a lower-level event-firing helper directly unless `userEvent` genuinely can't express the interaction. Query by role/label/text, never by test id or CSS selector unless no accessible query exists. Pass props directly and render only the component under test, don't pull in its real parent or mock more of the tree than the case needs.
- Extend an existing Unit/Component test file for this feature if one exists, only create a new one if none does.

### Shared rules, both kinds

- Never hardcode a literal value (question text, a price, a name, a description) as a test constant when that value already lives in a project data file (`client/data/*.ts`, per this project's convention). Import the real data and reference it directly (`faqItems[0].question`, not a copied string), so the test can never drift from the source when the data changes.
- If a case was explicitly left for the user's manual QA instead of automation (per a "Left out" section if the list has one, or simply because the user said so), leave an explicit comment in the test file naming it, grouped together near the top of the file if there's more than one, noting where that decision was recorded. Example: `// Left for manual QA (not automated): AC4's touch/tap interaction, per the confirmed test list.`

## Step 4 — Map cases to written tests

List which case(s) ended up as which actual test name(s), so the user can cross-check the confirmed list against what actually got written. Use each case's ID if it has one (e.g. a TC number), otherwise its behavior description, whatever identifies it in the original list. Call out explicitly if any case ended up merged into another test or split across more than one, so nothing silently disappears from the mapping. Do the same for any case left for the user's manual QA instead of an automated test, name it explicitly in this summary too, not only as the in-code comment from Step 3, so it doesn't quietly vanish from the list just because it has no test name to map to.

## Step 5 — Run this feature's tests, and only this feature's tests

Run the file(s) written or extended in Step 3, scoped explicitly to those file(s), never the full suite of either kind. If this feature produced both E2E and Unit/Component files, run both commands and report both results, don't skip one because the other already passed. Use the project's actual run commands and scripts (check `package.json` if unsure), scoped to just this feature's file(s); the commands below are the common-case examples, substitute the detected framework's equivalent if Step 2 found something else.

For E2E file(s), restricted to a single browser/project:

```bash
npx playwright test <path-to-this-feature's-e2e-file> --project=chromium --reporter=line
```

For Unit/Component file(s):

```bash
npx vitest run <path-to-this-feature's-unit-or-component-file>
```

**All pass** — report the result plainly (total run, all passed) and stop, the feature's tests are done.

**A test fails** — diagnose it as one of three things, and say explicitly which:
- **Test bug** — the test itself is wrong (a stale selector, a wrong expected value, a genuine timing issue), not the application. This is within this skill's Scope to fix, since it only touches the test file it just wrote. Fix it, rerun, and report what changed. If a fix doesn't resolve it after a couple of tries, stop and explain what's still failing rather than keep guessing.
- **Resource-constrained crash** — a test (or the file) crashes only when run together with the others, not in isolation, and the failure points to this environment running out of memory or similar resource pressure, not a wrong selector or expected value. This is still a kind of test bug, but never chase it with a repeated full-file rerun to confirm the fix worked, that repeats the exact action that caused the crash and risks losing the session again. Apply one targeted fix (e.g. `test.slow()` on the affected test) at most once, then stop, report what crashed and what was changed, and let the user decide when to rerun, don't rerun the file again yourself to double-check.
- **App bug** — the test is correctly written and the real, current behavior of the application doesn't match it. This is never fixed by this skill, application code is outside its Scope entirely. Stop, report exactly what's broken and why, and let the user decide what to do next (send it to `implement-task`, or confirm the test's expectation itself needs to change, in which case the change belongs in the original list too, wherever it lives, not just in the code).

Never blur these, a failure only gets "fixed" here if it's a test bug or a resource-constrained crash, each with its own limit on how many times to retry. An app bug always gets reported, never patched around by loosening the test's assertion.
