# DEEPSEEK TASK — Specializations v2 (refinement round)

You are the implementer. I am the engineer; build exactly what is specified below, nothing more.
**You cannot see images, so every visual is described in words. Do not invent content, copy, or claims.**

---

## 0. HARD CONSTRAINTS (read first)

- This is a **Vite modular project**. Edit ONLY files under `src/` and the root `index.html`.
- Root `styles.css` and `script.js` are **DEAD legacy** — not loaded by Vite. Do **not** touch them.
- Static assets are served from `public/` at the web root `/`. A path like `/assets/projects/lifeos.webp` resolves to `public/assets/projects/lifeos.webp`. Never change asset paths to relative.
- Preview/verify with the Vite dev server (`npx vite`, port 5173). Never serve the bare repo root (it 404s every asset).
- Stay 100% token-driven (`var(--…)` from `src/styles/tokens.css`). No hard-coded hex except inside `rgba()` glass tints where noted.
- Compose from existing primitives (`.panel` / `.panel--hoverable`, `.badge--ghost`, `.progress`, `.btn` / `.btn--coral`). Do not clone a primitive into a one-off `.specs__*` class.

---

## 1. CURRENT BASELINE (what exists today)

- **Tabbed Specializations**: 5 tabs (Linguist · Engineer · Builder · Community · Scholar). One `.specs__panel` is shown at a time; the rest get `.is-hidden`. Panels live in `#specs-panels` and are rendered by `renderSpecializations()` in `src/modules/specs.js`. Tab/keyboard/hash logic is `initSpecTabs()`.
- **Each panel** is currently a 2-column grid `.specs__panel-grid` (`grid-template-columns: 1.1fr 0.9fr`):
  - `.specs__panel-left`: domain header → headline → `.specs__mastery` (a `.progress` bar) → `.specs__secondary` (ALL "other projects", a 2-col card grid) → certificates → mini-sim.
  - `.specs__panel-right`: `.specs__featured-card` (a `.panel.panel--hoverable`, image + title + desc + CTA).
- **Data**: `src/data/specializations.js`. Each domain object has `secondary[]` (other projects, each `{titleKey, descKey, screenshot?, link?, status?}`), `certs[]` (`{filename, name, icon}`), `screenshot` (featured image), `accent` (`sky|coral|mint|purple|sunshine`), `mastery`, `miniSim` / `miniSim2`.
- **Styles**: `src/styles/sections/specs.css`. Mastery bar primitive: `src/styles/components/progress.css`.
- **Tokens you will use** (`src/styles/tokens.css`): accents `--sky --coral --mint --purple --sunshine`; `--ink #1E1E1E`; `--grey-dark --grey-light`; `--bg-panel`; `--surface-invert`; fonts `--font-pixel` (Press Start 2P), `--font-game` (DM Sans), `--font-body`; `--border-thin` (2px ink), `--border-thick` (3px ink); `--shadow-offset` (4px 4px 0 ink); `--radius-sm 4 / --radius-md 8 / --radius-lg 12 / --radius-pill 999`; `--ease-smooth`, `--ease-bounce`, `--duration-fast 150ms`. Dark-mode values are already defined under `[data-theme="dark"]` — your glass + dot styles MUST have dark variants (see §4).

---

## 2. HOUSE STYLE TO MATCH — the mockup's nav / journey / contact (described; you can't see them)

The section must read as the same design language as these three reference sections:

- **Navmenu** — a translucent, blurred, sticky horizontal bar; brand on the left, clean text links that are muted grey and darken to ink on hover; an active item is marked by a soft glass highlight, not a heavy box. → **Keep the existing `.specs__tabs` glass tab bar and its sliding indicator as-is. Do not flatten or restyle it.** It already embodies this language.
- **Journey** — a single horizontal track of milestone **dots** sitting on a thin baseline. Each dot is a small circle with a 2px ink ring; the default fill is pale, the *current* milestone is solid **coral**; a short caption sits beneath. Compact, low-height, scannable. → **This is the model for the new pagination control (§3.2).**
- **Contact** — a section that opens with a tiny **pixel-font micro-label** (uppercase, wide letter-spacing) above a bold title, then lays its content as a tidy **grid of bordered Panel cards** with consistent 16px gaps. → **All groupings (other-projects grid, certificates, the sim bay) open with the same pixel micro-label, and cards stay as bordered `.panel` primitives in clean grids.**

