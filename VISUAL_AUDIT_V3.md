# VISUAL_AUDIT_V3.md

**Project:** Shaikh Mohibur Rahman Portfolio — V3 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Creative Director / Principal Frontend Engineer)  
**Reference recording:** 20261106-1253-19.8539094.mp4 (112.2s, viewport 1356 × 598)

---

## EXECUTIVE SUMMARY

The current portfolio is technically functional but suffers from **generic AI-generated aesthetics**: repeated card grids, excessive badges, tiny text, dark panel sameness, identical section compositions, and documentation-style layouts. Every section uses the same component pattern (`SectionReveal` → card grid → badges → micro-labels). The BuildOS flagship showcase is buried at chapter 5 of 12, and the Hero emphasizes decoration over personal identity.

The website currently feels like a **developer documentation site**, not a premium editorial portfolio.

---

## IDENTIFIED VISUAL BUGS

### VB-01: Generic Card Grid Epidemic (CRITICAL)

| Property | Value |
|----------|-------|
| Location | `Capabilities.tsx`, `BuildOS.tsx` (cap cards, discovery, personas, modules), `TechStack.tsx`, `Leadership.tsx`, `TechStack.tsx`, `Recognition.tsx` |
| Severity | Critical |
| Root cause | Every section defaults to the same component composition: `SectionReveal` → grid of cards → badges → micro-labels. This repetition makes the site feel like a template. |
| Evidence | `Capabilities.tsx:22-41`: `cap-grid` with `cap-card` articles and `Badge` tags. `BuildOS.tsx:347-376`: `bo-cap-grid` with `bo-cap-card`. `TechStack.tsx:26-48`: `stack-grid` with `stack-card`. `Leadership.tsx:21-50`: `lead-grid` with `lead-card`. `Recognition.tsx:69-98`: `rec-grid` with `rec-card`. |
| Proposed correction | Replace card grids with editorial layouts: asymmetric two-column, typographic statements, image-led storytelling, selective card groups only where grouped information is semantically correct. |

### VB-02: BuildOS Flagship Buried at Chapter 5 (CRITICAL)

| Property | Value |
|----------|-------|
| Location | `BuildOS.tsx:343-398`, `BuildOSHero.tsx:1-85` |
| Severity | Critical |
| Root cause | The BuildOS mobile application screenshots appear at chapter 5 (Ecosystem) of a 12-chapter case study. The BuildOSHero section duplicates metrics and cards already in BuildOS. The first viewport shows an abstract connected-system graphic rather than the person or the product. |
| Evidence | `BuildOS.tsx:378-397`: `ecosystem.screens` rendered at line 378. `BuildOSHero.tsx:32-34`: "BUILD OS" wordmark and logo mark take prominence. `BuildOS.tsx:189-221`: Chapter 1 (Problem) appears before any product imagery. |
| Proposed correction | Restructure BuildOS to product-first: Introduction → Role → Problem/Solution → **Mobile showcase immediately** → Architecture → Challenges → Security → Outcomes → Roadmap. Consolidate BuildOSHero into a condensed hero. |

### VB-03: Typography Too Small and Dense (HIGH)

| Property | Value |
|----------|-------|
| Location | `src/index.css` lines 1400-1500 (About), `src/sections/TechStack.tsx` line 38, `src/sections/Capabilities.tsx` lines 31-35 |
| Severity | High |
| Root cause | Body text uses 13-14px. Card headings use 12-14px. Badges use 8-9px with uppercase tracking. Technical labels are micro-sized and hard to read at 1356 × 598 viewport. |
| Evidence | `TechStack.tsx:38`: `text-[9px]`. `Capabilities.tsx:32-34`: Badge tags with no size override (default small). About body text at 13-15px. |
| Proposed correction | Establish typography tokens: Hero 64-88px, Section 42-64px, Body 16-19px, Caption 13-15px, Technical labels 12-14px. Eliminate uppercase micro-labels except as intentional design accents. |

### VB-04: Excessive Badges (HIGH)

| Property | Value |
|----------|-------|
| Location | `TechStack.tsx` (skills as badges), `Capabilities.tsx` (tags as badges), `BuildOS.tsx` (status pills), `Recognition.tsx` (badge overlays), `Builds.tsx` (chip row) |
| Severity | High |
| Root cause | Badges are used as the default visual container for every skill, tag, status, and metric. This creates a "tag cloud" appearance typical of generic developer portfolios. |
| Evidence | `TechStack.tsx:34-42`: Every skill wrapped in `<Badge>`. `Capabilities.tsx:31-35`: Every capability tag wrapped in `<Badge>`. `BuildOS.tsx:366`: Status pill on every capability card. |
| Proposed correction | Replace badges with typographic labels, pill text, or inline metadata. Reserve badges for actual status indicators (verified/partial/planned) where meaning is clear. |

