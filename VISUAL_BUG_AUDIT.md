# VISUAL BUG AUDIT

**Project:** Shaikh Mohibur Rahman Portfolio — V2 Visual Reconstruction  
**Date:** 2026-11-06  
**Auditor:** Kilo (Creative Director / Principal Frontend Engineer)  
**Source:** Complete source code inspection of `C:\Users\91842\Desktop\portfolio`

---

## EXECUTIVE SUMMARY

The portfolio has a solid black-and-yellow brand foundation but suffers from multiple visual bugs, component inconsistencies, and layout issues. Critical issues include:

1. **Sticky navigation overlaps section headings** — `scroll-margin-top` on sections doesn't account for the navbar height (64px) consistently across all viewport sizes.
2. **BuildOS gallery has no uniform device mockup** — screenshots are rendered raw inside buttons without any phone frame, violating the mandatory identical-mockup requirement.
3. **Inconsistent section padding** — some sections use `clamp(88px, 10vw, 136px)`, others use hardcoded `py-20`, `py-24`, etc.
4. **Anchor navigation offset mismatch** — `hashOffset` in App.tsx uses magic numbers (88/152px) that don't match the actual navbar height.
5. **Typography tokens diverge** — `tokens.ts` references Inter (banned), while `index.css` correctly uses Geist.
6. **Duplicate CSS systems** — `App.css` contains legacy rules from a different project (`.counter`, `.hero .base`, `#center`, `#next-steps`, etc.) that don't match current markup.
7. **BuildOS product showcase buried at chapter 5** — the actual application screenshots appear deep in the case study rather than immediately as the flagship.
8. **Horizontal overflow risk** — no explicit `overflow-x: hidden` on root beyond body-level, and some grids may exceed container width.
9. **Hero metrics use inconsistent digit precision** — mixed decimal/whole-number formatting without visual rhythm.

---

## DETAILED ISSUE INVENTORY

### VB-001: Sticky Navigation Overlaps Section Headings

| Property | Value |
|----------|-------|
| Location | `src/App.tsx:52`, `src/index.css:239`, `src/components/Navbar.tsx:59` |
| Severity | High |
| Root cause | `scroll-margin-top: 88px` on `.section` is fixed, but navbar is `position: fixed` at 64px. The hash offset math (88px default, 152px for buildos on mobile) is disconnected from actual navbar height. When clicking nav links, headings disappear behind the navbar. |
| Fix | Unify navbar height as a CSS variable (`--nav-height: 64px`), set `scroll-margin-top: calc(var(--nav-height) + 12px)` on all sections, and update hash offset to use the same variable. |

### VB-002: BuildOS Gallery Lacks Uniform Device Mockup

| Property | Value |
|----------|-------|
| Location | `src/sections/BuildOS.tsx:555-572` |
| Severity | Critical (mandatory per spec) |
| Root cause | Screenshots are rendered as raw `` tags inside plain `figure`/`button` elements with no phone frame wrapper. The mandatory `BuildOSMobileMockup` component does not exist. |
| Fix | Create `BuildOSMobileMockup` component with canonical 250px × 510px frame, wrap every `ecosystem.screens` image in it, enforce `object-fit: contain`, identical corner radius, bezel, and shadow. |

### VB-003: Inconsistent Section Padding & Gutters

| Property | Value |
|----------|-------|
| Location | `src/index.css:238`, various section components |
| Severity | Medium |
| Root cause | `.section` uses `clamp(88px, 10vw, 136px)`, but `BuildOSHero` uses `py-20`, `Contact` uses `py-96`/`py-112`, `AiNative` uses inline padding. This creates rhythmic inconsistency across sections. |
| Fix | Define shared spacing tokens and apply uniformly: `py-20` (desktop) / `py-16` (mobile) for all sections, with `clamp()` fallbacks tied to `--space-*` tokens. |

### VB-004: Anchor Navigation Offset Mismatch

