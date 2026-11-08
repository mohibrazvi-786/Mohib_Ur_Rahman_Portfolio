# DESIGN_DIRECTION_V3.md

**Project:** Shaikh Mohibur Rahman Portfolio — V3 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Creative Director)

---

## 1. CREATIVE DIRECTION

### 1.1 Core Concept: "Editorial Product Engineering"

The portfolio should feel like a **carefully designed digital publication** combined with a **sophisticated product-engineering case study**. It communicates the identity of a serious product engineer, founder, and technology builder through typography, whitespace, image composition, and selective graphics — not through badges, gradients, or decorative animations.

### 1.2 What to Avoid (Mandatory)

| Avoid | Because |
|-------|---------|
| Generic AI-generated portfolio aesthetic | Looks template-driven, not personal |
| SaaS admin dashboard layouts | Tables, status pills, micro-labels feel like internal tools |
| Identical card grids in every section | Repetition kills visual hierarchy |
| Generic developer landing-page template | No distinctive personality |
| Internal technical audit report tone | Too dry, no human voice |
| Template filled with badges and gradients | Visual noise, no hierarchy |
| Generic glowing spheres, floating shapes, 3D blobs | Decorative without meaning |
| Excessive glassmorphism, glass panels | Low readability, trendy but dated |
| Skill percentage bars, proficiency scores | Fake precision, not verifiable |
| Random floating technology logos | Clutter, no hierarchy |

### 1.3 What to Embrace

| Embrace | Why |
|---------|-----|
| Editorial two-column layouts | Asymmetric compositions feel designed, not templated |
| Large typographic statements | Readable hierarchy, personal voice |
| Full-width product showcases | BuildOS screenshots deserve real estate |
| Structured timelines | Development journey as visual narrative |
| Simplified diagrams | Architecture as communication, not documentation |
| Selective card groups | Only where grouped information is semantically correct |
| Image-led storytelling | Authentic screenshots > decorative illustrations |
| Open layouts with restrained separators | Whitespace creates premium feel |

---

## 2. VISUAL IDENTITY

### 2.1 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#08090B` | Primary background |
| `--color-surface` | `#111318` | Primary card/surface |
| `--color-surface-elevated` | `#181A1F` | Elevated panels |
| `--color-surface-bright` | `#202229` | Hover states |
| `--color-accent` | `#FFC400` | Primary accent (yellow/gold) — use selectively |
| `--color-accent-dim` | `rgba(255, 196, 0, 0.15)` | Subtle accent backgrounds |
| `--color-text-primary` | `#F5F5F2` | Primary body text |
| `--color-text-secondary` | `#A1A1AA` | Secondary text, captions |
| `--color-text-muted` | `#71717A` | Micro-labels, metadata |
| `--color-border` | `#292B32` | Subtle borders |
| `--color-border-bright` | `#3F4148` | Stronger borders |
| `--font-display` | `"Space Grotesk"` | Headlines, statements |
| `--font-body` | `"Geist"` | Body text, UI |
| `--font-mono` | `"JetBrains Mono"` | Code, technical labels |
| `--radius-sm` | `8px` | Small radius |
| `--radius-md` | `12px` | Medium radius |
| `--radius-lg` | `18px` | Card radius |
| `--radius-xl` | `32px` | Large radius |
| `--space-xs` | `8px` | Tight spacing |
| `--space-sm` | `16px` | Small gaps |
| `--space-md` | `24px` | Standard gaps |
| `--space-lg` | `40px` | Section internal |
| `--space-xl` | `64px` | Section external |
| `--space-2xl` | `96px` | Large gaps |
| `--container-max` | `1240px` | Max content width |
| `--nav-height` | `64px` | Sticky navbar height |

### 2.2 Color Usage Rules

