# MVM GROUP Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A new trilingual (en/la/zh) MVM GROUP website in the "Lai Kham — candlelight in a gold-lacquered sim" design, with a Three.js home scene, running on `localhost:4400`, built from the existing YAML content.

**Architecture:** Astro static site. Content is the old site's Decap YAML (copied into `content/`), loaded and localized by a port of the old `content.mjs`. Every page is real HTML; Three.js loads lazily on the home page only and is skipped for reduced-motion / no-WebGL2 visitors, who see a poster image.

**Tech Stack:** Astro 7.3.7, Tailwind CSS 4.3.3 (`@tailwindcss/vite`), three 0.186.1, gsap 3.15.0, lenis 1.3.26, js-yaml 5.4.3, marked 18.1.0, @astrojs/sitemap 3.7.4, Fontsource (self-hosted OFL fonts), Vitest 5.0.3, @playwright/test 1.64.0.

**Spec:** `design/DESIGN.md` (approved 2026-10-22). Visual reference: `design/moodboard/index.html`.

## Global Constraints

- Project root: `/Users/md/Desktop/MVMGROUP.LA/mvm-redesign/`. The old site (`../MVMGROUP.LA/`) is never modified.
- Dev server: `http://localhost:4400`. All versions pinned exactly (no `^`), each published ≥ 14 days before 2026-10-22.
- URLs identical to the old site: `/{en|la|zh}/…/` with trailing slash; root `/` redirects by saved choice → browser language → `en`.
- Colors only from DESIGN §5 tokens: `--lacquer #0E0B08`, `--lacquer-2 #16120D`, `--lacquer-3 #221B13`, `--gold #C9A45C`, `--gold-bright #E8D19A`, `--gold-deep #8C6A2E`, `--ivory #F3ECDD`, `--ivory-dim #B8AE9C`, `--vermilion #7A2318`. No per-business colors.
- Fonts: Cormorant (display), Marcellus (caps), Noto Serif Lao, Noto Sans Lao, Noto Sans, Noto Serif SC — all self-hosted. No request to any Google domain unless a GA4 ID is set in CMS.
- One pattern per focal point; lattice texture opacity 4–8%.
- Motion: 600–1200 ms, expo-out; everything static under `prefers-reduced-motion`.
- Quality targets: LCP < 2.5 s mobile, Lighthouse ≥ 90 all categories, 3D payload ≤ 1.5 MB, no horizontal scroll at 360 px.
- CC BY / CC BY-SA photos carry a visible credit; CC0 do not.
- Forms keep Netlify names and fields: `contact`, `quote`, `partnership`, honeypot `bot-field`.

## Decision recorded during planning

- **Renderer:** `WebGLRenderer` (WebGL 2), not `WebGPURenderer`. The scene is light (one lathe mesh, one shader plane, ~1.4k points), WebGL 2 runs in every target browser including in-app browsers, and the moodboard prototype already proves the GLSL shaders. WebGPU would force rewriting the shaders in TSL for no visible gain. Reported to the owner.

## Review Focus

1. A Lao or Chinese field left empty in the CMS shows the English text, never a blank → Task 2 test `localize falls back to en for empty strings and arrays`.
2. Phone without WebGL 2, or with reduced motion → home is fully readable with poster, no canvas, no console error → Task 4 test `home without 3D`.
3. Contact values still containing `XXXX` → no `tel:` / `wa.me` / WeChat links rendered → Task 3 test `placeholder contacts render no links`.
4. Long Lao/Chinese titles on a 360 px phone → no horizontal scroll on any page → Task 6 test `no horizontal overflow at 360px`.
5. Visitor in mainland China → built HTML/CSS references no Google host → Task 6 test `no google hosts in dist`.

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `netlify.toml`
- Copy: `../MVMGROUP.LA/content/` → `content/`; `../MVMGROUP.LA/public/{admin,brand,img,uploads}` → `public/`; `design/patterns/*.svg` → `public/patterns/`; `design/moodboard/img/{that-luang-sunrise,xt-black-gold-interior,xt-golden-wall,xt-door,xt-monks-yard,xt-evening-prayer}.jpg` → `public/img/lao/`

**Interfaces:**
- Produces: scripts `dev` (`astro dev --port 4400`), `build`, `preview` (`--port 4400`), `test` (vitest run), `e2e` (playwright test against `astro preview`).

