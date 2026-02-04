# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a craft-forward, interactive portfolio website for Aryan Ganju that demonstrates engineering taste through thoughtful features and polished interactions.

**Architecture:** Single-page Next.js App Router site. All content rendered from `/data/profile.json`. Sections use Intersection Observer for reveals, GSAP ScrollTrigger for the Experience timeline signature sequence, and Motion for micro-interactions. Contact form sends email via Resend through a server-side Route Handler with Cloudflare Turnstile spam protection.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion (framer-motion), GSAP ScrollTrigger, Resend, Cloudflare Turnstile, Google Fonts (Crimson Pro, IBM Plex Sans, IBM Plex Mono)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `data/profile.json`, `.env.local.example`

**Step 1: Initialize Next.js project**

```bash
cd /Users/aryanganju/Desktop/Code/Portfoliov2
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

**Step 2: Install dependencies**

```bash
pnpm add motion gsap @gsap/react resend zod
pnpm add -D @types/node
```

**Step 3: Create profile data file at `data/profile.json`**

Full JSON from PROMPT.md (name, headline, education, experience, projects, hackathons, skills, contact).

**Step 4: Create `.env.local.example`**

```
RESEND_API_KEY=re_xxxxx
TURNSTILE_SECRET_KEY=xxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxxxx
```

**Step 5: Verify dev server starts**

```bash
pnpm dev
```

Expected: Server starts on localhost:3000 with default Next.js page.

**Step 6: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Next.js project with dependencies"
```

---

### Task 2: Design System - Fonts, Colors, Tailwind Config

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

**Step 1: Configure Google Fonts in `app/layout.tsx`**

Import Crimson Pro, IBM Plex Sans, IBM Plex Mono from `next/font/google`. Expose as CSS variables `--font-heading`, `--font-body`, `--font-mono`. Apply to `<html>` element.

**Step 2: Configure Tailwind design tokens in `tailwind.config.ts`**

Extend theme with:
- Colors: `background: #FAFAF9`, `surface: #FFFFFF`, `foreground: #1C1917`, `muted: #78716C`, `accent: #0D9488`, `accent-subtle: #CCFBF1`, `border: #E7E5E4`
- Font families mapped to CSS variables
- Custom spacing if needed beyond Tailwind defaults

**Step 3: Set up `app/globals.css`**

Base styles: background color, text color, font-family defaults, smooth scrolling with `prefers-reduced-motion` respect, selection color, scrollbar styling.

**Step 4: Create minimal test in `app/page.tsx`**

Render a heading in each font to verify fonts load correctly.

**Step 5: Verify in browser**

```bash
pnpm dev
```

Check: three fonts render, colors applied, warm off-white background.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: design system - fonts, colors, tailwind tokens"
```

---

### Task 3: Layout Shell + Navigation

**Files:**
- Create: `components/nav.tsx`
- Create: `components/section-wrapper.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Step 1: Build `components/nav.tsx`**

- Fixed top navigation bar, transparent initially, gets `surface` background + subtle shadow on scroll (use state + scroll listener)
- Left: "AG" monogram or name in mono font
- Right: section links (About, Experience, Projects, Awards, Skills, Contact)
- Smooth scroll on click (`scrollIntoView({ behavior: 'smooth' })`)
- Mobile: hamburger menu that slides in a panel with links
- Active section highlighting using Intersection Observer
- Keyboard accessible: all links focusable, hamburger toggle with Enter/Space

**Step 2: Build `components/section-wrapper.tsx`**

Reusable wrapper for each section:
- Takes `id`, `title`, `className`, `children`
- Adds consistent padding, max-width, section `id` for anchor linking
- Title rendered in H1 (Crimson Pro) if provided
- Intersection Observer based reveal animation (fade up, respects `prefers-reduced-motion`)

**Step 3: Wire up `app/page.tsx`**

Import all section placeholders, render inside `<main>` with section wrappers. Each section shows placeholder text for now.

**Step 4: Verify navigation**

```bash
pnpm dev
```

