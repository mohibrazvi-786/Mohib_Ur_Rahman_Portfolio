# COMPONENT_AUDIT_V3.md

**Project:** Shaikh Mohibur Rahman Portfolio — V3 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Principal Frontend Engineer / shadcn/ui Specialist)

---

## 1. shadcn/ui COMPONENT INVENTORY

### Installed Components

| Component | File | Status | Design Direction Fit |
|-----------|------|--------|---------------------|
| Button | `src/components/ui/button.tsx` | ✅ | Keep. Primary (accent), Outline (border), Ghost (text). Remove gradient classes. |
| Badge | `src/components/ui/badge.tsx` | ⚠️ | Restrict to status indicators only. Remove from skills/tags/categories. |
| Card | `src/components/ui/card.tsx` | ✅ | Keep. Border + surface only, no shadows unless elevated. |
| Accordion | `src/components/ui/accordion.tsx` | ✅ | Keep for Challenges. Border-separated, no background panels. |
| Dialog | `src/components/ui/dialog.tsx` | ✅ | Keep for MediaLightbox. Backdrop blur, rounded. |
| Tabs | `src/components/ui/tabs.tsx` | ✅ | Keep for Ventures. Simple underline indicator. |
| Tooltip | `src/components/ui/tooltip.tsx` | ✅ | Keep. Minimal, dark theme. |

### Missing Components (Not Needed)

| Component | Status | Reason |
|-----------|--------|--------|
| Sheet | ❌ | Not needed. Mobile menu already implemented. |
| Carousel | ⚠️ | Consider for BuildOS mobile mockup gallery on mobile. |
| Separator | ⚠️ | Use sparingly between section content blocks. |
| Table | ❌ | Avoid. Admin dashboard look. Use cards or definition lists. |
| Form | ❌ | Not needed — no backend. mailto: for contact. |
| Input | ❌ | Not needed. |
| Textarea | ❌ | Not needed. |
| Sonner | ❌ | Not needed. |
| Skeleton | ❌ | Not needed. |

---

## 2. CUSTOM COMPONENT AUDIT

### SectionReveal (`src/components/SectionReveal.tsx`)

| Property | Assessment |
|----------|------------|
| Purpose | Scroll-triggered reveal wrapper with framer-motion |
| Issues | Applied uniformly to every section → identical composition syndrome |
| Fix | Keep component but use selectively. Not every section needs reveal animation. |
| Recommendation | Use SectionReveal only for sections entering viewport for the first time. Hero and already-visible sections should not use it. |

### Navbar (`src/components/Navbar.tsx`)

| Property | Assessment |
|----------|------------|
| Purpose | Fixed primary navigation with mobile menu |
| Issues | Offset mismatch (76px vs 88px), scrolled state styling minimal |
| Fix | Unify `--nav-height` CSS variable. Ensure scroll-margin-top matches. |
| Recommendation | Simplify mobile menu. Remove availability chip if it competes with hero. |

### Footer (`src/components/Footer.tsx`)

| Property | Assessment |
|----------|------------|
| Purpose | Restrained footer with name, role, links, copyright |
| Issues | Generally acceptable but could be more editorial |
| Fix | Keep minimal. Ensure links align with Navbar. |
| Recommendation | Add back-to-top control as specified. |

### MediaLightbox (`src/components/MediaLightbox.tsx`)

| Property | Assessment |
|----------|------------|
| Purpose | Dialog-based image lightbox with keyboard nav |
| Issues | None significant. Works well. |
| Fix | Keep. Ensure `object-fit: contain` for all images. |
| Recommendation | Add caption below image outside modal for accessibility. |

### BuildOSMobileMockup (`src/components/BuildOSMobileMockup.tsx`)

| Property | Assessment |
|----------|------------|
| Purpose | Canonical mobile device mockup for BuildOS screenshots |
| Issues | New component. Must be used for ALL 7 screenshots identically. |
| Fix | Ensure canonical dimensions (250×510 desktop) are enforced. |
| Recommendation | Add `object-fit: contain` enforcement. No screenshot outside this component. |

---

## 3. SECTION COMPONENT AUDIT

### Hero (`src/sections/Hero.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| ConnectedSystemGraphic is generic decorative SVG | High | Replace with personal identity: headline "I build products that solve real-world problems" |
| Hero metrics use mixed digit formatting | Medium | Normalize formatting, consistent styling |
| Uses gradient button classes inline | Medium | Use shadcn Button variants only |
| Max-width 680px on heading (good) | — | Keep |

### BuildOSHero (`src/sections/BuildOSHero.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| Duplicates metrics from BuildOS section | High | Consolidate to condensed hero only |
| Uses inline gradient classes | Medium | Use shadcn Button variants |
| Status badge with green/amber colors | Medium | Reduce badge usage, more typographic |

