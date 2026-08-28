# Tasks · 002 Therapies List & Popup Redesign

## Redesign

- [x] Strip the card face down to the therapy name only: remove the description `<p>` and price `<p>` from the card `<button>` in `Services.tsx`.
- [x] Rebalance card padding/spacing (existing scale only) so a name-only card doesn't look sparse or uneven in the grid.
- [x] Add the flip/rotation entrance animation: `@keyframes modal-flip-in` + `.modal-flip-in` class in `main.css`, `perspective` on the modal overlay, `.modal-flip-in` class on the modal panel.
- [x] Verify closing and reopening the modal (including opening a different card) replays the flip animation cleanly, with no leftover transform/opacity glitches.
- [x] Verify click (desktop) and tap (mobile) both open the modal via the same `<button onClick>` — no separate mobile-only handler needed or added.
- [x] Check the full section at mobile and desktop widths: 8-card grid, name-only cards, modal content and flip animation.

## Bug fix — checklist font

- [x] Diagnose: confirm (via `main.css` / Tailwind preflight, documented in `plan.md`) that the checklist `<li>` has no explicit `font-family` and is relying on inherited cascade, unlike an explicit rule.
- [x] Fix: set `font-family: var(--font-body)` explicitly on the checklist `<ul>` in `Services.tsx`.
- [x] Verify checklist text and description paragraph text visually match in the modal for a service that has a checklist.

## Bug fix — description paragraph breaks

- [x] Diagnose: confirm the blank lines between paragraphs in `services.ts`'s indented template literals contain trailing whitespace, so `split('\n\n')` never matches (documented in `plan.md`).
- [x] Fix: change the split in `Services.tsx` to `/\n\s*\n/`, trim each paragraph, filter empty strings. Do not edit `services.ts`.
- [x] Verify all 8 entries: entries 1–8 (all multi-paragraph, added or expanded since this task was first written) render as separate `<p>` tags with no leading/trailing whitespace.

## Wrap-up

- [x] Write or extend a Playwright test for this feature (extending `tests/pages/HomePage.ts` with the needed Services locators, per `/AGENTS.md`'s Page Object Model convention), covering: cards show only the therapy name with no description or price on the face; clicking a card opens the modal with the expected content (duration, modality, description, checklist, price, WhatsApp link); the checklist text and the description text use the same computed font; and a multi-paragraph description (e.g. entry `1` or `2`) renders as separate `<p>` elements rather than one block.
- [x] `npm run lint` passes.
- [x] Re-check spec.md's acceptance criteria against the implemented behaviour.
- [x] Update `constitution.md`: move "002 · Therapies list & popup redesign" from Next to Done once the above is confirmed.