Check: nav scrolls to sections, mobile hamburger works, active highlighting.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: navigation shell + section wrapper with scroll reveals"
```

---

### Task 4: Hero Section

**Files:**
- Create: `components/sections/hero.tsx`
- Create: `components/magnetic-button.tsx`
- Modify: `app/page.tsx`
- Add: `public/avatar.jpg` (placeholder if missing)

**Step 1: Build `components/magnetic-button.tsx`**

- Wraps a button/link element
- On mouse move within a threshold (~50px), button translates slightly toward cursor
- Uses Motion's `useMotionValue` and `useTransform`
- Resets on mouse leave with spring animation
- Disabled when `prefers-reduced-motion`
- Props: `children`, `href?`, `onClick?`, `variant: 'primary' | 'outline'`

**Step 2: Build `components/sections/hero.tsx`**

- Read data from `profile.json` (import directly)
- Desktop: flex layout, text left (55%), photo right (45%)
- Name in Display size (Crimson Pro, 600 weight)
- Headline in muted text (IBM Plex Sans)
- Tagline: "Building AI systems, breaking down complexity"
- Two MagneticButton CTAs: "View Work" (primary, scrolls to projects), "Get in Touch" (outline, scrolls to contact)
- Live element: "Currently in Singapore" + real local time (client component for time)
- Photo: `next/image` with priority, soft rounded rectangle, thin teal left-edge border
- Photo bleeds right on desktop (overflow hidden on container, image extends)
- Mobile: photo at top (cropped, ~40vh), text below
- Scroll chevron at bottom: animated with Motion, fades out on scroll

**Step 3: Handle missing avatar**

If `/public/avatar.jpg` doesn't exist, render a gradient placeholder div with initials "AG".

**Step 4: Wire into `app/page.tsx`**

Replace hero placeholder with `<Hero />`.

**Step 5: Verify**

```bash
pnpm dev
```

Check: layout, magnetic buttons, photo treatment, time display, mobile responsiveness.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: hero section with magnetic CTAs and split photo layout"
```

---

### Task 5: About Section

**Files:**
- Create: `components/sections/about.tsx`
- Modify: `app/page.tsx`

**Step 1: Build `components/sections/about.tsx`**

- Import data from `profile.json`
- Two-column layout (60/40 on desktop, stacked on mobile)
- Left: 2-3 narrative paragraphs (hardcoded text derived from profile data - the story connecting army → CS → AI)
- Right: highlight cards stacked vertically
  - Each card: label (Plex Mono, small, muted) + value (Plex Sans, foreground)
  - Cards: "Current" → "Final Year @ NUS", "Focus" → "AI/ML · Database Systems", "Recent" → "Trade Validation AI @ Mercuria", "Leadership" → "Head of Ops, GDSC NUS"
- Highlights stagger in via Motion (50ms delay each, fade + translateY)
- Intersection Observer triggers animation once

**Step 2: Wire into `app/page.tsx`**

Replace about placeholder.

**Step 3: Verify**

Check: two-column layout, stagger animation, mobile stack.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: about section with highlights grid"
```

---

### Task 6: Experience Section with GSAP Timeline

**Files:**
- Create: `components/sections/experience.tsx`
- Create: `components/experience-card.tsx`
- Create: `components/timeline.tsx`
- Modify: `app/page.tsx`

**Step 1: Build `components/experience-card.tsx`**

- Props: experience entry data, `isExpanded`, `onToggle`
- Collapsed: company (H2), role, dates (mono), one-line from first highlight
- Expanded: full highlights list, stat blocks for numbers (accent color, Plex Mono, slightly larger)
  - Parse highlights for numbers/percentages and render them as emphasized stat blocks
- Motion `AnimatePresence` + `layout` for smooth expand/collapse
- `aria-expanded`, `role="button"`, keyboard Enter/Space to toggle

**Step 2: Build `components/timeline.tsx`**

- SVG vertical line (thin, accent color) with circle nodes
- Accepts refs for GSAP to animate
- Line is an SVG `<line>` or `<path>` element that GSAP can draw

**Step 3: Build `components/sections/experience.tsx`**

- Import data from `profile.json`
- Client component (needs state for expanded card + GSAP)
- Layout: timeline on left (80px from left edge), cards on right
- Accordion state: track which card index is expanded (null = none)
- GSAP ScrollTrigger setup:
  - Dynamically import GSAP + ScrollTrigger (code split)
  - `useGSAP` hook from `@gsap/react`
  - Timeline line draws downward as user scrolls (scrub: true)
  - Each card node pulses/fills as it enters viewport
  - Cards slide in from right
- Mobile: timeline hidden, cards stack with simple fade-in
- Cleanup GSAP on unmount

**Step 4: Wire into `app/page.tsx`**

**Step 5: Verify**

Check: timeline draws on scroll, cards expand/collapse, stat blocks render, keyboard nav, mobile fallback.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: experience timeline with GSAP scroll animation"
```

