---
name: analyze-test-cases
description: Acts as a senior ISTQB-certified QA/test analyst. Takes acceptance criteria or a user story (pasted, referenced spec file, or attached) and produces a structured test case plan: each case classified by ISTQB test type (Functional, Compatibility, Accessibility, Performance, Security, etc.) and by automation level (Unit, Component, Integration, E2E) using the testing pyramid decision tree, with a full acceptance-criteria-to-case traceability matrix. Writes and runs no code, no test files, ever, output is a review document only, for the user to confirm before a separate test-writing skill takes over. Invoked as /analyze-test-cases [feature-name or pasted criteria]. Portable across any project, framework-agnostic by design.
---

# Analyze test cases

Turn acceptance criteria or a user story into a confirmed, classified test case plan, written like a senior QA analyst would, not code. This skill never writes or runs a single line of test code, that is a different skill's job once the plan below is confirmed.

## Scope

- Reads: acceptance criteria or a user story, pasted directly, referenced from a project's `spec.md` (or wherever that project's convention puts it), or from an attached file. Also reads any linked technical design or reference material the user points to (API contracts, mockups, flow diagrams) if referenced. Also reads existing test file(s) for this feature if the user provides them (see Step 2), read-only, purely to check for overlap.
- Writes: nothing to disk by default. The test case plan is delivered directly in the reply, ready to copy elsewhere (Jira, a doc, whatever the user manages test cases in). Only saves it as a file if the user explicitly asks to, and only at a path the user confirms first, never assumed automatically, not even in a project with an established spec convention.
- Never writes to or runs any test file, and never needs to know a project's test-writing conventions or which framework it uses to do its job, that is deliberately out of scope, so this skill stays portable across any project.
- Requires explicit user confirmation of the full plan before considering the task done (Step 7).

## Step 1 — Gather the acceptance criteria

Ask for, or read, the acceptance criteria or user story. Accept any of: pasted text, an attached file, or, if this project has one, a `spec.md` at the path this project's convention specifies. If genuinely nothing is provided and nothing can be found, stop and ask for exactly this, nothing else:

"Please share the acceptance criteria or user story you'd like me to analyze (text, attached file, or the spec path if this project uses one)."

If a referenced attachment or design document is mentioned but not actually provided, treat it as "not provided" and note that explicitly in the Ambiguities section (Step 6), don't block waiting for it.

## Step 2 — Check for existing test coverage

Ask the user: "Do test files already exist for this feature? If so, please share their path or paste them." If they confirm none exist yet, or don't provide any, skip the rest of this step and design every case fresh in Step 4.

If test file(s) are provided, read them and identify exactly what's already genuinely verified there, a real assertion, not a stub, a `.skip`, or a placeholder. This is read-only, this skill never edits, writes to, or runs a test file, regardless of what it finds, and doesn't need to understand the framework beyond reading what each test asserts in plain terms.

Cross-reference what's already covered against the acceptance criteria from Step 1, criterion by criterion, noting partial coverage separately from full coverage. Carry this forward into Step 4: never propose a new case for something already properly covered, and never propose a full case for a criterion that's only partially covered, only for the actual gap. List what's already covered under "Already covered" in the final document (Step 6).

## Step 3 — Flag ambiguities before designing cases

Before proposing any case, review the criteria for gaps: vague wording, missing expected values, undefined edge behavior, contradictions, or anything not genuinely testable as written. For each one, decide which of two buckets it belongs to, and carry that label into Step 6:

- **Needs your input** — the assumption materially changes what a case actually verifies, and getting it wrong risks a passing test defending the wrong behavior (a genuine conflict between two sources, an undefined value with no reasonable default, anything where a wrong guess would need the test rewritten later).
- **Documented, no action needed** — a reasonable, low-stakes assumption made purely so the case is testable, worth recording for auditability but not worth interrupting the user for (a default viewport width, a common-sense reading of vague wording where any sensible interpretation leads to the same case).

Never invent a requirement silently, and never block waiting for the user to resolve every ambiguity, even a "needs your input" one, the minimal verifiable assumption keeps this moving; that bucket only means the user should look before confirming the plan in Step 7, not that this step waits on them.

## Step 4 — Design test cases

For each acceptance criterion, design the cases that genuinely verify it: positive, negative, and edge cases, using recognized test design techniques where they fit (boundary value analysis, equivalence partitioning, decision tables, state transition, error guessing), and name the technique when it's not obvious from the case itself.

