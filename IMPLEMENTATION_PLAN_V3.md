# IMPLEMENTATION_PLAN_V3.md

**Project:** Shaikh Mohibur Rahman Portfolio — V3 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Principal Frontend Engineer)

---

## IMPLEMENTATION PHASES

### Phase 1: Design System Foundation (Days 1-2)

| Task | File(s) | Priority |
|------|---------|----------|
| Define typography tokens (hero 64-88px, section 42-64px, body 16-19px) | `src/index.css` | Critical |
| Define layout tokens (container, spacing, radius, borders) | `src/index.css` | Critical |
| Remove gradient button classes, use shadcn variants only | All sections | High |
| Remove excess badges from skills/tags/categories | `TechStack.tsx`, `Capabilities.tsx`, `BuildOS.tsx` | High |
| Remove `App.css` orphan rules | `src/App.css` | Low |
| Remove dead components (Cursor, ResponsiveTester, GlassCard if unused) | `src/components/` | Low |

### Phase 2: Typography Reconstruction (Days 2-3)

| Task | File(s) | Priority |
|------|---------|----------|
| Hero headline: 64-88px, Space Grotesk, 600 weight | `src/index.css`, `src/sections/Hero.tsx` | Critical |
| Section headings: 42-64px, Space Grotesk, 500 weight | `src/index.css`, all sections | High |
| Body text: 16-19px, Geist, 1.7 line height | `src/index.css` | High |
| Captions: 13-15px, Geist | `src/index.css` | Medium |
| Technical labels: 12-14px, JetBrains Mono | `src/index.css` | Medium |
| Eliminate uppercase micro-labels | All sections | Medium |
| Control text max-width per block | All sections | Medium |

### Phase 3: Hero Reconstruction (Days 3-4)

| Task | File(s) | Priority |
|------|---------|----------|
| Replace ConnectedSystemGraphic SVG with personal identity | `src/sections/Hero.tsx` | Critical |
| Headline: "I build products that solve real-world problems." | `src/data/content.ts` | Critical |
| Supporting statement about product engineering | `src/data/content.ts` | Critical |
| Primary CTA: "See BuildOS case study" | `src/sections/Hero.tsx` | High |
| Secondary CTA: "Start a conversation" | `src/sections/Hero.tsx` | High |
| Distinctive original visual (not AI-generated) | `src/sections/Hero.tsx` | High |
| Optional verified availability indicator | `src/sections/Hero.tsx` | Medium |

### Phase 4: BuildOS Flagship Case Study (Days 4-8)

| Task | File(s) | Priority |
|------|---------|----------|
| Restructure chapter order: product-first | `src/sections/BuildOS.tsx` | Critical |
| Move mobile showcase to chapter 4 (immediately after product intro) | `src/sections/BuildOS.tsx` | Critical |
| Consolidate BuildOSHero to condensed hero only | `src/sections/BuildOSHero.tsx` | High |
| Wrap all 7 screenshots in BuildOSMobileMockup identical frames | `src/sections/BuildOS.tsx` | Critical |
| Capability presentation: small visual groupings, not identical cards | `src/sections/BuildOS.tsx` | High |
| Architecture: simplified node diagram, not `<details>`/`<table>` | `src/sections/BuildOS.tsx` | High |
| Challenges: editorial story format (Problem/Decision/Execution/Result) | `src/sections/BuildOS.tsx` | High |
| Security: visual principle cards, no badge grids | `src/sections/BuildOS.tsx` | High |
| Discipline: large verified figures, no tiny bar charts | `src/sections/BuildOS.tsx` | Medium |
| Deployment: milestone cards, stacked mobile | `src/sections/BuildOS.tsx` | High |
| Outcomes: status-grouped lists, no duplicates | `src/sections/BuildOS.tsx` | Medium |
| Roadmap: clean timeline, 3-col desktop | `src/sections/BuildOS.tsx` | Medium |

### Phase 5: Section-by-Section Redesign (Days 8-12)

| Task | File(s) | Priority |
|------|---------|----------|
| Capabilities: editorial layout, 4 quadrants or typographic statements | `src/sections/Capabilities.tsx` | High |
| AiNative: editorial layout, copy left + pipeline right | `src/sections/AiNative.tsx` | Medium |
| Builds: editorial project cards with imagery, not badge grids | `src/sections/Builds.tsx` | High |
| Timeline: visual journey with connected nodes | `src/sections/Timeline.tsx` | Medium |
| Leadership: asymmetric composition, larger headline | `src/sections/Leadership.tsx` | Medium |
| TechStack: curated technology map, grouped categories, no badges | `src/sections/TechStack.tsx` | High |
| About: asymmetric composition, portrait left + statement right | `src/sections/About.tsx` | Medium |
| Recognition: curated gallery, consistent containers, lightbox | `src/sections/Recognition.tsx` | High |
| HowIWork: editorial flow, connected steps, larger type | `src/sections/HowIWork.tsx` | Medium |
| Contact: aligned headline, CTA, contact details | `src/sections/Contact.tsx` | High |
| Footer: restrained, back-to-top control | `src/components/Footer.tsx` | Medium |

### Phase 6: Navigation & Accessibility (Days 12-13)