---

### Task 7: Projects Section

**Files:**
- Create: `components/sections/projects.tsx`
- Create: `components/project-card.tsx`
- Modify: `app/page.tsx`

**Step 1: Build `components/project-card.tsx`**

- Props: project data, `isExpanded`, `onToggle`, `dimmed` (for skill filter)
- Default state: name (H2), context badge (small pill with accent-subtle bg), summary, tech tag pills (outlined)
- Hover: translateY(-2px) + shadow increase via Motion `whileHover`
- Expanded: inline expansion below default content
  - Full details as bullet list
  - Close button (X) top right, Escape key closes
  - Motion `AnimatePresence` for enter/exit
  - `layoutId` on card container for shared element feel
- `dimmed` prop: reduces opacity to 0.4, pointer-events-none when skill filter active and this card doesn't match
- Transition between dimmed/undimmed is animated (opacity)

**Step 2: Build `components/sections/projects.tsx`**

- Import data from `profile.json`
- 2-column grid on desktop, 1-column on mobile (using CSS grid)
- Track expanded project index (accordion, one at a time)
- Accept `activeSkill` prop (or use context/state lifted to page) for skill filtering
- Click outside expanded card to close (use ref + click listener)

**Step 3: Wire into `app/page.tsx`**

**Step 4: Verify**

Check: cards render, expand/collapse, hover effects, mobile layout.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: project cards with inline expansion and shared layout"
```

---

### Task 8: Hackathons & Awards Section

**Files:**
- Create: `components/sections/hackathons.tsx`
- Modify: `app/page.tsx`

**Step 1: Build `components/sections/hackathons.tsx`**

- Import data from `profile.json`
- Single-column list
- Each row: flex, space-between
  - Left: event name (body text)
  - Right: result badge
    - Rankings (Top N): accent-subtle bg, accent text, Plex Mono
    - Participation: neutral gray bg, muted text
- "2300+" in Plex Mono at 500 weight within the badge text
- Thin bottom border between entries (except last)
- Stagger reveal on scroll: 30ms delay cascade, fade + translateY(10px)
- Mobile: name and badge stack vertically (flex-col)

**Step 2: Wire into `app/page.tsx`**

**Step 3: Verify**

Check: badges render, stagger animation, mobile layout, emphasis on strong results.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: hackathons and awards section"
```

---

### Task 9: Skills Section with Project Filtering

**Files:**
- Create: `components/sections/skills.tsx`
- Create: `components/skill-chip.tsx`
- Modify: `app/page.tsx` (lift filter state)

**Step 1: Build `components/skill-chip.tsx`**

- Props: `label`, `isActive`, `onClick`
- Default: outlined pill (border, transparent bg)
- Hover: darker border, slight bg fill
- Active: solid accent bg, white text
- Keyboard: focusable, Enter/Space toggles
- Motion: scale spring on press

**Step 2: Build `components/sections/skills.tsx`**

- Import data from `profile.json`
- Category rows: Languages, Frameworks, Data, Cloud & Tools, Methods
- Category label: Plex Mono, small, muted, uppercase tracking-wide
- Chips laid out with flex-wrap per category
- State: `activeSkill: string | null`
- Click chip → set activeSkill, click again → null
- Annotation below: "N projects using [skill]" with arrow-up icon (only visible when skill selected)
  - Count projects by checking if skill appears in project tags (case-insensitive, partial match for broader terms)

**Step 3: Lift filter state to `app/page.tsx`**

- `activeSkill` state in page component
- Pass down to Skills (for chip active state) and Projects (for dimming)
- Projects receives `activeSkill` and dims cards whose tags don't match

**Step 4: Verify**

Check: chips toggle, projects dim/undim, annotation count correct, keyboard navigation, mobile wrapping.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: skills section with cross-filtering to projects"
```

---

### Task 10: Contact Section + Email Backend

**Files:**
- Create: `components/sections/contact.tsx`
- Create: `components/contact-form.tsx`
- Create: `app/api/contact/route.ts`
- Modify: `app/page.tsx`

**Step 1: Build `app/api/contact/route.ts`**

- POST handler
- Zod validation: `name` (string, min 1), `email` (string, email format), `message` (string, min 10, max 2000), `turnstileToken` (string)
- Verify Turnstile token with Cloudflare API (`https://challenges.cloudflare.com/turnstile/v0/siteverify`)
- Rate limiting: in-memory Map keyed by IP, max 3 per hour, cleanup stale entries
- On validation pass: send email via Resend to `aryan.ganju@u.nus.edu`
  - From: `onboarding@resend.dev` (or custom domain if configured)
  - Subject: `Portfolio Contact: {name}`
  - Body: formatted with name, email, message
