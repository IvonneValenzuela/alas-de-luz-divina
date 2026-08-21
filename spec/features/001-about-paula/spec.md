# 001 · About Paula

**Status:** in progress

## What it does

The About Paula section displays Paula's real biography exactly as she wrote it, introducing herself, her professional background in Business Administration and Human Talent Management, her spiritual awakening, her training as a Quantum Angel Therapist, and her connection to Alas de Luz Divina, alongside her photo.

## Why

`AboutPaula.tsx` is currently an empty component. Visitors need to connect with Paula as a real person, not just a service list, before deciding to book a therapy. Her story is what builds the trust and human connection the site's mission is built around.

## Acceptance criteria

- [ ] The section displays Paula's full bio text exactly as she wrote it, with no paraphrasing, summarising, shortening, or rewording of any part.
- [ ] The text keeps its original paragraph breaks, so it reads as separate paragraphs, not one continuous block.
- [ ] Emojis included in her original text (🤍, ✨, ♥) are preserved.
- [ ] The section heading uses "Pau", not "Paula" or "Paula Valenzuela", matching how she introduces herself in her own text.
- [ ] `public/pau.png` is displayed above the biography text.
- [ ] The biography text is horizontally centred.
- [ ] The section is fully readable and correctly laid out on both mobile and desktop widths, per the responsive rule in `/AGENTS.md`.
- [ ] Text and photo use only the existing design tokens and typography already defined in `main.css`.

## Out of scope

- Any additional photos or a photo gallery, only the one photo Paula provided is included.
- Any biographical detail (certifications, formal credentials) not present in the text she sent.