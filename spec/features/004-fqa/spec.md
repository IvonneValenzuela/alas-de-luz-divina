# 004 · FAQ

**Status:** done

## What it does

Builds the FAQ section from scratch, it is currently an empty component shell (`FAQ.tsx`) with no content. Renders twelve frequently asked questions as a single-open accordion (a bordered list container, one row per question, a divider between rows, a "+" indicator on the right that becomes "−" when that question is expanded), sourced from `client/data/faq.ts`, following the same data-driven pattern already used in `client/data/about-paula.ts` and `client/data/benefits.ts`. Opening a question collapses whichever one was previously open.

One answer (question 7, about sessions being virtual) includes an inline link inviting the user to join a WhatsApp community group, rendered as a clickable link after that answer's paragraph text.

After the last question, a closing CTA block renders: the site's existing wings icon (reused from the logo/favicon) on the left, a headline and supporting line in the center, and a pill button on the right reading "Quiero abrirme a mi proceso" linking to WhatsApp, following the same `.button-primary` pattern already used in `Services.tsx`.

## Why

Right now clicking "Preguntas" in the navbar leads to an empty section. Answering common doubts upfront (what the therapy involves, whether prior experience is needed, payment methods, cancellation policy) reduces friction before someone commits to booking, and the closing CTA turns that resolved doubt directly into an invitation to book, right at the point where hesitation is lowest.

## Acceptance criteria

- [x] All twelve FAQ items render from `client/data/faq.ts`, question and answer text matching the source data exactly, no paraphrasing, reordering, or dropped content.
- [x] On page load, all FAQ items start collapsed, none open by default.
- [x] Each item behaves as a single-open accordion: clicking a question reveals its answer and changes its indicator from "+" to "−"; clicking an already-open question collapses it; opening a different question closes whichever one was previously open.
- [x] Each accordion trigger is keyboard-operable (reachable via Tab, toggled via Enter or Space) and exposes its open/closed state via `aria-expanded` on the button that triggers it, so a screen reader announces the state change.
- [x] Question 7's answer includes the "Unirme a la comunidad 🤍" link, rendered as a clickable element, using the placeholder URL from the data file until the real WhatsApp group link exists.
- [x] The FAQ list renders inside a single bordered container with a divider between each question, not as separate cards.
- [x] After the last question, the closing CTA renders the wings icon, the headline "¿Sientes el llamado a conectar contigo?", the supporting line "Este puede ser el momento de escucharte y dar ese primer paso hacia tu proceso.", and a pill button reading "Quiero abrirme a mi proceso" linking to `https://wa.me/573019095778`, opening in a new tab, styled with the existing `.button-primary` class.
- [x] The section is fully readable with no horizontal overflow at mobile and desktop widths.

## Out of scope

- The real WhatsApp community group link, tracked as a placeholder until Paula provides it.
- Any shared component with Benefits' accordion, this is a separate, single-open accordion specific to FAQ, per the design reference.