# 005 · Footer

**Status:** done

## What it does

Builds the Footer section from scratch, it is currently an empty component shell (`Footer.tsx`) with no content. Renders a single pill-shaped bar: copyright text on the left in light cream, and two circular social icon badges (Instagram, TikTok) grouped together on the right, each a dark circle with a gold border containing the icon in cream, reusing the same `react-icons` Simple Icons components (`SiInstagram`, `SiTiktok`) and profile URLs already used in `Hero.tsx`.

## Why

Every page needs a footer to close out the site. Bringing the social icons back here, styled as their own visual moment rather than a repeat of the Hero's treatment, gives the footer a clear closing presence instead of feeling like an afterthought.

## Acceptance criteria

- [x] The footer renders as a single pill-shaped bar (fully rounded corners), background color `#d6b26e`, matching the "Inicio" navbar pill's gold.
- [x] Copyright text renders exactly "© 2026 Alas de Luz Divina. Todos los derechos reservados.", positioned on the left, color `#fffdf8`.
- [x] Instagram and TikTok icons render as two circular badges grouped on the right end of the bar, each: background `#faf7f2`, containing the icon in `#2e2620`.
- [x] Instagram icon links to the same URL already used for Instagram in `Hero.tsx`, opens in a new tab.
- [x] TikTok icon links to the same URL already used for TikTok in `Hero.tsx`, opens in a new tab.
- [x] The bar is fully readable with no horizontal overflow or wrapping at mobile and desktop widths, adjusting padding/sizing as needed for narrow screens.

## Out of scope

- Términos y Condiciones and Política de Privacidad links, deferred to a future feature once the real legal content exists and the technical approach (static HTML pages, confirmed earlier) can be implemented against actual content.