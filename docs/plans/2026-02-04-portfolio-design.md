# Portfolio Website Design - Aryan Ganju

## Design Concept: "Craft-Forward"

Clean, refined, surprisingly deep. Feels like a well-designed dev tool or Stripe-quality product page. The site demonstrates engineering taste through thoughtful interactions - not sci-fi spectacle. Hiring managers should think "this person builds things well."

---

## Design System

### Color Palette
- **Background**: `#FAFAF9` (warm off-white)
- **Surface**: `#FFFFFF` (cards, elevated elements)
- **Text Primary**: `#1C1917` (warm black)
- **Text Secondary**: `#78716C` (warm gray)
- **Accent**: `#0D9488` (teal-600)
- **Accent Subtle**: `#CCFBF1` (teal-100, highlights/tags)
- **Border**: `#E7E5E4` (warm stone)

### Typography
- **Headings**: Crimson Pro (400, 600) - editorial serif
- **Body/UI**: IBM Plex Sans (400, 500) - readable, professional
- **Code/Metrics**: IBM Plex Mono (400) - stats, dates, technical details

### Type Scale (fluid)
- Display: 48-64px (name in hero)
- H1: 36-48px (section titles)
- H2: 24-30px (subsections/company names)
- Body: 16-18px
- Small/Caption: 14px

### Spacing
4px base unit. Components use: 4, 8, 12, 16, 24, 32, 48, 64, 96.

### Motion Tokens
- `duration-fast`: 150ms (micro-interactions)
- `duration-normal`: 300ms (state changes)
- `duration-slow`: 500ms (section reveals)
- `easing-default`: cubic-bezier(0.4, 0, 0.2, 1)

---

## Sections

### 1. Hero
- Split layout: text left (~55%), full body photo right (~45%)
- Photo bleeds slightly off right edge, thin accent-color border on left edge only
- Content: name (Display), headline, tagline, two CTAs ("View Work" + "Get in Touch")
- Live element: "Currently in Singapore · [local time]" or "Open to opportunities"
- Magnetic pull effect on CTA buttons
- Scroll chevron at bottom, fades on scroll
- Mobile: photo top (cropped upper body, ~40vh), text below

### 2. About
- Two columns: narrative left (~60%), highlights right (~40%)
- Narrative: 2-3 short paragraphs (army → CS → AI/ML journey)
- Highlights as small cards: Current, Focus, Recent, Side
- Fade-in on scroll via Intersection Observer
- Highlights stagger in (50ms delay each)
- Subtle background shift from warm-white to hint of warm-gray

### 3. Experience (Signature Piece)
- Vertical timeline: thin accent line on left, circular nodes at each role
- Cards sit to the right of the timeline
- Collapsed: company, role, dates, one-line summary
- Expanded (click): full highlights, stat blocks for metrics (97%, 80%, 300+)
- Accordion behavior (one card open at a time)
- GSAP ScrollTrigger: timeline line draws downward on scroll, nodes pulse on enter
- Cards fade/slide from right on viewport entry
- Keyboard: arrow keys navigate, Enter expands/collapses

### 4. Projects
- 2-column grid (desktop), 1-column (mobile)
- Card default: name, context badge, summary, tech tags
- Card hover: subtle lift (2px translateY + shadow)
- Card expanded (click): inline expansion with full details
- Shared element transition via Motion layoutId
- Close: X button, click outside, Escape key
- Connected to Skills filter (dimming when filtered)

### 5. Hackathons & Awards
- Simple single-column list
- Each row: event name left, result badge right
- Badge: accent-subtle bg for rankings, muted for participation
- "2300+" rendered in Plex Mono at slightly larger weight
- Stagger-reveal on scroll (30ms delay cascade)

### 6. Skills
- Organized by category rows: Languages, Frameworks, Data, Cloud & Tools, Methods
- Category labels in IBM Plex Mono
- Skill chips: outlined default, solid accent when selected
- Click a skill → Projects section highlights matching projects (unmatched dim to 40%)
- Annotation: "N projects using [skill]" with upward arrow
- Click again to deselect
- Keyboard: Tab through, Enter/Space toggle, Escape clear

### 7. Contact
- Two columns: direct contact left, email form right
- Direct: Call button (tel:), Message button (sms:), LinkedIn/GitHub icons, email
- Form: Name, Email, Message (bottom-border inputs), accent focus state
- Submit states: loading spinner, success (green flash), error (inline message)
- Backend: Next.js Route Handler `/api/contact`
- Validation: zod (email format, message 10-2000 chars, name required)
- Email: Resend SDK → aryan.ganju@u.nus.edu
- Rate limiting: in-memory, 3/IP/hour
- Spam: Cloudflare Turnstile (invisible)
- Footer: "© 2025 Aryan Ganju" + "Back to top"

---

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (framer-motion) for micro-interactions + layout transitions
- GSAP ScrollTrigger for experience timeline scroll sequence
- next/image for optimized images
- Resend for server-side email
- Cloudflare Turnstile for spam protection
- Google Fonts: Crimson Pro, IBM Plex Sans, IBM Plex Mono

## Key Engineering Decisions
- Single-page with anchor sections (no routing complexity)
- All content from `/data/profile.json` (single source of truth)
- Lazy-load GSAP (dynamic import, only when Experience enters viewport)
- Intersection Observer for lightweight reveals (no GSAP overhead for simple fades)
- Server-only email handling (no secrets in client)
- prefers-reduced-motion: disable all animations, show content immediately
