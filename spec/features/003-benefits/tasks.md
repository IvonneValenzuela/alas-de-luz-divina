# Tasks · 003 Benefits Scroll Storytelling

## Phase 1 — Static structure (both breakpoints, real content)

- [x] Build the mobile tap-to-expand accordion in `Benefits.tsx`: one bar per benefit (title + subtitle), tap toggles open/closed, expanded state shows background image + overlay, body paragraphs, and quote with author — content from `benefits` in `client/data/benefits.ts`.
- [x] Build the desktop static (non-pinned) layout: all 4 benefits stacked in normal flow, each fully expanded (no collapse/expand yet) — this is the visual target the pinning mechanism will animate toward in phase 2.
- [x] Add breakpoint detection (`matchMedia('(min-width: 1024px)')`) to switch between the two render paths.
- [x] Style quote text as `font-heading italic`, `--color-text-light`, matching `Story.tsx`'s existing quote convention; render author attribution beneath it.
- [x] Confirm each benefit's background image (`/claridadbg.png`, `/acompanamientobg.png`, `/conexionbg.png`, `/transformacionbg.png`) loads correctly with a `pointer-events-none` tint overlay, per `/AGENTS.md`. — all 4 files present in `public/`, overlay div uses `pointer-events-none`.
- [x] Wire `Benefits` into `client/App.tsx` between `Services` and `AboutPaula`, per the documented narrative order in `/AGENTS.md`.
- [x] Diff rendered title/subtitle/body/quote/author for all 4 benefits against `client/data/benefits.ts` line by line — no paraphrasing, reordering, or dropped content. — `BenefitCard` renders `benefit.title/subtitle/body/quote.text/quote.author` directly from the data array, no hardcoded/duplicated copy in the component.
- [x] Check layout at mobile and desktop widths (per `/AGENTS.md`'s responsive rule): accordion bars and expanded desktop stack both readable, no overflow. — verified manually by the developer in browser.
- [x] `npm run lint` and `npm run build` pass.
- [x] Review checkpoint: confirm static content/layout is approved before starting phase 2.

## Phase 2 — Scroll-pinning mechanism (desktop)

- [x] Implement the sticky-pin wrapper (`height: ${benefits.length * 100}vh` outer, `sticky top-0 h-screen` inner) and scroll-progress calculation to derive the active benefit index. — `PinnedStack` in `Benefits.tsx`.
- [x] Implement collapse/expand transition: active benefit shows full content, others collapse to a thin title-only bar, animated via CSS transition (no per-frame JS animation). — `BenefitStackItem`, `transition-all duration-500` on `flexGrow`.
- [x] Attach the scroll listener only in desktop mode; confirm no scroll listener is attached on mobile (accordion path untouched, still native scroll). — scroll listener lives entirely inside `PinnedStack`, which only renders when `isDesktop && !prefersReducedMotion`; `MobileAccordion` has no scroll listener.
- [x] Implement `prefers-reduced-motion` handling: static, non-pinned, fully-expanded stacked layout when the media query matches, checked before branching into desktop/mobile. — `prefersReducedMotion` branch renders `ExpandedStack` first, ahead of the `isDesktop` check.
- [x] Verify the safety-net behavior: continuing to scroll past the last benefit releases the pin and resumes normal page scroll into `AboutPaula`; confirm this holds after a browser resize/orientation change mid-scroll. — verified manually by the developer in browser.
- [x] Re-check layout and scroll behavior at mobile and desktop widths (per `/AGENTS.md`'s responsive rule). — verified manually by the developer in browser.
- [x] `npm run lint` and `npm run build` pass.
- [x] Mark all acceptance criteria in `spec.md` as done.
- [x] Update `constitution/constitution.md` to move this feature to "Done".
- [ ] Tests to be created later (`/plan-tests 003-benefits` and `/review-tests 003-benefits`), deferred separately from feature closure.

## Additional work done beyond the original plan

- [x] Added a "Beneficios" nav-pill entry (`{ id: 'benefits', label: 'Beneficios' }`) to `Navbar.tsx`'s link list, so the new section is reachable from navigation. Not called out as a task anywhere in `plan.md`.
