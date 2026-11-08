# IMPLEMENTATION PLAN

**Project:** Shaikh Mohibur Rahman Portfolio — V2 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Principal Frontend Engineer)

---

## IMPLEMENTATION PHASES

### Phase 1: Design System Foundation (Days 1-2)

| Task | File(s) | Priority |
|------|---------|----------|
| Remove dead CSS (App.css orphan rules) | `src/App.css` | High |
| Unify typography tokens (Geist body, no Inter) | `src/index.css`, `src/tokens.ts` | High |
| Create shared spacing/layout tokens | `src/index.css` | High |
| Define `--nav-height` CSS variable | `src/index.css` | High |

### Phase 2: Global Layout & Navigation Fixes (Days 2-3)

| Task | File(s) | Priority |
|------|---------|----------|
| Fix `scroll-margin-top` to use `--nav-height` + gutter | `src/index.css` | Critical |
| Derive hash offset from `--nav-height` | `src/App.tsx` | High |
| Synchronize Navbar link clicks with Lenis scroll | `src/components/Navbar.tsx` | Medium |
| Add `overflow-x: clip` to root | `src/index.css` | Medium |
| Consistent section gutters (`py-20` desktop, `py-16` mobile) | All sections | High |

### Phase 3: BuildOSMobileMockup Component (Days 3-4)

| Task | File(s) | Priority |
|------|---------|----------|
| Create `BuildOSMobileMockup` component (250×510 canonical frame) | `src/components/BuildOSMobileMockup.tsx` | Critical |
| Canonical frame spec: corner radius, bezel, shadow, screen inset | Same | Critical |
| Responsive scaling (tablet/mobile preserve aspect ratio) | Same | High |
| `object-fit: contain` for all screenshots | Same | Critical |

### Phase 4: BuildOS Complete Redesign (Days 4-8)

| Task | File(s) | Priority |
|------|---------|----------|
| Restructure chapter order (product-first) | `src/sections/BuildOS.tsx` | Critical |
| Consolidate BuildOSHero (condensed hero only) | `src/sections/BuildOSHero.tsx` | High |
| BuildOSMobileMockup gallery (7 screenshots, identical frames) | `src/sections/BuildOS.tsx` | Critical |
| Screenshot captions outside device frame | Same | High |
| Gallery hover elevation + click-to-expand lightbox | Same | High |
| Architecture visualization (layered nodes, responsive) | Same | High |
| Challenges accordion (challenge → decision → solution → outcome) | Same | High |
| Security cards (consistent height, icon placement, status) | Same | High |
| Discipline stats + cadence chart | Same | Medium |
| Deployment: responsive cards (mobile) / table (desktop) | Same | Medium |
| Outcomes standardized cards | Same | Medium |
| Roadmap: 3-column desktop / stacked mobile | Same | Medium |

### Phase 5: Section-by-Section Fixes (Days 8-10)

| Task | File(s) | Priority |
|------|---------|----------|
| MeSure video: responsive 16:9 container | `src/sections/Ventures.tsx` | Medium |
| Ventures metrics alignment | Same | Medium |
| About: portrait proportions, biography width | `src/sections/About.tsx` | Medium |
| Leadership: cards, metric alignment | `src/sections/Leadership.tsx` | Medium |
| Recognition: uniform certificate cards | `src/sections/Recognition.tsx` | Medium |
| Contact: heading overlap, alignment | `src/sections/Contact.tsx` | High |
| Footer: spacing, navigation | `src/components/Footer.tsx` | Medium |

### Phase 6: Typography & Design System (Days 10-11)

| Task | File(s) | Priority |
|------|---------|----------|
| Typography tokens for all text sizes | `src/index.css` | High |
| Standardize shadcn/ui variants (Button, Card, Badge, etc.) | `src/components/ui/` | High |
| Remove dead code (tokens.ts, Cursor, ResponsiveTester, GlassCard) | Multiple | Low |

### Phase 7: Button & Interaction Audit (Days 11-12)

| Task | File(s) | Priority |
|------|---------|----------|
| Verify all buttons perform advertised actions | All sections | High |
| Check hover, focus, active, disabled states | `src/index.css` | High |
| Keyboard navigation | All interactive | High |
| Dialog focus management | `MediaLightbox.tsx` | Medium |

### Phase 8: Responsive Testing (Days 12-14)

| Task | File(s) | Priority |
|------|---------|----------|
| Test 320px, 375px, 430px, 768px, 1024px, 1280px, 1366px, 1440px, 1920px | All | Critical |
| BuildOS mockup gallery at all breakpoints | `BuildOSMobileMockup.tsx` | Critical |
| Fix horizontal overflow | `src/index.css` | High |
| Intentional responsive layouts (not simple shrinking) | All sections | High |

### Phase 9: Browser Testing & Reports (Days 14-15)

| Task | File(s) | Priority |
|------|---------|----------|
| Playwright visual regression screenshots | New test files | High |
| Device mockup dimension validation at all breakpoints | Same | Critical |
| Before/after visual report | `BEFORE_AFTER_VISUAL_REPORT.md` | Medium |
| `DEVICE_MOCKUP_VALIDATION.md` | Same | Critical |
| `REMAINING_ISSUES.md` | Same | Medium |

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

## RISK MITIGATION

| Risk | Mitigation |
|------|-----------|
| Screenshot dimensions vary | Use `object-fit: contain` + neutral background in mockup |
| Horizontal overflow on mobile | `overflow-x: clip` + `max-w-full` on grids |
| Navbar overlap | `--nav-height` variable + `scroll-margin-top` |
| BuildOS content too long | Restructure to product-first, progressive disclosure |
| Authentic screenshot sensitivity | Inspect each for PII before final |

## SUCCESS CRITERIA

- [ ] Sticky navigation works without overlapping headings
- [ ] All section headings visible on anchor navigation
- [ ] BuildOSMobileMockup used for all 7 screenshots
- [ ] All device frames identical at each breakpoint
- [ ] No screenshot distortion
- [ ] All captions aligned
- [ ] All buttons/interactions work
- [ ] All navigation links work
- [ ] No horizontal overflow at any breakpoint
- [ ] Production build succeeds
- [ ] Browser tests pass
- [ ] No confidential information exposed

## NEXT STEP

Begin Phase 1 — remove dead CSS, unify typography, create layout tokens.
