# Vite Refactor — Portfolio Site

## Summary

Migrated the Taeyang Han portfolio site from a monolithic HTML/CSS/JS architecture to a **Vite-powered modular codebase**. The original 3,356-line `script.js`, 1,937-line `styles.css`, and 1,093-line `opinions.js` were split into **41 files** across `src/data/`, `src/lib/`, `src/modules/`, `src/styles/`, and `src/pages/`.

**Result:** `npm install && npm run dev` builds and serves all 6 pages (index, 2 opinions articles, opinions hub, 2 project pages) with zero Vite errors. The `samsung-leadership-camp/` directory was left untouched.

---

## File Map

### Foundation Files (created)
| New File | Purpose |
|---|---|
| `package.json` | Vite 5.4 project definition |
| `vite.config.js` | Rollup multi-page input (6 HTML entry points) |
| `.gitignore` | Updated with `/dist`, `/node_modules` |

### Assets (moved)
| From | To |
|---|---|
| `assets/**` | `public/assets/**` |
| Root PDF | `public/Taeyang Han — Life Systems Designer.pdf` |

### Data Layer (`src/data/`) — pure data, no side effects
| New File | Content | From Original |
|---|---|---|
| `i18n.js` | 693 lines — TRANSLATIONS (en/zh/ko), `currentLang` (let), `setCurrentLang()` setter | `script.js` (139-832) |
| `specializations.js` | SPECIALIZATIONS array, DOMAIN_ICON map, HERO_BUILDS | `script.js` (988-1500+) |
| `achievements.js` | ACHIEVEMENTS array, BASE_ACH, ACH_KEY constant | `script.js` (2313-2683) |
| `opinions-index.js` | OPINIONS_INDEX (5 entries with title, summary, domain, etc.) | `opinions/opinions.js` |

### Core Lib (`src/lib/`) — shared utilities
| New File | Exports | From Original |
|---|---|---|
| `i18n.js` | t(), applyTranslations(), switchToLang(), updateLangToggleLabel(), initLangToggle(), notePolyglot() | `script.js` (835-986) |
| `icons.js` | ICON_PATHS map, injectIcons() | `script.js` (3135-3184) |
| `achievements.js` | unlockAchievement(), renderTrophyShelf() | `script.js` (2685-3131) |
| `dom.js` | initScrollReveal(), initProgressAnimation(), initLinksDropdown(), copyEmail(), initShimmerHover() | `script.js` (various) |

### Feature Modules (`src/modules/`) — one per section/topic
| New File | Exports | From Original |
|---|---|---|
| `nav.js` | initStickyNav, initMobileNavMenu, initNavDropdown, initLangToggle, initSeoulClock | `script.js` (51-137, 833-931) |
| `hero.js` | initHeroAnimation, initHeroParallax, renderHeroBuilds, initHelloRotator, initNpcDialogue, initIdleAvatar, initAvatarEgg | `script.js` (933-1514) |
| `specs.js` | renderSpecializations, renderDomainOverview, initSpecTabs, initSpecCertLightbox, initSkillTree, initDeepDiver | `script.js` (1515-2312) |
| `life-system.js` | initLifeSystem | `script.js` (3186-3356) |
| `text-effects.js` | initGradientWaveText, initSpecialText, initSignature | `script.js` (scattered) |
| `command-palette.js` | initCommandPalette | `script.js` (137-350) |
| `terminal.js` | initTerminal | `script.js` (350-492) |
| `ambient.js` | initWorldBgParallax, initXpBar, initDistilCol, initConsoleEgg | `script.js` (492-697) |
| `sims.js` | initBullwhipSim, initPhSim, initRxnSim, initGuestbook | `script.js` (697-830) |
| `index.js` | Barrel re-export of all modules above | (new) |

### CSS (`src/styles/`) — @import chain
| New File | Content | From Original |
|---|---|---|
| `tokens.css` | CSS custom properties (:root) | `styles.css` (1-72) |
| `base.css` | Reset, typography, scrollbar, selection | `styles.css` (73-291) |
| `components/badge.css` | .badge | `styles.css` |
| `components/button.css` | .btn, .btn--primary, .btn--outline | `styles.css` |
| `components/panel.css` | .panel | `styles.css` |
| `components/pill.css` | .pill, .pill--status | `styles.css` |
| `components/quest-row.css` | .quest-row | `styles.css` |
| `components/lightbox.css` | Certificate lightbox | `styles.css` |
| `sections/nav.css` | .nav, .nav__*, .mobile-nav | `styles.css` |
| `sections/hero.css` | .hero, .hero__*, .signature | `styles.css` |
| `sections/manifesto.css` | .manifesto-section | `styles.css` |
| `sections/life-system.css` | .life-system, .life-system__* | `styles.css` |
| `sections/specs.css` | .specs, .specs__* | `styles.css` |
| `sections/xp-bar.css` | .xp-bar | `styles.css` |
| `sections/command-palette.css` | .cmd-pal | `styles.css` |
| `sections/terminal.css` | .terminal__* | `styles.css` |
| `sections/footer.css` | .footer, .footer__* | `styles.css` |
| `pages/opinions.css` | .op-* (opinions hub + article styles) | `opinions/opinions.css` |
| `pages/projects.css` | Project case-study styles | `opinions/projects.css` |
| `index.css` | @import all of the above + global remaining styles (sims, achievements, guestbook, world-bg, responsive, reduced-motion, print) | `styles.css` remainder |

