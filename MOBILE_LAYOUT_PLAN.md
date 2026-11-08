# MOBILE_LAYOUT_PLAN.md

**Project:** Shaikh Mohibur Rahman – Personal Portfolio  
**Derived from:** RESPONSIVE_AUDIT.md  
**Status:** Plan — implementation tracked in RESPONSIVE_IMPLEMENTATION_REPORT.md

---

## 1. Responsive system (applied globally)

### 1.1 Breakpoints (layout-driven, not device-labeled)

| Breakpoint | Max-width | Intended layout |
|---|---|---|
| — | ≥ 1241px | Desktop: 3–4 column grids, full container 1240px |
| tablet-lg | 1100px | Minor heading/grid tuning |
| tablet | 1024px | BuildOS sidebar rail hidden → 1 col; 2-col section heads stack |
| tablet-sm | 900px | Most 2-col → 1-col; 3-col → 2-col; hero metrics 3-col grid base |
| phablet | 700px | 4-col → 2-col; 3-col → 2-col; nav bar compact |
| mobile | 640px | Mockup/tablet galleries → 1 col; stacks tighten |
| mobile-xs | 460px | Remaining 2-col/3-col → 1 col; timelines stack |

### 1.2 Container system

- `.site-container`: `max-width: var(--container)` where `--container` is defined (= `--container-max`, 1240px). Fix: define `--container: 1240px` in `@theme` (currently undefined → containers full-bleed).
- Horizontal padding: `padding: 0 clamp(20px, 4vw, 48px)` — mobile gutters 20px, desktop 48px.
- Section padding: `padding: clamp(48px, 8vw, 64px) 0` (mobile-compact, desktop-breathing).
- Section head: stacks to 1 col at 1024px; eyebrow + title on top, sub below, full width.

### 1.3 Typography tokens

| Element | Mobile (≤640px) | Desktop | Approach |
|---|---|---|---|
| h1 (hero) | clamp(52px, 15vw, 82px) | clamp(56px, 10vw, 88px) | clamp with vw mid, capped max |
| h2 section | clamp(42px, 6vw, 64px) | same | clamp |
| Body p | clamp(15px, 1.2vw, 19px) | same | clamp, line-height 1.7, max-width ~62ch |
| Metadata | 8–11px mono | same | no smaller than 10px, line-height ≥ 1.5 |
| Headings never fixed-height containers | — | — | no `max-height` on text |

### 1.4 Spacing

- Section: compact mobile (48px–64px clamp), desktop 64–96px.
- Card padding: clamp(20px, 2.8vw, 32px).
- Grid gaps: clamp-based; never below 10px.
- Heading→description: 16–24px.
- Image→text: 14–24px.
- Nav: 14px mobile horizontal padding, 28px desktop.

---

## 2. Section-by-section target layouts

### A. Hero
- All viewports: single column (`grid-template-columns: minmax(0, 1fr)`). `.hero-art` hidden below 900px (already).
- Mobile: title clamp(52px, 15vw, 82px); CTA buttons stack full-width below 460px (already `max-[460px]:w-full`); lede max-width 62ch; identity stack wraps.
- Prevent fixed-header overlap: hero top padding ≥ nav height + 12px; scroll-margin-top on section = nav height + 24px.

### B. BuildOSHero (also fixes color-token breakage)
- Mobile: 1 col (copy + actions top, image below). Already `lg:grid-cols-2` → single col below 1024px.
- Buttons: stack `flex-wrap`; full width on phones.
- Fix: replace non-existent Tailwind v4 gray/amber/orange utility classes with defined CSS vars (add gray/amber/green/blue scale to `@theme`) so badge and CTA render correctly at every width.

### C. Capabilities
- Desktop: 2-col cards. Mobile (≤900px): 1 col.
- Remove absolute `.cap-num` overlap risk: reposition number inline above title (document-flow) or cap card `min-height` so number never covers text. Decision: move `.cap-num` out of absolute positioning into normal flow above the title; keep visual style.
- Remove `min-height`-driven empty card space (none currently; `.cap-card` has no min-height — OK).
- `.cap-tags` are `display: none`: unhide tags on all widths or remove markup. Decision: unhide (content should not be invisible).

### D. Ai-native
- Desktop: 2-col panel. Mobile: 1 col (already at 900px).
- Pipeline: single column of steps on mobile; avoid 2-col compressed variant between 700–900px → make 1 col at 900px already (adjust media query).
- `.ai-copy h3` max-width 14ch → keep; fits mobile.

### E. Selected projects (Builds)
- Desktop: 12-col grid, cards span 7/5 (keep).
- Tablet (≤900px): 2 equal cols (already span 6).
- Mobile (≤700px): 1 col full width (already).
- Fix: remove `work-desc` `max-width: 44ch` in narrow cards (causes narrow strips); let it fill card width. Tech badges wrap (already `flex-wrap`).

### F. BuildOS problem & discovery
- Desktop: keep multi-col grids.
- Tablet (≤700px): 2-col for evidence/observations/personas.
- Mobile (≤460px): 1 col for content-heavy cards; 2-col only for compact numeric summaries that stay readable.
- Evidence cards `.bo-grid-3` → override at 640px (1 col) instead of waiting for 460px.
- Observations `.bo-grid-3` → same.
- Personas `.bo-grid-3` → same.
- Tables/code: keep `overflow-x: auto` containers (contained scroll, allowed).