- [ ] **Step 1:** `git init`, write `package.json` with the pinned versions above plus `@fontsource-variable/cormorant`, `@fontsource/marcellus`, `@fontsource-variable/noto-serif-lao`, `@fontsource-variable/noto-sans-lao`, `@fontsource-variable/noto-sans`, `@fontsource-variable/noto-serif-sc` (pinned, ≥ 14 days old). `npm install`.
- [ ] **Step 2:** `astro.config.mjs`: `site: 'https://www.mvmgroup.la'`, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`, `server.port: 4400`, sitemap integration with i18n `{ defaultLocale: 'en', locales: { en: 'en', la: 'lo', zh: 'zh-Hans' } }`, tailwind vite plugin.
- [ ] **Step 3:** `netlify.toml` from the old file with `command = "npm run build"`, `publish = "dist"`, same headers/redirects.
- [ ] **Step 4:** Run `npm run build` → exits 0. Run `npm run dev` → `curl -s -o /dev/null -w '%{http_code}' http://localhost:4400/` prints a 2xx/3xx code.
- [ ] **Step 5:** Commit `chore: scaffold Astro project`.

### Task 2: Content and i18n layer

**Files:**
- Create: `src/lib/content.ts` (port of old `content.mjs`, js-yaml from npm, content dir `content/`), `src/lib/i18n.ts` (copy of old `i18n.mjs`: `LOCALES`, `DEFAULT_LOCALE`, `localeInfo`, `url`, `t`, `formatDate`, `isoDate`), `src/lib/taxonomies.ts` (copy), `src/lib/markdown.ts` (`md`, `mdInline`, `plain` via marked), `src/lib/site.ts` (`getSite()` memoized `loadSite()`; `langPaths()` → `[{params:{lang}}]` ×3)
- Test: `tests/unit/content.test.ts`, `tests/unit/i18n.test.ts`

**Interfaces:**
- Produces: `localize(data, lang)`, `getSite(): { settings(l), home(l), about(l), legal(l), pages(l), services(l), units(l), brands(l), projects(l), news(l), team(l), tours(l) }`, `t(lang, key): string`, `url(lang, ...segments): string`, `type Lang = 'en'|'la'|'zh'`.

- [ ] **Step 1: Failing tests**
  - `localize falls back to en for empty strings and arrays`: `localize({en:{a:'A',b:['x']},la:{a:'',b:[]}},'la')` deep-equals `{a:'A',b:['x']}`.
  - `localize merges translated list items by index`: `localize({en:{r:[{t:'A',k:1}]},la:{r:[{t:'ກ'}]}},'la').r[0]` equals `{t:'ກ',k:1}`.
  - `services are sorted by order and drafts hidden`: `getSite().services('en')[0].slug === 'tour-travel'`; every item has `published !== false`.
  - `url builds trailing-slash paths`: `url('la','services','x') === '/la/services/x/'`, `url('en') === '/en/'`.
  - `t returns locale string with en fallback`: `t('la','nav.home') === 'ໜ້າຫຼັກ'`.
