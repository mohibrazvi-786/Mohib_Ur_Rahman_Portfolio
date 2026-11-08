# Shaikh Mohibur Rahman — Portfolio

Personal portfolio and engineering case studies, deployed as a static site on GitHub Pages.

The site is a single-page React application. The flagship section is a twelve-chapter BuildOS
case study covering discovery, product scoping, architecture, security, deployment and
forward-deployed engineering.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 plus a hand-authored design system in `src/index.css`
- Framer Motion, GSAP/ScrollTrigger and Lenis for restrained motion
- Three.js / React Three Fiber for the hero scene

No new runtime dependencies were added for the BuildOS case study.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc -b && vite build
npm run preview  # serve the production build
npm run lint     # oxlint
```

## BuildOS case study

- Entry point: the `BuildOS` link in the main navigation, or the "Explore BuildOS" hero action.
- Section: `src/sections/BuildOS.tsx`
- Content: `src/data/buildos.ts` — all case-study claims, statuses and limitations live here.
- Screenshots and mark: `public/assets/buildos/`
- Styling: the `BUILDOS CASE STUDY` block in `src/index.css` (scoped amber/charcoal tokens).

The case study uses only real application screenshots. Architecture, Git cadence and FDE
process views are code-drawn illustrations based on the documented BuildOS repository, not
fabricated product screens. Status language distinguishes deployed, tested, validated and
planned work; no user-count, revenue or completed-pilot claims are made.

Local chapter navigation is implemented with in-page anchors: a sticky chapter rail on
desktop and a sticky horizontally scrollable chapter bar below 1024px. Both update as the
reader scrolls.

## GitHub Pages compatibility

`vite.config.ts` sets `base: './'`, so the production build uses relative asset URLs and works
from a repository subpath. All BuildOS image paths are relative (`assets/...`). The site uses
in-page hash links (`#buildos-problem`, etc.), not client-side routes, so a refresh on any
section URL does not require a server rewrite. No backend or Pages Functions are used.

The repository copy in this workspace does not contain a `.github/workflows` directory or a
`CNAME` file. The existing deployment method and custom-domain state could not be re-verified
here; the static `dist/` output is unchanged in structure and remains compatible with the
current Pages workflow.

## Verified checks

- `npm run build` passes.
- `npm run lint` passes with five pre-existing warnings in `ParticleField.tsx` and `Cursor.tsx`
  (unrelated to the case study).
- Headless browser QA at 1440px, 900px and 390px found no console errors, no failed BuildOS
  image requests and no horizontal overflow inside the BuildOS section.
- Direct hash links (for example `/#buildos-architecture`) were validated at 390px and land
  below the sticky chapter bar after web fonts settle.
- Public product link verified: `https://buildosweb.netlify.app`. The admin console is intentionally not linked from the public portfolio.

## Known limitations

- The BuildOS source repository is private and is not present in this workspace; repository
  facts in the case study are preserved from the project documentation rather than re-derived.
- The single JS bundle is ~490 KB gzipped and triggers Vite's 500 KB warning, driven by the
  Three.js hero scene and the shadcn/Radix UI primitives. The BuildOS content is static and
  does not add a runtime service dependency.
- `public/assets/portrait/mesure-iot-fuel-measurement-device-demo.mp4` is a 20 MB existing
  asset and dominates deployment size.
