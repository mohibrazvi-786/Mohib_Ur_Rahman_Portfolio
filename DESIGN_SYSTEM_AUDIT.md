# DESIGN SYSTEM AUDIT

**Project:** Shaikh Mohibur Rahman Portfolio — V2 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Design System Architect)

---

## DESIGN TOKENS (index.css — Source of Truth)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#08090b` | Primary background |
| `--color-surface` | `#101317` | Card surfaces |
| `--color-accent` | `#ffb800` | Brand accent (amber/yellow) |
| `--color-accent-ink` | `#171204` | Text on accent |
| `--color-text` | `#f2f0ea` | Primary text |
| `--color-text-secondary` | `#a0a7b1` | Secondary text |
| `--color-border` | `rgba(242, 240, 234, 0.09)` | Subtle borders |
| `--color-border-strong` | `rgba(242, 240, 234, 0.17)` | Strong borders |
| `--font-display` | `"Space Grotesk"` | Headings |
| `--font-body` | `"Geist"` | Body text (post-landing-page-design) |
| `--font-mono` | `"JetBrains Mono"` | Code, labels, metrics |
| `--space-xs` | `4px` | Tight spacing |
| `--space-sm` | `8px` | Small gaps |
| `--space-md` | `16px` | Standard gaps |
| `--space-lg` | `24px` | Section internal |
| `--space-xl` | `40px` | Section external |
| `--space-2xl` | `64px` | Large gaps |
| `--radius-sm` | `8px` | Small radius |
| `--radius-md` | `12px` | Medium radius |
| `--radius-lg` | `18px` | Card radius |
| `--radius-xl` | `24px` | Large radius |
| `--radius-2xl` | `32px` | Extra large |
| `--container` | `1240px` | Max content width |
| `--nav-height` | `64px` | Navbar height |

## COMPONENT INVENTORY

### shadcn/ui Components Available
| Component | Status | File |
|-----------|--------|------|
| Button | ✅ Installed | `src/components/ui/button.tsx` |
| Badge | ✅ Installed | `src/components/ui/badge.tsx` |
| Card | ✅ Installed | `src/components/ui/card.tsx` |
| Accordion | ✅ Installed | `src/components/ui/accordion.tsx` |
| Dialog | ✅ Installed | `src/components/ui/dialog.tsx` |
| Tabs | ✅ Installed | `src/components/ui/tabs.tsx` |
| Tooltip | ✅ Installed | `src/components/ui/tooltip.tsx` |

### Custom Components (Non-shadcn)
| Component | Status | Notes |
|-----------|--------|-------|
| Navbar | ✅ | Fixed nav, mobile menu, progress bar |
| Footer | ✅ | Minimal, name + links |
| Loader | ✅ | Initial loading bar |
| MediaLightbox | ✅ | Image gallery dialog |
| SectionReveal | ✅ | Framer Motion scroll reveal |
| Cursor | ⚠️ | Installed but not imported (dead code) |
| ResponsiveTester | ⚠️ | Installed but not imported (dead code) |
| GlassCard | ⚠️ | Installed but not imported (dead code) |

## TYPOGRAPHY AUDIT

| Element | Font | Size | Weight | Status |
|---------|------|------|--------|--------|
| h1 (hero) | Space Grotesk | clamp(52px, 9vw, 96px) | 600 | ✅ |
| h2 (section) | Space Grotesk | clamp(36px, 5.2vw, 72px) | 500 | ✅ |
| h3 (card title) | Space Grotesk | clamp(22px, 2.5vw, 30px) | 500 | ✅ |
| Body | Geist | 13-17px | 400 | ✅ |
| Mono labels | JetBrains Mono | 8-10px | 400-500 | ✅ |

### TOKENS.TS DIVERGENCE
`src/tokens.ts` declares `body: '"Inter", ...'` — contradicts `index.css` which uses Geist. `tokens.ts` is not imported anywhere (dead code). **Fix:** Update to Geist or remove.

## COMPONENT VARIANTS & CONSISTENCY

### Buttons
- Primary: amber gradient, black text — consistent
- Outline: border-gray-700, text-gray-300 — consistent
- Pill variant used in Hero and Contact — consistent
- **Issue:** `BuildOSHero.tsx` uses inline gradient classes (`bg-gradient-to-r from-amber-500 to-orange-500`) instead of shadcn Button variants — inconsistent with design system

### Cards
- `.card` class: border, radius-xl, gradient background — consistent
- `shadcn Card` used in BuildOSHero — consistent
- Custom `.bo-card` in BuildOS.tsx uses inline styles — inconsistent

### Badges
- shadcn Badge used throughout — consistent
- `.bo-pill` custom class in BuildOS.tsx — partially consistent

### Navigation
- Fixed navbar at 64px — consistent
- Mobile menu full-screen overlay — consistent
- Progress bar under nav — consistent

## MISSING DESIGN SYSTEM ELEMENTS

| Element | Status | Required For |
|---------|--------|--------------|
| `BuildOSMobileMockup` | ❌ Missing | BuildOS gallery (mandatory) |
| Architecture diagram component | ❌ Missing | BuildOS chapter 4 |
| Capability card system | ❌ Missing | BuildOS chapter 3 |
| Deployment table (responsive) | ❌ Missing | BuildOS chapter 9 |
| Roadmap columns (3-col desktop) | ❌ Missing | BuildOS chapter 12 |
| Skip-to-content link | ✅ Added | Accessibility |

## COLOR USAGE CONSISTENCY

| Color | Role | Consistent? |
|-------|------|-------------|
| `#ffb800` | Accent | ✅ Yes |
| `#171204` | Accent ink | ✅ Yes |
| `#08090b` | Background | ✅ Yes |
| `#101317` | Surface | ✅ Yes |
| `#f2f0ea` | Text | ✅ Yes |

## DEAD CODE

| File | Status | Action |
|------|--------|--------|
| `src/tokens.ts` | Not imported | Update to Geist or remove |
| `src/components/Cursor.tsx` | Not imported | Remove or integrate |
| `src/components/ResponsiveTester.tsx` | Not imported | Remove |
| `src/components/GlassCard.tsx` | Not imported | Remove |
| `src/App.css` | Orphan rules | Remove entirely |

## NEXT PHASE

Proceed to `BUILDOS_SHOWCASE_AUDIT.md` and `IMPLEMENTATION_PLAN.md`.