### G. Architecture
- Desktop: layers with 2-col node grids; expandable `<details>` rows.
- Tablet (≤700px): node grids 1 col; `bo-flow-row`, `bo-path-step`, `bo-roadmap-group` 1 col (already).
- Mobile: `bo-node-body` definition lists 1 col (already at 700px).
- Table scroll: `.bo-table-wrap overflow-x: auto` — contained; table `min-width: 660px` kept.
- Code block: `.bo-code overflow-x: auto` — contained.

### H. Challenges
- Accordion rows full-width (Radix accordion, block by default — OK).
- Mobile: expanded content inside card, not clipped (no fixed heights on content).

### I. Security
- Desktop: 2-col domain cards.
- Mobile (≤700px): 1 col (`bo-grid-2` already → 1 col at 700px).
- Badges inline, do not push content out (`flex: 0 0 auto` already).

### J. Discipline & metrics
- Stats: 4-col → 2-col at 700px → 1 col at 460px (already).
- Cadence chart: flex row with `height: 150px` → reduce height on mobile, bars scale.
- Sample commits: `.bo-code` horizontal scroll contained.

### K. Deployment
- Table inside `bo-table-wrap overflow-x: auto` — contained horizontal scroll only within component (allowed).
- Grid-2 constraints/gates → 1 col at 700px (already).

### L. Forward deployed (FDE)
- Quote full width; path steps 1 col at 700px (already); roadmap groups 1 col at 700px (already). No empty side columns on mobile.

### M. Outcomes & roadmap
- Outcomes: 2-col → 1 col at 700px (already).
- Roadmap: horizon groups 1 col at 700px (already).

### N. Ventures & MeSure
- Tabs: `overflow-x: auto` contained scroll (OK).
- Video: `aspect-ratio: 16/9`, `max-width 640px`, scales down — controls usable.
- Evidence grid 2-col → 1 col at 460px; move to 1 col at 640px for comfort.
- Metrics 3-col → 2 col at 900px → 1 col at 460px; add 1-col at 640px.
- Certificate strip: horizontal scroll contained; captions visible; lightbox for full inspection.

### O. Momentum, technology, skills
- Timeline log rows: at ≤640px stack index/badge/title into one column, description full width below (fixes narrow strips).
- Tech stack pills wrap; no min-width tags.
- No invented skill percentages (none exist).

### P. About & profile
- Desktop: asymmetric 2-col (portrait sticky).
- Mobile (≤900px): 1 col, portrait static above bio, `max-width: 420px`, `object-fit: cover`, sticky disabled.
- Portrait not covered by header: static flow below header; scroll-margin-top applies to section.
- Biography readable: `max-width: 62ch`, line-height 1.8.

### Q. Recognition & certificates
- Gallery: 3-col → 2-col at 700px → 1 col at 460px; add 1-col at 640px for comfort.
- `object-fit: contain` preserves ratios; no stretching.
- Captions + badge visible on every card.
- Lightbox: dialog `max-w min(1100px,95vw)`, `max-h 72vh`, keyboard arrows, close button — touch/keyboard usable.

### R. Contact & footer
- Mobile: 1 col; CTA buttons full width (already `max-[460px]:w-full`).
- Long email/metadata wrap safely (`overflow-wrap` on contact values).
- Footer columns stack; spacing preserved.

---

## 3. Component changes

| Component | Change |
|---|---|
| `ResponsiveContainer` (new, CSS class `.site-container`) | Define `--container` token; consistent padding/max-width |
| `.section` | Responsive padding clamp |
| `.site-nav` / mobile menu | Add `max-h-[100svh] overflow-y-auto` safeguard; menu stays below header height |
| `SectionReveal` | Grace-period visibility so content never stays hidden if observer misses |
| `BuildOSMobileMockup` | Already canonical; keep (250×510 desktop, scales at 900/640px) |
| `MediaLightbox` | Already dialog-based with keyboard + close; keep |
| Images above fold (About portrait) | `loading="eager"`; add width/height attributes to limit CLS |

---

## 4. Removal of responsive blockers

- Delete/neutralize `--container` undefined bug.
- `log-row`: 1-col stack at ≤640px.
- `process-grid`: 1-col at ≤640px; remove `process-card min-height: 176px` (content grows).
- `bo-cap-card`: remove `min-height: 200px`.
- `work-desc`: drop `max-width: 44ch`.
- `rec-additional`, `bo-gallery`, `venture-metrics`, `evidence-grid`: 1 col at 640px.
- `bo-grid-3` evidence/observations/personas: 1 col at 640px.
- `body { overflow-x: hidden }`: keep as backstop, but fix sources instead.

---

## 5. Animation / performance

- `prefers-reduced-motion`: already handled in SectionReveal, Lenis fallback, BuildOS chapters — keep; extend to mockup hover (`whileHover` already gated on `reduceMotion`).
- CLS: `img { max-width: 100% }` global; add explicit width/height on portrait + BuildOS logo; mockup frames reserve space via CSS variables.
- Lazy-load below-fold media (BuildOS screenshots, certs, videos) — already `loading="lazy"`; hero eager.
- No content hidden behind animations: SectionReveal grace period (see above).
