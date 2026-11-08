# BEFORE-AFTER VISUAL REPORT

**Project:** Shaikh Mohibur Rahman Portfolio — V2 Visual Reconstruction  
**Date:** 2026-11-06

---

## BEFORE (V1)

### Navigation
- Sticky navigation overlapped section headings on anchor click
- Hash offset used magic numbers (88px/152px) disconnected from navbar height
- Navbar link clicks used arbitrary 80ms setTimeout delay

### BuildOS Case Study
- BuildOSHero duplicated content from BuildOS section (metrics, tech stack, cards)
- Application screenshots buried at Chapter 5 (deep in 12-chapter case study)
- Screenshots rendered raw without phone frames — no visual consistency
- Each screenshot had independent dimensions — no uniform device family
- No captions outside device frames (no frames existed)

### Layout
- Section padding inconsistent: `clamp(88px, 10vw, 136px)` vs `py-20` vs `py-96`
- No shared layout tokens
- App.css contained orphan rules from previous project (`.counter`, `#center`, etc.)

### Typography
- `tokens.ts` declared Inter (banned font) while `index.css` used Geist
- No unified typography tokens

### Contact Section
- Title `max-width: 13ch` caused awkward wrapping and potential overlap
- Line-height 0.94 too tight for readability

### Recognition Gallery
- Certificate images used `object-fit: cover` — could crop certificate info

### Ventures (MeSure)
- Video used `aspect-ratio: 9/16` (portrait) instead of 16:9 (landscape)
- Video width limited to 300px — too small on desktop

---

## AFTER (V2)

### Navigation
- `--nav-height` CSS variable (64px) used consistently
- `scroll-margin-top: calc(var(--nav-height) + var(--space-md))` on all sections
- Hash offset derived from `--nav-height` + 12px gutter
- Navbar link clicks use Lenis smooth scroll with proper offset
- No heading overlap on anchor navigation

### BuildOS Case Study
- BuildOSHero condensed: name, tagline, one-line description, CTA, logo mark only
- Application screenshots moved to Chapter 4 (immediately after product intro)
- All 7 screenshots wrapped in identical `BuildOSMobileMockup` frames
- Canonical frame: 250px × 510px (desktop), proportionally scaled for tablet/mobile
- All screenshots use `object-fit: contain` with neutral background
- Captions positioned outside device frame with feature title + description
- Product-first ordering: problem → discovery → product → showcase → architecture

### Layout
- Unified section padding: `var(--space-2xl)` with consistent gutters
- Shared layout tokens in `index.css` @theme
- App.css cleaned (orphan rules removed)

### Typography
- `tokens.ts` body font updated to Geist (consistent with `index.css`)
- Hero gradient heading: `#FFFFFF → #9B9B9B`
- Hero max-width: 680px
- CTA copy: verb + benefit ("See BuildOS case study", "Start a conversation")
- No banned filler words anywhere

### Contact Section
- Title `max-width: 60ch` (was 13ch) — readable line length
- Line-height 1.05 (was 0.94) — proper readability

### Recognition Gallery
- Certificate images use `object-fit: contain` — no cropping
- Neutral black background for unused space

### Ventures (MeSure)
- Video uses `aspect-ratio: 16/9` (landscape) — correct for video
- Video max-width 640px (was 300px) — appropriate desktop size

### New Components

| Component | Purpose |
|-----------|---------|
| `BuildOSMobileMockup` | Identical phone frame for all BuildOS screenshots |
| `DEVICE_MOCKUP_VALIDATION.md` | Documented mockup dimensions and validation |
| `RESPONSIVE_TEST_REPORT.md` | 9 breakpoints tested, all pass |
| `INTERACTION_TEST_REPORT.md` | All interactions verified |

---

## VISUAL IMPROVEMENT SUMMARY

| Area | Before | After |
|------|--------|-------|
| Nav overlap | Headings hidden behind navbar | Clear offset, no overlap |
| BuildOS showcase | Chapter 5, raw images | Chapter 4, framed mockups |
| Device frames | None (inconsistent) | Identical across all 7 screenshots |
| Section padding | Inconsistent | Unified design tokens |
| Typography | Mixed Inter/Geist | Unified Geist |
| CTA copy | "Explore BuildOS", "Let's talk" | "See BuildOS case study", "Start a conversation" |
| Video aspect | 9:16 (portrait) | 16:9 (landscape) |
| Certificate images | `object-fit: cover` | `object-fit: contain` |

---

## BUILD METRICS

| Metric | Value |
|--------|-------|
| Build time | ~6 seconds |
| JS bundle (gzipped) | ~230 kB |
| CSS bundle (gzipped) | ~19 kB |
| HTML size | ~1.35 kB |
| Chunks | 4 (vendor-react, vendor-animation, vendor-radix, app) |
