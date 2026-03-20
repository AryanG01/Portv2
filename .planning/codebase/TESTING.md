# TESTING.md — Test Structure & Practices

**Analysis Date:** 2026-03-20

## Current State

**No tests exist.** Zero test files found across the entire codebase. No testing framework is installed.

## Testing Infrastructure

| Item | Status |
|------|--------|
| Test framework | ❌ Not installed |
| Test files | ❌ None |
| CI test step | ❌ Not configured |
| Coverage reporting | ❌ Not configured |
| E2E tests | ❌ Not configured |

## What Should Be Tested (if tests were added)

**High priority — API route (`app/api/contact/route.ts`):**
- Rate limiter correctly blocks after 3 requests/hour per IP
- Zod validation rejects malformed inputs (missing name, invalid email, short message)
- Turnstile verification: valid token passes, invalid token returns 400
- Successful email send returns `{ success: true }`
- Missing `RESEND_API_KEY` returns 500
- Turnstile skipped when `TURNSTILE_SECRET_KEY` not set (dev bypass)

**Medium priority — Data layer (`lib/profile.ts`):**
- `getProfile()` returns ProfileData when Supabase responds correctly
- `getProfile()` falls back to `data/profile.json` when Supabase throws
- Data shape matches TypeScript interfaces

**Lower priority — Components:**
- `useReducedMotion` returns `true` when `prefers-reduced-motion: reduce`
- `useReveal` triggers callback when element enters viewport
- Contact form shows error toast on failed submission
- Contact form shows success toast on successful submission

## Recommended Setup (if adding tests)

**Framework:** Vitest + React Testing Library
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event
```

**API route testing:** Use `next-test-api-route-handler` or mock `NextRequest`

**File placement:** Co-locate test files:
```
components/contact-form.tsx
components/contact-form.test.tsx
```

Or use `__tests__/` directory at project root.

## Notes

- The absence of tests is the single largest quality gap in this codebase
- The API route (rate limiter + CAPTCHA logic) is the highest-risk untested code
- Framer Motion animations are difficult to test and should be skipped or mocked