Don't propose a case for something the criteria don't actually require, and don't split one criterion into needless duplicate cases just for volume. A criterion that bundles more than one distinct claim (for instance "shows all N items" and "each item's text matches the source exactly" are two separate claims even inside one bullet) needs a case, or an explicit note, for each distinct claim, never rolled into one case labeled as full coverage.

Prefer testing a visual-consistency claim through the applied class or design token rather than a raw computed-style comparison, so the case verifies intent, not a brittle rendering detail that needs updating every time a hex value or spacing scale changes elsewhere in the project.

Never propose a case that simulates a touch or gesture interaction (tap, swipe, or similar), even when a criterion is specifically about one, that's better suited to the user's own manual QA. Name it explicitly under Step 5's Left out instead of silently dropping it. This exclusion is narrow, it doesn't cover a plain check at a mobile viewport width that involves no touch simulation (a layout or overflow check, for instance), those stay in scope.

Default to the simplest check that proves the required behavior. Save pixel-exact geometry (corner-radius calculations, aspect-ratio tolerances within a percentage, a full-page audit of every element's computed font) for criteria that explicitly demand that precision. When a criterion is loosely worded ("rounded corners", "photo isn't cropped", "uses this font"), a simpler boolean-style check usually proves the same claim with far less to maintain. If genuinely unsure whether the extra precision is warranted, ask the user rather than defaulting to the most rigorous version.

For each case, classify on two independent axes. Keep them separate, they are not the same thing:

**ISTQB test type** (what kind of quality attribute this verifies): Functional, Compatibility, Accessibility, Performance, Security, Usability, or another standard ISTQB type if none of these fit, state which. Used in the plan as "Test type".

**Automation level** (how much of the system this needs running, from the testing pyramid), using this decision tree, in order, stop at the first match:

1. Does verifying this require a real, rendered UI: CSS/layout, browser behavior, scroll, responsive breakpoints, or visual appearance? → E2E
2. Does it require two or more components/modules coordinating (one holds state or triggers behavior in another)? → E2E
3. Does it require a real backend, database, external service, or API contract? → Integration
4. Is it a pure function or unit of logic with no rendering involved? → Unit
5. Otherwise, isolated behavior of a single component/module, its own props/state only → Component

If a project has no backend, Integration simply won't come up, note that rather than forcing a case into it. Never default to E2E when a cheaper level would genuinely answer the same question. If a case is genuinely ambiguous between two levels, flag it in the case itself rather than silently picking one.

## Step 5 — Note anything left out

If a criterion, or a specific interaction type, is deliberately not being proposed as an automated case (a touch/gesture interaction better suited to manual QA, something explicitly out of scope), name it explicitly rather than silently omitting it. Same principle as the ambiguities section: nothing disappears without a trace.

## Step 6 — Produce the plan document

Structure the output as:

**Ambiguities and assumptions** — from Step 3, split into two subsections:
- **Needs your input** — or "None" if there were none.
- **Documented, no action needed** — or "None" if there were none.

**Already covered** — from Step 2: each criterion (or part of one) already properly verified by an existing test, naming the existing test file and test name that covers it. Omit this section entirely if Step 2 found no existing tests.

**Test cases** — the newly proposed cases only (never one already listed under "Already covered"), each with exactly these fields:
- ID (prefix TC, e.g. TC01)
- Title (concise)
- Criteria covered (which acceptance criterion, or which specific part of one)
- Test type (ISTQB type, from Step 4)
- Automation level (Unit | Component | Integration | E2E, from Step 4, with a one-line "because" justifying it)
- Objective (what this verifies and why)
- Preconditions / Setup
- Test data (specific; note partitions/boundaries where relevant; "N/A" if none)
- Steps (numbered, executable)
- Expected results (verifiable)

**Left out** — from Step 5, or "None" if nothing was excluded.

**Traceability matrix** — a table, criterion ↔ what covers it (an existing test name from "Already covered", or a new TC ID), confirming full coverage across both old and new. Flag explicitly any criterion without full coverage rather than hiding the gap.

Present this directly in the reply, don't save it to a file. Only if the user explicitly asks to save it, confirm the file name and location with them first, never assume a path automatically, not even a project's `spec/features/` convention.

## Step 7 — Confirm before handoff

Present the plan. If "Needs your input" has any entries, point to them specifically before asking for confirmation, that's the part actually worth reading closely, not the full document. Then ask: **"Do you confirm this test plan, or are there cases you'd like to adjust, add, or remove before handing it to the test-writing skill?"**

Do not consider the task done until the user confirms. This skill's job ends here, it never writes or runs any test code itself, that is the next skill's job, using this confirmed document as its only input.