Net effect: pixel micro-label → content; bordered panels in grids; coral as the "active/now" accent; nothing bespoke that fights the primitives.

---

## 3. CHANGES TO IMPLEMENT

### 3.1 — Restructure the panel: 2-column TOP + full-width BOTTOM sim bay
Rebuild each panel's markup in `renderSpecializations()` to this order:

```
.specs__panel
  .specs__panel-grid            (2 columns, the TOP region)
    .specs__panel-left
      .specs__panel-header      (icon + domain name)        ← unchanged
      .specs__headline                                       ← unchanged
      .specs__mastery (.progress)                            ← unchanged
      .specs__secondary-wrap    (paginated other-projects — see §3.2)
    .specs__panel-right
      .specs__featured-card     (the GLASS card — see §3.3)
      .specs__certs             (MOVED here, below featured — see §3.4)
  .specs__sim-bay               (FULL WIDTH, single column, BOTTOM)
      miniSim markup  + (miniSim2 'rxn' markup if present)
```

The `.specs__sim-bay` sits **outside** `.specs__panel-grid` so the interactive sim spans the entire card width. Give it a top separator (`2px dashed var(--grey-light)`, like the certs strip currently has) and a pixel micro-label header (e.g. text from a new i18n key `spec.simLabel` → fall back to "TRY IT YOURSELF"). Let the sim content stretch to full width; if a specific sim looks too sparse when ultra-wide, cap its *inner* content at `max-width: 720px; margin-inline: auto` but keep the bay/background full-bleed.

### 3.2 — Paginate "other projects": 4 cards per page, compact dot pagination
- Inside `.specs__secondary-wrap`, split `spec.secondary` into **pages of 4 cards**. Render each page as a `.specs__secondary-page` (the existing 2-col `.specs__secondary` grid → 2×2 per page). Only the active page is visible; the rest get `.is-hidden` (reuse the existing show/hide pattern — do NOT animate height).
- Below the pages, render a **compact pagination control** `.specs__pager` modeled on the journey dots (§2):
  - One centered row of `.specs__pager-dot` buttons (one per page), ~10px circles, 2px ink ring, pale fill; the active dot is solid `--coral`; gentle `scale(1.15)` on hover; `var(--duration-fast)` transitions.
  - Optional `‹` / `›` `.specs__pager-arrow` buttons flanking the dots (text arrows, no heavy chrome).
  - **If a domain has ≤4 projects (≤1 page), render NO pager at all** (engineer has 4, so it shows zero dots).
  - Total control height ≈ 24px. It must "not take up much space."
- A11y: each dot is a `<button>` with `aria-label="Page N"` and `aria-current="true"` on the active one; arrows have `aria-label`; pagination is keyboard-operable (Enter/Space).
- State is **per panel** (each domain remembers its own page; switching tabs does not need to reset others). Wire this in JS (extend `renderSpecializations()` or add `initSecondaryPagination()`), exported and called from the same place the section initializes.

### 3.3 — Featured project → a real liquid-glass card with refraction
Replace the current flat white featured card with a **glass card layered over the project image**, so the glass genuinely refracts the image at its edge.

**Final look (described):** a rounded rectangle (~320px tall) keeping the brand's 2px ink outline + hard offset shadow. The project screenshot fills the whole card (cover). A frosted **glass slab** overlays roughly the lower ~55% and holds the "Featured" badge, project title, one-line description, and the CTA(s). Where the glass meets the image you see a faint **refraction wobble** (the image bends/ripples through the glass edge), plus a soft specular highlight in the top-left of the slab and a 1px bright hairline along its top edge. Text on the slab stays fully legible.