### Entry Points (`src/`)
| New File | Purpose |
|---|---|
| `main.js` | DOMContentLoaded init: calls all module init functions | replaces `script.js` |
| `pages/opinions.js` | Opinions hub page: renders filter chips + opinion cards | replaces `opinions/opinions.js` (hub logic only) |

### Vite Build Inputs
```
index.html                                   → main entry
opinions/index.html                          → opinions hub
opinions/chemical-potential.html             → article page
opinions/engineering-under-uncertainty.html  → article page
projects/lifeos.html                         → project case study
projects/reaction-simulator.html             → project case study
```

---

## HTML Changes

| Page | CSS `<link>` Before | CSS `<link>` After | JS `<script>` Before | JS `<script>` After |
|---|---|---|---|---|
| `index.html` | `styles.css` | `/src/styles/index.css` | `script.js` | `type="module" src="/src/main.js"` |
| `opinions/index.html` | `opinions.css` | `tokens.css` + `pages/opinions.css` | `opinions.js` | `type="module" src="/src/pages/opinions.js"` |
| `opinions/chemical-potential.html` | `opinions.css` | `tokens.css` + `pages/opinions.css` | `opinions.js` | Inline tooltip toggle script |
| `opinions/engineering-under-uncertainty.html` | `opinions.css` | `tokens.css` + `pages/opinions.css` | `opinions.js` | Inline tooltip toggle script |
| `projects/lifeos.html` | `../opinions/opinions.css` + `projects.css` | `tokens.css` + `pages/opinions.css` + `pages/projects.css` | (none) | (none) |
| `projects/reaction-simulator.html` | `../opinions/opinions.css` + `projects.css` | `tokens.css` + `pages/opinions.css` + `pages/projects.css` | (none) | (none) |

Article pages now use an inline `<script>` for the `.term` click-toggle, since they only needed that one function from the old `opinions.js` (which also contained the hub rendering, now moved to `src/pages/opinions.js`).

---

## Key Decisions

1. **Circular dependency safe**: `lib/i18n.js` imports `renderSpecializations`, `renderDomainOverview` from `modules/specs.js`, which in turn imports `t()` from `lib/i18n.js`. This is safe because all cross-imports are called inside function bodies, not at module top level. ES module live bindings resolve correctly at call time.

2. **`data/specializations.js` is data-only**: No functions, no imports. All rendering (`renderSpecializations`, `renderDomainOverview`) lives exclusively in `modules/specs.js`. This eliminates the circular dependency risk between data and lib layers.

3. **`setCurrentLang()` setter**: Since ES module imports are immutable, `lib/i18n.js` and `main.js` use `setCurrentLang(lang)` from `data/i18n.js` instead of assigning to the `currentLang` import directly.

4. **`initProgressAnimation` and `initShimmerHover`** placed in `lib/dom.js` (small DOM utilities), not in `modules/text-effects.js`. Removed from text-effects to avoid duplication.

5. **Sub-pages need explicit CSS links**: Only `index.html` loads `src/styles/index.css` (with its `@import` cascade). Sub-pages load `tokens.css` + their page-specific CSS directly, because each page was originally a standalone stylesheet. Project pages additionally need `opinions.css` for shared article styles.

6. **`samsung-leadership-camp/`** was left entirely unchanged (out of scope per the refactor prompt).

---

## Verification

```bash
npm install        # installs vite (1 dep)
npm run dev        # starts Vite dev server on localhost:5173
```

- All 6 HTML pages compile without errors
- `index.html` loads `/src/main.js` and `/src/styles/index.css`
- Opinions hub loads `/src/pages/opinions.js` (renders filter chips + cards)
- Article pages serve correctly with inline tooltip toggle
- Project pages serve correctly with 3 CSS layers (tokens + opinions + projects)
- No Vite build-time errors (verified: duplicate exports fixed in `achievements.js`, immutable import fixed in `i18n.js`)

---

## Not Done / Out of Scope

- `samsung-leadership-camp/` — not touched
- Lazy loading / code splitting — not implemented (future optimization)
- Legacy files (`script.js`, `styles.css`, `opinions/opinions.js`, `opinions/projects.css`) — not deleted (kept for reference during review, can be removed after confirmation)
- Production build (`npx vite build`) — not tested (dev mode verified only)
- IE/legacy browser support — not in scope
