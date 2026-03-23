# Project Context

Portfolio v2 — personal portfolio site for Aryan Ganju, a final-year CS student at NUS
(AI + Database Systems specialisation).

**Live site:** Deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript 5, React 19
- **Styling:** Tailwind CSS v4 + CSS custom properties in `app/globals.css`
- **Animation:** Framer Motion via `motion/react` (not `framer-motion`), GSAP 3 + ScrollTrigger, Lenis smooth scroll
- **Database:** Supabase (PostgreSQL) — 6 tables: profile, education, experience, projects, hackathons, skills
- **Email:** Resend (`app/api/contact/route.ts`)
- **Bot protection:** Cloudflare Turnstile on contact form
- **Package manager:** pnpm

## Build & Run

```bash
pnpm install
pnpm dev        # next dev (Turbopack)
pnpm build      # next build
pnpm start      # next start
```

## Key Conventions

- `"use client"` directive is always the first line of client components
- Import Framer Motion from `motion/react`, never from `framer-motion`
- All internal imports use the `@/*` path alias (maps to project root)
- Components are `kebab-case.tsx` files with `PascalCase` default exports
- Hooks live in `hooks/use-*.ts` with named exports
- CSS variables defined in `app/globals.css` — use `var(--accent)`, `var(--gold)`, etc.
- Card bg: `rgba(21, 29, 25, 0.5)` + `backdrop-blur(12px)`, border: `rgba(16, 185, 129, 0.08)`
- Always check `useReducedMotion()` in animation-heavy components

## Architecture Notes

```
app/page.tsx (server)        → fetches ProfileData via lib/profile.ts (Supabase + JSON fallback)
  └── components/page-content.tsx (client)   → orchestrates all sections, owns activeSkill state
        ├── components/sections/*.tsx         → self-contained content sections
        ├── components/*-card.tsx             → animated cards with layout morph (LayoutGroup/layoutId)
        └── components/smooth-scroll-provider.tsx  → Lenis + GSAP integration

app/api/contact/route.ts     → POST handler: Zod validation → Turnstile verify → rate limit → Resend
lib/profile.ts               → ProfileData types + server-side fetch with unstable_cache (1h TTL)
data/profile.json            → local fallback when Supabase is unavailable
```

**State management:** No global store. Cross-section state (e.g., `activeSkill` for filtering projects
by skill) lives in `page-content.tsx` as the nearest common ancestor.

**Modal pattern:** Project cards use Framer Motion `layoutId` + ghost placeholder to prevent grid shift.

## Env Vars (required)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

## Known Issues / Watch Out

- In-memory rate limiter in `api/contact/route.ts` doesn't persist across Vercel cold starts
- `unstable_cache` (Next.js) — API may change; watch Next.js release notes
- No tests exist — highest-risk untested code is the contact API
- Supabase anon key is public; ensure RLS policies are correctly set
