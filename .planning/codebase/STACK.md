# STACK.md — Technology Stack

## Language & Runtime
- **Language**: TypeScript 5
- **Runtime**: Node.js 25.6.0
- **Package Manager**: pnpm

## Frameworks
- **Next.js**: 16.1.6 (App Router)
- **React**: 19.2.3

## Styling
- **Tailwind CSS**: v4

## Animation Libraries
- **GSAP**: 3.14.2 — used for advanced timeline animations
- **motion**: 12.31.0 (Framer Motion) — imported via `motion/react`, used for layout animations, card morphing

## Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Framework |
| `react` | 19.2.3 | UI library |
| `typescript` | 5.x | Type safety |
| `tailwindcss` | 4.x | Styling |
| `gsap` | 3.14.2 | Timeline animations |
| `motion` | 12.31.0 | Layout/spring animations |
| `@supabase/supabase-js` | latest | Database client |
| `resend` | latest | Email delivery |
| `react-icons` | latest | Icon library (fa, si sets) |

## Configuration Files
- `next.config.ts` — Next.js config
- `tsconfig.json` — TypeScript config
- `tailwind.config.ts` — Tailwind config (v4)
- `.env.local` — Local environment variables (gitignored)
- `package.json` — Dependencies and scripts

## Build & Deploy
- **Bundler**: Turbopack (Next.js 16 default)
- **Deployment**: Vercel
- **Build command**: `next build`
- **Dev command**: `next dev`
