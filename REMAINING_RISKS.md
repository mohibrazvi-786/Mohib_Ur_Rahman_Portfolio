# REMAINING RISKS

**Date:** 2026-11-06
**Project:** shaikhmohibsm Portfolio
**Location:** C:\Users\91842\Desktop\portfolio

---

## 1. RISK SUMMARY

| Risk ID | Description | Severity | Status | Mitigation |
|---------|-------------|----------|--------|------------|
| R1 | JS bundle size | Medium | Accepted | Chunk-split by vendor type; largest chunk 254 kB, gzipped ~80 kB |
| R2 | Skip-to-content link | Low | Fixed | Added to index.html with CSS focus styling |
| R3 | Cursor component unused | Low | Outstanding | Component exists in src/components/ but not imported in App.tsx |
| R4 | ResponsiveTester component unused | Low | Outstanding | Component exists in src/components/ but not imported in App.tsx |
| R5 | Contact section uses mailto: | Low | Accepted | No backend available; form would require server-side handling |
| R6 | Email address publicly displayed | Medium | Accepted | Intentionally public for recruitment purposes |
| R7 | Personal location publicly displayed | Low | Accepted | Intentionally public for recruitment purposes |
| R8 | BuildOS technology references | Low | Generalized | Infrastructure providers and implementation details removed |
| R9 | Automated security scanning in CI | Medium | Fixed | Gitleaks workflow added at .github/workflows/secret-scanning.yml |
| R10 | Source map exclusion | Low | Accepted | Vite production build does not generate source maps by default |

---

## 2. DETAILED RISK ANALYSIS

### R1 — JS Bundle Size (Accepted)
**Description:** Total JS is split into vendor chunks: vendor-react (254 kB), vendor-animation (165 kB), vendor (155 kB), app code (131 kB). No single chunk exceeds 500 kB.
**Impact:** Acceptable for a portfolio with Three.js, Framer Motion, GSAP, and animation libraries.
**Mitigation:** Manual chunk splitting in vite.config.ts; unused animejs/react-animejs dependencies removed.
**Status:** Accepted

### R2 — Skip-to-content link (Fixed)
**Description:** No skip-to-content link for keyboard users.
**Mitigation:** Added `<a href="#main-content" class="skip-to-content">` to index.html with CSS focus styling in index.css. Added id="main-content" to `<main>` in App.tsx.
**Status:** Fixed

### R3 — Cursor component unused (Outstanding)
**Description:** src/components/Cursor.tsx exists but is not imported anywhere in the production code.
**Impact:** None - dead code, no runtime effect.
**Mitigation:** Can be removed during future cleanup.
**Status:** Outstanding (no runtime impact)

### R4 — ResponsiveTester component unused (Outstanding)
**Description:** src/components/ResponsiveTester.tsx exists but is not imported anywhere in the production code.
**Impact:** None - dead code, no runtime effect.
**Mitigation:** Can be removed during future cleanup.
**Status:** Outstanding (no runtime impact)

### R5 — Contact section uses mailto: (Accepted)
**Description:** Contact section uses mailto: links instead of a contact form.
**Impact:** Users must use their email client; no server-side form processing.
**Mitigation:** Acceptable for a portfolio without backend infrastructure.
**Status:** Accepted

### R6 — Email address publicly displayed (Accepted)
**Description:** Email address is displayed on the website.
**Impact:** Potential for email harvesting by spammers.
**Mitigation:** Intentionally public for recruitment purposes.
**Status:** Accepted

### R7 — Personal location publicly displayed (Accepted)
**Description:** Location is displayed on the website.
**Impact:** Personal location information is public.
**Mitigation:** Intentionally public for recruitment purposes.
**Status:** Accepted

### R8 — BuildOS technology references (Generalized)
**Description:** BuildOS case study previously referenced specific infrastructure providers and implementation details.
**Mitigation:** All infrastructure providers (Render, Supabase, Cloudflare Pages, Netlify), specific technologies (FastAPI, SQLAlchemy, Alembic, Pydantic), and security implementation details (JWT, bcrypt, RBAC matrix, idempotency keys, RLS) have been generalized or removed.
**Status:** Generalized

### R9 — Automated security scanning in CI (Fixed)
**Description:** No automated secret scanning in CI pipeline.
**Mitigation:** Added GitHub Actions workflow at .github/workflows/secret-scanning.yml with Gitleaks integration. Added .gitleaks.toml with narrow exclusions and false-positive handling documentation.
**Status:** Fixed

### R10 — Source map exclusion (Accepted)
**Description:** No explicit source map exclusion configured in Vite.
**Impact:** Vite does not generate source maps in production builds by default.
**Mitigation:** Vite default behavior is acceptable; no source maps in production output.
**Status:** Accepted

---

## 3. RISKS ACCEPTED

| Risk | Reason for Acceptance |
|------|----------------------|
| R1 | Bundle chunks well-organized; largest single chunk 254 kB uncompressed |
| R5 | No backend available; contact form would require server-side handling |
| R6 | Intentionally public for recruitment |
| R7 | Intentionally public for recruitment |
| R8 | Technology choices are not security vulnerabilities; infrastructure details removed |
| R10 | Vite default behavior; no source maps in production |

---

## 4. RISKS OUTSTANDING (NON-BLOCKING)

| Risk | Reason |
|------|--------|
| R3 | Cursor component exists but is not imported; no runtime impact |
| R4 | ResponsiveTester component exists but is not imported; no runtime impact |

---

## 5. RISKS NOT ACCEPTED (BLOCKERS)

None. All identified risks are either fixed, accepted, or outstanding with no runtime impact.

---

## 6. DEPLOYMENT READINESS

**Recommendation:** READY FOR DEPLOYMENT

**Evidence:**
1. All critical security issues remediated ✅
2. Production build passes ✅
3. TypeScript type check passes ✅
4. Lint passes with warnings only ✅
5. No credentials exposed in frontend resources ✅
6. BuildOS case study sanitized ✅
7. SEO metadata added ✅
8. Skip-to-content link added for accessibility ✅
9. Gitleaks CI integration added ✅
10. Bundle size optimized with manual chunk splitting ✅
11. Unused dependencies removed ✅
12. Responsive design validated at all breakpoints ✅

**Not Deployed:** Per implementation rules, no deployment has occurred. Deployment requires explicit authorization.

---

**Blockers:** None
