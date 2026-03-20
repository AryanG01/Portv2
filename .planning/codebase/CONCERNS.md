# CONCERNS.md — Technical Debt & Issues

**Analysis Date:** 2026-03-20

## Critical

### No Test Coverage
- **Severity:** High
- **Location:** Entire codebase
- **Issue:** Zero tests. No framework installed. Rate limiter, CAPTCHA verification, email logic, and data fetching are all untested.
- **Risk:** Regressions go undetected; contact form bugs could silently fail

### In-Memory Rate Limiter Won't Survive Restarts
- **Severity:** High
- **Location:** `app/api/contact/route.ts:13`
- **Issue:** `rateMap` is a module-level `Map`. Vercel Serverless Functions can spin up multiple instances — each instance has its own memory. Rate limit resets on every cold start and is not shared across instances.
- **Risk:** Rate limiting is effectively bypassed on Vercel in production
- **Fix:** Use Redis (Upstash) or Vercel KV for distributed rate limiting

## Security

### Hardcoded Email Recipient
- **Severity:** Medium
- **Location:** `app/api/contact/route.ts:97`
- **Issue:** `to: "rajeevganju0@gmail.com"` is hardcoded. Should be an environment variable.
- **Fix:** `process.env.CONTACT_EMAIL ?? "rajeevganju0@gmail.com"`

### Turnstile Silently Disabled Without Config
- **Severity:** Medium
- **Location:** `app/api/contact/route.ts:34`
- **Issue:** `if (!secret) return true` — bot protection is silently skipped if `TURNSTILE_SECRET_KEY` is not set. Intentional for dev, but risky if env var is accidentally missing in production.
- **Fix:** Log a warning and fail closed in production (`process.env.NODE_ENV === 'production'`)

### Supabase Anon Key is Public
- **Severity:** Low (by design)
- **Location:** `lib/supabase.ts`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Issue:** The anon key is exposed to the browser. Ensure Supabase RLS (Row Level Security) policies are correctly configured for public read-only access.
- **Risk:** If RLS is misconfigured, data could be mutable via the client

## Performance

### GitHub API Without Authentication
- **Severity:** Medium
- **Location:** `components/github-activity.tsx`
- **Issue:** GitHub public API calls are rate-limited to 60 requests/hour for unauthenticated requests. Portfolio traffic or CI could exhaust this.
- **Fix:** Add `Authorization: Bearer <GITHUB_TOKEN>` header (5000 req/hr with auth)

### Multiple Animation Loops
- **Severity:** Low
- **Location:** Various components using GSAP ScrollTrigger + Framer Motion simultaneously
- **Issue:** Both libraries attach scroll listeners. On low-powered devices this could cause jank.
- **Mitigation:** `useReducedMotion` hook already disables heavy animations — ensure it's used consistently

### No Image Optimization for GitHub Avatars
- **Severity:** Low
- **Issue:** External images may bypass `next/image` optimization
- **Fix:** Use `next/image` with `remotePatterns` config for GitHub CDN images

## Technical Debt

### `unstable_cache` Usage
- **Severity:** Low
- **Location:** `lib/profile.ts`
- **Issue:** `unstable_cache` from Next.js is marked unstable and may change. It's the recommended approach for Next.js 15/16, but the API could evolve.
- **Note:** Monitor Next.js releases; `'use cache'` Cache Components are the future replacement

### No Error Monitoring
- **Severity:** Medium
- **Issue:** No Sentry, Datadog, or similar. Errors in production are invisible. The `app/error.tsx` boundary catches client errors but doesn't report them anywhere.
- **Fix:** Add `@sentry/nextjs` or Vercel's built-in observability

### No Structured Logging
- **Severity:** Low
- **Issue:** `console.warn` and `console.error` are used ad-hoc. No log levels, no correlation IDs, no structured format.
- **Impact:** Hard to debug production issues

### Missing `.env.example`
- **Severity:** Low
- **Issue:** `.env.example` exists but may be incomplete relative to all required vars
- **Required vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

## Fragile Areas

### Profile Data Type Casting
- **Severity:** Low
- **Location:** `lib/profile.ts`
- **Issue:** Supabase returns untyped JSON; data is cast to TypeScript interfaces without runtime validation. If schema changes, TypeScript won't catch the mismatch at runtime.
- **Fix:** Use Zod to parse Supabase responses

### Modal Scroll Lock
- **Severity:** Low
- **Location:** `components/project-detail-modal.tsx`
- **Issue:** When project modal is open, background scroll behavior depends on CSS; if scroll lock isn't applied, background may scroll unexpectedly on some browsers.

### Ghost Placeholder Height
- **Severity:** Low
- **Location:** `components/sections/projects.tsx`
- **Issue:** Ghost div preventing grid shift must match card height exactly. If card content changes height dynamically, layout shift can still occur.

## Missing Features / Gaps

| Gap | Impact | Notes |
|-----|--------|-------|
| No tests | High | Largest quality gap |
| No error monitoring | Medium | Silent production failures |
| No distributed rate limiting | High | In-memory doesn't work on Vercel |
| No CI/CD pipeline | Medium | No automated quality gates |
| No analytics | Low | Can't measure traffic or engagement |
| No PWA offline support | Low | manifest.json exists but no service worker |

## Dependencies to Watch

| Package | Concern |
|---------|---------|
| `motion` (Framer Motion) | v12 — major version; check breaking changes on upgrade |
| `gsap` | License: GSAP standard license is free for non-commercial; verify for portfolio use |
| `zod/v4` | v4 import path — non-standard; ensure team is aware |
| `@supabase/supabase-js` | Keep updated for security patches |
