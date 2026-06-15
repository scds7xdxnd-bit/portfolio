# Web4 Upgrade Plan — "The Portfolio That Answers Back"

> Reference doc for the **Web4 layer** of Taeyang Han's portfolio (taeyang-han / "Life Systems Designer").
> Audience: future Claude/Codex chats implementing changes. Read [PORTFOLIO_UPGRADE_PLAN.md](PORTFOLIO_UPGRADE_PLAN.md) first (the humanness/structure/interactivity layer), then this.
> This doc is the **agentic / machine-legible / adaptive** layer that sits *on top* of that work.

---

## 0. How to use this doc

- Sections are **self-contained** and **prioritized**: **T0 = foundation (do first)** → **T6 = moonshot**.
- Implementation notes reference **real files and data structures** in this repo — don't invent architecture unless told to.
- The frontend is **vanilla HTML/CSS/JS bundled by Vite, deployed on Vercel.** Keep the frontend vanilla. The new thing this plan introduces is a **`/api/` directory of Vercel Functions** — server-side code that the frontend talks to over `fetch`. That's the only "backend" added, and it's serverless (zero infra to run).
- **Every new visible string goes through i18n** — the `TRANSLATIONS` object in [src/data/i18n.js](src/data/i18n.js), keys for `en` / `zh` / `ko`. The agent itself must also **answer in the active site language** (`currentLang`).
- **Respect `prefers-reduced-motion`** — every new animation gates on it (the codebase is disciplined about this; match it).
- **Wire-up convention:** new modules are exported from [src/modules/index.js](src/modules/index.js) and `init*()`'d in [src/main.js](src/main.js); language-reactive renderers are also called inside `switchToLang()` in [src/lib/i18n.js](src/lib/i18n.js).

---

## 1. What "Web4" means here (the thesis)

There is no single canonical definition of Web4. Two framings are live:

- **The EU / industry framing** — "Web 4.0" = *open + intelligent + immersive*: AI, IoT, blockchain, virtual worlds fused. (We borrow the *open + trustworthy* part in **T5**.)
- **The generational framing (the actionable one):** Web1 *read* → Web2 *read/write* → Web3 *read/write/own* → **Web4 = the agentic / intelligent web** — AI agents read and act on the web *on a person's behalf*; interfaces become conversational; sites adapt to who's visiting.

**The operative insight for a 2026 portfolio:** your site now has **two audiences** — a human skimming it, *and* an AI agent reading it on a human's behalf (a recruiter who pastes your URL into an assistant, an agent screening candidates, a search/answer engine). Applying the Web4 vision = **serve both, and let the human talk to the site instead of only scrolling it.**

This portfolio is *unusually* ready for it: it already ships a [terminal](src/modules/terminal.js), a [command palette](src/modules/command-palette.js), an [NPC dialogue system](src/modules/hero.js), an [achievement engine](src/lib/achievements.js), and clean structured data in [src/data/](src/data/specializations.js). We're not bolting on a chatbot — we're **upgrading the substrate that's already here.**

---

## 2. Design north star (extend the existing one)

The base plan holds three words against every decision: **Playable · Personal · Proven.** The Web4 layer adds a fourth register on top of the "arcade cabinet + builder's notebook":

> **The living terminal — a portfolio that other minds, human *and* artificial, can read, question, and be changed by.**

Add a fourth pillar word: **Playable · Personal · Proven · `Present`.**

- **Present** → present *on the agentic web*: legible to machines, able to converse, alive with real-time state.

Three sub-pillars structure the whole plan:

| Sub-pillar | One line | Tier |
|---|---|---|
| **Legible** | An agent reading the site gets the facts right, not hallucinations. | T0 |
| **Conversant** | A visitor (or their agent) can *ask* and get a grounded, cited answer. | T1, T2 |
| **Adaptive** | The site reshapes itself to the visitor and shows real-time truth. | T3, T4 |

---

## 3. Architecture at a glance (what gets added)

