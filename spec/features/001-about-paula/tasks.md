# Tasks · 001 About Paula

## Phase 1 — Structure & layout (placeholder copy)

- [x] Build `AboutPaula.tsx` section structure: heading ("Un poco más de mí"), `public/pau.png` photo above the text, and a centred body-copy block using the placeholder string `"Hola soy Pau"` in place of the real bio.
- [x] Style with existing tokens/typography only (`main.css`). Later expanded to include the Great Vibes Google Font for the tagline specifically, and a background image, both documented in `/AGENTS.md` as intentional exceptions.
- [x] Wire `AboutPaula` into `client/App.tsx` after `Services` (current last section), per the documented narrative order in `/AGENTS.md`.
- [x] Check layout at mobile and desktop widths (per `/AGENTS.md`'s responsive rule): photo and placeholder text centred, no overflow, no cramped/sparse spacing.
- [x] `npm run lint` and `npm run build` pass.
- [x] Review checkpoint: confirm design/layout is approved before starting phase 2.

## Phase 2 — Real bio content
- [x] Replace the placeholder string with `paulaBio` from `client/data/about.ts`, rendering each array entry as its own paragraph (preserve paragraph breaks, don't merge into one block). Bio was later condensed from 12 to 4 paragraphs and re-confirmed directly with Paula.
- [x] Confirm emojis (🤍, ✨) render correctly and are not dropped or altered.
- [x] Diff rendered text against `client/data/about.ts` line by line to confirm no paraphrasing, summarising, reordering, or rewording.
- [x] Re-check layout at mobile and desktop widths now that real (longer) copy is in place, confirm no overflow or awkward breaks introduced by the real text length.
- [x] `npm run lint` and `npm run build` pass.
- [x] Write a Playwright test for the About Paula section (`tests/about-paula.spec.ts`): confirms the heading reads "Un poco más de mí", the photo is present, and the real bio paragraphs render, per `/AGENTS.md`'s testing convention.
- [x] Mark all acceptance criteria in `spec.md` as done and update `constitution/constitution.md` to move this feature to "Done".
- [x] Wired the Navbar's "Sobre Paula" pill to scroll to the About Paula section.

## Additional work done beyond the original plan
- [x] Added a background image with a semi-transparent brand-colour overlay to the section.
- [x] Added Paula's tagline ("Conecta", "Sana", "Transforma") in the Great Vibes Google Font, stacked vertically below the photo.
- [x] Enlarged the photo (~600px) and widened the two-column layout for better visual balance with the final bio length.
- [x] Enabled Playwright's `baseURL` and `webServer` in `playwright.config.ts` (previously commented out from scaffolding), so `npx playwright test` actually runs against the Vite dev server.
- [x] Added an explicit 10s timeout to the "Sobre Paula pill scrolls to the About Paula section" test's `toBeInViewport` assertion, to absorb intermittent smooth-scroll delays under WSL resource pressure rather than the default timeout.
