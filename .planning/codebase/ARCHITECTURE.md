# Architecture

**Analysis Date:** 2026-03-20

## Pattern Overview

**Overall:** Next.js App Router with SSR/Client Hybrid Pattern

**Key Characteristics:**
- Server-side data fetching with cached profile data (1-hour revalidation)
- Client-side interactive state management for section visibility and selections
- Scroll-triggered animations via Framer Motion + GSAP
- Modular section-based component architecture with composition
- Provider pattern for cross-cutting concerns (ToastProvider, SmoothScrollProvider)

## Layers

**Server/Data Layer:**
- Purpose: Fetch and cache profile data from Supabase with local JSON fallback
- Location: `lib/profile.ts`, `lib/supabase.ts`, `data/profile.json`
- Contains: Data fetching logic, type definitions for all entities (Project, ExperienceEntry, Education, etc.), Supabase client initialization
- Depends on: Supabase SDK, Next.js unstable_cache
- Used by: Root page component at `app/page.tsx`

**API Layer:**
- Purpose: Handle external requests (contact form submission) with validation and rate limiting
- Location: `app/api/contact/route.ts`
- Contains: POST handler for contact emails, request validation with Zod, Turnstile CAPTCHA verification, IP-based rate limiting
- Depends on: Resend email SDK, Cloudflare Turnstile verification, Zod validation
- Used by: Contact form component via fetch

**Presentation/Layout Layer:**
- Purpose: Establish overall page structure, fonts, metadata, global providers
- Location: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Contains: Root HTML structure, Google fonts setup, metadata configuration, ToastProvider and Lenis scroll wrapper
- Depends on: Next.js metadata API, provider components
- Used by: All pages and routes

**Section/Page Content Layer:**
- Purpose: Orchestrate all content sections with dividers and manage cross-section state
- Location: `components/page-content.tsx`
- Contains: Main content orchestrator that renders all sections (Hero, About, Experience, Projects, Skills, Contact), Divider component, activeSkill state for cross-section filtering
- Depends on: All section components, background effects, navigation
- Used by: Root page as client component

**Section Components Layer:**
- Purpose: Self-contained content sections with their own animations and interactions
- Location: `components/sections/*.tsx` (hero, about, experience, projects, hackathons, skills, contact)
- Contains: Hero intro, About text, Experience timeline with GSAP animations, Project grid with layout morphing, Hackathon list, Skill categories with proficiency levels, Contact form
- Depends on: Section wrapper, various UI components, animations libraries
- Used by: page-content orchestrator

**UI Component Layer:**
- Purpose: Reusable interactive components and visual elements
- Location: `components/*.tsx` (project-card, experience-card, skill-chip, contact-form, magnetic-button, etc.)
- Contains: Card components with animations, form inputs, buttons, modals, icons, badges
- Depends on: Framer Motion, React Icons, hooks
- Used by: Section components

**Provider/Hook Layer:**
- Purpose: Cross-cutting concerns like reduced-motion detection, scroll reveals, toast notifications, smooth scrolling
- Location: `hooks/*.ts`, `components/*-provider.tsx`, `components/toast.tsx`
- Contains: useReducedMotion (media query sync), useReveal (intersection observer), ToastProvider (context-based notifications), SmoothScrollProvider (Lenis + GSAP integration)
- Depends on: React hooks, Framer Motion, Lenis, GSAP
- Used by: All components

**Utility/Style Layer:**
- Purpose: Global styling, CSS variables, design tokens
- Location: `app/globals.css`, Tailwind configuration
- Contains: CSS custom properties (colors, gradients, spacing, durations), Tailwind atomic classes
- Depends on: Tailwind CSS
- Used by: All components via className attributes

## Data Flow