```
                    BROWSER (vanilla, Vite-bundled — unchanged ethos)
   ┌──────────────────────────────────────────────────────────────┐
   │  terminal.js  →  "ask" panel  ──┐                              │
   │  command palette / NPC / quests │  fetch()                     │
   └─────────────────────────────────┼────────────────────────────┘
                                      ▼
                    VERCEL FUNCTIONS  (NEW — /api/*, serverless)
   ┌──────────────────────────────────────────────────────────────┐
   │  /api/ask        → calls Claude w/ portfolio context (T1)      │
   │  /api/tailor     → JD-matching, structured output (T2)         │
   │  /api/mcp        → MCP server: exposes YOU as agent tools (T2) │
   │  /api/status     → live uptime pings on the 7 apps (T3)        │
   │     ANTHROPIC_API_KEY lives here — NEVER in the bundle         │
   └──────────────────────────────────────────────────────────────┘
                                      ▼
   STATIC, ZERO-BUILD ARTIFACTS (T0):  /llms.txt · /profile.json
                                       JSON-LD in index.html · sitemap · robots
   GROUND TRUTH FOR ALL OF IT:  src/data/specializations.js · i18n.js
```

**One security rule that governs everything below:** Vite inlines any env var prefixed `VITE_` into the **client bundle** (shipped to every browser). The Anthropic key must therefore **never** be `VITE_`-prefixed and **never** referenced in `src/`. It is a plain Vercel project env var (`ANTHROPIC_API_KEY`) read **only** inside `/api/*`. The browser never sees it.

> Note: [vercel.json](vercel.json) currently sets `git.deploymentEnabled.main = false`. Functions deploy fine; just confirm the deploy flow when `/api` lands.

---

## T0 — Agent Legibility (P0, the zero-build foundation) 🟢

Today an AI reading the site scrapes rendered HTML and guesses. There is **no JSON-LD, no `llms.txt`, no `sitemap.xml`, no `robots.txt`** (confirmed). This tier is pure static files, no API, no cost — and it's the part everyone skips. Do it first.

### T0.1 — JSON-LD structured data
Add a `<script type="application/ld+json">` block to [index.html](index.html) `<head>`:
- **`Person`**: `name` (Taeyang Han / 한태양), `jobTitle`, `alumniOf` (Sogang University), `knowsLanguage` `[en, ko, zh, ms, es]`, `sameAs` (all socials), `knowsAbout` (ChemE, CS, interpreting), `image`.
- **`CreativeWork` / `SoftwareApplication`** per deployed app (LifeOS, Reaction Simulator, Fugacity, Bullwhip, Apple SCM, Process Game) — generate from [src/data/specializations.js](src/data/specializations.js) so it never drifts from the visible site.
- For subpages, add `Article` JSON-LD (the `opinions/` case studies).

### T0.2 — `/llms.txt` (the canonical agentic-web artifact)
The emerging convention for "here's a clean machine-readable digest of this site." Place `llms.txt` in `public/`. Generate it from `SPECIALIZATIONS` + `opinions-index` + i18n so it's a single source of truth:
- A one-paragraph bio, the five specializations, every project with its one-line description + live URL + case-study URL, contact, languages.
- Optionally `llms-full.txt` with the full case-study prose.

