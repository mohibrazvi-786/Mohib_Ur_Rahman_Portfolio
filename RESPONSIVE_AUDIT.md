# RESPONSIVE_AUDIT.md

**Project:** Shaikh Mohibur Rahman – Personal Portfolio  
**Auditor:** Kilo (senior frontend architect / responsive-design specialist)  
**Stack:** React 19, Vite, Tailwind CSS v4, framer-motion, lenis, gsap, shadcn/ui (Radix primitives)  
**Entry:** `index.html` → `src/main.tsx` → `src/App.tsx` (single-page, anchor-navigated sections)  
**Status:** Audit complete — implementation in `RESPONSIVE_IMPLEMENTATION_REPORT.md`

---

## 1. Codebase overview

| Area | Files | Notes |
|---|---|---|
| App shell | `src/App.tsx`, `src/store.ts`, `src/index.css` | Lenis smooth scroll, GSAP ScrollTrigger, IntersectionObserver section tracking, Zustand store (loaded/activeSection/scrollProgress) |
| Global styles | `src/index.css` (4,467 lines) | Design tokens in `@theme`, shared component layer, responsive block (media queries at 1100/1024/900/700/640/460px), animations, reduced-motion |
| Navigation | `src/components/Navbar.tsx` | Fixed header, mobile overlay menu, Escape key, body scroll lock, Lenis scrollTo with -88px offset |
| Sections (14) | `src/sections/*.tsx` | Hero, BuildOSHero, Capabilities, AiNative, Builds, BuildOS, Ventures, Timeline, Leadership, TechStack, About, Recognition, HowIWork, Contact |
| Footer | `src/components/Footer.tsx` | Two-column top, bottom strip |
| UI primitives | `src/components/ui/` | button, badge, card, accordion, tabs, dialog, tooltip (Radix) |
| Components | Loader, MediaLightbox, BuildOSMobileMockup, SectionReveal | BuildOSMobileMockup = canonical 250×510 device frame component |
| Data | `src/data/content.ts`, `src/data/buildos.ts` | All text, metrics, case-study content |
| Assets | `public/assets/` | BuildOS screenshots (7), certificates (13), portrait, logo, video |
| Unused/dead | `src/scenes/` (Three.js), `src/components/Cursor.tsx`, `ResponsiveTester.tsx` | Not imported by App.tsx |

Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` — present and correct.

---

## 2. Audit method

Every file listed above was read in full. Layout classes were traced against the media-query block at the end of `src/index.css` (breakpoints 1100px, 1024px, 900px, 700px, 640px, 460px). Required test viewports per the brief include 320px–2560px widths, including 320 × 568 (very small phone) and 844 × 390 (mobile landscape), which are NOT covered by any existing media query.

---

## 3. Issues found — grouped by phase

### 3.1 Global foundation (Phase Two)

| # | Section/component | Root cause | Files | Severity |
|---|---|---|---|---|
| G1 | All layout containers | `--container` is referenced in `.site-container` (`max-width: var(--container)`) but only `--container-max: 1240px` is defined in `@theme`. Undefined CSS var → invalid declaration → containers have NO max-width; on desktop content spans full viewport width with unreadably long lines. | `src/index.css:239`, `:93` | High |
| G2 | Section padding | `.section` uses fixed `padding: var(--space-xl) 0` (64px top/bottom at every breakpoint). Excessive on 320–430px phones; consumes ~12% of viewport height per section. | `src/index.css:246` | Medium |
| G3 | Typography containers | Headings use `text-wrap: balance` and `clamp()` — good. Body `p { font-size: clamp(15px, 1.2vw, 19px) }` — at 320px, 1.2vw = 3.8px → clamped to 15px, acceptable. Line length is not constrained on mobile sections without `.site-container` width caps (e.g. full-bleed sections read edge-to-edge). | `src/index.css:144-150` | Low |
| G4 | Horizontal overflow guard | `body { overflow-x: hidden }` masks overflow rather than fixing causes. No audit of individual overflow sources. | `src/index.css:109` | Medium |
| G5 | Box-sizing | `box-sizing: border-box` universal — correct. | `src/index.css:92` | OK |
| G6 | Viewport units | `min-height: 100svh` on hero — good for mobile address bars. | `src/index.css:580` | OK |

### 3.2 Header & navigation (Phase Three)

| # | Component | Root cause | Files | Severity |
|---|---|---|---|---|
| H1 | Sticky header vs headings | `.section { scroll-margin-top: calc(var(--nav-height) + var(--space-md)) }` = 88px fixed. Navbar height changes 64px → 58px when scrolled (`data-scrolled`) but CSS var stays 64px. 88px margin slightly overshoots; acceptable, not broken. BuildOS chapters use their own `scroll-margin-top: 104px` / 150px (<1024px). Navbar `goTo` uses hard offset -88px. Consistent enough. | `src/index.css:247`, `src/components/Navbar.tsx:33`, `src/App.tsx:67` | Low |
| H2 | Mobile menu overflow | `.mobile-menu` is `position: fixed; inset: 0` with 5 links at `clamp(30px, 8vw, 48px)` plus footer row. On very short viewports (320 × 568) the menu is vertically centered with `justify-content: center` — fits, but no `overflow-y: auto` safeguard if font metrics grow or more links are added. | `src/index.css:521-531`, `src/components/Navbar.tsx:131-169` | Low |
| H3 | Menu close / escape / lock | Implemented: Escape handler, `document.body.style.overflow = mobileOpen ? 'hidden' : ''`, links call `setMobileOpen(false)`. Working. | `src/components/Navbar.tsx:49-59` | OK |
| H4 | Duplicate navigation | Footer has its own nav links (intentional, distinct context). No conflict. | `src/components/Footer.tsx` | OK |
| H5 | Header z-index vs menu | Header z-index 80, mobile menu z-index 70; menu paints full-bleed below header level via 100px top padding — visually intentional. | `src/index.css:366-371,521` | OK |

### 3.3 Section-by-section (Phase Four)

| # | Section | Issue | Reproduction viewport | Root cause | Files | Severity |
|---|---|---|---|---|---|---|
| S1 | Hero | `hero-grid` already single column; `.hero-art` hidden below 900px. Hero title `clamp(56px, 10vw, 88px)` → 56px at 320px (10vw = 32px → clamped up). Metrics `<dl>` has NO base grid definition (only inside `@media (max-width: 900px)` and 700px) — stacks vertically on desktop; fine but undocumented. | 320–430px | None critical; title large but wraps. | `src/sections/Hero.tsx`, `src/index.css:3430` | Low |
| S2 | BuildOSHero | Uses arbitrary Tailwind color classes that Tailwind v4 does NOT generate (`text-gray-300/400/500`, `bg-gray-700/800`, `text-gray-500`, `border-gray-700`, `bg-gradient-to-r from-amber-500 to-orange-500`, `text-black`). Result: badge/button colors collapse (black text on dark background = unreadable CTA). This is a branding/legibility break at ALL widths, not just mobile. | All | `src/sections/BuildOSHero.tsx:18-77` | High |
| S3 | Capabilities | `.cap-grid` `repeat(2, minmax(0,1fr))` → 1 col at 900px. `.cap-card` has `padding: clamp(28px,4vw,48px)` and absolute `.cap-num` (72–100px) at top-right. On 320–460px the 100px number overlaps the card's padded content area (absolute overlay on short cards). Tags (`cap-tags`) are `display: none` — rendered content hidden. | 320–460px | Absolute decorative number not pushed into layout; card min content height not enforced. | `src/sections/Capabilities.tsx`, `src/index.css:696-754` | Medium |
| S4 | AiNative | `.ai-panel` 2-col grid → 1 col at 900px. `.ai-pipeline` becomes a 2-column grid between 700–900px (odd but fits), 1 col at 700px. `.ai-copy h3` `max-width: 14ch` — at 320px (≈260px content) 14ch ≈ 224px — fits but tight. | 320–768px | None critical. | `src/sections/AiNative.tsx`, `src/index.css:758-833` | Low |
| S5 | Builds | `.work-grid` is a 12-col grid with cards spanning 7/5. At 900px all cards span 6; at 700px full width. Between 700–900px two narrow cards (~215px each at 768px) — descriptions wrap into narrow strips. `.work-desc` has `max-width: 44ch` — inside a 215px card (≈24 chars at 13px) the max-width forces the paragraph into an even narrower column. | 430–768px | Fixed 12-col grid + `max-width: 44ch` on descriptions in narrow cards. | `src/sections/Builds.tsx`, `src/index.css:837-1033` | Medium |
| S6 | BuildOS case study | 12 chapters; `.bo-layout` (sidebar rail + body) collapses to 1 col at 1024px and rail hidden. `.bo-grid-3` (3-col evidence/observations/personas) → 2 col at 700px → 1 col at 460px. Between 460–700px 3-col cards are ~110px wide — observation text wraps into vertical strips. `.bo-table` `min-width: 660px` inside `overflow-x: auto` — contained scroll, OK per rules. `.bo-code` `white-space: nowrap` inside `overflow-x: auto` — contained, OK. `.bo-mockup-gallery` 3-col → 2 col at 900px → 1 col at 640px with canonical mockup component — good. `.bo-evolution` 4-col → 2 col at 700px → 1 col at 460px. `.bo-stats` 4-col → 2 col at 700px → 1 col at 460px. `.bo-flow-row` 3-col → 1 col at 700px. `.bo-node-body`/`bo-path-step`/`bo-roadmap-group` 2-col → 1 col at 700px. `.bo-summary` 3-col → 2 col at 700px → 1 col at 460px. | 320–460px | Three-column evidence/observation cards below 700px are too narrow for paragraph text. | `src/sections/BuildOS.tsx`, `src/index.css:1981-3226` | High |
| S7 | Ventures | Tabs use `overflow-x: auto` (contained). `venture-video` `aspect-ratio: 16/9`, `width: min(100%,640px)` — usable at 320px. `evidence-grid` 2-col → 1 col at 460px. `venture-metrics` 3-col → 2 col at 900px → 1 col at 460px. Cert-strip horizontal scroll (contained). | 320–430px | None critical. | `src/sections/Ventures.tsx`, `src/index.css:1629-1932` | Low |
| S8 | Timeline (execution log) | `.log-row` grid: `36px 120px minmax(0,0.9fr) minmax(0,1.5fr)` — fixed 156px for index+badge on all widths. Override at 900px collapses title/desc into column 2 but index/badge remain fixed 156px. On 320px (content ≈ 280px) title/description get ~120px — narrow vertical strips. | 320–430px | Fixed first two columns in a 4-column grid with no narrower override. | `src/sections/Timeline.tsx`, `src/index.css:1037-1076` | High |
| S9 | Leadership | `.lead-grid` repeat(2) → 1 col at 900px. `.lead-stats` repeat(3) → 2 col at 700px → 1 col at 460px. `.lead-cert` 96px image + text — fine. | 320–460px | None critical. | `src/sections/Leadership.tsx`, `src/index.css:1080-1175` | Low |
| S10 | TechStack | `.stack-grid` repeat(3) → repeat(2) at 900px AND 700px → 1 col at 460px. Pills wrap. Value labels are short tech names — fine. | 320–460px | None critical. | `src/sections/TechStack.tsx`, `src/index.css:1179-1209` | Low |
| S11 | About | `.about-grid` 2-col → 1 col at 900px; portrait becomes static, `max-width: 420px` (aspect-ratio 3/4 → ~560px tall on mobile — tall but intentional portrait). Sticky portrait top offset `calc(var(--nav-height) + var(--space-lg))` = 104px desktop only. Biography `max-width: 64ch` — edge-to-edge on 320px phones without container cap (container padding applies). | 320–430px | None critical. | `src/sections/About.tsx`, `src/index.css:1213-1329` | Low |
| S12 | Recognition | `.rec-grid` repeat(3) → repeat(2) at 700px → 1 col at 460px. `.rec-additional` repeat(4) → repeat(3) at 1100px → repeat(2) at 460px. `rec-media` aspect-ratio 4/3 with `object-fit: contain` — ratios preserved. Captions visible. Lightbox dialog `max-w-[min(1100px,95vw)]` works on mobile; keyboard arrows present. | 320–460px | None critical. | `src/sections/Recognition.tsx`, `src/index.css:1333-1413` | Low |
| S13 | HowIWork | `.process-grid` repeat(4) → repeat(2) at 900px AND 700px → repeat(2) at 460px?? No override at 460px — stays 2-col; cards `min-height: 176px` with fixed `padding: 24px` — `process-desc` `max-width: 26ch` — inside a ~130px card at 320px (2-col), text wraps into a narrow strip. | 320–430px | No 1-col override at 460px; fixed min-height + max-width desc in narrow card. | `src/sections/HowIWork.tsx`, `src/index.css:1417-1470` | Medium |
| S14 | Contact | `.contact-grid` 2-col → 1 col at 900px. `.contact-title` `clamp(48px, 8vw, 100px)` → 48px at 320px. Contact items `justify-content: space-between` — long email (`shaikhmohibsm@gmail.com`, 23 chars in mono 11px ≈ 110px) fits; "AI / ML · Product · DeepTech · Founder's office" wraps. Buttons `max-[460px]:w-full`. | 320–430px | None critical. | `src/sections/Contact.tsx`, `src/index.css:1474-1553` | Low |
| S15 | Footer | `.footer-top` 2-col → 1 col at 900px. `.footer-links` `justify-content: flex-end` → start at 900px. Bottom row wraps. | 320–430px | None critical. | `src/components/Footer.tsx`, `src/index.css:1556-1618` | Low |

### 3.4 Responsive blockers (Phase Five)

| # | Blocker | Detail | Files |
|---|---|---|---|
| B1 | Multi-column too narrow on mobile | `.bo-grid-3`, `.log-row`, `.process-grid` (2-col at 320px) | `src/index.css`, `src/sections/BuildOS.tsx`, `src/sections/Timeline.tsx`, `src/sections/HowIWork.tsx` |
| B2 | Fixed-width cards | `.work-card` `min-height: 220px`; `.process-card` `min-height: 176px`; `.bo-cap-card` `min-height: 200px` | `src/index.css:954,1428,3984` |
| B3 | Unnecessary min-widths | `.bo-table` `min-width: 660px` (contained in scroll wrapper — acceptable), `.cert-item` `flex: 0 0 180px` | `src/index.css:2837,1934` |
| B4 | Narrow vertical strips | Timeline title/desc; work desc in 2-col cards | `src/sections/Timeline.tsx`, `src/sections/Builds.tsx` |
| B5 | Horizontal overflow in code | `.bo-code` nowrap — contained; `.bo-table` — contained | `src/index.css:3079,2829` — OK |
| B6 | Unused mobile space | BuildOS rail pattern already collapses at 1024px | OK |
| B7 | Fixed elements overlapping content | None found beyond header (handled via scroll-margin) | OK |
| B8 | Sticky header overlap | Covered by H1 | OK |
| B9 | Inconsistent image/video sizing | BuildOS screenshots use canonical mockup; video aspect-ratio 16/9; certs contain | OK |
| B10 | Inconsistent card heights | min-height cards listed in B2 | — |
| B11 | Blank sections | Loader covers screen for 1.2s (`setLoaded(true)`); SectionReveal renders children with `opacity: 0` until IntersectionObserver fires — if JS/observer fails, sections stay invisible. No skeleton/fallback. | `src/App.tsx:62`, `src/components/SectionReveal.tsx` |
| B12 | Delayed/missing content | Same as B11; hero uses motion delays but no lazy loading (good) | — |
| B13 | Tiny metadata | 8px–10px mono labels throughout — small but readable; line-height adequate | `src/index.css` |
| B14 | Tap targets | Nav links 9px→12px padding; mobile menu links large; CTA buttons min 44px via Button px-6 py-3.5 | Mostly OK |
| B15 | Decorative vs text | `.cap-num` absolute overlay (S3) | `src/index.css:719-730` |

### 3.6 Netlify badge investigation

Searched the entire repository for "Netlify". No occurrence in `src/`, `public/`, `index.html`, or config files. Only references are in documentation/skills outside the project. **Conclusion:** no "Powered by Netlify" badge is injected by this codebase; nothing to remove. If one appeared in a deployed preview it would come from hosting tooling outside this repo (deployment not authorized anyway).

### 3.7 Blank screen investigation (01:43–01:48)

Likely causes in code:
1. `Loader` covers the viewport for 1.2s, then fades out — intentional loading state, not blank.
2. `SectionReveal` mounts children with `opacity: 0` and only animates to `opacity: 1` when `useInView` fires. If the IntersectionObserver never fires (e.g., observer options, JS error, reduced-motion path sets `initial = false` so it's safe there), sections remain invisible. Root: reliance on intersection observer with no fallback visibility.
3. `html { scroll-behavior: auto }` + Lenis — scroll driven by lenis raf; if lenis fails, native scroll still works (scroll event listener fallback in reduce-motion path only).

Correction: make SectionReveal children visible by default when the observer has not fired within a grace period, or at minimum avoid `opacity: 0` hidden state persisting. See implementation plan.

---

## 4. Files responsible (audit inventory)

- `src/index.css` — global tokens, all layout CSS, media queries (primary fix target)
- `src/sections/Hero.tsx` — hero metrics markup
- `src/sections/BuildOSHero.tsx` — broken color classes
- `src/sections/Capabilities.tsx` — cap cards
- `src/sections/AiNative.tsx` — ai panel
- `src/sections/Builds.tsx` — work grid/cards
- `src/sections/BuildOS.tsx` — case study chapters
- `src/sections/Ventures.tsx` — ventures tabs/cases
- `src/sections/Timeline.tsx` — log rows
- `src/sections/Leadership.tsx` — lead cards/stats
- `src/sections/TechStack.tsx` — stack grid
- `src/sections/About.tsx` — portrait grid
- `src/sections/Recognition.tsx` — certificate gallery
- `src/sections/Contact.tsx` — contact grid
- `src/components/Footer.tsx` — footer
- `src/components/Navbar.tsx` — header/mobile menu
- `src/components/SectionReveal.tsx` — reveal visibility logic
- `src/components/MediaLightbox.tsx` — lightbox dialog
- `src/components/BuildOSMobileMockup.tsx` — canonical mockup (already good)