- Return JSON: `{ success: true }` or `{ error: "message" }` with appropriate status codes
- Never expose API keys or internal errors to client

**Step 2: Build `components/contact-form.tsx`**

- Client component
- Three inputs: Name, Email, Message (textarea)
- Bottom-border-only styling (no boxed inputs)
- Focus: bottom border transitions to accent color
- Turnstile widget (invisible mode): `<script>` loaded, widget rendered in hidden div
- Form state: idle | loading | success | error
- On submit: validate client-side first, get turnstile token, POST to `/api/contact`
- Loading: button shows small spinner, disabled
- Success: button briefly turns green, text "Sent", resets after 2s
- Error: inline red text below form with error message
- Accessible: labels, aria-describedby for errors, fieldset

**Step 3: Build `components/sections/contact.tsx`**

- Two-column layout (desktop), single column (mobile, direct options first)
- Left: "Prefer a quick conversation?" text
  - Call button: `<a href="tel:+6589409011">` styled as outlined button with phone icon
  - Message button: `<a href="sms:+6589409011">` styled as outlined button
  - LinkedIn + GitHub as icon links (SVG icons inline, not icon library)
  - Email as plain text `mailto:` link
- Right: `<ContactForm />`
- Footer below: "© 2026 Aryan Ganju" centered, "Back to top" button that scrolls to hero

**Step 4: Wire into `app/page.tsx`**

**Step 5: Verify**

Check: form validation, error states, call/sms links, mobile layout. (Email sending requires real API key, so test the validation and UI states.)

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: contact section with email form and Turnstile protection"
```

---

### Task 11: SEO, Metadata, Performance

**Files:**
- Modify: `app/layout.tsx` (metadata)
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify components for lazy loading

**Step 1: Add metadata to `app/layout.tsx`**

```typescript
export const metadata: Metadata = {
  title: 'Aryan Ganju - Software Engineer',
  description: 'Software Engineer and Final Year Computer Science student at NUS. Specializing in AI/ML and Database Systems.',
  openGraph: {
    title: 'Aryan Ganju - Software Engineer',
    description: '...',
    type: 'website',
  },
}
```

**Step 2: Create `app/sitemap.ts`**

Simple sitemap with single URL (the homepage).

**Step 3: Create `app/robots.ts`**

Allow all crawlers.

**Step 4: Lazy-load heavy components**

- GSAP is already dynamically imported in Experience section
- Wrap Turnstile script loading in the contact form behind `useEffect`
- Ensure `next/image` is used everywhere with proper `sizes` prop

**Step 5: Add `prefers-reduced-motion` handling**

- Create a `useReducedMotion` hook (or use Motion's built-in)
- All animation components check this and skip/simplify animations
- GSAP animations disabled entirely when reduced motion preferred

**Step 6: Verify**

```bash
pnpm build
```

Check: no build errors, metadata renders in HTML, images optimized.

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: SEO metadata, sitemap, performance optimizations"
```

---

### Task 12: Final Polish + Keyboard Navigation

**Files:**
- Modify: various components

**Step 1: Add keyboard shortcuts**

- `j`/`k` to move between sections (when not focused on form inputs)
- Escape to close any expanded card/panel
- Implement with a global keydown listener in a client component

**Step 2: Review all components for accessibility**

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- All interactive elements have focus styles (accent color outline)
- Skip-to-content link hidden until focused
- Color contrast meets WCAG AA

**Step 3: Final responsive check**

- Test at 320px, 375px, 768px, 1024px, 1440px widths
- Ensure no horizontal overflow, readable text, touch targets >= 44px

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: keyboard navigation, accessibility, responsive polish"
```

---

## Execution Order

Tasks 1-2 are sequential (need project first, then design system).
Task 3 depends on Task 2 (needs design tokens).
Tasks 4-8 depend on Task 3 (need layout shell) but sections are somewhat independent.
Task 9 depends on Task 7 (skills filters projects).
Task 10 is independent of content sections.
Tasks 11-12 are final polish, depend on all content being in place.
