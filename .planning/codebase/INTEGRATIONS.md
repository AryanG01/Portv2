# INTEGRATIONS.md — External Services & APIs

## Database — Supabase (PostgreSQL)
- **Client**: `@supabase/supabase-js`
- **Config**: `lib/supabase.ts`
- **Tables**: `profile`, `education`, `experience`, `projects`, `hackathons`, `skills`
- **Usage**: Profile data storage; fetched server-side with 1-hour revalidation cache
- **Fallback**: `data/profile.json` used when Supabase is unavailable
- **Seeding**: `scripts/seed-supabase.ts` — populates tables from JSON

## Email — Resend
- **Config**: `app/api/contact/route.ts`
- **Usage**: Contact form email delivery → `rajeevganju0@gmail.com`
- **Env var**: `RESEND_API_KEY`

## Bot Prevention — Cloudflare Turnstile
- **Usage**: Contact form CAPTCHA verification
- **Config**: `app/api/contact/route.ts` — server-side token verification
- **Env vars**: `CLOUDFLARE_TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`

## Rate Limiting
- **Implementation**: In-memory rate limiting in `app/api/contact/route.ts`
- **Type**: Per-IP request throttling on the contact API endpoint

## GitHub (Data Source)
- **Usage**: GitHub activity/contributions displayed in portfolio
- **Method**: GitHub API (public, no auth required for public data)

## Vercel (Hosting)
- **Platform**: Vercel
- **Cache**: Next.js `revalidate: 3600` (1-hour ISR) for profile data
- **Config**: Standard Next.js 16 Vercel deployment

## Environment Variables
| Variable | Service | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Public URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Public anon key |
| `RESEND_API_KEY` | Resend | Server-only |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | Cloudflare | Server-only |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | Cloudflare | Public |
