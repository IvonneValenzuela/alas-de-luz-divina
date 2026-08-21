# spec/ — Spec Driven Development

> Specification-first development for the Alas de Luz Divina project: the spec is written before the plan, the plan before the tasks, and the tasks before any code changes.

## Structure

spec/
├── constitution/
│ └── constitution.md ← mission, principles, roadmap, and a pointer to /AGENTS.md for tech stack
└── features/ ← one folder per feature
└── NNN-feature-name/
├── spec.md ← what it does + acceptance criteria
├── plan.md ← how it gets implemented
└── tasks.md ← task checklist

## Workflow for a new feature

1. Create `features/NNN-feature-name/` with the next available number (`001`, `002`, …).
2. Write `spec.md`, what it does, why, and measurable acceptance criteria.
3. Write `plan.md`, technical approach and decisions, respecting `/AGENTS.md`.
4. Break it down in `tasks.md` and track progress.
5. Implement and validate (lint, build, and Playwright tests where relevant).
6. Update `constitution/constitution.md`, moving the feature to "Done".

> The constitution rules. If a feature conflicts with the mission or with `/AGENTS.md`, the feature gets rethought, not the constitution.