### BuildOS (`src/sections/BuildOS.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| 906 lines, 12 chapters — documentation style | High | Restructure to product-first, progressive disclosure |
| Screenshots at chapter 5, buried deep | Critical | Move to chapter 4, immediately after product intro |
| `bo-cap-card` identical cards with pill badges | High | Replace with intentional capability groupings |
| Architecture uses `<details>` + `<table>` | High | Replace with simplified node diagram |
| Security uses repeated pill badges | Medium | Visual principle cards instead |
| Deployment uses admin table | High | Milestone cards, stacked mobile |
| Roadmap narrow labels | Medium | 3-col editorial timeline |
| Challenges use identical accordion rows | Medium | Editorial story format |

### Capabilities (`src/components/Capabilities.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| 4 identical `cap-card` articles with badge tags | High | Editorial layout: 4 quadrants or typographic statements |
| Badge tags overflow on mobile | Medium | Replace tags with inline text labels |

### AiNative (`src/components/AiNative.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `ai-panel` looks like dashboard | Medium | Editorial layout: copy left, pipeline right |
| Pipeline steps are small motion divs | Low | Keep but larger, more readable |

### Builds (`src/components/Builds.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `work-grid` with identical `work-card` articles | High | Editorial project cards with imagery, not badge grids |
| `buildos-feature` uses chip row | Medium | Typographic metrics instead |
| GitHub search links (not direct repos) | Low | Keep but style as text links |

### Timeline (`src/components/Timeline.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `log-row` looks like data table | Medium | Visual journey with connected nodes |
| Badge tags are 8px, hard to read | High | Larger category labels |

### Leadership (`src/components/Leadership.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `lead-card` identical cards with `lead-stats` | Medium | Editorial composition: larger headline, selective stats |
| Certificate images in small cards | Medium | Larger containers, `object-fit: contain` |

### TechStack (`src/components/TechStack.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| Every skill as a badge (tag cloud) | Critical | Curated technology map, grouped categories |
| `stack-card` with `stack-pills` | High | Replace with category cards + inline tech lists |
| No proficiency scores (good) | — | Keep — do not add |

### About (`src/components/About.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `about-grid` two-column is acceptable | — | Keep asymmetric composition |
| Portrait in `about-frame` is acceptable | — | Keep natural proportions |
| Builder flow pills are small | Medium | Larger, more readable |

### Recognition (`src/components/Recognition.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| Certificate images compressed in grid | High | Consistent containers, larger, `object-fit: contain` |
| `rec-card` buttons with badge overlays | Medium | Simpler card design |
| Wall of tiny images risk | High | Prioritize featured, make additional smaller |

### HowIWork (`src/components/HowIWork.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `process-card` identical cards | Medium | Editorial flow: connected steps, larger type |
| `STEP XX` micro-labels | Medium | Larger step numbers |

### Contact (`src/components/Contact.tsx`)

| Issue | Severity | Fix |
|-------|----------|-----|
| `contact-grid` two-column is acceptable | — | Keep, align heading and CTA |
| `contact-panel` looks like info card | Medium | Simpler contact details layout |
| Email publicly displayed | By design | Keep — intentionally public |

---

## 4. DATA FILE AUDIT

### `src/data/content.ts`

| Property | Assessment |
|----------|------------|
| `meta` | Complete. Email and location intentionally public. |
| `hero` | Metrics have mixed formatting (some with `\n`, some without). |
| `capabilities` | 4 capabilities with tag arrays — too many tags. |
| `aiNative` | Good copy. Pipeline array is clean. |
| `builds` | 4 projects with GitHub search links (not direct). |
| `ventures` | 4 ventures with detailed data. Good. |
| `timeline` | 8 entries with tags. Good. |
| `leadership` | 2 entries with stats arrays. Good. |
| `techStack` | 6 categories with skill arrays. Too many skills as badges. |
| `recognition` | Featured + additional. Good separation. |
| `about` | 3 paragraphs, flow array. Good. |
| `howIWork` | 7 steps. Good. |
| `contact` | Tag, headline, body. Good. |

### `src/data/buildos.ts`

| Property | Assessment |
|----------|------------|
| `meta` | Complete. Honest about MVP status. Good. |
| `summary` | 6 items with values/notes. Good but value formatting inconsistent. |
| `chapters` | 12 chapters. Too many for a portfolio case study. |
| `problem` | Excellent copy. Real-world problem well-described. |
| `discovery` | Good. Caveat about pilot interest not being deployment proof. |
| `product` | Good. Evolution, personas, modules, boundaries. |
| `architecture` | Too detailed. Database table names, API routes, ORM specifics. |
| `ecosystem` | 4 surfaces + 7 screenshots. Screenshots need mockup wrapping. |
| `challenges` | 5 challenges. Well-written but too long. |
| `security` | 5 domains, 29 controls. Too detailed for public portfolio. |
| `discipline` | Good. Honest about limitations. |
| `deployment` | Good. Honest about status. |
| `fde` | Good quote. Steps are educational. |
| `outcomes` | Good. Honest about validated vs planned. |
| `roadmap` | 8 items across 3 horizons. Good. |
| `limitations` | Excellent. Honest limitations listed. |

---

## NEXT STEPS

Create `IMPLEMENTATION_PLAN_V3.md` with the implementation roadmap covering Phases 2-21.
