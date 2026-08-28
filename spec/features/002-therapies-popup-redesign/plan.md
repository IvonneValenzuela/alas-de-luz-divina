# Plan · 002 Therapies List & Popup Redesign

## Scope

Refactor the existing `client/components/Services.tsx`. No new components, no rebuild from scratch. `client/data/services.ts` grew from 4 to 8 real entries before this feature's redesign work began (added directly by the developer, not by the agent), the redesign applies to all 8 as they exist now.

## 1. Card face — name only

Remove the description `<p className="... line-clamp-3">` and the price `<p>` from the card `<button>`, leaving only the `h3` title. Adjust the card's padding/min-height slightly (existing spacing scale only, e.g. `py-*`/`min-h-*`, no new tokens) so a name-only card doesn't look oddly cramped or lopsided in the grid. The `<button onClick={() => setSelected(service)}>` element itself is unchanged, so click and tap already trigger the same handler — no separate mobile interaction is needed (criterion 5 falls out of this for free, verified rather than built).

## 2. Modal flip/rotation entrance

The modal is only rendered while `selected` is truthy (`{selected && (...)}`), so the whole overlay + panel already mounts fresh every time a card is opened — a plain CSS `@keyframes` animation on mount is sufficient, no `key` trick or animation library needed.

- Add a new keyframe + class to `client/styles/main.css`, following the existing hand-written utility pattern (`.button-primary`, `.nav-pill`):
  ```css
  @keyframes modal-flip-in {
    from {
      transform: rotateY(90deg);
      opacity: 0;
    }
    to {
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  .modal-flip-in {
    animation: modal-flip-in 0.4s ease-out;
  }
  ```
- Add `style={{ perspective: '1000px' }}` to the overlay div (the `fixed inset-0 ...` container) so the panel's `rotateY` has 3D depth instead of looking like a flat squash.
- Add `className="... modal-flip-in"` to the panel div (the `bg-[#fffdf9] rounded-2xl ...` element).
- No changes to modal content, close button, or the WhatsApp link — satisfies criteria 2 and 4 by construction (nothing in that markup moves).

## 3. Bug fix — checklist font mismatch

**Diagnosis:** Static read of `main.css` and Tailwind's `preflight.css` shows nothing that explicitly re-targets `<li>` with a different `font-family` — `body { font-family: var(--font-body) }` should cascade to it like it does to `<p>`. The `<li>` text starts with an emoji glyph (`{selected.icon ?? '✨'} {item}`) with no explicit `font-family` set on the list itself; relying purely on inherited cascade for a text run that opens with an emoji character is the kind of thing that renders inconsistently across browsers (emoji-glyph font fallback can affect the whole inline box in some engines), which matches the reported symptom of "looks like a different font."

**Fix:** stop relying on inheritance — set `font-family: var(--font-body)` explicitly on the `<ul>` (inherited by every `<li>`), the same way headings get their font explicitly rather than assumed. No new token, reuses `--font-body` already defined in `main.css`.

## 4. Bug fix — description not splitting into paragraphs

**Diagnosis:** `services.ts`'s template-literal strings are indented in source, so the "blank line" between paragraphs (e.g. entry `1`, `2`, `3`, `4`, `8`) is not a literal `\n\n` — it's `\n` + a line of only spaces (the indentation) + `\n`. `selected.description.split('\n\n')` never matches that, so the whole string renders as one `<p>`. (Entries `5`–`7` don't have blank-line paragraph breaks in the source at all — those are correctly single-paragraph today and should stay that way.)

**Fix:** in `Services.tsx` only (not `services.ts`), change the split to a regex that tolerates a whitespace-only blank line, and trim each resulting paragraph to drop the leading indentation the template literal adds to continuation lines:
```ts
selected.description
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter(Boolean)
  .map((paragraph, i) => <p key={i} className="text-[#3b342d] mb-4">{paragraph}</p>)
```

## Validation

- `npm run lint`.
- Manual/visual check by the user at mobile and desktop widths (per established workflow in this session — dev server is not launched from here).
- Re-check all 8 entries in `services.ts` render with the correct paragraph count and no stray leading whitespace, and that checklist text visually matches body text.
- Playwright test, per `/AGENTS.md`'s testing convention: extend `tests/pages/HomePage.ts` with the Services section, card, and modal locators this feature needs (following the existing `aboutPaulaSection`-style pattern), then add a spec covering:
  - a card exposes only the therapy name — no description or price text on its face;
  - clicking a card opens the modal with duration, modality, description, checklist, price, and the WhatsApp link;
  - the checklist `<li>` and the description `<p>` resolve to the same computed `font-family`;
  - a multi-paragraph description (e.g. entry `1` or `2`, which have a blank-line break in `services.ts`) renders as multiple `<p>` elements, not one block.
