# Plan · 003 Benefits Scroll Storytelling

## Approach

Build `client/components/Benefits.tsx` (currently an empty shell) as a single self-contained section component with two render paths, chosen at runtime by matching Tailwind's `lg` breakpoint (1024px, consistent with `Navbar.tsx`'s hamburger cutoff):

- **Desktop (`lg` and up):** scroll-pinned reveal.
- **Mobile/tablet (below `lg`):** tap-to-expand accordion, no pinning.

Both paths render from `benefits` in `client/data/benefits.ts` (no data changes needed — content, quotes, and image paths are already final).

Work happens in two phases so the harder scroll mechanics can be isolated from getting the static content/layout right first:

- **Phase 1 — static structure, both breakpoints.** Build the accordion (mobile) and a non-pinned, all-expanded stacked layout (desktop) using the real content from `benefits.ts`. This validates content accuracy, image loading, typography, and responsive layout before any scroll-linked behavior is added.
- **Phase 2 — scroll-pinning mechanism (desktop only).** Layer in the sticky-pin + scroll-progress logic, collapse/expand transitions, and `prefers-reduced-motion` handling. The mobile accordion and the reduced-motion fallback are unaffected by this phase.

## Pinning mechanism — no new dependency

**Decision: hand-rolled with native CSS `position: sticky` + a scroll listener, no GSAP/Framer Motion.**

Rationale:
- The project currently has zero animation dependencies (`lucide-react`/`react-icons` are icon sets, not animation libs). `/AGENTS.md` favors minimal footprint and no backend/service additions; the same spirit applies to front-end deps for a single scroll effect.
- Native `position: sticky` gets the "pin can never trap scroll indefinitely" acceptance criterion for free, by construction: the browser — not JS — decides when the sticky element unsticks, based on the actual scroll position of its parent. There's no `preventDefault`/wheel-event capture, no JS-owned "is pinned" state that can desync from real scroll (the way GSAP ScrollTrigger's `pin: true` mode works, which fakes scroll with fixed-position + transforms and does need an explicit escape hatch). If JS is slow to load, or a resize happens mid-scroll, the browser's own layout still governs release — nothing to get stuck in.
- This keeps the mechanism inspectable in plain CSS/React without learning a third-party scroll-trigger API for one section.

**Structure:**
- Outer wrapper: `<div style={{ height: `${benefits.length * 100}vh` }}>` — one viewport-height of scroll distance per benefit, giving the user a natural "one scroll = one reveal" pace.
- Inner pinned container: `<div className="sticky top-0 h-screen overflow-hidden">` holding the visual stack of all 4 benefits.
- A single `scroll` listener on `window` (registered only when in desktop mode — see below), throttled with `requestAnimationFrame`, computes:
  - `rect = wrapper.getBoundingClientRect()`
  - `progress = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1)`
  - `activeIndex = clamp(Math.floor(progress * benefits.length), 0, benefits.length - 1)`
- All 4 benefits render simultaneously inside the pinned container as a vertical stack. The active one expands (full title/subtitle/body/quote/background image), the rest collapse to a fixed-height thin bar (title only). Expand/collapse is a CSS `transition-all duration-500` on height/opacity — no per-frame JS-driven animation beyond picking the active index.

## Breakpoint & mode detection

- `useState` + `useEffect` with `window.matchMedia('(min-width: 1024px)')` (matches Tailwind's `lg`), updating on `change`.
- The scroll listener for the pinning mechanism is only attached when desktop mode is active — this is also what keeps mobile scroll completely native/untouched (no listener at all), directly satisfying the "no scroll-jacking on mobile" criterion rather than just visually hiding the pinned version.

## Reduced motion

- `useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)`.
- When true (checked before the desktop/mobile branch): render all 4 benefits fully expanded, stacked in normal document flow, no sticky wrapper, no scroll listener attached at all. Same content/markup as a fully-expanded benefit, just no pin and no collapse state.

## Mobile accordion

- `useState<string | null>` tracking the open benefit's `id` (same pattern as `Services.tsx`'s `selected` state), toggled on tap of each benefit's header/bar.
- Each item: a header bar (title + subtitle) always visible, body/quote/image revealed on expand. No new interaction pattern needed elsewhere in the codebase to match, since `FAQ.tsx` is currently also an empty shell — this becomes the first accordion in the project.

## Content & styling

- Background image: `bg-cover bg-center` with `style={{ backgroundImage: `url(${benefit.image})` }}`, matching `Story.tsx`'s convention, plus a `pointer-events-none` tint overlay div per `/AGENTS.md`.
- Quote: `font-heading italic`, color `--color-text-light` (`#7a7268`), matching `Story.tsx`'s existing quote treatment — per spec, not `--color-tagline` or `--color-primary` (those are reserved/one-off per `/AGENTS.md`).
- Title/subtitle/body: reuse existing heading font + `--color-text`/`--color-text-light` tokens, no new colors or spacing scale.
- Author attribution rendered under the quote (e.g. `— {author}`), not currently modeled as its own styled element anywhere else in the codebase — plain text, small, `--color-text-light`.

## Wiring

- `Benefits` is not yet imported in `client/App.tsx`. Per `/AGENTS.md`'s documented narrative order (Navbar, Hero, Story, Services, Benefits, AboutPaula, Testimonials, FAQ, Footer), it's wired in between `Services` and `AboutPaula`.

## Validation

- `npm run lint` and `npm run build` after each phase.
- Manual check at mobile and desktop widths after each phase (per `/AGENTS.md`'s responsive rule).
- After phase 2, manually verify: scroll pins and releases correctly at both the top and bottom edge of the section, each benefit's image/title/subtitle/body/quote match `benefits.ts` exactly, reduced-motion (via browser/OS emulation) shows the static fallback, and resizing across the `lg` breakpoint mid-page doesn't leave the section in a broken state.
