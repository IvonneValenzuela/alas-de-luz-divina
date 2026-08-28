## Alas de luz divina

A single-page React/TypeScript/Tailwind landing page for Alas de Luz Divina, a spiritual wellness business (angelic therapy services). Client-facing content is in Spanish. Built for a real client as part of a portfolio.

## Commands

```bash
npm run dev         # start Vite dev server
npm run build       # tsc -b (project references, type-check only) then vite build
npm run lint        # eslint .
npm run preview     # preview the production build
npx playwright test # run e2e tests
```

## Architecture

- Entry point is `client/index.tsx` → `client/App.tsx`, which composes page sections as components in order (this order defines the page's scroll narrative: Navbar, Hero, Story, Services, ...). When adding a new section component, wire it into `App.tsx` in the appropriate narrative position.
- `client/components/` — one component per landing-page section (Navbar, Hero, Story, Services, Benefits, AboutPaula, Testimonials, FAQ, Footer). Components are largely self-contained and pull their content from `client/data/`.
- `client/data/` — static content as typed data (`services.ts`, `testimonials.ts`) with shared interfaces in `types.ts` (`Service`, `Testimonial`). Prefer adding/editing content here over hardcoding it in components, matching the existing Services/Testimonials pattern.
- `client/styles/main.css` — global styles; Tailwind CSS v4 is wired in via `@tailwindcss/vite` in `vite.config.ts` (no separate `tailwind.config.js`).
- TypeScript uses project references: `tsconfig.json` references `tsconfig.app.json` (app source) and `tsconfig.node.json` (Vite config).
- Prices are Colombian pesos (COP), formatted with `toLocaleString('es-CO')`.
- Booking/contact flow is via WhatsApp Business links rather than an in-app form/backend — there is no server-side code in this project.
- `spec/` — Spec Driven Development documentation: `constitution/constitution.md` holds the mission and roadmap, `features/NNN-name/` holds each feature's spec, plan, and tasks.

## Stack
- Language: TypeScript
- Framework: React (Vite)
- Styling: Tailwind CSS v4 (via @tailwindcss/vite, no separate config file)
- Database: none, static site with no backend
- Tests: Playwright (end to end)

## Conventions
- Client-facing content (copy, therapy names, testimonials) is written in Spanish, but component file names, prop names, and code identifiers stay in English. This project is also a portfolio piece for the New Zealand job market.
- Design tokens live in `client/styles/main.css` as CSS custom properties: `--color-primary: #d6b26e`, `--color-primary-light: #ead6ad`, `--color-surface: #faf7f2`, `--color-text: #3b342d`, `--color-text-light: #7a7268`, `--color-border: #ebe2d7`. Headings use Cormorant Garamond, body text uses Inter. Reuse these instead of introducing new colors or fonts.
- Paula's tagline (`paulaTagline`) uses Great Vibes, a script Google Font, imported specifically for this element. Don't use it anywhere else, headings stay in Cormorant Garamond, body text stays in Inter.
- Paula's tagline also uses a dedicated colour, `--color-tagline: #e3965f`, requested by Paula specifically for this element. Don't reuse it elsewhere or introduce further one-off colours without documenting them here first.
- Prices, therapy names, and contact details (WhatsApp number, email) must match Paula's information exactly, don't paraphrase or estimate them.
- This site must stay fully responsive across mobile, tablet, and desktop widths. The Navbar switches from pill links to a hamburger menu below the `lg` breakpoint specifically for this. Any layout, spacing, or sizing change must be checked at both mobile and desktop widths before it's considered done.
- Playwright tests use the Page Object Model. Shared locators and actions live in `tests/pages/HomePage.ts`, since the site is single-page. Add to that class instead of duplicating locators inline in new test files.
- Decorative overlay divs (`absolute inset-0` tint layers over background images) must include `pointer-events-none`, so they never intercept clicks or text selection from the content above them.
- Every feature's Playwright test goes through two steps before the feature is considered ready: `/plan-tests <feature-name>` to derive and write the test cases from spec.md's acceptance criteria (it will ask about any additional scenarios), then `/review-tests <feature-name>` right before closing the feature, a read-only audit that checks coverage and catches data drift (like a stale price) one final time. Address anything `review-tests` flags before final wrap-up.

## Don't
- Don't run `git commit` or `git push`, stage and describe the change, leave committing to the developer.
- Don't introduce colors, fonts, or spacing values outside the existing design tokens in `main.css`.
- Don't add a backend, database, or form submission service, booking intentionally goes through WhatsApp only.
- Don't invent or paraphrase client content (therapy descriptions, prices, bio, policies), use Paula's source PDF as the only source of truth.

## Workflow
- Before a non trivial task, propose a plan and wait for approval before touching files.
- One task at a time, when done, describe what changed so it can be reviewed against the source PDF.
- If not at least 80% sure about client content, ask rather than filling in a guess.

## Documentation
- Features with real content or logic to get right (not small visual tweaks) get a spec at `spec/features/<name>/`, created when that feature starts, not upfront.