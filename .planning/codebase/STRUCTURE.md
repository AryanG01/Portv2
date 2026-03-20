# Codebase Structure

**Analysis Date:** 2026-03-20

## Directory Layout

```
Portfoliov2/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # POST /api/contact
│   ├── accessibility/
│   │   └── page.tsx              # Accessibility info page
│   ├── error.tsx                 # Error boundary
│   ├── layout.tsx                # Root layout (fonts, providers, metadata)
│   ├── loading.tsx               # Loading skeleton
│   ├── not-found.tsx             # 404 page
│   ├── page.tsx                  # Home page (server component, entry point)
│   ├── globals.css               # Global styles and CSS variables
│   ├── robots.ts                 # robots.txt metadata
│   └── sitemap.ts                # sitemap.xml metadata
│
├── components/                   # React components
│   ├── sections/                 # Content sections
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── experience.tsx        # GSAP scroll timeline
│   │   ├── hackathons.tsx
│   │   ├── hero.tsx
│   │   ├── projects.tsx          # Grid with skill filtering
│   │   └── skills.tsx            # Proficiency levels + toggle
│   ├── background-effects.tsx
│   ├── contact-form.tsx          # Zod-validated form
│   ├── custom-cursor.tsx
│   ├── experience-card.tsx
│   ├── github-activity.tsx
│   ├── keyboard-nav.tsx
│   ├── lighthouse-badge.tsx
│   ├── magnetic-button.tsx
│   ├── nav.tsx
│   ├── page-content.tsx          # Main orchestrator (client component)
│   ├── project-card.tsx          # Layout morph animation source
│   ├── project-detail-modal.tsx  # Layout morph animation target
│   ├── scroll-progress.tsx
│   ├── section-wrapper.tsx       # Consistent section layout
│   ├── skill-chip.tsx
│   ├── smooth-scroll-provider.tsx # Lenis + GSAP
│   └── toast.tsx                 # Toast context + component
│
├── hooks/                        # Custom hooks
│   ├── use-reduced-motion.ts     # prefers-reduced-motion listener
│   └── use-reveal.ts             # IntersectionObserver scroll reveal
│
├── lib/                          # Server utilities
│   ├── profile.ts                # Types + data fetching (Supabase + fallback)
│   └── supabase.ts               # Supabase client init
│
├── data/
│   └── profile.json              # Local fallback profile data
│
├── public/                       # Static assets
│   ├── manifest.json
│   └── [icons, images]
│
├── scripts/
│   ├── schema.sql                # Supabase table definitions
│   └── seed-supabase.ts          # DB seeding script
│
├── docs/plans/                   # Planning documents
├── .planning/codebase/           # GSD codebase analysis
├── .env.local                    # Local env vars (gitignored)
├── next.config.ts
├── tsconfig.json                 # Path alias: @/* → root
├── package.json
└── pnpm-lock.yaml
```

## Key File Locations

| Purpose | File |
|---------|------|
| Home page (server) | `app/page.tsx` |
| Content orchestrator (client) | `components/page-content.tsx` |
| Root layout | `app/layout.tsx` |
| Global CSS / design tokens | `app/globals.css` |
| Profile data + types | `lib/profile.ts` |
| Supabase client | `lib/supabase.ts` |
| Contact API | `app/api/contact/route.ts` |
| Local data fallback | `data/profile.json` |
| DB schema | `scripts/schema.sql` |

## Naming Conventions

| Category | Convention | Examples |
|----------|-----------|---------|
| Components | `kebab-case.tsx` | `project-card.tsx`, `section-wrapper.tsx` |
| Hooks | `use-kebab-case.ts` | `use-reduced-motion.ts`, `use-reveal.ts` |
| Utilities | `kebab-case.ts` | `supabase.ts`, `profile.ts` |
| Pages | `page.tsx` | Next.js App Router convention |
| API routes | `route.ts` | Next.js App Router convention |
| CSS variables | `--kebab-case` | `--accent`, `--background`, `--gold` |

## Where to Add New Code

| What | Where |
|------|-------|
| New portfolio section | `components/sections/new-section.tsx` → import in `page-content.tsx` |
| Reusable UI component | `components/new-component.tsx` |
| Custom hook | `hooks/use-hook-name.ts` |
| Server utility | `lib/utility-name.ts` |
| New API endpoint | `app/api/endpoint-name/route.ts` |
| Static data | `data/profile.json` or new JSON in `data/` |
| New page route | `app/route-name/page.tsx` |

## Path Alias

`@/*` maps to project root — use in all imports:
```ts
import { SectionWrapper } from "@/components/section-wrapper"
import { useReveal } from "@/hooks/use-reveal"
import type { ProfileData } from "@/lib/profile"
```
