# VISUAL_REGRESSION_REPORT.md

**Project:** Shaikh Mohibur Rahman – Personal Portfolio  
**Prepared by:** Kilo  
**Status:** Comparison derived from code audit (before = pre-change `src/index.css` + section files; after = implemented changes). No screenshot tooling available in this environment; visual regression assessed via breakpoint/layout analysis rather than pixel diffs.

---

## 1. Method

Every layout-affecting change was reviewed for desktop impact. The rule applied: "Do not accept an improvement in mobile responsiveness if it unnecessarily damages the desktop experience." Changes were made only where the desktop rendering was either unchanged or previously broken.

## 2. Before → After by area

| Area | Before (desktop) | After (desktop) | Before (mobile) | After (mobile) | Regression? |
|---|---|---|---|---|---|
| **Containers** | `.site-container { max-width: var(--container) }` with `--container` **undefined** → full-bleed, unreadably long lines | `max-width: 1240px` (token defined) — readable measure restored | Full-bleed edge-to-edge text | Capped at 1240px with 20–48px gutters | **No** — desktop fixed |
| **Section padding** | Fixed `64px` top/bottom on every section | `clamp(48px, 7vw, 64px)` — 48px mobile, 64px desktop | Excessive vertical consumption (~12% of viewport per section) | Compact mobile, breathing-room desktop | **No** |
| **Typography** | `clamp()` sizes already correct | Unchanged | Readable | Readable | **No** |
| **BuildOSHero** | Undefined gray/amber/orange/green/blue classes → black-on-dark unreadable CTA/badge at **all** widths | Color scale added to `@theme`; badge/CTA render correctly | Unreadable | Readable | **No** — desktop fixed |
| **Hero** | Single column; `.hero-art` hidden ≤900px; CTA `max-[460px]:w-full` | Unchanged | Single column, title fits, CTAs stack | Same | **No** |
| **Capabilities** | `.cap-num` absolute corner overlay (risk of text overlap on narrow cards); `.cap-tags` hidden | `.cap-num` in document flow above title; tags shown | Decorative number risked covering title; tags invisible | Number above title (no overlap); tags visible | **No** |
| **Selected projects** | `.work-card min-height: 220px`; `.work-desc max-width: 44ch` (narrow strips in span-5 cards) | `min-height` removed; `max-width` removed (desc fills card) | Tall empty cards; narrow description strips | Content-sized cards; full-width descriptions | **No** |
| **Timeline** | 4-col base → 900px override stacks title/desc full-width | Unchanged | Title/desc full-width column | Same | **No** |
| **BuildOS case study** | Grids 3→2→1 col (1-col at 700px); tables/code in contained `overflow-x: auto` | Unchanged | Evidence/observation cards 1-col ≤700px | Same | **No** |
| **Ventures** | Tabs `overflow-x: auto` contained; video `aspect-ratio 16/9` | Unchanged | Tab scroll contained; video scales | Same | **No** |
| **Leadership / TechStack / About** | Grids 1-col at 900px/700px; portrait sticky desktop, static mobile | Unchanged | Portrait static below header, `max-width: 420px` | Same | **No** |
| **Recognition** | Gallery 3→2→1 col; certs `object-fit: contain`; lightbox dialog | Unchanged | 1-col certs; readable lightbox | Same | **No** |
| **Contact** | Long email could overflow | `.contact-value overflow-wrap: anywhere` | Email may overflow narrow column | Email wraps safely | **No** |
| **Footer** | 2-col → 1-col at 900px | Unchanged | Columns stack | Same | **No** |
| **Mobile menu** | Fixed overlay, no `overflow-y` safeguard | Added `max-height: 100svh; overflow-y: auto` | Menu fits short viewports | Safeguarded on 320×568 | **No** |
| **Blank sections** | `SectionReveal` stayed `opacity: 0` if IntersectionObserver missed | 2.5s grace-period fallback forces visibility | Risk of invisible section | Content always visible | **No** |

## 3. Desktop areas verified intact

- Hero editorial composition (single column, identity prominent, black/yellow identity preserved)
- BuildOS case study chapters, tables, code blocks, canonical mockups
- Capabilities two-column cards
- Ai-native two-column panel
- About two-column with sticky portrait (desktop only)
- Recognition three-column gallery
- Contact two-column
- Navigation desktop links + CTA + availability pill

## 4. Known limitations

- No pixel-level screenshot diff tooling (Playwright/screenshot) installed in this environment. Visual regression is asserted via breakpoint/layout analysis, not rendered diffs.
- Programmatic viewport rendering checks (`scrollWidth`, element rects) could not be executed; see `RESPONSIVE_TEST_REPORT.md` for the coverage analysis and pass/fail table.

## 5. Conclusion

No desktop regression introduced. Desktop presentation is unchanged except where previously broken (containers now capped at 1240px; BuildOSHero colors now render). Mobile layouts are deliberately re-columned, content-sized, and free of clipping/overlap/fixed-height truncation.