### T0.3 — Machine-readable résumé (`/profile.json`)
Ship a [JSON Resume](https://jsonresume.org/schema/)-schema file at `public/profile.json` (or a custom superset). Agents and ATS-style tools can ingest it directly. Same generation source as T0.2.

### T0.4 — Crawler welcome mat
- `public/robots.txt` that **explicitly allows** `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, etc. — you *want* to be in AI answers.
- `public/sitemap.xml` (home + 5 domain anchors + opinions + project pages).
- `<link rel="canonical">` on every page.

### T0.5 — Purpose-built Open Graph card
Current OG points at the 684 KB `hero.jpg`. Make a 1200×630 card (name + tagline + "Life Systems Designer") so human *and* agent shares look intentional. (Overlaps base-plan §7.)

**Acceptance:** paste the deployed URL into an LLM with browsing → it returns your name, role, languages, and at least two real projects with correct live URLs, no hallucinations. `llms.txt` and `profile.json` validate.

---

## T1 — The Conversational Portfolio (P0, flagship) 🔵

Turn the [terminal](src/modules/terminal.js) from a **fixed command→string lookup** into a **real "Ask my portfolio anything"** agent. This is the single most "Web4" thing the site can do, and the UI already exists.

### T1.1 — Two implementation rungs (ship the second)
1. **Client-side retrieval (fallback, $0, no key):** match the question against `src/data` content and return the best snippet + link. Private, free, but not conversational. Keep as the offline/no-key fallback.
2. **Real LLM via Vercel Function (the actual feature):** `POST /api/ask` calls Claude with the portfolio as grounding context, **streams** the answer back, **cites** which project/case study, and can emit **actions** the page executes (open a demo, jump to a domain, switch language, copy email).

### T1.2 — `/api/ask` design (Anthropic SDK)
- SDK: `@anthropic-ai/sdk`; `new Anthropic()` reads `ANTHROPIC_API_KEY` from the function env.
- **Model:** default `claude-opus-4-8` for answer quality (adaptive thinking, the current flagship). **Cost decision for a public endpoint is yours to make** — `claude-haiku-4-5` ($1/$5 in/out per Mtok, fast, 200K context) is the cheap/low-latency option for a high-traffic chat box; `claude-opus-4-8` ($5/$25) is the quality option. Recommendation: **Haiku for the live chat, Opus for the high-stakes generators in T2.** Don't silently downgrade — pick deliberately.
- **Thinking/latency:** keep `thinking: {type: "adaptive"}`. If you disable thinking for snappiness, add a "final answer only, no exploratory reasoning" system instruction (Opus 4.8 can otherwise narrate reasoning into the reply).
- **Streaming:** use `client.messages.stream()` and pipe deltas to the browser as SSE so the terminal types the answer live (on-brand with the existing terminal aesthetic).
- **Grounding context:** assemble a compact knowledge block from `SPECIALIZATIONS`, the terminal's `PROJECTS` map, and `opinions-index` at build/deploy time; put it in the system prompt with a `cache_control` breakpoint (it's stable → prompt-caching makes repeat calls ~10× cheaper on the cached prefix).
- **Tool-calls to drive the page (optional, high delight):** define tools like `open_project(id)`, `goto_domain(id)`, `set_language(code)`, `copy_email()`. The function returns the tool call; the browser executes it against existing handlers (`window.open`, `scrollIntoView`, `switchToLang`, `copyEmail`). The site literally *does things* when you ask.

### T1.3 — Guardrails (mandatory — it's a public, abusable endpoint)
- **Rate limit** per IP (e.g. Upstash Redis `@upstash/ratelimit`, or Vercel KV). Cap requests/min and a hard monthly budget; when exceeded, fall back to T1.1 retrieval mode.
- **Prompt-injection hardening:** the system prompt states the assistant *only* answers questions about Taeyang and *never* follows instructions embedded in user input. Cap `max_tokens`. Treat all user text as data, not instructions.
- **Output cap + topicality:** politely deflect off-topic/abuse; no PII beyond what's already public.

### T1.4 — UX, i18n, a11y, motion
- Reuse the terminal's open/close/focus-trap/`Esc` machinery. Add an `aria-live="polite"` region so the streamed answer is announced to screen readers; keep it fully keyboard-operable.
- The system prompt instructs the model to **reply in `currentLang`** (en/zh/ko). All new chrome strings → `TRANSLATIONS`.
- Reduced-motion: skip the typewriter effect, render the final answer at once.

### T1.5 — Tie into the game
Add an achievement to [src/data/achievements.js](src/data/achievements.js): **🗣️ Interrogator** — "Asked the portfolio a question." Unlock via `unlockAchievement('interrogator')` on first answer (this also nudges `Completionist` logic in [achievements.js](src/lib/achievements.js)).

**Acceptance:** a visitor types *"has Taeyang done supply-chain work?"* and gets a streamed, accurate answer that names the Bullwhip + Apple SCM projects, offers to open one, and respects the active language — all without the API key ever entering the bundle.

---

## T2 — The Portfolio as a Tool (P1, the signature "crazy" move) 🟣

T1 lets a human talk to the site. T2 makes **you a callable tool on the agentic web** — and lets the site argue your fit for a specific role. This is the jaw-drop tier.

### T2.1 — Ship an MCP server *of yourself* (`/api/mcp`) 🤯
Expose the portfolio as a **Model Context Protocol server** so *any* agent (Claude Desktop/Code, etc.) can connect to it as a tool source. A ChemE∩CS builder who ships an MCP server of his own career is the most on-brand flex imaginable, and it's real and hostable as a Vercel Function.
- Build with `@modelcontextprotocol/sdk` (Streamable HTTP transport — verify the current transport/handshake against docs at implementation time via Context7).
- **Tools to expose:** `get_profile()`, `list_projects(domain?)`, `get_project(id)`, `get_experience(area)`, `check_availability()`, `get_languages()`, `get_case_study(slug)`. All read from the same `src/data` ground truth (no LLM call needed → free to run).
- **The headline:** a footer/CTA block — *"Add me to your Claude"* — with the MCP endpoint URL and a one-line install snippet. A recruiter's agent can now query your experience directly.
- Read-only, no secrets, rate-limited. This is data exposure, not an LLM endpoint, so it's cheap and safe.

### T2.2 — "Tailor this portfolio to a role" (`/api/tailor`)
A visitor pastes a job description → the agent (Opus 4.8 here — quality matters) **re-ranks and highlights** the matching projects, writes a 2–3 sentence "why I fit," and the page **re-skins** to lead with the relevant specialization.
- Use **structured outputs** (`output_config: {format: {...}}`) so the response is a typed object: `{ orderedDomains, highlightedProjects, fitSummary, gaps }`. The frontend re-orders the spec panels and injects the summary — no fragile string parsing.
- For someone literally branded **Life Systems Designer**, "paste your JD, watch the system reconfigure" is a killer recruiter hook and a perfect thematic payoff.

### T2.3 — Downloadable recruiter brief
From the same tailored result, generate a one-page **"Taeyang × {Company}"** brief (HTML→print, or a server-rendered PDF) the recruiter can save. Reuses `projects.css`. Optional: gate behind `copyEmail` so you capture intent.

**Acceptance:** (1) the MCP endpoint is reachable and returns your projects to an external Claude client; (2) pasting a real JD reorders the page and produces a grounded, non-generic fit summary citing actual projects.

---

## T3 — Adaptive & Alive (P1) 🟡

Make the site demonstrate, in real time, that it's a living system — not a static brochure.

### T3.1 — Live deployment status (`/api/status`)
You have **7 deployed apps** (see the `PROJECTS` map in [terminal.js](src/modules/terminal.js)). Ping them server-side and surface real uptime: a **"5/7 systems live ✓"** badge near the hero, green/amber dots per project card. Cache results ~5 min. Proof that's literally *alive* — and deeply on-theme for a "systems" person.

### T3.2 — Live GitHub pulse
Pull public commit/activity via the GitHub API (server-side, cached) → a small contribution sparkline or "last shipped X days ago" line. Reinforces "still shipping."

### T3.3 — Visitor-aware framing (tasteful, privacy-safe)
Read referrer / UTM (LinkedIn vs. a ChemE list vs. a dev recruiter) and **lead with the relevant specialization**; persist the choice in `localStorage` exactly like the existing `lang` pattern. No tracking, no PII — just first-paint relevance. Keep it subtle.

### T3.4 — Semantic search over your work
Precompute embeddings for each project + case study (one-off build script → ship a small JSON of vectors). Client-side cosine similarity powers a **"find me something like…"** search in the command palette. No runtime API cost; pure vanilla at runtime.

### T3.5 — Auto "Now" card
The base plan's "Now" widget (§5.7), but **fed by T3.1/T3.2** instead of hand-edited: "Currently: {most-recently-active repo}. {N}/7 systems live." Dated, honest, self-updating.

---

## T4 — The Agentic RPG Layer (P2, delight) 🎮

Fuse the agent (T1) with the game metaphor so the "intelligence" *is* the gameplay.

### T4.1 — The NPC guide becomes sentient
[initNpcDialogue](src/modules/hero.js) currently runs scripted lines. Wire it to `/api/ask` so the hero NPC is an **LLM-backed guide** that greets visitors, answers in-character, and **issues quests** ("Go inspect the Bullwhip sim → unlock 🔬 Tinkerer"). The achievement system already exists to reward this.

### T4.2 — Voice interface
Web Speech API: a mic button lets a visitor **literally talk to the portfolio** (speech-in → `/api/ask` → optional speech-out). Ambient/conversational = the Web4 register. Gate behind a click (no autoplay), provide a text fallback, caption everything.

### T4.3 — The life-system graph, narrated
The flagship [life-system node graph](src/modules/life-system.js) ("Life Systems Designer" made literal) gets an "Explain this system" affordance — the agent narrates how the domains connect when you drag a node.

### T4.4 — Agent-issued dynamic quests
The agent can mint a contextual quest based on what the visitor asked ("You seem interested in ChemE — try the pH titration toy"), feeding the existing `ACHIEVEMENTS` loop. Turns exploration into a guided, personalized path.

---

## T5 — Trust & Provenance (P2, the EU-Web4 angle) 🛡️

The flip side of an AI-heavy site is the "is any of this real?" worry. Make **verifiability a feature** — this is the "open, trustworthy" half of the EU Web 4.0 vision, and it's a strong counter-signal in an era of AI slop.

- **Every claim links to its artifact.** TOPIK 6 → scorecard; "on the news" → the Yonhap article; APEC → the dialogue page; "5 yrs in production" → the live app. Many of these targets already live in `SPECIALIZATIONS` (`featuredUrl`, `certs`, `secondary[].link`).
- **"Verified" badges** on claims that have a public source; a subtle "receipts" affordance.
- The T1 agent is instructed to **cite a source for every factual claim** it makes — no unsourced assertions about you.
- Optional/advanced: a signed `claims.json` (or a "proof" manifest) the truly curious (or an auditing agent) can check.

---

## T6 — Moonshots (P3, "crazy with it") 🚀

Ambitious, ship-if-inspired:

- **Agent-to-agent interview endpoint.** A `/api/interview` (or an MCP tool) where a recruiter's agent can run a structured interview against your site agent — Q&A, grounded, transcript downloadable. The first "my representative will speak with your representative" portfolio.
- **Explorable WebGL pixel world.** The pixel RPG world-map background becomes a tiny walkable space (the EU-Web4 "immersive" register); each building opens a domain. Heavy — keep `prefers-reduced-motion` + a 2D fallback.
- **Generative/adaptive hero.** The greeting, color accent, or featured quest subtly adapts to time-of-day / visitor signal (T3.3) — generative but tasteful.
- **On-device fallback model.** A tiny WebLLM/WebGPU model powers the chat offline / when the budget cap is hit, so the "ask" box never goes dead.

---

## 4. Cross-cutting requirements (apply to every tier)

### 4.1 Security & cost (non-negotiable)
- `ANTHROPIC_API_KEY` is a **server-only** Vercel env var. Never `VITE_`-prefixed, never imported in `src/`. (Vite ships `VITE_*` to the browser — that would leak the key.)
- Per-IP **rate limiting** + a **hard monthly spend cap** on every LLM endpoint; degrade to static/retrieval mode when hit.
- **Prompt-injection hardening** on all public LLM endpoints: user text is data, never instructions; the assistant only discusses Taeyang.
- MCP/status endpoints are read-only, secret-free, cached, rate-limited.

### 4.2 i18n
Every new string → `TRANSLATIONS` (`en`/`zh`/`ko`) in [src/data/i18n.js](src/data/i18n.js). The agent replies in `currentLang`. New language-reactive renderers get called inside `switchToLang()` in [src/lib/i18n.js](src/lib/i18n.js).

### 4.3 Accessibility & motion
Chat/voice/quests must be keyboard-operable, focus-managed, and announce updates via `aria-live` (reuse the terminal/lightbox patterns). Every animation gates on `prefers-reduced-motion`.

### 4.4 No-build ethos
Frontend stays vanilla. The only new "backend" is the `/api/` serverless directory. T0 adds *only* static files. Don't pull a frontend framework.

---

## 5. Suggested stack (extends base-plan §10)

| Need | Pick | Why | Notes |
|---|---|---|---|
| Call Claude (T1, T2.2) | `@anthropic-ai/sdk` | Official SDK; `new Anthropic()` reads env key | Stream via `messages.stream()`; structured output via `output_config.format` |
| Expose you as a tool (T2.1) | `@modelcontextprotocol/sdk` | Build the MCP server | Verify transport against current docs at impl time |
| Rate limit / cost cap | `@upstash/ratelimit` + Redis, or Vercel KV | Protect public endpoints | Per-IP + monthly budget |
| Embeddings (T3.4) | precomputed at build → JSON | Zero runtime cost | Client-side cosine similarity |
| Live status (T3.1) | native `fetch` in the function | No dep | Cache ~5 min |
| Voice (T4.2) | native Web Speech API | No dep | Click-to-start, text fallback |

**Model IDs (authoritative):** `claude-opus-4-8` (flagship, $5/$25, 1M ctx) · `claude-haiku-4-5` (fast/cheap, $1/$5, 200K ctx) · `claude-sonnet-4-6` (balanced, $3/$15). Adaptive thinking only on 4.8 (`thinking: {type:"adaptive"}`); stream anything over ~16K output tokens.

---

## 6. Roadmap & sequencing

**Phase 1 — Legible (a weekend, zero-build, zero-cost):**
1. T0.1 JSON-LD + T0.4 robots/sitemap + T0.5 OG card.
2. T0.2 `/llms.txt` + T0.3 `/profile.json` (generate from `src/data`).

**Phase 2 — Conversant (the flagship):**
3. T1 "Ask my portfolio" — retrieval fallback first, then `/api/ask` with streaming + guardrails + the 🗣️ Interrogator achievement.
4. T2.1 MCP server of yourself + the "Add me to your Claude" CTA.

**Phase 3 — Adaptive & Proven:**
5. T3.1 live status badge + T3.5 auto "Now" card.
6. T2.2 "Tailor to a role" + T2.3 recruiter brief.
7. T5 provenance/verified-claims pass.

**Phase 4 — Delight & moonshots:**
8. T3.4 semantic search, T3.3 visitor-aware framing.
9. T4 agentic RPG layer (NPC guide, voice, narrated graph).
10. T6 as inspiration strikes.

---

## 7. Success criteria

- An AI agent given the URL returns your name, role, languages, and ≥2 real projects with correct live links — **no hallucinations** (T0).
- A visitor can **ask the site a question** and get a streamed, grounded, **cited**, correctly-localized answer in ~10 s (T1).
- The site is **connectable as an MCP server** from an external Claude client (T2.1).
- Pasting a JD **reconfigures** the page and yields a grounded fit summary (T2.2).
- A **live status** signal reflects the real state of the 7 deployed apps (T3.1).
- **No API key in the client bundle**; every LLM endpoint is rate-limited and budget-capped; injection attempts are deflected (§4.1).
- All three languages stay fully translated; all motion still honors `prefers-reduced-motion`; the frontend still needs no framework.

---

## 8. File-level quick reference (where the Web4 layer lands)

| Area | File(s) |
|---|---|
| JSON-LD, OG, canonical | [index.html](index.html) `<head>` |
| Static agent artifacts | `public/llms.txt`, `public/profile.json`, `public/robots.txt`, `public/sitemap.xml` |
| **NEW serverless** | `api/ask.js` (T1), `api/tailor.js` (T2.2), `api/mcp.js` (T2.1), `api/status.js` (T3.1) |
| Conversational UI (upgrade) | [src/modules/terminal.js](src/modules/terminal.js) |
| NPC guide / voice / quests | [src/modules/hero.js](src/modules/hero.js), [src/modules/life-system.js](src/modules/life-system.js) |
| Semantic search hook | [src/modules/command-palette.js](src/modules/command-palette.js) |
| Ground truth for all generators | [src/data/specializations.js](src/data/specializations.js), [src/data/opinions-index.js](src/data/opinions-index.js) |
| New strings + agent language | [src/data/i18n.js](src/data/i18n.js), [src/lib/i18n.js](src/lib/i18n.js) |
| New achievements | [src/data/achievements.js](src/data/achievements.js), [src/lib/achievements.js](src/lib/achievements.js) |
| Wire-up | [src/modules/index.js](src/modules/index.js) (export), [src/main.js](src/main.js) (init) |
| Deploy config | [vercel.json](vercel.json) — confirm function deploy when `/api` lands |

> **Reminder for implementers:** keep the API key server-side; route all copy through `TRANSLATIONS`; make the agent answer in `currentLang`; gate motion on `prefers-reduced-motion`; generate `llms.txt`/`profile.json`/JSON-LD from `src/data` so they never drift; rate-limit and budget-cap every LLM endpoint.