- [ ] **Step 2:** `npm test` → FAIL (modules missing).
- [ ] **Step 3:** Implement the five modules (logic identical to the old site's).
- [ ] **Step 4:** `npm test` → all PASS.
- [ ] **Step 5:** Commit `feat: content and i18n layer`.

### Task 3: Design system, base layout, header, footer

**Files:**
- Create: `src/styles/global.css` (tokens from Global Constraints, `@theme` mapping for Tailwind, font imports, base typography: Lao line-height 1.9, Chinese 1.8), `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/MobileMenu.astro`, `src/components/LangSwitch.astro`, `src/components/Footer.astro`, `src/components/QuickContact.astro`, `src/components/Seo.astro`, `src/components/SinhBand.astro`, `src/components/PageHero.astro`, `src/lib/contact.ts`, `src/scripts/smooth.ts` (Lenis init, skipped under reduced motion)
- Test: `tests/e2e/layout.spec.ts`, `tests/unit/contact.test.ts`

**Interfaces:**
- Consumes: Task 2 `getSite`, `t`, `url`, `localeInfo`.
- Produces: `<Base lang title description path={string[]} jsonLd? noindex?>` with `<slot/>`; `<PageHero lang title lead? trail? />`; `contactLinks(settings): {kind:'phone'|'whatsapp'|'wechat'|'email', href:string|null, label:string}[]` in `src/lib/contact.ts`, `isPlaceholder(v): boolean` (regex `/X{3,}|to be added|placeholder/i`).

Design: header is a thin lacquer bar with the gold emblem + "MVM GROUP" in Marcellus, nav in the page language, a pill language switch, one gold-outline CTA. Footer opens with `SinhBand`, four columns (group, services, brands, contact), photo credits line, legal links. Page heroes are lacquer with one `laikham-rosette` at low opacity and a gold hairline — no gables.

- [ ] **Step 1: Failing tests**
  - unit `placeholder contacts render no links`: for `{phone:'+856 20 XXXX XXXX', whatsapp:'+856 20 XXXX XXXX', wechat:'MVMGROUP-XXXX', email:'info@mvmgroup.la'}` → phone/whatsapp/wechat `href === null`, email `href === 'mailto:info@mvmgroup.la'`.
  - e2e `html lang per locale`: `/la/` has `<html lang="lo">`, `/zh/` has `lang="zh-Hans"`.
  - e2e `hreflang alternates`: `/en/about/` has 3 `link[rel=alternate][hreflang]` + `x-default`.
  - e2e `language switch keeps path`: on `/en/about/` the `ລາວ` link href is `/la/about/`.
  - e2e `skip link and single h1`: first focusable is the skip link; each page has exactly one `h1`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. `src/pages/[lang]/about/index.astro` stub with `PageHero` so the e2e has a target.
- [ ] **Step 4:** `npm test && npm run e2e -- layout` → PASS.
- [ ] **Step 5:** Commit `feat: design system and layout`.

### Task 4 (revised 2026-10-22): One-screen shell — 3D emblem stage, ring, dock, window

> Revised after owner feedback (DESIGN.md §4 revised): no long scrolling home, no stupa. Visual source of truth: `design/moodboard/main-screen.html` (approved prototype).

**Files:**
- Create: `src/layouts/Shell.astro` (replaces Base for every page), `src/components/stage/{TopBar,Ring,Dock,Window,WinFoot,Launch}.astro`, `src/scripts/three/{scene.ts,emblem.ts}` (keep `boot.ts`, `lacquerWall.ts`, `goldDust.ts`), `src/scripts/shell.ts` (ring layout, spokes, window open/close animation, external launch), `src/lib/rooms.ts`, `public/img/stage-poster.webp`, `public/uploads/brands/{big-elephant-logo,sophanua-logo}.png`
- Modify: `content/home.yml` rooms[3].link → `https://www.sophanua.online/`; `content/brands/*.yml` `logo` → uploaded files; `src/pages/[lang]/index.astro`
- Remove: `Header.astro`, `Footer.astro`, `QuickContact.astro` (their parts move into TopBar / Dock / WinFoot)
- Test: `tests/unit/rooms.test.ts`, `tests/e2e/shell.spec.ts` (replaces layout.spec)

**Interfaces:**
- `roomsFor(lang): Room[]` in `src/lib/rooms.ts`, `Room = { title, text, kindLabel, href, external: boolean, host?: string, icon: string, logo?: string }` — logo comes from the brand whose slug the link points to.
- `<Shell lang path title? description? jsonLd? photos? open?: boolean>` — `open` false only on `/{lang}/`; the slot is the window body.
- `<Window lang title eyebrow? icon? logo? trail?>` — head with app tile + title, body slot, `WinFoot` (legal links, credits, other languages).

Behaviour (from prototype): lacquer wall lit by the pointer + gold dust + gold MVM emblem extruded from `public/brand/logo-emblem.svg`; 8 rooms on an ellipse (desktop) / 4-column app grid (mobile < 760 px) with a dock (about · work · news · contact); brand rooms use the gilded frame; hover tilts the emblem toward the room and lights its spoke. Every room / menu link is a real URL; Astro `<ClientRouter />` swaps the window while the stage (`transition:persist`) keeps running. The window grows from the tapped tile (rect remembered in `sessionStorage`), body scrolls inside, closes via ✕ / Esc / backdrop → `/{lang}/`. External rooms play the launch zoom then navigate. Page itself never scrolls (`html, body { overflow: hidden }`). No WebGL2 / reduced motion → `stage-poster.webp` + static emblem `<img>`, everything else works.

- [ ] **Step 1: Failing tests**
  - unit `rooms resolve brand logos and external links`: `roomsFor('la')` has 8 items; `[0].href === '/la/services/tour-travel/'`; `[2].logo === '/uploads/brands/big-elephant-logo.png'`; `[3].external === true && [3].href === 'https://www.sophanua.online/' && [3].host === 'sophanua.online'`.
  - e2e `ring has 8 rooms`, `html lang per locale`, `hreflang alternates`, `language switch keeps path` (on `/en/services/tour-travel/` the ລາວ link is `/la/services/tour-travel/`), `deep link opens window` (`/la/services/tour-travel/` → `[data-window][open]` visible, its `h1` contains `ທ່ອງທ່ຽວ`, `[data-stage]` present), `close returns home` (click ✕ → URL `/la/`), `page never scrolls` (`document.scrollingElement.scrollHeight <= innerHeight + 1` on `/en/` and `/en/services/tour-travel/`), `3D ready on desktop`, `no 3D with reduced motion` (poster visible, no console errors), `mobile shows dock` (390×844: `[data-dock] a` count 4, all 8 rooms inside viewport).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement rooms.ts, Shell + stage components, scene (port prototype), shell.ts, home page; poster via `scripts/make-poster.mjs`.
- [ ] **Step 4:** `npm test && npx playwright test shell` → PASS; screenshots desktop 1440×900 and 390×844 match prototype.
- [ ] **Step 5:** Commit `feat: one-screen shell with 3D emblem stage`.

### Task 5: Window pages — about, group units, services, tours, brands

**Files:** `src/pages/[lang]/about/index.astro`, `group/[unit]/index.astro`, `services/index.astro`, `services/[service]/index.astro`, `services/[service]/[tour]/index.astro`, `brands/index.astro`, `brands/[brand]/index.astro`, `src/components/win/{Facts,Steps,Faq,QuickActions,Gallery,TourCard,ServiceCard,CardGrid}.astro`

Each page renders inside `<Shell open>` → `<Window>`. Content and fields mirror the old templates (`../MVMGROUP.LA/src/pages/{about,services,tours,brands}.mjs`); JSON-LD as on the old site. Window head shows the room's icon / brand logo; service and brand windows get the prototype's quick actions (quote · WhatsApp · call · share, links only when contacts are real) and info chips. Units with `status: planned` or an external link get no page.

- [ ] **Step 1: Failing test** `old routes exist (group/services/brands)`: every `index.html` under `../MVMGROUP.LA/preview/{en,la,zh}/{about,group,services,brands}/**` exists in `dist/`.
- [ ] **Step 2–4:** Run → FAIL; implement; run → PASS.
- [ ] **Step 5:** Commit `feat: about, services, tours and brand windows`.

### Task 6: Window pages — work, news, forms, legal, 404, root; quality pass

**Files:** `projects/{index,[project]/index}.astro`, `news/[...path].astro` (listing, `category/<key>/`, `page/<n>/`, 12 per page), `news/[article]/index.astro`, `{contact,quote,partnership,thank-you,privacy,terms}/index.astro`, `[lang]/404.astro`, `src/pages/404.astro`, `src/pages/index.astro` (root redirect, `localStorage 'mvm-lang'`), `public/robots.txt`, `src/components/forms/*`, `src/scripts/forms.ts`, `scripts/check-links.mjs`

Forms keep Netlify names/fields from `../MVMGROUP.LA/src/components/forms.mjs` (`data-netlify`, `netlify-honeypot="bot-field"`, action `/{lang}/thank-you/`); forms opt out of client routing (`data-astro-reload`) so Netlify receives a normal POST.

- [ ] **Step 1: Failing tests** `old routes exist (all)`, `netlify forms`, `no horizontal overflow at 360px` (windows on `/la/services/tour-travel/`, `/la/contact/`, `/zh/brands/big-elephant-yogurt/`), `no google hosts in dist`, `no broken internal links`.
- [ ] **Step 2–4:** Run → FAIL; implement; run all (`npm test && npm run build && npx playwright test && node scripts/check-links.mjs`) → PASS; Lighthouse mobile on `/en/`, `/la/services/tour-travel/`, `/zh/contact/`, fix to ≥ 90 where the 3D stage allows (record any category below 90 as a ruling with the reason).
- [ ] **Step 5:** Commit `feat: remaining windows and quality pass`.