| Property | Value |
|----------|-------|
| Location | `src/App.tsx:67`, `src/components/Navbar.tsx:46-48` |
| Severity | Medium |
| Root cause | `hashOffset` uses magic numbers (`88` default, `152` for buildos mobile) that don't derive from `--nav-height`. Navbar link clicks use `setTimeout(..., 80)` before scrolling, which races with the Lenis scroll controller. |
| Fix | Derive `hashOffset` from `getComputedStyle(document.documentElement).getPropertyValue('--nav-height')` plus a consistent gutter (12px). Remove the arbitrary 80ms delay or synchronize with Lenis. |

### VB-005: Duplicate/Dead CSS in App.css

| Property | Value |
|----------|-------|
| Location | `src/App.css` (entire file, 184 lines) |
| Severity | Low |
| Root cause | `App.css` contains rules for `.counter`, `.hero .base`, `#center`, `#next-steps`, `#docs`, `#spacer`, `.ticks` — none of which exist in current markup. These are orphan rules from a previous project iteration. |
| Fix | Remove `App.css` entirely (or strip orphan rules), consolidating all styles into `index.css` design tokens. |

### VB-006: Typography Token Divergence (tokens.ts vs index.css)

| Property | Value |
|----------|-------|
| Location | `src/tokens.ts:27`, `src/index.css:43` |
| Severity | Medium |
| Root cause | `tokens.ts` declares `body: '"Inter", ...'` (banned per landing-page-design rules), while `index.css` correctly uses `Geist`. `tokens.ts` is not imported anywhere, so it's dead code but inconsistent. |
| Fix | Update `tokens.ts` body font to `Geist`, or remove `tokens.ts` since `index.css` `@theme` is the source of truth. |

### VB-007: BuildOS Product Showcase Buried at Chapter 5

| Property | Value |
|----------|-------|
| Location | `src/sections/BuildOS.tsx:518-576` |
| Severity | High |
| Root cause | The "Ecosystem" chapter (chapter 5 of 12) is where application screenshots first appear. The hero section shows only a logo mark, not actual product UI. The flagship case study should communicate product appearance immediately. |
| Fix | Restructure BuildOS section order: intro → role → problem/solution → actual mobile showcase → architecture → challenges → security → outcomes → roadmap. Move ecosystem/screenshots earlier in the visual hierarchy. |

### VB-008: Horizontal Overflow Risk

| Property | Value |
|----------|-------|
| Location | `src/index.css:134`, various grid components |
| Severity | Medium |
| Root cause | `overflow-x: hidden` is on `body` only. Some Tailwind grids (`grid-cols-5` hero metrics, `grid-cols-4` recognition, `grid-cols-12` work cards) may overflow on narrow viewports. No `max-w` enforcement on all grids. |
| Fix | Add `overflow-x: clip` to `html`/`body`, add `max-w-full` or `overflow-hidden` to grid containers, verify at 320px breakpoint. |

### VB-009: Hero Metrics Inconsistent Digit Formatting

| Property | Value |
|----------|-------|
| Location | `src/sections/Hero.tsx:22-28`, `src/data/content.ts:22-28` |
| Severity | Low |
| Root cause | Metrics mix whole numbers (1000, 96, 8), decimals (1.5), and currency prefixes (₹) without visual rhythm. Labels use `\n` in JSX strings which may not render as line breaks. |
| Fix | Normalize metric formatting, ensure labels render with proper `<br>` or separate elements, align digit precision visually. |

---

## BUILDOS-SPECIFIC ISSUES

| ID | Issue | Location | Severity |
|----|-------|----------|----------|
| BB-01 | Screenshots shown raw without phone frame | `BuildOS.tsx:555-572` | Critical |
| BB-02 | BuildOSHero (chapter 0) duplicates BuildOS section content | `BuildOSHero.tsx` + `BuildOS.tsx` | Medium |
| BB-03 | Architecture table collapses on mobile | `BuildOS.tsx:492-513` | Medium |
| BB-04 | Deployment table not responsive | `BuildOS.tsx:753-776` | Medium |
| BB-05 | Roadmap labels wrap awkwardly | `BuildOS.tsx:852-864` | Low |

---

## NEXT PHASE

Proceed to `DESIGN_SYSTEM_AUDIT.md` and `BUILDOS_SHOWCASE_AUDIT.md`.
