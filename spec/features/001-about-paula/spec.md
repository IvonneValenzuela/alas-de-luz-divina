# 001 · About Paula

**Status:** done

## What it does

The About Paula section displays Paula's real biography exactly as she wrote it, introducing herself, her professional background in Business Administration and Human Talent Management, her spiritual awakening, her training as a Quantum Angel Therapist, and her connection to Alas de Luz Divina, alongside her photo.

## Why

`AboutPaula.tsx` is currently an empty component. Visitors need to connect with Paula as a real person, not just a service list, before deciding to book a therapy. Her story is what builds the trust and human connection the site's mission is built around.

## Acceptance criteria

- [x] The section displays Paula's full bio text exactly as she wrote it, with no paraphrasing, summarising, shortening, or rewording of any part.
- [x] The text keeps its original paragraph breaks, so it reads as separate paragraphs, not one continuous block.
- [x] Emojis included in her original text (🤍, ✨) are preserved.
- [x] The section heading reads "Un poco más de mí" (decided with Paula after the initial draft, which used "Pau" as the heading). Pau's name still appears within the bio text itself.
- [x] On desktop and tablet widths, `public/pau.png` is displayed to the left of the biography text in a two-column layout, with rounded corners, keeping the full photo visible without cropping it into an oval or circle shape. On mobile widths, the photo stacks above the text instead, per the responsive rule.
- [x] The biography text is left-aligned, not centred.
- [x] The section is fully readable and correctly laid out on both mobile and desktop widths, per the responsive rule in `/AGENTS.md`.
- [x] Text and photo use only the existing design tokens and typography already defined in `main.css`.
- [x] Paula's tagline ("Conecta", "Sana", "Transforma") is displayed directly below the photo, stacked one word per line, from `client/data/about.ts` (`paulaTagline`), on both desktop and mobile.
- [x] The tagline uses the Great Vibes script font, applied only to this element.
- [x] Clicking "Sobre Paula" in the Navbar scrolls to the About Paula section.

## Content

Paula's bio, condensed to 6 paragraphs and confirmed directly with her (the original 12-paragraph draft was shortened, then approved by Paula as the final version). Saved as `client/data/about.ts` (`paulaBio`), source of truth. Do not alter, paraphrase, reorder, or reformat it there

## Out of scope

- Any additional photos or a photo gallery, only the one photo Paula provided is included.
- Any biographical detail (certifications, formal credentials) not present in the text she sent.