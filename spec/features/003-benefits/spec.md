# 003 · Benefits Scroll Storytelling

**Status:** done

## What it does

Builds the Benefits section from scratch, it is currently an empty component shell with no content. On desktop viewports, the section pins to the screen on scroll (position sticky) and reveals each benefit one at a time as the user scrolls: the active benefit expands to show a background image with overlay, its title, subtitle, body text, and closing quote, while the other benefits remain collapsed as thin bars. After the last benefit is revealed, scroll releases back to normal page flow and continues to the next section.

On viewports below the desktop breakpoint, the section renders as a simple tap-to-expand accordion instead, no scroll pinning, following the existing responsive rule in `/AGENTS.md`.

Content is sourced from `client/data/benefits.ts`, following the same data-driven pattern already used in `client/data/services.ts`.

## Why

The Benefits section communicates the emotional value of Paula's therapies (what the client gains, not just what the therapy consists of), and right now it's empty. A scroll-linked reveal makes each benefit feel deliberate and immersive on desktop, where users have more patience for this kind of interaction. Mobile traffic, which is the majority for this site given it comes mostly from TikTok, keeps native scroll untouched to avoid the frustration scroll-jacking causes on touch devices.

## Acceptance criteria

- [x] On desktop, the section pins in place while the user scrolls through it, and does not release until the last benefit has been fully revealed.
- [x] Scrolling forward reveals benefits one at a time, in order, each showing its background image with overlay, title, subtitle, body paragraphs, and closing quote.
- [x] The benefit not currently active collapses back to its compressed bar state.
- [x] After the last benefit, continuing to scroll releases the pin and resumes normal page scroll into the next section.
- [x] If `prefers-reduced-motion` is enabled, the section renders all benefits in a static, non-pinned layout with no scroll-linked animation.
- [x] The pin can never trap scroll indefinitely, if scroll continues past the last benefit, the page unpins regardless of animation state (safety net for resize, orientation change, or slow JS load).
- [x] Below the desktop breakpoint, the section is a tap-to-expand accordion, no pinning, no scroll-jacking, per the responsive rule in `/AGENTS.md`.
- [x] All four benefits (Claridad, Acompañamiento, Conexión, Transformación) are represented, each with its title, subtitle, two body paragraphs, and closing quote with author attribution, matching the content in `client/data/benefits.ts` exactly.
- [x] Each benefit's closing quote renders in italic using the heading font, in the same colour as the body paragraphs (`--color-text-light`, `#7a7268`), following the same visual convention already established for quotes in `Story.tsx` (`font-heading italic`).
- [x] Each benefit's background image loads from `public/[id]bg.png` (e.g. `claridadbg.png`) as referenced in the data file.
- [x] The section is fully readable and correctly laid out on both mobile and desktop widths.

## Out of scope

- The exact visual reference (canvas-based blob/gradient effect from the inspiration site), tracked as a possible future polish if there's time.
- Choice of animation library (GSAP ScrollTrigger vs Framer Motion vs hand-rolled), left for plan.md.