**Initial Page Load:**
1. `app/page.tsx` (Server) → calls `getProfile()` from `lib/profile.ts`
2. `getProfile()` → checks cache (1-hour revalidation) → fetches from Supabase OR falls back to `data/profile.json`
3. Server passes `ProfileData` as prop to client component `PageContent`
4. `PageContent` renders all sections with profile data, initializing client state (activeSkill = null)
5. Providers wrap content: ToastProvider, SmoothScrollProvider, BackgroundEffects, etc.

**Skill Filter (Cross-Section Interaction):**
1. User clicks skill chip in Skills section → `onSkillToggle(skill)` → state update in `PageContent`
2. Projects section receives `activeSkill` prop → filters visible cards via `isMatch()` callback
3. Project cards render with `dimmed` styling for non-matching projects

**Project Detail Modal:**
1. User clicks project card → `ProjectCard` calls `onSelect()` → updates `selectedProjectIndex` in `PageContent`
2. `ProjectDetailModal` renders via `AnimatePresence` wrapper in `Projects` section
3. Modal uses `LayoutGroup` from Framer Motion for layout morphing animation
4. Ghost placeholder div maintains grid height to prevent layout shift
5. Modal closes on Escape key, backdrop click, or close button → state reset

**Contact Form Submission:**
1. Form validation in `contact-form.tsx` → calls `/api/contact` POST route
2. Backend validates with Zod schema → verifies Turnstile CAPTCHA token
3. Rate limiter checks IP address (3 requests per hour)
4. If valid → sends email via Resend → returns success response
5. Frontend receives response → shows Toast notification via `useToast()` context hook

**Scroll Animations:**
1. `SectionWrapper` components track scroll progress via `useScroll` from Framer Motion
2. Scroll Y position transforms into opacity, scale, and Y offset values
3. Experience timeline strokes as user scrolls via GSAP ScrollTrigger
4. `useReveal` hook triggers animations when elements intersect viewport

## Key Abstractions

**ProfileData:**
- Purpose: Type-safe representation of all portfolio content (name, experience, projects, skills, etc.)
- Location: `lib/profile.ts`
- Pattern: Single source of truth for all content; fetched once at page load, immutable thereafter

**SectionWrapper:**
- Purpose: Consistent section styling, animations, and layout behavior
- Location: `components/section-wrapper.tsx`
- Pattern: Accepts `id`, `title`, and `children`; applies scroll animations, gradient glows, consistent padding

**Skill Filter State:**
- Purpose: Enable cross-section filtering of projects by skill
- Location: `components/page-content.tsx` (activeSkill state)
- Pattern: Single state point; Projects uses `isMatch()` callback to filter; Skills receives toggles

**Modal with Layout Morphing:**
- Purpose: Animate card → modal → card transitions smoothly
- Location: `components/project-card.tsx`, `components/project-detail-modal.tsx`
- Pattern: LayoutGroup + layoutId on shared elements; ghost placeholder maintains grid height

**Reduced Motion Compliance:**
- Purpose: Respect user accessibility preference and disable heavy animations
- Location: `hooks/use-reduced-motion.ts`
- Pattern: Media query listener synced with React state; all animation components check this flag

## Entry Points

| Entry Point | Location | Responsibilities |
|-------------|----------|-----------------|
| Root Page | `app/page.tsx` | Server-side data fetching via getProfile(), passes profile to PageContent |
| Page Content | `components/page-content.tsx` | Orchestrates all sections, manages activeSkill state |
| Contact API | `app/api/contact/route.ts` | Validates input, verifies CAPTCHA, rate limits, sends email |
| Root Layout | `app/layout.tsx` | HTML structure, fonts, metadata, ToastProvider |
| Error Boundary | `app/error.tsx` | Runtime error recovery UI |

## Error Handling

- **Data Fetching (Server):** Try-catch in `getProfile()` → logs warning → falls back to local JSON
- **API Route:** Zod safeParse() → 400 with field errors; rate limit → 429; server errors → 500
- **Client Components:** Error boundary in `app/error.tsx` → friendly error with retry button
- **Form Submission:** Network errors → error Toast; Turnstile failure → 400 response