| Task | File(s) | Priority |
|------|---------|----------|
| Fix scroll-margin-top to use `--nav-height` variable | `src/index.css` | Critical |
| Fix hash offset derivation from `--nav-height` | `src/App.tsx` | Critical |
| Skip-to-content link | `index.html`, `src/index.css` | High |
| Keyboard navigation verification | All sections | High |
| Focus indicators visible | `src/index.css` | High |
| Reduced-motion support | All framer-motion | High |

### Phase 7: Responsive Design (Days 13-15)

| Task | File(s) | Priority |
|------|---------|----------|
| Test 320px, 375px, 430px, 768px, 1024px, 1280px, 1356px, 1440px, 1920px | All sections | Critical |
| BuildOS mockup gallery: 3-col desktop, 2-col tablet, 1-col mobile | `src/sections/BuildOS.tsx` | Critical |
| Architecture diagram responsive | `src/sections/BuildOS.tsx` | High |
| MeSure video responsive 16:9 container | `src/sections/Ventures.tsx` | High |
| No horizontal overflow at any breakpoint | `src/index.css` | Critical |
| Intentional mobile layouts (not shrunk desktop) | All sections | High |

### Phase 8: Graphics & Visual Storytelling (Days 15-17)

| Task | File(s) | Priority |
|------|---------|----------|
| Simplified architecture diagram (SVG) | `src/components/` | Medium |
| Engineering workflow illustration | `src/components/` | Medium |
| Editorial timeline | `src/sections/Timeline.tsx` | Medium |
| Technology map (curated, grouped) | `src/sections/TechStack.tsx` | Medium |
| Authentic screenshots only, no AI-generated imagery | `public/assets/buildos/` | Critical |

### Phase 9: shadcn/ui Component Standardization (Days 17-18)

| Task | File(s) | Priority |
|------|---------|----------|
| Standardize Button variants (Primary, Outline, Ghost) | `src/components/ui/button.tsx` | High |
| Standardize Card (border + surface, no unnecessary shadows) | `src/components/ui/card.tsx` | High |
| Restrict Badge to status indicators | `src/components/ui/badge.tsx` | High |
| Standardize Tabs with underline indicator | `src/components/ui/tabs.tsx` | Medium |
| Separator used sparingly | `src/components/ui/separator.tsx` | Low |

### Phase 10: Testing & Verification (Days 18-20)

| Task | File(s) | Priority |
|------|---------|----------|
| Playwright visual regression screenshots | New test files | Critical |
| BuildOS mockup dimension validation at all breakpoints | New test files | Critical |
| Browser console error check | Browser | High |
| Network failure check | Browser | High |
| Missing image check | Browser | High |
| Font loading check | Browser | Medium |
| Accessibility check (WCAG 2.2 AA) | Browser | High |
| Production build succeeds | `npm run build` | Critical |

### Phase 11: Final Reports (Days 20-21)

| Task | File(s) | Priority |
|------|---------|----------|
| VISUAL_AUDIT_V3.md | Done | — |
| DESIGN_DIRECTION_V3.md | Done | — |
| COMPONENT_AUDIT_V3.md | Done | — |
| IMPLEMENTATION_PLAN_V3.md | Done | — |
| BUILDOS_SHOWCASE_REPORT.md | New | Medium |
| VISUAL_REGRESSION_REPORT.md | New | Medium |
| RESPONSIVE_TEST_REPORT.md | New | Medium |
| ACCESSIBILITY_REPORT.md | New | Medium |
| REMAINING_ISSUES_V3.md | New | Medium |

---

## DEPENDENCIES

| Dependency | Status | Notes |
|------------|--------|-------|
| React 19 | ✅ Installed | |
| Tailwind CSS 4 | ✅ Installed | Via Vite plugin |
| Framer Motion | ✅ Installed | For animations |
| GSAP + Lenis | ✅ Installed | For scroll |
| shadcn/ui | ✅ Partially | Button, Badge, Card, Accordion, Dialog, Tabs, Tooltip |
| Playwright | ❌ Not installed | Need for browser testing |
| Lucide React | ✅ Installed | Icons |

---

## RISK MITIGATION

| Risk | Mitigation |
|------|-----------|
| Removing badges makes site feel empty | Replace with typographic hierarchy and whitespace |
| BuildOS content too long | Progressive disclosure, restructure to 8 chapters max |
| Screenshot dimensions vary | `object-fit: contain` + neutral background in mockup |
| Horizontal overflow on mobile | `overflow-x: clip` + `max-w-full` on grids |
| Navbar overlap | `--nav-height` variable + `scroll-margin-top` |
| Generic feel persists | Editorial layouts per section, no repeated grids |

---

## SUCCESS CRITERIA

- [ ] No repeated card grids across sections
- [ ] BuildOSMobileMockup used for all 7 screenshots identically
- [ ] All device frames identical at each breakpoint
- [ ] No screenshot distortion or cropping
- [ ] Typography: hero 64-88px, body 16-19px, readable hierarchy
- [ ] Badges restricted to status indicators only
- [ ] All section layouts are unique (no identical composition)
- [ ] Sticky navigation works without heading overlap
- [ ] All navigation links and CTAs work
- [ ] Skip-to-content link present
- [ ] Keyboard navigation works
- [ ] Reduced-motion respected
- [ ] No horizontal overflow at any breakpoint
- [ ] Production build succeeds
- [ ] Browser tests pass
- [ ] No confidential information exposed

**Not deployed** — per implementation rules, deployment requires explicit authorization.
