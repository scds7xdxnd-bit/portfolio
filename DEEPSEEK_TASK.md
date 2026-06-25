# BUILD BRIEF — Collapse "Specializations" into a tabbed, single-panel section

**To:** DeepSeek V4 Pro (implementing engineer)
**From:** Lead engineer
**Repo:** `portfolio/` — Taeyang Han's personal site (Vite + vanilla JS/CSS, no framework)
**You build exactly what is specified below. Do not improvise scope. You cannot see images, so every visual is described in words.**

---

## 0. ONE-SENTENCE GOAL

Make the **Specializations** ("Work") section show **one domain at a time** via a sticky tab bar (so the page becomes short and navigable), **without losing any** of the certificates, per-field projects, or interactive sims that currently live there.

---

## 1. CONTEXT — what this site is and how it's built

A "game-as-résumé" personal portfolio. Aesthetic: a **cream notebook page, inked in black, stickered in sunshine** — neo-brutalist RPG character-sheet. Work is framed as *quests*, skills as *mastery %*, sections as *panels*.

**Stack & architecture (this is the source of truth — edit these files, do NOT introduce React/Vue/build tools):**

| Concern | File |
|---|---|
| Page markup | `index.html` (root) — Vite serves this directly |
| Section styles (modular CSS, `@import`-ed by `src/styles/index.css`) | `src/styles/sections/specs.css` |
| Specializations behavior | `src/modules/specs.js` (`renderSpecializations`, `renderDomainOverview`, `initSpecTabs`) |
| Domain/project/cert data | `src/data/specializations.js` (`SPECIALIZATIONS`) |
| All copy in EN/KO/ZH | `src/data/i18n.js` (keyed strings; never hardcode visible text — use `t('key')`) |
| Design tokens (CSS variables) | `src/styles/tokens.css` |

> ⚠️ There is also a legacy `styles.css` and `script.js` at the repo root. **They are DEAD — not loaded.** Never edit them. The live CSS is `src/styles/**`; the live JS is `src/main.js` → `src/modules/**`.

**Critical: i18n.** Every visible string exists in three languages (`en`, `ko`, `zh`) inside `src/data/i18n.js` and is rendered via `data-i18n` attributes or the `t()` helper. Do not break this. Do not hardcode English. Reuse existing keys.

---

## 2. THE PROBLEM (what's wrong now) AND THE TARGET (what to copy)

**Current behavior (the CON):** `renderSpecializations()` renders **all five** domain panels stacked vertically, each fully expanded (header, mastery, featured project, a grid of secondary projects, a mini-sim, and a certificate strip). The tab bar only *scroll-jumps* between them. Result: the section is extremely long; the visitor scrolls forever.

**Target behavior (the PRO, taken from a reference design):** a **sticky tab bar** with five pills (Linguist · Engineer · Builder · Community · Scholar). Clicking a pill **swaps the visible panel** — only the active domain's panel is shown; the other four are hidden. The page collapses to roughly one screen of work content.

**The reference design dropped certificates and the per-field project grid to achieve this. THAT IS THE MISTAKE YOU MUST NOT REPEAT.** Each swappable panel must still contain the full rich content for its domain.

---

## 3. THE CORE TASK (precise)

### 3.1 Convert stacked panels → tabbed single panel
- Keep rendering all five panels into `#specs-panels` (keep them in the DOM for SEO and AI-agent crawlers), **but only the active one is visible.** Inactive panels get `hidden` + a class (e.g. `is-hidden`) that sets `display:none`. Give each panel `role="tabpanel"` and `aria-labelledby` pointing at its tab.
- The active panel is chosen by the tab bar. Default active = first domain (`linguist`) unless the URL hash names a domain.
- **Preserve the existing sticky tab bar and its sliding "liquid-glass" active indicator** in `src/styles/sections/specs.css` / `initSpecTabs` — it was just built and must keep gliding under the active pill. Do not regress it.