**Structure** (featured card body becomes):
```
.specs__featured-card           position:relative; overflow:hidden; border:var(--border-thin);
                                box-shadow:var(--shadow-offset); border-radius:var(--radius-lg); min-height:320px
  .specs__featured-media        absolute inset:0; the screenshot as cover (img or background-image)
                                — if a domain has NO screenshot, fill with linear-gradient(135deg, <accent>, color-mix(in srgb,<accent> 55%, var(--bg-panel)))
  .specs__featured-glass        absolute left/right/bottom:0; the glass slab; padding ~18px;
                                contains: badge (.badge accent), title, desc, .specs__featured-actions
```

**Glass CSS (light theme):**
```
.specs__featured-glass{
  background: rgba(255,255,255,0.62);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
          backdrop-filter: blur(14px) saturate(170%);
  border-top: 1px solid rgba(255,255,255,0.6);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
  color: var(--ink);
}
.specs__featured-glass::before{ /* specular sheen, non-interactive */
  content:""; position:absolute; inset:0; pointer-events:none;
  background: linear-gradient(135deg, rgba(255,255,255,0.45), transparent 42%);
}
[data-theme="dark"] .specs__featured-glass{
  background: rgba(20,19,18,0.52);
  border-top: 1px solid rgba(255,255,255,0.18);
  color: var(--text-on-dark);
}
```

**Real refraction (added on top of the blur, with a safe fallback):**
Add ONE hidden SVG filter to `index.html` (a `<svg width="0" height="0" style="position:absolute" aria-hidden="true">` block — note: the old `#liquid-glass-pill` filter was removed earlier for pixelating; this one is tuned for a LARGE surface with LOW frequency + a blur on the noise, so it stays smooth):
```html
<filter id="glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="noise"/>
  <feGaussianBlur in="noise" stdDeviation="1.5" result="soft"/>
  <feDisplacementMap in="SourceGraphic" in2="soft" scale="14" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```
Then layer the displacement onto the backdrop ONLY where supported, so Safari (no `backdrop-filter:url()`) still gets clean frosted glass:
```
@supports (backdrop-filter: url("#glass-refraction")) {
  .specs__featured-glass{
    -webkit-backdrop-filter: blur(14px) saturate(170%) url("#glass-refraction");
            backdrop-filter: blur(14px) saturate(170%) url("#glass-refraction");
  }
}
```
Keep `.specs__featured-card` as a `.panel--hoverable` so it still lifts on hover. Preserve the existing CTA logic (live link `.btn--coral` and/or case-study link) and the `unlockAchievement('deepdiver')` hook on the case-study link.

### 3.4 — Move certificates below the featured card
Move the `.specs__certs` block out of the left column and render it in `.specs__panel-right`, **directly below** `.specs__featured-card`, with a top margin. Keep its current internals (dashed top rule, pixel micro-label "CERTIFICATES", thumbnail grid with lightbox + `onerror` placeholder fallback). Domains with an empty `certs[]` render nothing (unchanged).

---

## 4. EXACT VISUAL SPECS (recap of new pieces)

- **Pager dots**: `width:10px;height:10px;border-radius:50%;border:2px solid var(--ink);background:var(--grey-light);padding:0;cursor:pointer`. Active: `background:var(--coral)`. Hover: `transform:scale(1.15)`. Row: `display:flex;justify-content:center;align-items:center;gap:8px;margin-top:14px`. Dark mode inherits via tokens (ink/grey-light flip automatically). Respect `prefers-reduced-motion` (drop the scale transition).
- **Pager arrows** (optional): bare `‹`/`›` glyphs, `font-family:var(--font-game)`, `color:var(--grey-dark)`, hover `--ink`, disabled at the ends (50% opacity, no pointer).
- **Sim bay**: `margin-top:24px; border-top:2px dashed var(--grey-light); padding-top:20px`. Micro-label: `font-family:var(--font-pixel); font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--grey-dark); margin-bottom:14px`.
- **Glass card text legibility**: title `font-game` 700 ~16px; desc 13px; both at full opacity on the 0.62 / 0.52 glass fills above — verify contrast in BOTH themes.