### VB-05: Identical Section Compositions (HIGH)

| Property | Value |
|----------|-------|
| Location | All 15 sections in `src/App.tsx` lines 107-121 |
| Severity | High |
| Root cause | Every section follows `SectionReveal` → `section-head` (eyebrow + title + sub) → content grid. No section has its own visual composition. |
| Evidence | `Capabilities.tsx:9-42`, `AiNative.tsx:13-54`, `Builds.tsx:53-131`, `Timeline.tsx:7-41`, `Leadership.tsx:7-53`, `TechStack.tsx:11-51`, `About.tsx:8-67`, `Recognition.tsx:54-110`, `HowIWork.tsx:6-35`, `Contact.tsx:10-68` all follow the same pattern. |
| Proposed correction | Each section must have its own layout: editorial two-column, asymmetric composition, full-width showcase, structured timeline, simplified diagram, or image-led story. |

### VB-06: Anchor Navigation Overlap (MEDIUM)

| Property | Value |
|----------|-------|
| Location | `src/App.tsx:67-68`, `src/components/Navbar.tsx:33` |
| Severity | Medium |
| Root cause | `hashOffset` computed as `navHeight + 12` but navbar is fixed at 64px. Navbar link clicks use Lenis scrollTo with `-88` offset. Section `scroll-margin-top` may not match across all viewports. |
| Evidence | `Navbar.tsx:33`: `l.scrollTo(el, { offset: -88 })`. `App.tsx:67-68`: `navHeight + 12` = 76px offset. Mismatch between 76px and 88px. |
| Proposed correction | Unify scroll offset as CSS variable `--nav-height` + gutter. Ensure all sections use `scroll-margin-top: calc(var(--nav-height) + var(--space-md))`. |

### VB-07: Generic Connected-System Graphic in Hero (MEDIUM)

| Property | Value |
|----------|-------|
| Location | `src/sections/Hero.tsx:19-92` |
| Severity | Medium |
| Root cause | The Hero opening shows an abstract SVG node-connection graphic ("AI / DEEPTECH", "PRODUCT / SYSTEMS", "SHIPPED / VALIDATED") rather than personal identity or product imagery. This is generic decorative graphics. |
| Evidence | `Hero.tsx:19-92`: `ConnectedSystemGraphic` with glowing nodes, lines, and three category tags. |
| Proposed correction | Replace with personal identity focus: headline "I build products that solve real-world problems," personal introduction, primary CTA, secondary CTA, and a distinctive original visual representing engineering/product creation. |

### VB-08: Film Grain Overlay (LOW)

| Property | Value |
|----------|-------|
| Location | `src/App.tsx:100-101`, `src/index.css` |
| Severity | Low |
| Root cause | `grain` div overlay adds texture noise that can reduce readability on low-quality displays. |
| Evidence | `App.tsx:100-101`: `<div className="grain" aria-hidden="true" />`. |
| Proposed correction | Remove or make optional based on user preference. |

---

## BUILDOS-SPECIFIC ISSUES

| ID | Issue | Location | Severity |
|----|-------|----------|----------|
| BB-01 | Capability cards use identical `bo-cap-card` with pill badges | `BuildOS.tsx:347-376` | High |
| BB-02 | Architecture section uses `<details>`/`<table>` — looks like docs | `BuildOS.tsx:454-486` | High |
| BB-03 | Security section uses repeated pill badges per control | `BuildOS.tsx:551-589` | Medium |
| BB-04 | Discipline metrics use small stat cards with bar charts | `BuildOS.tsx:600-626` | Medium |
| BB-05 | Deployment section uses admin dashboard table | `BuildOS.tsx:666-689` | High |
| BB-06 | Roadmap uses horizon groups with narrow labels | `BuildOS.tsx:765-777` | Medium |
| BB-07 | Challenges use identical accordion rows | `BuildOS.tsx:498-536` | Medium |

---

## NEXT STEPS

Create `DESIGN_DIRECTION_V3.md` defining the editorial aesthetic, then `COMPONENT_AUDIT_V3.md` and `IMPLEMENTATION_PLAN_V3.md`.
