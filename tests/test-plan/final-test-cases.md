# Alas de Luz Divina — Frontend Test Documentation

**Application:** alasdeluzdivina.com
**Stack:** React + Vite + TypeScript, Tailwind CSS
**Test tooling:** Playwright (E2E), Vitest + React Testing Library (Component)
**Scope:** Footer, Hero, Navbar, Services, Story, AboutPaula, Benefits, FAQ

---

## Legend

**Test Level** — how much of the system is exercised:
- **Unit** — a single data module or pure function, no rendering.
- **Component** — one React component rendered in isolation (jsdom), no live browser, no full page.
- **E2E / System** — the full application running in a real browser (Playwright), simulating real user interaction.

**Test Type** — what quality attribute is being verified:
- **Functional** — the feature behaves as specified.
- **State Transition** — behaviour across open/closed or active/inactive states.
- **Accessibility** — keyboard operability, ARIA attributes, assistive-tech support.
- **Link / Integration** — correctness and safety of outbound links.
- **Compatibility / Layout** — real-browser rendering behaviour that a DOM simulator cannot reproduce (layout, scroll, media queries).

Design technique is noted in parentheses where it applies directly (equivalence partitioning, boundary value, negative testing, data-driven testing).

---

## 1. Footer

**Component under test:** `Footer.tsx`
**Test level:** Component
**Test type(s):** Functional, Link/Integration

| ID | Test Case | Expected Result |
|---|---|---|
| FOOTER-01 | Copyright text renders correctly | The exact string "© 2026 Alas de Luz Divina. Todos los derechos reservados." is visible |
| FOOTER-02 | Exactly three social badges render | Instagram, WhatsApp, and TikTok links are present, no more, no fewer |
| FOOTER-03 | Instagram badge is correct and secure | `href` matches `socialLinks.instagram`; `target="_blank"`; `rel="noopener noreferrer"` |
| FOOTER-04 | WhatsApp badge is correct and secure | `href` matches `socialLinks.whatsapp`; `target="_blank"`; `rel="noopener noreferrer"` |
| FOOTER-05 | TikTok badge is correct and secure | `href` matches `socialLinks.tiktok`; `target="_blank"`; `rel="noopener noreferrer"` |

**Test level:** E2E
**Test type(s):** Layout/Compatibility

| ID | Test Case | Expected Result |
|---|---|---|
| FOOTER-06 | No horizontal overflow at desktop width | `scrollWidth` does not exceed `clientWidth` |
| FOOTER-07 | No horizontal overflow at mobile width (390×844) | `scrollWidth` does not exceed `clientWidth` |

### Supporting data module: `social-links.ts`

**Test level:** Unit
**Test type(s):** Functional

| ID | Test Case | Expected Result |
|---|---|---|
| DATA-01 | WhatsApp URL is correct | `socialLinks.whatsapp` equals `https://wa.me/573019095778` |
| DATA-02 | Instagram URL is correct | `socialLinks.instagram` equals the expected profile URL |
| DATA-03 | TikTok URL is correct | `socialLinks.tiktok` equals the expected profile URL |

*Rationale: keeping this as a separate data-level check isolates the source of truth. If a link ever breaks, this suite fails with a direct, unambiguous cause instead of an indirect failure inside every component that consumes it.*

---

## 2. Hero

**Component under test:** `Hero.tsx`
**Test level:** Component
**Test type(s):** Functional

| ID | Test Case | Expected Result |
|---|---|---|
| HERO-01 | Logo image is visible | `<img>` element renders |
| HERO-02 | "Comenzar mi proceso" button links to WhatsApp | `href` equals `socialLinks.whatsapp`; `target="_blank"` |
| HERO-03 | Instagram icon links correctly | `href` equals `socialLinks.instagram`; `target="_blank"` |
| HERO-04 | TikTok icon links correctly | `href` equals `socialLinks.tiktok`; `target="_blank"` |

---

## 3. Navbar

**Component under test:** `Navbar.tsx`
**Test level:** Component
**Test type(s):** Functional, State Transition

| ID | Test Case | Expected Result |
|---|---|---|
| NAV-01 | Mobile menu is closed by default | Menu links are not present on initial render |
| NAV-02 | Hamburger button opens the mobile menu | Menu links become visible after click |
| NAV-03 | Hamburger button closes an open menu | A second click hides the menu links again |

**Test level:** E2E
**Test type(s):** Functional, Layout/Compatibility

| ID | Test Case | Expected Result |
|---|---|---|
| NAV-04 | Clicking a nav link scrolls to the correct section (sample: Historia, Terapias, Beneficios, Sobre Paula, Preguntas) | The corresponding section enters the viewport after the click |
| NAV-05 | Clicking "Inicio" while scrolled away returns to the Hero section | Page is scrolled to the bottom first (Hero confirmed out of viewport), then after clicking "Inicio" the Hero section (`#hero`) is back in the viewport |

