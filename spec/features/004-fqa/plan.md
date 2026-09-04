# Plan · 004 FAQ

## Approach

Build `client/components/FAQ.tsx` (currently an empty file) as a single self-contained section component, following the data-driven pattern already used by `Services.tsx` and `Benefits.tsx`. Unlike Benefits, this section needs no responsive branching or scroll mechanics — one accordion markup serves both mobile and desktop, laid out with Tailwind's responsive utilities.

Two pieces of content already exist and are reused as-is, no new client content is authored:

- `client/data/fqa.ts` already holds all twelve questions/answers, matching `spec.md` word for word, plus the placeholder community link on item 7 (`id: 'presenciales-o-virtuales'`, `order: 7`) — confirmed against the spec's acceptance criteria.
- `public/favicon.png` is the wings-only mark (no wordmark), already used in `Navbar.tsx` — this is "the site's existing wings icon" the spec refers to for the closing CTA, no new asset needed.

## Data

`client/data/fqa.ts` is a misnamed file (typo of "faq"), but its content, `FaqItem` interface, and `faqItems` export are already correct and match the spec exactly. Per `/AGENTS.md`'s naming convention (`services.ts`, `testimonials.ts`) and `spec.md`'s explicit `client/data/faq.ts` path, rename the file to `faq.ts` (git mv, preserving content) rather than importing from the misspelled path. No content changes, just the filename.

## Structure

- `useState<string | null>` tracking the open item's `id`, same single-open pattern as `Benefits.tsx`'s `MobileAccordion` (`openId`, toggled by clicking the currently-open item to close it, or a different item to switch).
- Single bordered container: `<div className="border border-[#ebe2d7] rounded-2xl divide-y divide-[#ebe2d7]">` wrapping all twelve rows — the `divide-y` utility gives the one-divider-per-row look without per-row border classes, and keeps this one container (not twelve separate cards) per the spec.
- Each row is a `<button>` (question text + indicator) that IS the accordion trigger — plain `<button>` elements are natively Tab-reachable and toggle on Enter/Space with no extra key handling needed, same as `Services.tsx`'s therapy buttons and `Benefits.tsx`'s accordion header buttons.
- `aria-expanded={isOpen}` on that button, mirroring `Benefits.tsx`'s `MobileAccordion` button.
- Indicator: literal `+` / `−` text characters (not a rotating glyph like Benefits' `▾`), swapped via ternary on `isOpen` — this is what the spec calls for, distinct from Benefits' accordion.
- Answer, when open, renders `item.answer` (an array of paragraphs) each as its own `<p>`, same paragraph-array rendering already used for `Benefit.body` in `Benefits.tsx` and `Service.description` in `Services.tsx`.

## Item 7's inline link

Render generically off `item.link` (present only on the "sessions are virtual" item) rather than hardcoding by id or order — `item.link && <a href={item.link.url} target="_blank" rel="noopener noreferrer">{item.link.text}</a>` placed after that item's answer paragraphs. Using the presence of `link` keeps the component decoupled from which specific item carries it, matching the data-driven spirit of the rest of the codebase. `target="_blank"`/`rel="noopener noreferrer"` matches every other outbound link in the codebase (WhatsApp links in `Services.tsx`), even though the spec doesn't call it out explicitly for this link — it's an external link headed to a WhatsApp group once real.

## Closing CTA block

Rendered once after the accordion container, not inside it:

- `<img src="/favicon.png" alt="Alas de Luz Divina" .../>` on the left, sized similarly to `Navbar.tsx`'s use of the same asset (`h-12`-ish, adjusted to sit comfortably in the CTA row).
- Headline "¿Sientes el llamado a conectar contigo?" and supporting line "Este puede ser el momento de escucharte y dar ese primer paso hacia tu proceso." stacked in the center, headline in `font-heading`, supporting line in `text-[#7a7268]` (matching the muted-text convention used everywhere else).
- Pill button "Quiero abrirme a mi proceso" on the right, `href="https://wa.me/573019095778"`, `target="_blank"`, `rel="noopener noreferrer"`, `className="button-primary inline-flex px-6 py-3 rounded-full"` — the exact same className pattern `Services.tsx` uses for its WhatsApp booking link.
- Layout: `flex flex-col md:flex-row items-center justify-between gap-6` on the row container so icon/text/button stack vertically on mobile and sit in their left/center/right positions from `md` up, per `/AGENTS.md`'s responsive rule.

## Section heading

Every existing section (`Services`, `Benefits`) opens with an `h2` + short intro paragraph before its content; `spec.md` doesn't call out heading text as an acceptance criterion, but omitting one would be the only section without one and would leave the `#faq` anchor landing on unlabeled content. Adding `<h2>Preguntas frecuentes</h2>` (matching the navbar's "Preguntas" label) as a structural heading, no new client content invented, just following the sitewide section pattern already used by every other component.

## Styling & tokens

- Container/border: `--color-border` (`#ebe2d7`), matching `Benefits.tsx`'s `barStyle` border color and `Services.tsx`'s card borders.
- Question text: `font-heading`, `--color-text`.
- Answer text / supporting line: `--color-text-light` (`#7a7268`).
- Indicator (`+`/`−`): `--color-primary` (`#d6b26e`), matching the accent color used for interactive affordances elsewhere (e.g. `Benefits.tsx`'s `▾` indicator, also `--color-primary`).
- No new colors, fonts, or spacing scale — everything above reuses existing tokens per `/AGENTS.md`.

## Wiring

`FAQ` is not yet imported in `client/App.tsx`. Per `/AGENTS.md`'s documented narrative order (Navbar, Hero, Story, Services, Benefits, AboutPaula, Testimonials, FAQ, Footer), `Testimonials` and `Footer` are still empty shells not yet wired in, so `FAQ` is wired in directly after `AboutPaula`, the current last component in `App.tsx`.

## Validation

- `npm run lint` and `npm run build` after implementation.
- Manual check at mobile and desktop widths per `/AGENTS.md`'s responsive rule: accordion rows, CTA row (stacked vs. side-by-side), no horizontal overflow.
- Diff all twelve rendered questions/answers against `client/data/faq.ts` (post-rename) line by line — no paraphrasing, reordering, or dropped content.
- Manually verify: single-open behavior (opening one closes any other open item), `+`/`−` swap, `aria-expanded` toggling (via devtools or screen reader), keyboard operability (Tab to a question, toggle with Enter and with Space), item 7's community link renders and points at the placeholder URL, CTA button points at `https://wa.me/573019095778` and opens in a new tab.
