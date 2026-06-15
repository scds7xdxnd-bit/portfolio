# Portfolio Upgrade Plan — "Next Level"

> Reference doc for upgrading Taeyang Han's portfolio (taeyang-han / "Life Systems Designer").
> Audience: future Claude/Codex chats implementing changes. Read this first, then the relevant file.
> Goal themes (from the owner): **richer UI/design, deeper structure & content, more interactivity, real project demos, and more humanness (handwriting, sketch, personal touch).**

> **Owner decisions (2026-06-14):**
> - **First implementation pass = the Humanness layer (§4).**
> - **Light build step is acceptable** (image pipeline / minimal bundler) where it meaningfully helps — but stay vanilla when no build is needed. The humanness pass needs none.

---

## 0. How to use this doc

- Each section is **self-contained** and **prioritized** (P0 = highest leverage, P3 = nice-to-have).
- Implementation notes reference **real files, classes, and data structures** in this repo — don't invent new architecture unless told to.
- The site is **vanilla HTML/CSS/JS, no build step, deployed on Vercel.** Keep it that way unless a change is worth the tooling cost (flagged where relevant).
- **Every new visible string must go through i18n** (the `TRANSLATIONS` object in `script.js`, keys for `en` / `zh` / `ko`). Don't hardcode copy.
- **Respect `prefers-reduced-motion`** — the codebase already does this consistently (`initHeroAnimation`, `initProgressAnimation`, `initHeroParallax`, etc.). Any new animation must gate on it.

---

## 1. What the site is today (snapshot)

**Concept:** A gamified RPG/"game start screen" metaphor. The visitor is a player reading a *Player Profile*, picking up *Current Quests*, viewing *Specializations*, and *Unlocked Milestones* (certs).

**Design language (neo-brutalist game UI):**
- Cream canvas `--cream:#FFF7E6`, white panels, **thick 3px ink borders**, **hard offset shadows** (`--shadow-offset: 4px 4px 0 var(--ink)`).
- Bright accent palette mapped per domain: `--sunshine #FFD859`, `--coral #FF6B6B`, `--sky #6EC6FF`, `--mint #7EE6A7`, `--purple #B084F5`.
- Type: **DM Sans** (game headings), **Inter** (body), **Noto Sans KR** (Korean), **Press Start 2P** (pixel micro-labels). Tokens in `styles.css` §1.

**Structure (`index.html`):**
1. Sticky nav with "Work" dropdown + tri-lingual toggle (EN · 中文 · 한국어) + mobile panel.
2. **Hero** — `.player-card` (avatar, LVL.24, roles, stats, speech, CTAs) + `.hero__quests` panel + a `BUILD → TEST → IMPROVE → REPEAT` strip.
3. **Manifesto band** — beliefs / daily stack / connect.
4. **Specializations** — 5 domains (`linguist, engineer, builder, community, scholar`) rendered from the `SPECIALIZATIONS` array in `script.js`: sticky tab bar + per-domain panel with a *featured* project, *secondary* cards (screenshot + live link), and a *certificate* strip feeding a shared lightbox.
5. **Footer** — identity + socials.

**Subpages:**
- `opinions/` — case-study hub (filter chips + card grid, JS-driven) with two long-form pieces.
- `projects/` — full case studies: `lifeos.html`, `reaction-simulator.html` (share `opinions.css` + `projects.css`).
- `samsung-leadership-camp/` — a **standalone interactive simulator** (its own HTML/CSS/JS) — currently not surfaced on the homepage.