*Rationale: this depends on every section existing at its real position within the full page layout, so it cannot be verified from the Navbar component in isolation. Since every link uses the same native anchor behaviour (`href="#id"`, no custom scroll logic), NAV-06 samples 5 of the 6 links (Historia, Terapias, Beneficios, Sobre Paula, Preguntas) rather than testing all six individually. "Inicio" (NAV-07) is tested separately, not folded into the sample, because verifying it needs the page scrolled away from the top first, a different setup than the other links share.*

---

## 4. Services

**Component under test:** `Services.tsx`
**Test level:** Component
**Test type(s):** Functional, Accessibility

| ID | Test Case | Expected Result |
|---|---|---|
| SERV-01 | Clicking a therapy card opens its modal | `role="dialog"` becomes visible with the correct service's content |
| SERV-02 | Price renders formatted in COP | Displayed price matches `toLocaleString('es-CO')` output |
| SERV-03| Close button (✕) closes the modal | Modal is removed from the DOM |
| SERV-04 | Clicking the overlay closes the modal | Modal closes when the backdrop is clicked |
| SERV-05 | Clicking inside the modal does not close it | `stopPropagation` prevents the overlay's close handler from firing |
| SERV-06 | Escape key closes an open modal | Modal is removed from the DOM after pressing Escape |
| SERV-07 *(equivalence partitioning)* | Duration renders only when present | Services with a duration display it; services without do not |
| SERV-08 *(equivalence partitioning)* | Checklist renders only when present | Checklist is visible only for services that define one |
| SERV-09 *(equivalence partitioning)* | Modality renders only when present | Services with a modality display it; services without do not |
| SERV-10 | Card face shows only the therapy name | No description text or price is visible on the card before it's opened |
| SERV-11 | Modal shows the WhatsApp booking link | Labelled "Agendar por WhatsApp"; `href` matches `socialLinks.whatsapp`; opens securely in a new tab |
| SERV-12 | Closing the modal leaves the grid unchanged | Same cards, same order, same titles, no dialog present |

**Test level:** E2E
**Test type(s):** Functional, Layout/Compatibility

| ID | Test Case | Expected Result |
|---|---|---|
| SERV-13 | Modal opens with the flip animation | Dialog's computed `animation-name` is `modal-flip-in`, not `none` |
| SERV-14 | Mobile: clicking a card opens the same animated modal | Same dialog and animation as desktop, using a click, not a simulated touch |
| SERV-15 | Section layout at mobile and desktop widths | No horizontal overflow; all 8 cards reachable, at 375×667 and 1280×800 |
| SERV-16 | Modal layout at mobile and desktop widths | Modal fits inside the viewport; the WhatsApp link can be scrolled to and is visible, at both widths |

### Optional fields (mocked data): `Services.optional-fields.test.tsx`

| ID | Test Case | Expected Result |
|---|---|---|
| SERV-17 | Shows no duration when absent | Using a service with no duration, no text containing "Duración:" appears in the modal |
| SERV-18 | Shows no checklist when absent | Using a service with no checklist, no list (role="list") appears in the modal |
| SERV-19 | Shows no modality when absent | Using a service with no modality, no text containing "Modalidad:" appears in the modal |

*Counterpart to SERV-07 (duration), SERV-08 (checklist), and SERV-09 (modality) above, same behaviour verified with a service missing the field instead of one that has it.*

---

## 5. Story

**Component under test:** `Story.tsx`
**Test level:** Component
**Test type(s):** Functional

| ID | Test Case | Expected Result |
|---|---|---|
| STORY-01 | Title, quote, body paragraphs, and closing line render correctly | All static content from `story.ts` data is visible |

---

## 6. AboutPaula

**Component under test:** `AboutPaula.tsx`
**Test type(s):** Functional

| ID | Test Case | Level | Expected Result |
|---|---|---|---|
| ABOUT-01 | "Un poco más de mí" heading is visible | Component | Heading renders |
| ABOUT-02 | Pau's photo is visible | Component | Image renders with the correct alt text |
| ABOUT-03 | Bio paragraphs render correctly | Component | Static content matches `about.ts` |

**Test level:** E2E
**Test type(s):** Layout/Compatibility
 
| ID | Test Case | Expected Result |
|---|---|---|
| ABOUT-04 *(visual regression)* | Section renders correctly at mobile, tablet, and desktop widths | No unintended visual change at 390×844 (mobile), 820×1180 (tablet, iPad Air), and 1440×900 (desktop), compared against the approved baseline screenshots |
 
*Rationale: none of the functional checks above would catch a layout regression like the one found during manual review, where the photo jumped to a fixed 600px width right at the `md` breakpoint, squeezing the bio text into unreadable single-word lines at 820px. No overflow occurred (the text stayed inside its column), so an overflow check alone wouldn't have caught it either. 820px was picked specifically because it's the width where the bug was found, not just a round number.*

