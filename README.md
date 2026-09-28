# ✨ Alas de Luz Divina

A responsive landing page for a spiritual wellness business, built with React, TypeScript, and Tailwind CSS.

This project presents the brand story of Alas de Luz Divina, highlights angelic therapy services, shares Paula’s journey, showcases testimonials, and makes it easy for visitors to book a session through WhatsApp.

🌐 Live site: [alasdeluzdivina.com](https://alasdeluzdivina.com/)

---

## 🌿 About the project

This repository contains the front-end for a client-facing landing page designed to create a calm, trustworthy, and professional online presence for a small wellness business.

The site is structured as a single-page experience that introduces the brand, its services, and its mission before inviting visitors to connect and book a session.

The project focuses on responsive design, accessible content hierarchy, reusable React components, and a warm visual identity that feels serene, welcoming, and professional.

---

## 🎯 Project goals

- Build a modern, responsive landing page
- Create a calm and intuitive user experience
- Present the services offered by Alas de Luz Divina
- Make it easy for visitors to contact the business through WhatsApp
- Apply reusable component patterns and React best practices

---

## ✨ Features

- Responsive single-page layout
- Component-based architecture
- Reusable React components
- Mobile-friendly navigation
- WhatsApp contact integration
- Social media links
- Services section
- Testimonials section
- FAQ section

---

## 🧪 Testing strategy

This project uses the most suitable testing tool at each level:

- Component and unit tests use Vitest + React Testing Library to verify isolated behavior such as rendering, user interaction, and state changes.
- End-to-end tests use Playwright to validate complete user journeys in a real browser across mobile and desktop viewports.

The test strategy is informed by ISTQB principles and adapted to the realities of a small, single-developer project.

### Acceptance criteria traceability

Each feature starts with a specification that defines its acceptance criteria. Test cases are derived directly from those criteria, and each criterion is tracked as fully covered, partially covered, not covered, or left for manual QA. A test is never labelled as covering a full criterion when it only verifies part of it.

### Page Object Model

Selectors and page interactions live in the shared page object at `tests/e2e/pages/HomePage.ts`, so tests describe user behavior instead of DOM implementation details and remain easier to maintain as the markup evolves.

### Testing the way users use the app

Component and unit tests query elements by accessible role, label, and visible text rather than by implementation details such as class names or internal state. This keeps tests focused on user experience and encourages accessible markup.

### Single source of truth for content

Tests import expected content from the same data files the app renders (`client/data/*.ts`) instead of hardcoding values. When the client’s content changes, the tests stay aligned automatically.

### Automated where it adds value, manual where it doesn’t

Layout checks at mobile and desktop widths are automated. Touch gestures and subjective visual checks are deliberately left for manual exploratory QA, where a human can judge them more reliably than a script.

### Stable, reproducible runs

E2E tests run serially on Chromium with `workers: 1` to keep results consistent in a resource-constrained local environment.

### Running the tests

```bash
# Unit / component tests (Vitest + React Testing Library)
npm test
npx vitest run
npx vitest

# E2E tests (Playwright)
npx playwright test
npx playwright test --project=chromium

```

---

## 🛠️ Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Icons

---

## 📁 Project structure

```text
alas-de-luz-divina/
├── client/
│   ├── App.tsx
│   ├── index.tsx
│   ├── components/
│   │   ├── Navbar
│   │   ├── Hero
│   │   ├── Story
│   │   ├── Services
│   │   ├── Benefits
│   │   ├── AboutPaula
│   │   ├── Testimonials
│   │   ├── FAQ
│   │   └── Footer
│   ├── data/
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   └── types.ts
│   ├── styles/
│   │   └── main.css
│   └── test-setup.ts
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
│       └── pages/
│           └── HomePage.ts
├── spec/
│   ├── constitution/
│   │   └── constitution.md
│   └── features/
├── public/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── .github/
```

---

## 📦 Available scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
npm test
npx playwright test
```

---

## 🚀 Project status

The site is live in production at **[alasdeluzdivina.com](https://alasdeluzdivina.com/)**.

It is deployed on AWS through a CI/CD pipeline: every push to the `main` branch triggers AWS CodePipeline and CodeBuild, which build the project and publish it to an S3 bucket served through CloudFront, with HTTPS provided by an AWS Certificate Manager SSL certificate. The custom domain is registered with Porkbun.

The project continues to evolve as new sections are added and refined. Each new feature follows a spec-driven workflow, from written acceptance criteria to implementation, testing, and review, and the repository documents that process in the `spec/` folder.

---

## 👩‍💻 Author

**Ivonne Valenzuela**

Software Developer and Tester 

This project is part of my portfolio and reflects the process of designing and building a responsive website for a real client using React, TypeScript, and Tailwind CSS.