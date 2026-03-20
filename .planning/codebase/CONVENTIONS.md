# CONVENTIONS.md — Code Style & Patterns

**Analysis Date:** 2026-03-20

## Language & Type Safety

- **TypeScript strict mode** throughout; no `any` types observed
- Interfaces preferred over type aliases for object shapes (e.g., `SectionWrapperProps`, `ProfileData`)
- Explicit return types on utility functions; inferred on components
- Zod used for runtime validation at API boundary (`z.object`, `schema.safeParse`)
- `zod/v4` import path (not `zod`) — note v4 syntax differences

## Component Patterns

**Directive placement:**
```tsx
"use client";  // Always first line when needed

import { ... } from "..."
```

**Component structure order:**
1. Imports
2. Constants / config objects (e.g., `SECTION_GLOWS`, `CONTEXT_COLORS`)
3. Interface/type definitions
4. Component function (default export)
5. Internal sub-components (if any, at bottom)

**Default exports** for all components:
```tsx
export default function ComponentName({ prop }: Props) { ... }
```

**Named exports** for hooks and utilities:
```tsx
export function useReducedMotion() { ... }
export async function getProfile(): Promise<ProfileData> { ... }
```

## Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Components | PascalCase function | `SectionWrapper`, `ProjectCard` |
| Files | kebab-case | `section-wrapper.tsx`, `project-card.tsx` |
| Props interfaces | `ComponentNameProps` | `SectionWrapperProps` |
| Hooks | `use` prefix, camelCase | `useReducedMotion`, `useReveal` |
| Constants | `SCREAMING_SNAKE_CASE` | `SECTION_GLOWS`, `RATE_LIMIT` |
| CSS vars | `--kebab-case` | `--accent`, `--gold`, `--background` |
| Event handlers | `on` prefix on props, `handle` prefix internally | `onSkillToggle`, `handleSubmit` |

## Animation Patterns

**Framer Motion import** — always from `motion/react`, not `framer-motion`:
```tsx
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
```

**Reduced motion check** — required on all animation-heavy components:
```tsx
const reduced = useReducedMotion();
// ...
transition={reduced ? { duration: 0 } : springConfig}
```

**Layout morph pattern** (card → modal):
```tsx
<LayoutGroup>
  <motion.div layoutId={`card-${id}`}>...</motion.div>
  {selected && <Modal layoutId={`card-${id}`} />}
</LayoutGroup>
```

**Scroll-driven animations** via `useScroll` + `useTransform`:
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
```

**viewport: { once: true }** on `whileInView` — prevents re-triggering on scroll up.

## Styling Patterns

**Tailwind for structure, CSS vars for theming:**
```tsx
className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12"
style={{ background: "var(--gradient-emerald-cyan)" }}
```

**Card background:** `rgba(21, 29, 25, 0.5)` with `backdrop-blur(12px)`

**Accent border:** `rgba(16, 185, 129, 0.08)`

**Responsive breakpoints:** `md:` and `lg:` prefixes; mobile-first

**`aria-hidden="true"`** on decorative animated divs

## Data Fetching

**Server-side with cache:**
```ts
import { unstable_cache } from "next/cache";
const cached = unstable_cache(fetchFn, ["cache-key"], { revalidate: 3600 });
```

**Fallback pattern:**
```ts
try {
  const data = await fetchFromSupabase();
  return data;
} catch {
  console.warn("Falling back to local JSON");
  return localFallback;
}
```

## API Route Patterns

**Standard structure** (`app/api/*/route.ts`):
1. Define Zod schema at module level
2. Rate limit check first
3. Parse + validate body with `safeParse`
4. Business logic
5. Return `NextResponse.json()`

**Error responses:** Always `{ error: string }` shape with appropriate HTTP status

**IP extraction:**
```ts
const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
```

## State Management

- **No global state library** — React `useState` + prop drilling
- Cross-section state lives in `page-content.tsx` (nearest common ancestor)
- Context used only for truly cross-cutting concerns (Toast, smooth scroll)

## Imports

Path alias `@/*` used for all internal imports:
```tsx
import { useReveal } from "@/hooks/use-reveal";
import type { ProfileData } from "@/lib/profile";
```

External packages imported by package name:
```tsx
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
```