---

## 7. Benefits

**Component under test:** `Benefits.tsx`
**Test type(s):** Functional, State Transition, Layout/Compatibility

| ID | Test Case | Level | Expected Result |
|---|---|---|---|
| BEN-01 | Mobile branch renders one accordion button per benefit, collapsed by default | Component (`matchMedia` mocked) | All buttons render with `aria-expanded="false"` |
| BEN-02 | Opening one benefit closes the previously open one | Component (`matchMedia` mocked) | Exclusivity behaviour confirmed |
| BEN-03 | Reduced-motion branch shows full content without interaction | Component (`matchMedia` mocked) | Each benefit's body text is visible immediately, no click required |
| BEN-09 *(data-driven)* | Every benefit shows its subtitle, quote and quote author | All values match `benefits.ts` |

**Test level:** E2E
**Test type(s):** Functional, Layout/Compatibility

| ID | Test Case | Expected Result |
|---|---|---|
| BEN-04 | Active benefit changes according to real scroll progress (desktop) | No benefit is expanded before the section; the first benefit is shown at the start of the scroll and the last at the end. The ones in between share the same logic, so first and last are sampled instead of testing each one. |
| BEN-05 | OS-level reduced-motion preference shows static content (`page.emulateMedia`) | All benefits are visible without scrolling |
| BEN-06 | Scrolling past the last benefit continues to the next section | The page never gets trapped; the section after Benefits enters the viewport |
| BEN-07 | No horizontal overflow at desktop width | `scrollWidth` does not exceed `clientWidth` |
| BEN-08 | No horizontal overflow at mobile width (390×844) | `scrollWidth` does not exceed `clientWidth` |

*Note: `matchMedia` is not implemented by jsdom, so component-level tests mock it directly. The scroll-pinning behaviour itself depends on `getBoundingClientRect` and real window scroll, which only a real browser can reproduce reliably, hence the split between Component and E2E for this component.*

*Deliberately not automated: confirming the section stays pinned while scrolling, every middle benefit and their order, and inactive bars remaining visible (continuous scroll checks, fragile for the value they add); background image paths (visible at a glance); quote styling (visual). A real tap on a narrow viewport is left for manual QA.*

---

## 8. FAQ

**Component under test:** `FAQ.tsx`
**Test type(s):** Functional, State Transition, Accessibility

| ID | Test Case | Level | Expected Result |
|---|---|---|---|
| FAQ-01 | All twelve questions render, collapsed by default | Component | 12 buttons render with `aria-expanded="false"` |
| FAQ-02 | Opening a different question closes the previous one | Component | Exclusivity behaviour confirmed |
| FAQ-03 *(data-driven)* | Each answer matches its source data exactly | Component | Verified across all 12 items from `faq.ts` |
| FAQ-04 *(equivalence partitioning)* | Question 7 includes the clickable community link | Component | Link renders with the correct text and `href` |
| FAQ-05 | Accordion renders inside a single bordered container, not separate cards | Component | One wrapping container holds all twelve items |
| FAQ-06 | A question is keyboard-operable | Component | Focusable via Tab; toggled with Enter and Space |
| FAQ-07 | No horizontal overflow at desktop width | E2E | `scrollWidth` does not exceed `clientWidth` |
| FAQ-08 | No horizontal overflow at mobile width (390×844) | E2E | Same check at mobile viewport |
| FAQ-09 | Closing section renders its headline, supporting line, and WhatsApp button | Component | Headline, supporting line and button label match `faqInvitation`; button `href` matches `socialLinks.whatsapp`, opens securely in a new tab |whatsapp`, `target="_blank"`, `rel="noopener noreferrer"` |
| FAQ-10 | The "+"/"−" indicator reflects open and closed state | Component | Shows "+" when collapsed, "−" when open, back to "+" when closed again |
| FAQ-11 *(data-driven)* | Questions appear in source order | Component | Button order matches `faqItems` |

---

## Summary

| Component | Component-level cases | E2E cases | Notable gap found & fixed |
|---|---|---|---|
| Footer | 5 (+3 data) | 2 | — |
| Hero | 4 | 0 | — |
| Navbar | 3 | 2 | — |
| Services | 9 | 4 | — |
| Story | 1 | 0 | — |
| AboutPaula | 3 | 0 | — |
| Benefits | 4 | 5 | Review found no test for scrolling past the section (a pinning bug could trap the page); added BEN-06 |
| FAQ | 9 | 2 | — |

The suite follows the standard testing pyramid: the majority of cases run at component level, fast and isolated, with a small, deliberate set of E2E cases reserved for behaviour that genuinely requires a real browser (cross-section layout, real scroll, media-query emulation).