**Existing interactivity (good foundation, don't rebuild):** scroll reveal (`IntersectionObserver`), staggered hero entrance, one-time name scramble, gradient wave text, animated SVG checkboxes, progress-bar fill, hero parallax, cert lightbox, sticky-tab scroll-spy, language switch re-render, mobile nav.

**What's strong:** cohesive concept, real proof (Yonhap News, Samsung webzine, TOPIK 6), tri-lingual, accessible motion, clean tokens.

**What's holding it back from "next level":**
- "Demos" are **static screenshots + outbound links** — the visitor never *touches* the work.
- Tone is all *system/UI* — **no human warmth** (no handwriting, no real voice, no face beyond one avatar).
- Projects are **buried inside the taxonomy** (spec panels) — low discoverability, no standalone gallery.
- Interactivity is **decorative** (entrance animations) rather than **exploratory** (things to play with).
- A few **hygiene issues** drag perceived quality: 684 KB hero image, a **67 MB CV PDF** download, no favicon/JSON-LD/sitemap, light-mode only.

---

## 2. Design north star (sharpen the concept)

Keep the game metaphor — it's distinctive — but **layer a second register on top: the hand-annotated builder's notebook.** The tension between *crisp game UI* and *messy human margin notes* is the upgrade. Think: a polished arcade cabinet covered in the builder's own sticky notes and pencil arrows.

Three words to hold every decision against: **Playable. Personal. Proven.**

- **Playable** → you can *do* something on the page (demos, toggles, mini-sims), not just read.
- **Personal** → handwriting, a signature, a real voice, photos with tape, a "now" status.
- **Proven** → every claim has a touchable artifact (live demo, news link, cert, metric).

---

## 3. P0 — Real project demos (the #1 gap)

Right now `SPECIALIZATIONS[].secondary[].screenshot` + `link` = a JPG and a "Live ↗". Visitors bounce to an external tab or, more likely, don't click. Make the work **touchable on the page.**

### 3.1 Click-through project shots → live site  ✅ DONE *(decision reversed 2026-06-14)*
**Tried and rejected:** embedding deployed apps in click-to-load `<iframe>` facades with fake browser chrome. Owner feedback: cramming a full hero app into a ~200px window is overkill and reads poorly. **Reverted.**

**Shipped instead:** every project screenshot is now a plain link that opens the real deployed site in a new tab.
- Featured shots (`.specs__featured-shot`, `<a target="_blank">`) gate on `spec.featuredUrl`; hover shows an "Open live site ↗" overlay + a subtle 1.05× zoom.
- Secondary thumbnails (`.specs__secondary-shot`) gate on `item.link`; clickable, `tabindex="-1" aria-hidden` so they don't duplicate the visible "Live ↗" link for screen readers.
- i18n key `demo.visit` (en/zh/ko). No iframes, no `demoUrl` field — `featuredUrl`/`item.link` already carry the targets.

The "playable on the page" goal is met by **inline mini-sims (§3.2)** and the **fun layer (§5b)**, not embeds.

### 3.2 Inline mini-sims (the gold standard — built *into* the page)
The engineering projects are math/canvas — a **tiny version can live directly on the homepage**, no iframe:
- **Bullwhip mini-widget:** ✅ DONE — lives in the Builder panel (`#bullwhip-sim`, `initBullwhipSim`). One "demand shock %" slider → 4 color-coded bars (Retailer→Supplier) amplifying up to 5.8×, with a live insight line. Built with DOM bars (not canvas); moving the slider also unlocks the *Tinkerer* achievement.
- **Fugacity mini-plot:** a single temperature slider redrawing a φ-vs-P curve on a small `<canvas>`.
- **Reaction conversion micro-demo:** a CSTR-vs-PFR toggle animating a conversion bar.

These double as **interactivity** AND **demo**. Build them as standalone, lazy-init functions (only run when scrolled into view, like `initProgressAnimation`).

### 3.3 Motion previews
Replace static `specs__secondary-screenshot` JPGs with **short looping screen-recordings** (muted, `autoplay loop playsinline`, `<video>` with the JPG as `poster`). Play on hover (desktop) / on-in-view (mobile). Record 4–8 s loops of each app's signature interaction. Keep files small (≤1–2 MB, VP9/H.264, ~720p).

### 3.4 Surface the Samsung camp simulator
`samsung-leadership-camp/` is a real interactive artifact sitting unused. Give it a **featured demo slot** in the Community panel (embedded iframe + "open full" link). It's the most "playable" proof of the community work.

### 3.5 Linguist demo (the one domain with no software artifact)
Make the proof interactive anyway:
- A **"hear it in 5 languages"** micro-player (short audio clips of a greeting in EN/KO/ZH/MS/…), or
- A tiny **"guess the language"** flip-card game, or
- An **embedded Yonhap article preview card** (og-image + headline) instead of a bare link.

---

## 4. P0 — Humanness (handwriting, sketch, personal touch)

The site reads as a *system*. Add a human hand on top of the machine.

### 4.1 Handwriting layer
- Load a handwriting face — **Caveat** or **Shantell Sans** (Shantell pairs beautifully with neo-brutalism; it's a Google font, variable, designed by a comic letterer). Add a token: `--font-hand: 'Caveat', cursive;`.
- **Use it sparingly and purposefully** (handwriting everywhere = noise):
  - **Margin annotations** that point at real things: a scribbled *"built this one first → still running 5 yrs"* arrow next to the accounting project; *"this got on the news!"* next to APEC.
  - **Captions** under photos/certs.
  - **A short handwritten intro line** in the hero or manifesto — one sentence in the owner's voice (bonus: a Korean line in hand-style Korean).

### 4.2 A real signature
- Hand-letter "Taeyang Han" (or 한태양) as an **SVG path** and **draw it on scroll-in** (`stroke-dasharray`/`stroke-dashoffset` animation — same technique already used for `.hero__build-check`). Place it in the footer and/or end of case studies. This is the single highest-warmth, lowest-cost addition.

### 4.3 Hand-drawn doodles & rough borders
- Add **[rough.js](https://roughjs.com/)** (tiny, ~9 KB) or hand-authored SVG for: circled stats, underlines beneath key phrases, arrows connecting hero → quests, a doodled star on the "Specializations" badge.
- Optionally render **some panel borders in a "sketch" stroke** for select cards so the brutalist grid feels hand-built, not generated. (Use a toggle/limited set — don't rough *everything* or it gets busy.)

### 4.4 Paper & pencil texture
- Add a **very subtle paper grain** to the cream background (a tiling noise PNG at ~3–5% opacity, or an SVG `feTurbulence` overlay). Makes the cream feel like a notebook page, not a flat `#FFF7E6`.
- Pencil-style separators (`.manifesto__sep`) instead of clean lines.

### 4.5 Taped photos / polaroids
- For **Community** and the **Samsung camp**, show real event photos as **polaroids**: white frame, slight rotation (`transform: rotate(-2deg)`), a graphic strip of "washi tape," a handwritten caption. Straighten + lift on hover. Far warmer than the current uniform screenshot grid.

### 4.6 A human "About" beat
- There's a story implied across the stats (Malaysia → Korea, dual degree, diplomatic interpreter, full-ride scholar) but it's never *told*. Add a **short first-person narrative** (3–4 sentences) — ideally near the manifesto — so a recruiter meets a person, not a stat block.

---

## 5. P1 — Interactivity (make it exploratory)

### 5.1 Command palette (⌘K / Ctrl-K)
A searchable quick-nav overlay: jump to any domain, project, case study, or "copy email / download CV." Extremely on-brand for a *builder* and reinforces the "system" concept. Pure JS, ~120 lines. Index = `SPECIALIZATIONS` + nav links + project list.

### 5.2 Scroll-driven XP bar
A thin top progress bar styled as a **game XP meter** that fills as you scroll the page, with a small "LVL" tick at each section. Reinforces the game metaphor and gives orientation. (Gate animation on reduced-motion → static.)

### 5.3 Interactive skills view
Replace/augment the static `Character Stats` with one of:
- a **skill radar/constellation** (canvas/SVG) you can hover for detail, or
- **animated stat bars that fill once** in view (the progress machinery already exists), with hover tooltips ("5 yrs", "3× TA").

### 5.4 Journey timeline (scrub-on-scroll)
A horizontal/vertical **timeline** of the 5-year build journey (first accounting app 2021 → … → APEC interpreting 2025 → TA 2026). Markers reveal as you scroll. This is the missing **structure** that ties the fragmented proof into one story (supports the "Proven" pillar).

### 5.5 Theme / world toggle
Add a **dark ("night") mode** — currently light only. Frame it as a game "day/night" toggle. All colors are already tokenized in `:root`, so this is mostly a `[data-theme="dark"]` override block + a toggle that writes to `localStorage` (mirror the `lang` pattern). Big perceived-polish win.

### 5.6 Tactile micro-interactions
- **Magnetic / tilt** on the primary CTA and project cards (subtle, reduced-motion-aware).
- **Cursor spotlight** on the hero (radial glow following the pointer) — desktop only.
- **Optional, muted-by-default UI sounds** (a soft "blip" on quest hover, "level-up" on reaching the footer) with a persistent mute toggle. Only if it stays tasteful and off by default.
- **Konami-code easter egg** (↑↑↓↓←→←→BA) → confetti / a hidden "secret quest." Pure delight, fits the theme.

### 5.7 "Now" widget
A small **"Currently building / learning / reading"** card (manually edited, dated). Signals the portfolio is alive and adds humanness. Convert relative dates to absolute when editing.

---

## 5b. Fun interaction layer (owner-requested 2026-06-14)

Owner wants **fun user↔site interactions**, ideally tied to the content or to him personally. Brainstorm lives in chat (4 buckets: RPG layer / field toys / personal & human / easter eggs); owner greenlit **all four**. Building in waves.

### Wave 1 — the "achievement game" + feeders  ✅ DONE
A localStorage-backed achievement system is the connective tissue; small interactions feed it. All in `script.js` §10e-v + `styles.css` §19.
- **Achievements (`ACHIEVEMENTS`, `unlockAchievement`, `renderTrophyShelf`)** — footer trophy shelf (`#achievements`, starts 0/6), slide-in unlock toast (`.ach-toast`), confetti (`confettiBurst`). 5 base + auto **Completionist** when all 5 land. Persists under `th_achievements`. Localizes on lang toggle.
  - 🌐 Polyglot (view all 3 languages) · 🔬 Tinkerer (bullwhip slider) · 📜 Deep Diver (open a case study) · ✉️ Reaching Out (copy email) · 🕹️ Secret Finder (Konami) · 🏆 Completionist.
- **Rotating multilingual hello (#11)** — `.hero__hello-word` cycles Hi/안녕하세요/你好/Apa khabar/こんにちは/Hola (`initHelloRotator`). *Owner: edit this greeting list to his actual languages.*
- **Konami code (#16)** `initKonami`, **console hire-me message (#17)** `initConsoleEgg`, **email-copy confetti (#18)** via `copyEmail`.
- i18n: `ach.*` keys in all 3 languages. Reduced-motion: confetti skipped, wave/rotator static.

### Wave 2 — field toys & deeper interactions  ⏳ NEXT
Lead with the most on-brand piece:
- **#10 Life-system node graph** — 4 domains as spring-connected draggable nodes; drag one, the others wobble. Literally the "Life Systems Designer" tagline. *Flagship — give it a focused build.*
- **#6 Reaction mixer** / **#7 pH titration slider** — chem-eng toys (Engineer panel), same inline pattern as the bullwhip sim.
- **#8 Distillation-column scroll indicator**, **#9 thermostat feedback-loop toy**.
- Remaining RPG/personal/egg ideas: #2 EXP scroll bar, #3 NPC dialogue hero, #4 hover-inspect stats, #5 skill-tree lines, #12 Seoul clock, #13 guestbook doodle wall, #14 flask companion, #15 ask-me terminal, #19 ink cursor trail, #20 idle animation, #21 command palette.

---

## 6. P1 — Structure & information architecture

The homepage is **Hero → Manifesto → Specializations → Footer** — dense and flat. Give it a clearer narrative spine and better discoverability.

Proposed arc (each a clear section, scannable in <10 s):
1. **Hero** — who + one-line value prop + primary CTA. (Trim: it's currently doing a lot.)
2. **About / story beat** — the human narrative (§4.6) + signature.
3. **Proof strip** — "As featured in" logos: **Yonhap News, Samsung, Sogang, Gyeongbuk Provincial Gov.** Social proof up high builds trust fast.
4. **Featured Work gallery** — a **standalone, filterable project grid** *separate from* the specializations taxonomy. This is the discoverability fix: projects currently only exist nested in spec panels. Each card → demo (§3) + case study.
5. **Specializations** — keep, but reframe as "the five things I'm known for," each linking down to relevant featured work.
6. **Journey timeline** (§5.4).
7. **Case studies / writing** (the `opinions/` hub, surfaced with previews).
8. **Contact** — more than a `mailto:` (see §6.1).
9. **Footer** — signature, socials.

### 6.1 Real contact section
Add a proper **"Start a quest together"** block: short message form (Formspree/Netlify-style POST, or `mailto:` with prefilled subject as a no-backend fallback), a scheduling link if available, response-time expectation, and the languages you can work in. A bare `mailto:` undersells a diplomatic-grade communicator.

### 6.2 Content depth
- **More case studies.** Only `lifeos` and `reaction-simulator` have full write-ups. Add SCM/bullwhip, fugacity, CNN emotion classifier, the scholarship-writing system, and the Samsung camp. Reuse `opinions.css` + `projects.css`. Structure: Problem → Decisions → What actually happened → Outcome/metrics.
- **Show the messy middle** in case studies: early sketches, dead ends, iteration screenshots — this is both content depth *and* humanness, and it's what separates a portfolio from a brochure.
- **Quantify outcomes** everywhere ("336 likes / 215 saves," "210+ scholars," "5 yrs in production"). The data is there; lead with it.

### 6.3 i18n coverage
Every new section/string needs `en`/`zh`/`ko` keys in `TRANSLATIONS`. Audit existing keys when adding sections; the language switch re-renders specializations + overview (`initLangToggle`) — wire any new dynamic renderers into that callback too.

---

## 7. P2 — Performance, SEO, hygiene (cheap perceived-quality wins)

- **Hero image:** `assets/hero.jpg` is **684 KB**. Serve a responsive `srcset` (AVIF/WebP + sizes), and keep `hero-sm.jpg` for the avatar. Target <120 KB for the displayed size.
- **CV PDF:** the downloadable `Taeyang Han — Life Systems Designer.pdf` is **~67 MB** — unacceptable for a download link. Compress to <5 MB (flatten/downsample images) or host externally and link. (It's already in `.gitignore`; ship a compressed copy.)
- **Project media:** lazy-load (already partly done), add explicit `width`/`height` to prevent CLS, and prefer WebP/AVIF for the `assets/projects/*` screenshots.
- **Favicon + app icons + theme-color** — none present. Add a small set + `manifest.webmanifest`.
- **Structured data:** add JSON-LD `Person` schema (name, jobTitle, alumniOf Sogang, sameAs socials) — helps search/AI surfaces. Add `CreativeWork`/`SoftwareApplication` for projects.
- **`sitemap.xml` + `robots.txt`**, and `<link rel="canonical">`.
- **Open Graph image** currently points at `hero.jpg` (684 KB) — make a purpose-built 1200×630 OG card (with name + tagline) so shares look intentional.
- **View Transitions API** for same-origin nav between home ↔ opinions ↔ projects (progressive enhancement; one-liner opt-in + a couple of `::view-transition` rules).
- **Lighthouse pass** as the acceptance gate (perf/a11y/best-practices/SEO ≥ 95).

---

## 8. P2 — Accessibility & motion (protect what's good)

- Keep gating every animation on `prefers-reduced-motion` (current discipline is good).
- Add a **skip-to-content** link.
- Ensure new interactive widgets (command palette, demo modals, timeline) are **keyboard-operable** and announce state (`aria-modal`, focus trap, `Esc` to close — the lightbox/nav already model this; reuse the pattern).
- Verify color contrast on accent-on-cream text (some accents like `--sunshine` on white can fail AA for small text — use `--ink` text on accent fills, not accent text on light).
- Captions/transcripts for any audio (§3.5) and `aria-label`s on icon-only buttons (mostly done).

---

## 9. Design-system extensions (tokens to add in `styles.css` §1)

```css
:root{
  /* humanness */
  --font-hand: 'Caveat', 'Shantell Sans', cursive;
  --paper-noise: url('assets/textures/paper.png'); /* ~3-5% opacity overlay */

  /* dark / night world (P1 §5.5) */
  /* define under [data-theme="dark"] — flip bg/panel/text, keep accents */

  /* demo chrome */
  --demo-bar: #ECECEC;
  --demo-dot-r:#FF5F57; --demo-dot-y:#FEBC2E; --demo-dot-g:#28C840;
}
```
New reusable components worth adding: `.demo-frame` (browser chrome), `.polaroid`, `.annotation` (handwriting + arrow), `.proof-logos`, `.xp-bar`, `.timeline`, `.cmdk` (command palette), `.now-card`.

---

## 10. Suggested libraries (keep the no-build ethos)

| Need | Pick | Why | Size |
|------|------|-----|------|
| Hand-drawn shapes | **rough.js** | sketchy SVG/canvas, pairs with brutalism | ~9 KB |
| Confetti easter egg | **canvas-confetti** | one-call delight | ~6 KB |
| Charts for mini-sims | **hand-rolled canvas** (no lib) | full control, zero deps | 0 |
| Scroll/scrub animation | native **IntersectionObserver** + **ScrollTimeline** (with fallback) | already the house style | 0 |
| Signature draw-on | native SVG `stroke-dashoffset` | already used in code | 0 |

Avoid pulling in a framework. Everything above stays drop-in `<script>` or vanilla.

---

## 11. Roadmap & sequencing

**Phase 1 — Touchable & human (highest impact):**
1. Demo frames + click-to-load iframes for the 6 deployed apps (§3.1).
2. Signature draw-on in footer (§4.2) + handwriting token & a few annotations (§4.1, §4.3).
3. One inline mini-sim (bullwhip) as the proof-of-concept for "playable" (§3.2).
4. Compress hero image + CV PDF, add favicon/OG/JSON-LD (§7).

**Phase 2 — Structure & exploration:**
5. Standalone Featured Work gallery + proof-logos strip (§6).
6. Command palette + XP bar + dark mode (§5.1, §5.2, §5.5).
7. Surface Samsung camp simulator (§3.4); polaroids for Community (§4.5).

**Phase 3 — Depth & delight:**
8. Journey timeline (§5.4) + "Now" widget (§5.7).
9. More case studies w/ process artifacts (§6.2).
10. Motion previews, cursor spotlight, sounds, Konami egg (§3.3, §5.6).

---

## 12. Success criteria

- A first-time visitor can **interact with at least one project without leaving the page** within ~10 s of landing.
- The page has a **visible human hand** (signature + handwriting) — it no longer reads as machine-generated.
- Projects are **discoverable** outside the specialization taxonomy.
- Lighthouse **≥95** across all four categories; LCP < 2.0 s on 4G.
- All three languages remain fully translated; all motion still honors `prefers-reduced-motion`.
- Nothing requires a build step the owner doesn't want to maintain.

---

## 13. File-level quick reference (where things live)

| Area | File(s) |
|------|---------|
| Markup / sections | `index.html` |
| Behavior, i18n (`TRANSLATIONS`), `SPECIALIZATIONS` data, renderers, all `init*()` | `script.js` |
| Tokens + all styles (see §-map: tokens@1, hero@6, player-card@6b, specs@... , certs@11, footer@12, manifesto@16) | `styles.css` |
| Case-study hub (filterable) | `opinions/index.html`, `opinions/opinions.js`, `opinions/opinions.css` |
| Project case studies | `projects/lifeos.html`, `projects/reaction-simulator.html`, `projects/projects.css` |
| Standalone interactive demo (surface it!) | `samsung-leadership-camp/` |
| Screenshots / certs / inspiration | `assets/projects/`, `assets/certs/`, `assets/inspo/` |
| Past implementation specs/prompts | `prompts/` |

> **Reminder for implementers:** add demos via a `demoUrl` field on `SPECIALIZATIONS` items rather than hand-writing HTML; reuse the existing lightbox + reveal + progress observers; route all copy through `TRANSLATIONS`; gate motion on `prefers-reduced-motion`.