### 3.2 Rewire `initSpecTabs()` (in `src/modules/specs.js`)
- Tab click → `setActiveTab(panelId)`: show that panel, hide the others, move the sliding indicator, set `aria-selected`/`tabindex` on tabs, update `history.replaceState` hash.
- **Remove** the old scroll-jump + `IntersectionObserver` scroll-spy logic (it assumed stacked panels). The tab no longer scrolls; it swaps.
- **Deep-linking:** on load and on `hashchange`, if the hash is a domain id (`#linguist`, `#engineer`, `#builder`, `#community`, `#scholar`), activate that tab. The command palette and mobile-nav links that point to `#engineer` etc. must therefore open the correct tab.
- **Keyboard a11y:** tab bar is a `role="tablist"`; Left/Right arrows move between tabs, Enter/Space activate, `aria-selected` reflects state, only the active tab is in the tab order (`tabindex="0"`, others `-1`).
- Cross-fade the panel content on swap (~150–200ms opacity). Respect `prefers-reduced-motion` (no fade).

### 3.3 Remove the redundant "domain overview launchpad"
- The section currently has BOTH a `#domain-overview` tile grid ("Jump to a domain") AND the tab bar — two selectors for the same thing. **Delete the launchpad** (its markup in `index.html`, the `renderDomainOverview()` call in `src/main.js`, and its CSS) so the sticky tab bar is the single selector. This further shortens the page. Leave the `spec.overview` i18n key in place (harmless) or remove it — your choice, but don't break other keys.

### 3.4 What each active panel MUST contain (the content that cannot be lost)
For the active domain, render, in this order:

