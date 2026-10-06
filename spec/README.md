# spec/: Spec Driven Development

Specification-first development for the Alas de Luz Divina project: the spec is written before the plan, the plan before the tasks, and the tasks before any code changes. Each step of the cycle is run by a Claude Code skill (in `/.claude/skills/`), with the developer approving the output before the next step starts.

## Structure

```
spec/
├── README.md
├── constitution/
│   └── constitution.md   ← mission, principles, roadmap, and a pointer to /AGENTS.md for tech stack
└── features/             ← one folder per feature
    └── NNN-feature-name/
        ├── spec.md       ← what it does + acceptance criteria
        ├── plan.md       ← how it gets implemented
        ├── tasks.md      ← implementation task checklist
        └── test-plan.md  ← confirmed test cases, chosen by the developer
```

Test cases written before the per-feature `test-plan.md` convention, covering the sections that already existed (Navbar, Hero, Services, Footer and others), live in `tests/<nombre-del-archivo>.md`.

## Workflow for a new feature

| Step | Who / skill | What happens |
|---|---|---|
| 1 | Developer | Creates `features/NNN-feature-name/` with the next available number and writes `spec.md`: what it does, why, and measurable acceptance criteria. |
| 2 | `/plan-and-task-generator <feature>` | Writes `plan.md` and `tasks.md` from the spec and `/AGENTS.md`, then stops for review. |
| 3 | `/implement-task <feature> execute` | Implements exactly one task per run, applying the project's code quality checks. Never checks boxes in `tasks.md`. |
| 4 | `/verify-tasks <feature>` | Reconciles `tasks.md` against real evidence (code, git, lint, build) and checks off what is genuinely done. Covers implementation only, tests are not tasks. |
| 5 | `/analyze-test-cases <feature>` | Proposes test cases from the acceptance criteria, classified by ISTQB test type and by automation level (Unit, Component, E2E) using the testing pyramid, with ambiguities and a traceability matrix. Writes no files and no code. |
| 6 | Developer | Decides which cases to keep and writes them into `test-plan.md`. |
| 7 | `/write-tests <feature>` | Turns `test-plan.md` into code (Playwright for E2E, Vitest + React Testing Library for Unit/Component) and runs only this feature's files. Fixes test bugs, reports app bugs without touching application code. |
| 8 | `/review-tests <feature>` | Read-only audit of the feature's tests against `spec.md` and `test-plan.md`: coverage, planned cases not written, data drift, Page Object Model discipline. Anything it flags gets fixed before closing. |
| 9 | `/close-feature <feature>` | Marks the spec's acceptance criteria and Status as done with evidence, and moves the feature to "Done" in `constitution.md`. |
| 10 | `/fill-pr` | Fills the pull request template from the diff and opens the PR after approval. The developer commits and pushes. |

## Human checkpoints

The agent never decides alone at these points: the developer writes and approves the spec, reviews `plan.md` and `tasks.md` before implementation, triggers every task explicitly, chooses which test cases get automated and at which level, makes every commit, and approves the PR description.

## Evolution

Tests were originally designed and written by a single skill, `plan-tests`, which only produced Playwright tests and pushed almost every case to E2E. It was retired and split into `analyze-test-cases` and `write-tests`, with the developer's decision in `test-plan.md` in between, so each case lands at the cheapest automation level that verifies it. Earlier features were tested under the previous flow.

> The constitution rules. If a feature conflicts with the mission or with `/AGENTS.md`, the feature gets rethought, not the constitution.