---

## 5. FILES YOU MAY TOUCH
- `index.html` — panel-internal markup is JS-rendered, so here you only ADD the `#glass-refraction` SVG filter block (and nothing else unless a new i18n key needs a default in static markup).
- `src/modules/specs.js` — `renderSpecializations()` new structure + pagination logic.
- `src/styles/sections/specs.css` — new layout (sim bay full-width, certs in right col), pager styles, glass card styles.
- `src/data/i18n.js` — add `spec.simLabel` (EN/ZH/KO) if you introduce the sim-bay label key.
- Do NOT add new dependencies. Do NOT edit other sections.

---

## 6. DO's
- Reuse the existing show/hide (`.is-hidden`) pattern for secondary pages — same mechanic as panels.
- Keep all current data, certs, secondary projects, sims, links, and the deep-dive achievement hook working.
- Provide dark-mode variants for every new translucent/colored surface.
- Provide the `@supports` fallback so Safari shows clean frosted glass (no broken filter).
- Keep the glass card a `.panel--hoverable` and keep the 2px ink outline + hard offset shadow (brutalist × glass hybrid — that is intentional).
- Verify on the Vite dev server at 5173: tabs switch, pages switch, no console errors, `npx vite build` compiles.

## 7. DON'Ts
- Don't touch `styles.css` / `script.js` (dead).
- Don't restyle or flatten the `.specs__tabs` glass tab bar — it already matches the nav format.
- Don't use a high `baseFrequency` or large `scale` on the refraction filter (that is what pixelated the old pill filter). Stay at ~0.012 / scale ~14 and keep the `feGaussianBlur` on the noise.
- Don't animate page height or use layout-thrash transitions; toggle visibility only.
- Don't paginate or move the certificates (only relocate them below the featured card) and don't paginate the sims.
- Don't invent project names, descriptions, certs, or stats — render only what's in the data.

## 8. ACCEPTANCE CRITERIA (all must hold)
1. Each panel = 2-col top region + a **full-width** `.specs__sim-bay` at the bottom; the interactive sim visibly spans the whole card width.
2. "Other projects" show **4 per page**; a domain with >4 shows a **compact centered dot pager** (active dot coral); a domain with ≤4 shows **no pager**. Clicking dots/arrows swaps the visible 4 with no console error.
3. Featured card renders the project image full-bleed with a **frosted glass slab** over the lower portion holding badge/title/desc/CTA; in Chromium/Firefox the glass shows refraction (image ripples at the slab edge); in Safari it degrades to clean frosted blur. Text legible in light AND dark mode. Card still lifts on hover.
4. Certificates render in the **right column, directly below the featured card** (not in the left column). Empty-cert domains render nothing.
5. Pixel micro-labels head the sim bay (and groupings), matching the contact/journey label style.
6. No regressions: tab switching, keyboard nav, deep-link hash, cert lightbox, mini-sims, and the deep-dive achievement all still work. `npx vite build` succeeds with zero errors.

## 9. BUILD ORDER
1. Add the `#glass-refraction` SVG filter to `index.html`.
2. CSS: add `.specs__sim-bay`, `.specs__pager`/`-dot`/`-arrow`, glass card rules (+`@supports`, +dark), move certs styling assumptions to the right column; keep the rest.
3. JS: rewrite `renderSpecializations()` markup order (§3.1), implement secondary pagination (§3.2), assemble the glass featured card (§3.3), place certs below it (§3.4).
4. Verify on dev server (5173) + `npx vite build`; report what you changed.
