# 한태양 — Sun of Korea asset & component kit

The approved direction combines **Becoming the Sun** (Seoul dawn opening) with **A World We Grow Together** (an explorable, inhabited world).

Identity anchor, provided by Taeyang: **한 means 한국; 태양 means the sun. “I want to be the sun of Korea.”** Keep this as an aspiration. The setting connects engineering, software, interpretation, community, and scholarship through shared growth. The illustrated people and places are symbolic scenery, not documentary evidence.

## Preview

Run `npm run dev` and open `/concepts/sun-of-korea.html`. The preview is included in the Vite production build and marked `noindex,nofollow`. The components are also integrated at `/` for a complete local review. Nothing has been deployed.

## Production artwork

| Asset | Actual dimensions | Use |
| --- | --- | --- |
| [Desktop dawn](../../public/assets/sun-of-korea/dawn-desktop.webp) | 1672 × 941 | Wide hero; quiet sky left, Seoul and sunlight right, shared activity below |
| [Mobile dawn](../../public/assets/sun-of-korea/dawn-mobile.webp) | 1024 × 1536 | Dedicated portrait composition; right-aligned crop retains Namsan Tower |
| [World atlas](../../public/assets/sun-of-korea/world-atlas.webp) | 1536 × 1024 | Five connected places for HTML hotspots |

All three are original built-in `image_gen` outputs, compressed as WebP quality 86. Original PNG masters remain in this folder. Web versions total approximately 1 MB; the browser selects one hero source, and the atlas loads lazily. No text or controls are baked into the artwork. Full generation prompts and reference paths are recorded in [prompts.json](prompts.json).

## Reusable components

Source: [sun-world.js](../../src/components/sun-world.js). Styles: [sun-world.css](../../src/styles/sun-world.css), scoped to `.sun-site`.

- `renderSunHeader`: identity, navigation, language controls, mobile disclosure menu.
- `renderSunHero`: responsive artwork, semantic heading, CTAs, real portrait, name meaning.
- `renderStory`: the meaning of 한태양 and the direction behind the work.
- `renderWorldExplorer`: five keyboard-operable map buttons and an announced evidence panel.
- `renderWork`: reusable work cards using actual project screenshots and existing case studies.
- `renderSunFooter`: contact, social destinations, locale-specific CV download.
- `sun-sections.js`: journey, searchable 38-entry archive, field notes, credentials, interactive lab links, and command-search dialog.
- `sunMark`: lightweight code-native UI symbol, separate from scene artwork.
- `mountSunPortfolio`: hydrates the page and attaches language, menu, map, archive filters, and command search.

English, Chinese, and Korean copy are included. The language preference uses the portfolio's existing `lang` storage key; storage failures do not prevent rendering. Map selection survives language changes. Controls use existing site SVG icons, visible focus indicators, pressed states, and reduced-motion styling. Scenery is decorative; meaningful project images and links are in HTML.

## Evidence and boundaries

Map destinations use the existing LifeOS and Reaction Simulator case studies, APEC meeting coverage, the PALS case study with leadership certificates, and the 照应 website. The interpretation copy distinguishes participation from what the linked reporting verifies. No new project counts, performance claims, or proficiency percentages are introduced. All four existing CV documents remain available (English, Korean, simplified Chinese, traditional Chinese).

The story draws on the user's direct explanation of the name and the vault's PALS, mentoring, and 照应 records. The homepage now uses the shared components, the PALS story has a dedicated case study, and existing articles share a warm cream treatment. The private knowledge vault is unchanged.

## Build and verification

`npm run build` regenerates the static English homepage from `src/home-template.html` and builds all public pages. Run `npm run preview -- --host 127.0.0.1` and then `node scripts/verify-portfolio.mjs` against the default preview at port 4173. Set `PORTFOLIO_BASE_URL` for another port.

The browser verification covers the 38-entry archive, combined search and filters, keyboard command search, all five world destinations, 15 language/viewport combinations (320–1440px), mobile navigation, reduced motion, clipboard, all four CV downloads, eight subpages, and readable content without JavaScript. Screenshots are saved to `/tmp/portfolio-verification`.

Production artwork and the desktop/mobile layouts have been visually inspected. The simulator route is included in the build. Illustrations remain separate from factual project screenshots and certificates.

## Editing

- Artwork: replace the WebP files while preserving their responsive compositions; retain masters and provenance here.
- Page copy and world content: `src/components/sun-world.js` and `src/components/sun-sections.js`.
- Full archive: `src/data/sun-archive.js`.
- Page styling: `src/styles/sun-world.css`; article styling: `src/styles/sun-articles.css`.
- Static shell and metadata: `src/home-template.html`; run the build to refresh generated `index.html`.
