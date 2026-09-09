# Plan · 005 Footer

## Approach

Build `client/components/Footer.tsx` (currently an empty file) as a single self-contained section component. Unlike FAQ/Benefits, this section has no data file and no interactive state — it's a static pill bar with copyright text and two link badges, styled entirely with Tailwind utility classes plus CSS variables from `main.css`.

## New one-off colors

Two of the spec's colors aren't in `main.css`'s existing token list: copyright text `#fffdf8` and badge background `#2e2620`. Neither is close enough to an existing token (`--color-background: #fffdf9` is one hex digit off `#fffdf8`, not a match) to reuse without paraphrasing the client-specified value, which `/AGENTS.md`'s Don't list forbids.

`/AGENTS.md` already has a precedent for exactly this: `--color-tagline` was added as a documented one-off for `paulaTagline` when Paula requested a color used nowhere else. Following that pattern:

- Add `--color-footer-text: #fffdf8` and `--color-footer-badge: #2e2620` to the `:root` block in `client/styles/main.css`, grouped near `--color-tagline` under a comment identifying them as footer-only.
- Add a bullet to `/AGENTS.md`'s Conventions section documenting both, matching the existing tagline-color bullet's phrasing (what they're for, that they shouldn't be reused elsewhere or extended without documenting here first).

The bar's background (`#d6b26e`) and the badge border (`#d6b26e`) both reuse `--color-primary`, already documented — no new token needed there. The icon color inside each badge (`#faf7f2`) reuses `--color-surface`, also already documented.

## Structure

- Single `<footer>` (or `<section>`, matching how other sections are rooted — check sibling components' root tags) containing one pill-shaped bar: `<div className="rounded-full ...">` with `background: var(--color-primary)`.
- Inside the bar: a flex row, `justify-between items-center`, copyright text on the left, a `gap`-separated pair of icon badges on the right.
- Copyright text: exact string `© 2026 Alas de Luz Divina. Todos los derechos reservados.`, `color: var(--color-footer-text)`.
- Icon badges: two `<a>` elements, each `w-10 h-10 rounded-full flex items-center justify-center`, `background: var(--color-footer-badge)`, `border: 1.5px solid var(--color-primary)`, icon (`SiInstagram` / `SiTiktok` from `react-icons/si`, same import already used in `Hero.tsx`) sized and colored `var(--color-surface)` via Tailwind's `text-[var(--color-surface)]` (icons inherit `currentColor`, matching how `Hero.tsx`'s badges work).
- Each badge links to the exact same URLs already in `Hero.tsx`: Instagram `https://instagram.com/alasdeluzdivina`, TikTok `https://www.tiktok.com/@alas.de.luz.divina`, both `target="_blank" rel="noopener noreferrer"`, with `aria-label` ("Instagram" / "TikTok") matching `Hero.tsx`'s existing accessibility pattern.

## Responsive behavior

The spec calls for one pill bar at every width, not a layout-mode switch like Navbar's hamburger — "no horizontal overflow or wrapping ... adjusting padding/sizing as needed for narrow screens" means scaling down padding, text size, and badge size at small widths (e.g. `text-xs sm:text-sm`, tighter `px-4 sm:px-6` on the bar, smaller badge diameter if needed), not restructuring the row. Copyright text and the badge pair stay on the same row and same relative positions (left / right) at both mobile and desktop widths.

## Wiring

`Footer` is not yet imported in `client/App.tsx`. Per `/AGENTS.md`'s documented narrative order (Navbar, Hero, Story, Services, Benefits, AboutPaula, Testimonials, FAQ, Footer), `Footer` is the last section — wired in directly after `FAQ`, the current last component in `App.tsx`. `Testimonials` remains an unwired empty shell (feature on pause, out of scope here).

## Styling & tokens

- Bar background, badge border: `--color-primary` (`#d6b26e`) — already documented.
- Icon color inside badges: `--color-surface` (`#faf7f2`) — already documented.
- Copyright text: new `--color-footer-text` (`#fffdf8`) — documented above.
- Badge background: new `--color-footer-badge` (`#2e2620`) — documented above.
- No spacing values or fonts outside the existing scale; body text stays `font-body` (Inter, the default), no heading font needed since there's no heading in this section.

## Out of scope

Términos y Condiciones / Política de Privacidad links — deferred per `spec.md`, not part of this feature's markup at all (not even as placeholders).

## Validation

- `npm run lint` and `npm run build` after implementation.
- Manual check at mobile and desktop widths per `/AGENTS.md`'s responsive rule: bar stays one row, no horizontal overflow or text wrapping, padding/sizing scales down cleanly at narrow widths.
- Verify copyright text renders exactly `© 2026 Alas de Luz Divina. Todos los derechos reservados.`, character for character.
- Verify both badge links: correct URLs (matching `Hero.tsx` exactly), `target="_blank"`, open in a new tab.
- Verify colors against spec hex values directly (devtools computed style), not just visually.