- **Accent (#FFC400)** used selectively — max 3-4 accent elements per viewport
- **Never**: every button, badge, icon, border, and heading yellow
- **Contrast through**: typography weight, whitespace, image composition, background variation, selective borders
- **Section backgrounds**: alternate between `#08090B` and `#111318` for section differentiation

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Type Scale (Desktop)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| Hero headline | Space Grotesk | 72px | 600 | 1.05 | -0.04em |
| Section headline | Space Grotesk | 48px | 500 | 1.1 | -0.03em |
| Project headline | Space Grotesk | 40px | 500 | 1.15 | -0.02em |
| Card heading | Space Grotesk | 20px | 600 | 1.2 | 0 |
| Body text | Geist | 17px | 400 | 1.7 | 0 |
| Caption | Geist | 14px | 400 | 1.5 | 0 |
| Technical labels | JetBrains Mono | 12px | 500 | 1.4 | 0.05em |
| Navigation | Geist | 15px | 500 | 1.4 | 0 |
| Buttons | Geist | 15px | 500 | 1.2 | 0 |
| Statistics | JetBrains Mono | 24px | 700 | 1.1 | 0 |

### 3.2 Responsive Scaling

- Hero: `clamp(56px, 10vw, 88px)`
- Section: `clamp(36px, 6vw, 64px)`
- Body: `clamp(15px, 1.2vw, 19px)`
- All text wraps naturally; no forced uppercase except intentional design accents

### 3.3 Typography Rules

- No uppercase micro-labels (eyebrows, tags, metadata) unless as intentional design accent
- No headings hidden behind navigation (see scroll-margin-top fix)
- No awkward word wrapping; control max-width per text block
- Line height: body 1.7, headings 1.05-1.2
- Paragraph spacing: `var(--space-md)` between paragraphs

---

## 4. SECTION-BY-SECTION LAYOUT STRATEGY

| Section | Layout | Rationale |
|---------|--------|-----------|
| Hero | Full-width hero with large type, asymmetric graphic right | Personal identity first |
| BuildOS Intro | Editorial two-column: copy left, first screenshot right | Product-first, immediately visible |
| BuildOS Gallery | Controlled grid: 3-col desktop, 2-col tablet, 1-col mobile | Identical mockup frames |
| Architecture | Simplified node diagram with connectors | Communication over documentation |
| Challenges | Editorial story format: Problem/Decision/Execution/Result | Engineering narrative |
| Security | Visual principle cards, no badge grids | Trust boundaries made explicit |
| Discipline | Large verified figures with context | Meaningful metrics |
| Deployment | Milestone cards, stacked mobile | Project delivery presentation |
| Outcomes | Status-grouped lists, no duplicate cards | Verified claims only |
| Roadmap | Clean timeline or 3-col editorial | Initiatives with descriptions |
| MeSure | Responsive video container, editorial metrics | Portrait media as portrait |
| Momentum/Timeline | Visual journey with connected nodes | Development narrative |
| Technology | Curated technology map, grouped categories | No skill bars or badges |
| About | Asymmetric: portrait left, large statement right | Personality and authorship |
| Recognition | Curated gallery, consistent containers, lightbox | Meaningful achievements |
| Contact | Strong headline, aligned CTA, contact details | Distinctive final section |
| Footer | Restrained, minimal navigation + copyright | Quiet close |

---

## 4. SHADCN/UI COMPONENT STANDARDIZATION

| Component | Status | Design Direction |
|-----------|--------|------------------|
| Button | ✅ | Primary (accent), Outline (border), Ghost (text). No gradient buttons. |
| Card | ✅ | Border + surface, no shadows unless elevated state needed. |
| Badge | ⚠️ | Reserved for status indicators only. Remove from skills/tags. |
| Tabs | ✅ | Simple underline indicator, no fill. |
| Accordion | ✅ | Border-separated, no background panels. |
| Dialog | ✅ | Backdrop blur, rounded, focus trap. |
| Sheet | ⚠️ | Create if needed for mobile navigation. |
| Carousel | ⚠️ | Create for BuildOS mobile mockup gallery on mobile. |
| Separator | ✅ | Subtle border, 1px, used sparingly. |
| Table | ❌ | Avoid. Use cards or definition lists instead. |
| Tooltip | ✅ | Minimal, dark theme, 10px font. |
| Form | ⚠️ | Not needed — no backend. Use mailto:. |
| Input | ❌ | Not needed. |
| Textarea | ❌ | Not needed. |
| Sonner | ❌ | Not needed — no toast requirements. |
| Skeleton | ❌ | Not needed — no async loading states. |

---

## 5. BUILDOSMOBILEMOCKUP CANONICAL SPEC

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Frame width | 250px | 200px | 160px |
| Frame height | 510px | 408px | 326px |
| Aspect ratio | 0.490 | 0.490 | 0.490 |
| Corner radius | 34px | 27px | 22px |
| Border | 1px solid `#3F4148` | Same | Same |
| Shadow | `0 20px 40px -10px rgba(0,0,0,0.6)` | Same | Same |
| Screen inset | 4px | 3px | 2px |
| Screen bg | `#000` | `#000` | `#000` |
| Image fit | `object-fit: contain` | `object-fit: contain` | `object-fit: contain` |

All 7 screenshots use this component identically:
1. Project health
2. Site diary
3. Receive material
4. Order detail
5. Finance
6. Payables
7. Team & roles

---

## 6. ANIMATION PHILOSOPHY

- **Restrained motion only**: scroll reveals, hover lift, tap effects, tab transitions
- **No decorative particles, floating blobs, or glowing elements**
- **Respect `prefers-reduced-motion`** — disable all motion when enabled
- **Curve**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for all motion
- **Animate only**: transform (translate, scale) and opacity
- **No scroll hijacking, no excessive parallax, no layout-blocking animations**

---

## 7. CONTENT RULES

- No fake metrics or invented accomplishments
- No unverified claims of deployment maturity
- No confidential information (API keys, passwords, private URLs)
- BuildOS status: MVP built, pilot next — not production-proven
- All metrics must be verifiable from the codebase or documented discovery

---

## NEXT STEPS

Create `COMPONENT_AUDIT_V3.md` auditing every existing component, then `IMPLEMENTATION_PLAN_V3.md` with the implementation roadmap.