1. **Domain header** — emoji + domain name (e.g. `🌐 Linguist`), the one-line `headline`, and a short `blurb`/`headline` description.
2. **Mastery row** — a pixel-font label `MASTERY`, a progress bar filled to `mastery`% in the domain's accent color, and the `%` value. Plus the `PROOF` token (e.g. `TOPIK 6 · 265/300`).
3. **Featured project card** — screenshot image + title + meta + an outbound button (Live ↗ / Yonhap News ↗ / Webzine ↗ depending on the domain's `featuredUrl`/`featuredLinkKey`). Some domains also have a `caseStudyUrl` (a "Case Study" link) — keep it.
4. **"Other projects" grid** — the domain's `secondary[]` items as cards (screenshot if present, title, description, optional `status` pill, optional outbound `link`). **THIS IS THE PER-FIELD PROJECT LIST THE REFERENCE DELETED — IT STAYS.**
5. **Interactive mini-sim** — if the domain has `miniSim` / `miniSim2` (`bullwhip`, `ph`, `rxn`, `lang-quiz`), keep the existing widget inside the panel. Do not remove the sims.
6. **Certificates strip** — if the domain's `certs[]` is non-empty, render the labeled "Certificates" row of clickable thumbnail tiles that open the existing certificate **lightbox**. **THIS IS THE CERTIFICATIONS BLOCK THE REFERENCE DELETED — IT STAYS.** Domains with empty `certs[]` simply render nothing there.

> All of the above already exists in today's `renderSpecializations()` and `specs.css`. Your job is to **keep that content and restyle/relayout it into the cleaner single-panel form below — not to rebuild or trim it.**

---

## 4. DATA — use what exists; never invent

All content is already in `src/data/specializations.js` (`SPECIALIZATIONS`) and `src/data/i18n.js`. **Reuse it. Do not duplicate, do not fabricate projects, certificates, numbers, or claims.** Every number on this site is real and verifiable; inventing any is a hard failure.

The five domains (id · accent color · mastery · featured outbound · # of secondary projects · # of certs):

| id | accent | mastery | featured link | secondary projects | certs |
|---|---|---|---|---|---|
| `linguist` | sky (blue) | 90 | Yonhap News article | 7 | 2 |
| `engineer` | coral (red) | 85 | Live demo + Case Study | 4 | 0 |
| `builder` | mint (green) | 87 | Live demo + Case Study | 5 | 0 |
| `community` | purple | 92 | (none) | 7 | 7 |
| `scholar` | sunshine (yellow) | 88 | Samsung Webzine | 5 | 6 |

Screenshots already exist on disk at the paths in `SPECIALIZATIONS[].screenshot` and `secondary[].screenshot` (e.g. `/assets/projects/apec_cooperation_dialogue.webp`). Just reference them in `<img>`; you do not need to see them. Certificate images live at `/assets/certs/<filename>.jpg` (filenames are in each domain's `certs[]`).

---

## 5. VISUAL SPECIFICATION (you cannot see images — build to this description)

### 5.1 Design language (already encoded in `src/styles/tokens.css` — use the CSS variables, never raw hex)
- **Background:** cream `--bg-primary` (#FFF7E6). **Panels:** white `--bg-panel` (#FFFFFF).
- **Borders:** thick solid black, `--border-thick` = `3px solid #1E1E1E` (thin = 2px). Everything looks like an inked sticker.
- **Shadows:** hard, **zero-blur** offset shadows — `--shadow-offset` = `4px 4px 0 #1E1E1E`, `--shadow-offset-sm` = `2px 2px 0`. No soft/blurred shadows anywhere.
- **Accent palette (one per domain):** sunshine #FFD859, coral #FF6B6B, sky #6EC6FF, mint #7EE6A7, purple #B084F5.
- **Radii:** `--radius-sm` 4px, `--radius-md` 8px, `--radius-pill` 999px.
- **Type:** `--font-game` (DM Sans, 800 weight) for titles/headlines; `--font-body` (Inter) for paragraphs; `--font-pixel` (Press Start 2P) for tiny UPPERCASE labels like `MASTERY`, `CERTIFICATES`, badge text; `--font-hand` (Caveat) for handwriting accents. Sentence case everywhere except tiny pixel labels.
- **Dark mode exists** (`[data-theme="dark"]`). Use tokens so it flows through automatically. Test both themes.

### 5.2 Tab bar (keep current, confirm appearance)
A centered, sticky (under the 60px nav) horizontal row of **pill buttons**, on a frosted translucent white capsule (≈78% white + `backdrop-filter: blur`), thin border, soft offset shadow. Each pill = a small line icon + the domain label in DM Sans. The **active pill** is marked by a white rounded "liquid-glass" indicator that **slides** under it with springy easing when you switch tabs. On mobile (≤768px) all five pills fit on one row (compact font, no horizontal scroll) — this is already done; don't break it.

### 5.3 Active domain panel — layout
Desktop: a **two-column grid**, left column slightly wider (`grid-template-columns: 1.1fr 0.9fr; gap: 20–24px; align-items: start`).

**Left column (the "stats" side):**
- Row: domain emoji (≈26px) + domain name (DM Sans 800, ~20px, tight letter-spacing).
- Headline (DM Sans 700, ~16px, ink).
- Blurb (Inter, ~14px, `--grey-dark`, line-height 1.6).
- Mastery row: pixel label `MASTERY` · a progress bar (track = subtle grey, fill = the domain accent, height ~10px, ink border, filled to `mastery`%) · `NN%` in pixel font.
- Then the **"Other projects" grid** (section 5.4).
- Then the **certificates strip** (section 5.5) if any.
- Then the **mini-sim** if any.

**Right column (the "featured" side) — a white Panel** (ink border, `--shadow-offset-sm`):
- A small `Featured` badge (tinted with the domain accent).
- The featured **screenshot**: full width of the card, **aspect-ratio 16/10, `object-fit: cover`**, 2px ink border, `--radius-sm`.
- Project title (DM Sans 700, ~15px).
- Meta line (Inter, ~12px, grey).
- A small **coral button** linking out, label per domain (`Live ↗`, `Yonhap News ↗`, `Webzine ↗`); plus the "Case Study" text link where `caseStudyUrl` exists.

### 5.4 "Other projects" grid (must stay — describe precisely)
A grid of small cards (2 columns on desktop, 1 on mobile), each card a white panel with ink border + small offset shadow that lifts ~2px on hover:
- If the item has a `screenshot`: image on top, **aspect-ratio 16/9, `object-fit: cover`**, 2px border.
- Title (DM Sans 700, ~15px) and description (Inter, ~13px, grey).
- If `status` (e.g. `Active`): a small status pill.
- If `link`: a "Live ↗" outbound link that opens in a new tab (`rel="noopener"`).
Items without a screenshot are plain text cards — that's fine and intended.

### 5.5 Certificates strip (must stay — describe precisely)
- A pixel-font label `CERTIFICATES` (or its i18n value).
- A horizontally scrollable row of **thumbnail tiles**. Each tile: a small framed square/rounded thumbnail (ink border, white bg) showing the cert image (`/assets/certs/<filename>.jpg`) with the emoji icon as a fallback, plus a tiny caption (the cert `name`) under it.
- Clicking a tile opens the **existing certificate lightbox** (`#certificate-lightbox`) showing the full image + caption. Reuse the existing lightbox wiring (`initSpecCertLightbox`); do not build a new one.
- Domains with empty `certs[]` render nothing here (no empty label).

### 5.6 Responsive
- ≤768px: the two-column panel collapses to one column (featured card stacks; put the featured card **below** the headline/blurb or above the projects — pick the cleaner reading order, featured on top is fine). Projects grid → 1 column. Certificates strip stays horizontally scrollable. Tabs stay one row.

### 5.7 Motion
- Panel swap: ~150–200ms opacity cross-fade. Sliding tab indicator: springy ease (already built). Card hover: 2px lift. All motion gated behind `@media (prefers-reduced-motion: reduce)` → none.

---

## 6. COMPONENT METHOD — compose design-system primitives (do NOT invent one-off classes)

The brand ships a formal **design system** (`Taeyang Han Design System/`) whose method you must follow: a small set of **token-driven primitive components**, each = a base class + `--variant`/`--tone`/`--size` modifiers + state classes, reused across every screen. The portfolio already implements most of these in `src/styles/components/` (`button.css`, `pill.css`, `panel.css`, `badge.css`, `quest-row.css`, each `@import`-ed by `src/styles/index.css`). **Assemble the new Specializations by composing these primitives — never hand-roll a `.specs__*` clone of something a primitive already does.**

**The method every primitive obeys (match it for anything you add):**
- Base class + modifier classes (`.btn--coral`, `.panel--hoverable`, `.badge--ghost`) + state classes (`.is-active`). One canonical definition in `src/styles/components/`, used everywhere — not re-declared per section.
- **100% token-driven** — every color/border/shadow/radius/duration is a `var(--…)` from `tokens.css`, so light/dark themes and language font-swaps flow through automatically. Never a raw hex or px shadow.
- **Signature interaction** (the "physical sticker" feel): hard offset shadow that **lifts on hover** (`transform: var(--hover-lift); box-shadow: var(--shadow-offset)`) and **sinks on press** (`transform: var(--active-press); box-shadow: var(--shadow-pressed)`); focus-visible = `3px solid var(--coral)`, `outline-offset: 2px`.

**Primitive → portfolio class map — use these to build the section:**

| Build this part with… | Primitive | Portfolio class | Notes |
|---|---|---|---|
| Section kicker ("★ Specializations") + "Featured" label | **Badge** | `.badge` | **ADD `.badge--ghost`** (ink border, panel bg, ink text) and use it here |
| Domain **tabs** | **Pill** | `.pill` (the existing `.specs__tab` is the interactive-pill instance) | keep the sliding indicator; tab chips must follow Pill conventions (pill radius, tokens, focus ring) — don't fork a new chip style |
| Mastery / XP meter | **ProgressBar** | **ADD `src/styles/components/progress.css`** | new reusable primitive (see below) |
| Featured card + each "other project" card | **Panel** | `.panel` | **ADD `.panel--hoverable`** (`:hover { box-shadow: var(--shadow-offset); transform: translateY(-1px); }`) and use it on these cards |
| Featured outbound CTA | **Button** | `.btn--coral` (+ `.btn--small`) | already exists |
| Status tag on a project ("Active") | **Pill** | `.pill--status--active` etc. | already exists |

**Gaps you must close (all additive — must not break any existing usage):**
1. **ADD a reusable ProgressBar primitive** → create `src/styles/components/progress.css` and `@import` it from `src/styles/index.css`. Spec (port the design system's `ProgressBar`): `.progress` = `width:100%; height:8px; background:var(--grey-light); border:1.5px solid var(--ink); border-radius:var(--radius-pill); overflow:hidden;` and `.progress__fill` = `height:100%; border-radius:var(--radius-pill); transition:width 0.8s var(--ease-smooth);` with color variants `.progress__fill--{sky,coral,mint,purple,sunshine,ink}`. Markup gets `role="progressbar"` + `aria-valuenow/valuemin/valuemax`. **Use it for the domain mastery meter**, fill color = that domain's accent.
2. **ADD `.panel--hoverable`** to `panel.css`; apply to the featured card and the "other project" cards so they lift like the design system.
3. **ADD `.badge--ghost`** to `badge.css`; apply to the section kicker and the "Featured" label.

**Net effect:** the rebuilt section reads as `.badge--ghost` (kicker) → `.pill` (tabs) → `.progress` (mastery) → `.panel--hoverable` (featured + project cards) → `.btn--coral` (CTA) — the exact way the design system composes a screen. No new visual vocabulary is introduced; you extend the shared primitives centrally and consume them.

---

## 7. DO's
- ✅ Edit `index.html`, `src/styles/sections/specs.css`, `src/modules/specs.js` (and `src/main.js` only to drop the `renderDomainOverview` call). For the component layer, add/extend **`src/styles/components/`** (`progress.css` new; `panel.css` + `badge.css` get one modifier each) and `@import` the new file in `src/styles/index.css`. Touch `src/data/*` only to add a key — prefer reusing existing keys.
- ✅ **Compose from the shared primitives** (§6); extend a primitive **once** in `src/styles/components/`, then reuse it — never clone a primitive's look into a `.specs__*` rule.
- ✅ Keep all three languages working; render text through the existing i18n system.
- ✅ Keep the certificate lightbox, the mini-sims, the sliding tab indicator, and dark mode all functional.
- ✅ Keep all real content: 5 domains, every secondary project, every certificate, every outbound link exactly as in `SPECIALIZATIONS`.
- ✅ Keep semantic, accessible markup: `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, `aria-controls`/`aria-labelledby`, keyboard support.
- ✅ Make the section visibly **shorter**: only one domain's content on screen at a time.
- ✅ Verify it builds (`npm run build`) and renders at desktop (~1120px) and mobile (~375px), in light and dark themes.

## 8. DON'Ts
- ❌ Do NOT delete or shrink the certificates or the "other projects" grid. That is the entire point of this task.
- ❌ Do NOT re-implement a primitive's look with a new one-off `.specs__*` class (e.g. a bespoke mastery bar, a bespoke card shadow, a bespoke badge). Extend the shared primitive instead.
- ❌ Do NOT introduce React or any framework/bundler change. Stay vanilla JS + modular CSS.
- ❌ Do NOT edit the dead root `styles.css` / `script.js`.
- ❌ Do NOT hardcode English strings or invent any project, certificate, statistic, or claim.
- ❌ Do NOT regress the sliding tab indicator, mobile tab fitting, or dark mode.
- ❌ Do NOT add new external dependencies, fonts, or images.
- ❌ Do NOT keep the old stacked layout or the scroll-spy tab behavior.

---

## 9. ACCEPTANCE CRITERIA (definition of done)
1. The Specializations section shows **exactly one** domain panel at a time; switching tabs swaps it with a quick fade; the sliding indicator tracks the active tab.
2. Every domain's **featured project, full "other projects" grid, mini-sim (where present), and certificate strip (where present)** are all reachable inside its tab — nothing from the current site is lost.
3. Visiting `…/#scholar` (and the four other ids) opens that tab directly; command-palette / nav links to those ids work.
4. The redundant "Jump to a domain" launchpad is gone; the sticky tab bar is the only selector.
5. Page height of the Specializations section is dramatically reduced vs. the stacked version.
6. Works in EN/KO/ZH, light/dark, desktop/mobile; keyboard-navigable; `npm run build` succeeds with no console errors.
7. **Component method honored:** a reusable `progress.css` primitive exists and powers the mastery meter; `.panel--hoverable` and `.badge--ghost` exist and are used; the mastery meter, tabs, featured/project cards, badges, and CTA are all shared primitives — `specs.css` contains **no** cloned primitive styles (no bespoke bar/shadow/badge).

---

## 10. SUGGESTED ORDER OF WORK
1. **Primitives first** (`src/styles/components/`): add `progress.css` (+ `@import` in `index.css`); add `.panel--hoverable` and `.badge--ghost`. This is the design-system layer the section will consume.
2. `specs.js`: change `renderSpecializations` to mark only the active panel visible and to emit the mastery meter as `.progress`, the cards as `.panel--hoverable`, the kicker/Featured as `.badge--ghost`, the CTA as `.btn--coral`; rewrite `initSpecTabs` to swap panels (show/hide), keep the indicator, add keyboard + deep-link, delete scroll-spy.
3. `index.html` + `src/main.js`: remove the `#domain-overview` launchpad and its render call.
4. `specs.css`: add `is-hidden`/`tabpanel` rules + the two-column active-panel layout (§5.3); keep only section-specific layout here (grid, gaps) — visuals come from the primitives; add the swap fade + responsive collapse.
5. Verify all 7 acceptance criteria.
