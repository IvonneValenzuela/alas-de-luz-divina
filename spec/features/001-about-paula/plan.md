# Plan · 001 About Paula

## Approach

Build `client/components/AboutPaula.tsx` (currently empty) as a self-contained section component, following the existing pattern used by `Story.tsx` and `Services.tsx`: a `<section>` with the shared `max-w-*` / `px-6` / `py-*` container, heading in the heading font, body copy pulling from a typed data file rather than being hardcoded.

Work happens in two phases so the layout can be validated independently of getting the real bio copy locked in:

- **Phase 1 — structure with placeholder copy.** Build the section's JSX structure, photo, and responsive layout using a placeholder string (`"Hola soy Pau"`) in place of the real paragraphs. This lets the visual design (photo placement, centring, spacing, mobile/desktop behaviour) be reviewed and approved before wiring in the final content.
- **Phase 2 — real content swap.** Replace the placeholder with `paulaBio` from `client/data/about.ts`, rendering each array entry as its own paragraph. No structural or layout changes in this phase, copy only.

## Structure

- `<section id="about-paula">` — connected to the Navbar's "Sobre Paula" pill link.
- Heading: "Pau" (per acceptance criteria — not "Paula" or "Paula Valenzuela").
- `<img src="/pau.png" />` above the text, matching how `Hero`/other sections reference `public/` assets by absolute path.
- Bio paragraphs, horizontally centred, each array entry from `paulaBio` rendered as its own `<p>` so paragraph breaks are preserved (no `\n` splitting, no joining into one block).
- Container width follows the existing `max-w-2xl` convention used in `Story.tsx` for centred prose blocks — narrow enough to stay readable on desktop, no new breakpoint values needed.

## Data

- `client/data/about.ts` already exists and exports `paulaBio: string[]`, the verbatim bio broken into paragraphs, including her original emojis (🤍, ✨). This is the phase 2 source of truth per `spec.md`'s Content section — not edited as part of this feature.
- No changes to `client/data/types.ts` are needed: `paulaBio` is a plain `string[]`, it doesn't need a shared interface the way `Service`/`Testimonial` do.

## Styling

- Reuse existing tokens only, per `/AGENTS.md`: `--color-text` for body copy, `--color-text-light` for any secondary text, `--color-surface` or transparent background consistent with the alternating section backgrounds already established by `Story` (`--color-surface`) and `Services` (transparent/page background).
- Heading uses the heading font (Cormorant Garamond) via the existing heading utility/class already used in `Story.tsx`/`Services.tsx`.
- Photo: rounded, constrained width (e.g. matching the max-w container or a smaller centred size), no new spacing/sizing tokens invented — reuse existing scale (`p-6`, `mb-4`, `mb-10`, etc. as seen in sibling components).
- Responsive: single-column, centred on both mobile and desktop, no `lg:` hamburger-style breakpoint logic needed here (that's Navbar-specific) — just verify text and photo don't overflow or look sparse at both mobile and desktop widths per `/AGENTS.md`'s responsive rule.

## Wiring

- `AboutPaula` is not yet imported in `client/App.tsx`. Per `/AGENTS.md`'s documented narrative order (Navbar, Hero, Story, Services, Benefits, AboutPaula, Testimonials, FAQ, Footer), and since Benefits/Testimonials/FAQ/Footer don't exist yet, `AboutPaula` is wired in immediately after `Services`, the current last section.
- Wiring happens in phase 1, alongside the placeholder structure, so the section is visible and reviewable end-to-end (not floating unused until phase 2).

## Validation

- `npm run lint` and `npm run build` after each phase.
- Manual check at mobile and desktop widths after each phase (per `/AGENTS.md`'s responsive rule), before considering that phase done.
- After phase 2, diff the rendered paragraphs against `client/data/about.ts` line by line to confirm no paraphrasing, reordering, or dropped emoji occurred in the swap.
