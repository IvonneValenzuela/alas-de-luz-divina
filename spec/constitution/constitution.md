# Alas de Luz Divina — Constitution

## Mission

### What we are building

Alas de Luz Divina is a responsive single-page website for a spiritual wellness business founded by Paula Valenzuela.
The website provides a calm, welcoming and intuitive space where visitors can learn about Alas de Luz Divina, understand its purpose, explore the therapies offered, learn about Paula, read testimonials, find answers to common questions, and contact Paula directly.

### Who it is for

- People interested in spiritual guidance, angelic therapies, personal transformation, and emotional wellbeing.
- Visitors who want to learn more about Alas de Luz Divina and the therapies offered before deciding whether to contact Paula.
- Visitors ready to reach out directly, through the WhatsApp Business link or Paula's Instagram and TikTok.
- Paula Valenzuela, as the owner and maintainer of the business website.

### Principles

- **Real content only** — Prices, therapy names, Paula's biography, expectations, and policies must match her source PDF exactly. Never invent, paraphrase, or estimate client content.
- **Clarity** — Information should be easy to understand and organised so visitors can naturally move from discovering the business to understanding its services and deciding whether to make contact.
- **Trust** — The website should communicate Paula's story, experience, and approach in an authentic and transparent way.
- **Simplicity** — The experience should remain focused and avoid unnecessary features or steps.
- **Human connection** — The website should reflect the personal and welcoming nature of Alas de Luz Divina rather than feeling like a generic commercial platform.
- **Maintainability** — The codebase should use a clear component structure and reusable data so the website can be updated as the business evolves.

### What this is not

- This is not an e-commerce platform.
- This is not an online payment platform.
- This is not a client portal.
- This is not an online therapy or consultation platform.
- This is not intended to replace direct communication with Paula.

---

## Tech Stack & Conventions

See `/AGENTS.md` at the project root, it's the single source of truth for stack, project structure, commands, conventions, visual style, and hard limits, so this file and the code stay in sync without duplicating anything here.

---

## Roadmap

### Done

- **Navigation** — Navbar with pill links and a mobile hamburger menu below the `lg` breakpoint.
- **Our Story** — Intro text and quote banner, including the background image and brand-colour overlay.
- **AGENTS.md / CLAUDE.md** — Project constitution set up, read by both Claude Code and OpenCode.
- **Playwright setup** — Installed and configured, ready for test cases to be written.
- **001 · About Paula content** — Built out the About Paula section with Paula's real bio, photo, and tagline.

### Next

### Backlog / Ideas

- **002 · Therapies list & popup redesign** — Add the missing therapies with updated pricing, and redesign the popup as a flip card: the card shows only the therapy name, and flips to reveal full details on click.
- **003 · Benefits content**
- **004 · Testimonials content**
- **005 · Footer content**
- **006 · Playwright test cases for existing sections** — Retroactively add end to end tests for Hero, Navigation, Story, and Services, since they were built before Playwright was set up.
- **007 · FAQ content** — Add real frequently asked questions and answers to FAQ.tsx (cancellation timing is one likely question), once the specific questions and answers are defined. Currently an empty component shell with no content.
- **Hero background** — Update the current background image.
- Mobile navigation improvements.
- Subtle scroll and interaction animations.
- Website deployment and custom domain.