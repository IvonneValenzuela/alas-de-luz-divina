# 002 · Therapies Redesign

**Status:** done

## What it does

This modifies the existing, already-working Services.tsx component and its details modal, it is not a rebuild from scratch. Each existing therapy card in the Services section shows only the therapy name, no description or price visible on the card face. Clicking (or tapping, on mobile) a card opens the existing details modal, with a flip/rotation entrance animation, revealing the duration, modality, description, descriptive checklist, full price, and the WhatsApp booking link the modal already shows today.

## Why

Right now, cards show a truncated description and price directly on the face, which feels cluttered. Reducing the card to just the name makes each therapy feel more like something to discover, and the flip animation on the modal gives that reveal a small moment of delight instead of a plain instant appearance.

## Acceptance criteria

- [x] Each existing therapy card displays only the therapy name, no description text and no price visible on the card face.
- [x] Clicking or tapping a card opens the existing details modal, with its content (duration, modality, description, descriptive checklist, full price in COP, WhatsApp booking link) unchanged from what it shows today.
- [x] The modal's opening transition uses a flip/rotation animation, not a plain instant appearance.
- [x] Closing the modal returns to the same eight-card view, unchanged.
- [x] On mobile, tapping a card triggers the exact same modal-with-flip behaviour as clicking on desktop, no separate mobile-specific interaction.
- [x] Checklist item text uses the same body font as the rest of the description, not a different typeface.
- [x] The description text renders with visible paragraph breaks matching the blank lines already present in the source string in `services.ts`, instead of collapsing into one continuous block.
- [x] No new therapies are added, only the eight existing entries in `client/data/services.ts` are affected.
- [x] The section is fully readable and correctly laid out on both mobile and desktop widths, per the responsive rule in `/AGENTS.md`.

## Out of scope

- Any change to the WhatsApp booking link itself.