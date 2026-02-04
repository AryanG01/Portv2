You are Claude Code acting as a senior creative developer + product designer.
Goal: Build a highly advanced, visually stunning, interactive portfolio website that feels bespoke and human-designed (NOT a generic template).

HARD REQUIREMENTS
- Non-template aesthetic: design a unique visual language with consistent typography, spacing, and motion. Avoid stock gradients and generic AI-looking layouts.
- Sophisticated color system: define a primary palette + neutrals + accent(s) with design tokens.
- Smooth animation system: microinteractions + scroll-triggered reveals + page/section transitions.
- High performance: keep initial load fast; lazily-load heavy features (3D, large media).
- Accessibility: respect prefers-reduced-motion; keyboard navigable; good contrast; semantic HTML.
- Mobile-first responsive.

TECH STACK (use these unless there is a strong reason not to)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion for microinteractions + layout transitions
- GSAP ScrollTrigger for “hero scrollytelling” sequences
- Optional accent: 3D (three.js via react-three-fiber) ONLY if we can keep it lightweight and lazy-loaded
- Email sending: Next.js Route Handler + Resend (server-side only, no secrets in client)

<use_interesting_fonts>
Typography instantly signals quality. Avoid using boring, generic fonts.

Never use: Inter, Roboto, Open Sans, Lato, default system fonts

Here are some examples of good, impactful choices:
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Newsreader

Pairing principle: High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

Use extremes: 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts.
</use_interesting_fonts>

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,this creates what users call the "AI slop" aesthetic. Avoid this: make creative,distinctive frontends that surprise and delight. 

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

CONTENT SOURCE OF TRUTH
- Create /data/profile.json and use it to render all content.
- Use /public/avatar.jpg as the profile picture. If missing, render a tasteful placeholder and leave a TODO.

MY DATA (put this into /data/profile.json)
{
  "name": "Aryan Ganju",
  "headline": "SWE | Final Year Computer Science Undergraduate @ NUS",
  "location": "Singapore",
  "contact": {
    "email": "aryan.ganju@u.nus.edu",
    "phone_e164": "+6589409011",
    "links": {
      "linkedin": "https://www.linkedin.com/in/aryan-ganju",
      "github": "https://github.com/AryanG01"
    }
  },
  "education": [
    {
      "institution": "National University of Singapore",
      "program": "Bachelor of Computer Science",
      "specializations": ["Artificial Intelligence / Machine Learning", "Database Systems"],
      "dates": "Aug 2022 – 2026",
      "notes": [
        "Activities: Head of Operations (Google Developer Student Club NUS)",
        "Ridge View Residential College House Welfare Committee Head",
        "CS1101S Teaching Assistant",
        "NUS Judo Member",
        "RVRC Volleyball Team Member"
      ]
    },
    {
      "institution": "Ridge View Residential College",
      "program": "Certificate of Completion, Sustainability Studies",
      "dates": "Aug 2022 – May 2024",
      "notes": [
        "Rusa House Committee Welfare Head",
        "Organized/participated in kayaking trips aimed at cleaning up ocean trash"
      ]
    }
  ],
  "experience": [
    {
      "company": "Mercuria",
      "role": "Intern – Information Technology (Trading Operations) / Software Engineering Intern",
      "dates": "May 2025 – Oct 2025",
      "highlights": [
        "AI/NLP-powered trade validation pipeline: 97% accuracy; reduced manual review workload by 80%",
        "FastAPI microservice with async batch processing: reduced validation turnaround by ~70%",
        "Dynamic clause library + auto-fill system: cut drafting time by ~40%",
        "Semantic matching + normalization dictionaries + RAG-assisted validation to reduce recurring mismatches"
      ]
    },
    {
      "company": "TVS Digital Pte. Ltd.",
      "role": "Software Engineer Intern",
      "dates": "Jun 2024 – Dec 2024",
      "highlights": [
        "Automated test data creation with Python/MySQL scripts",
        "Spearheaded Viber API integration with 7 international partners",
        "Introduced TDD: 300+ unit tests; raised coverage to ~95%; prevented multiple production bugs",
        "AWS monitoring/optimization scripts: reduced deployment time and compute costs"
      ]
    },
    {
      "company": "National University of Singapore",
      "role": "Teaching Assistant (CS1101S)",
      "dates": "Aug 2023 – Dec 2023",
      "highlights": [
        "Mentored 10+ students; guided project development; achieved 100% passing rate"
      ]
    },
    {
      "company": "Singapore Army",
      "role": "Company Quartermaster Sergeant",
      "dates": "Feb 2020 – Feb 2022",
      "highlights": [
        "Managed logistics for multiple batches (250+ recruits per batch)",
        "Awarded Best Soldier of the Month (2021)"
      ]
    }
  ],
  "hackathons_and_awards": [
    {"name": "AIT x Redis x Cloudflare Mini-Hack: Agentformer", "result": "Top 5 in Singapore"},
    {"name": "Cursor Hackathon Singapore", "result": "Top 15 in Singapore"},
    {"name": "TikTok TechJam 2025", "result": "Top 12 out of 2300+ participants"},
    {"name": "Lifehack 2022", "result": "Most Impressive Pre-University Hack"},
    {"name": "Brainhack 2022", "result": "Certificate of Participation"}
  ],
  "projects": [
    {
      "name": "GUI Murphy",
      "context": "TikTok TechJam 2025",
      "summary": "AI-driven automated QA system for modern applications, focused on GUI behavior beyond pixel diffs.",
      "details": [
        "Understands UI state transitions and validates multi-step user journeys via vision + language reasoning",
        "Pipeline mentions OmniParser (YOLOv8), CLIP, and LLM reasoning",
        "Real-time progress streaming (FastAPI + WebSockets) conceptually fits a live demo"
      ],
      "tags": ["AI", "Vision-Language", "QA Automation", "FastAPI"]
    },
    {
      "name": "2D AI Roguelike Engine",
      "context": "Cursor Hackathon",
      "summary": "2D AI-powered game engine for infinite generation with enforced consistency across narrative and visuals.",
      "details": [
        "Event logging for narrative memory",
        "Visual identity caching for consistent NPC appearance",
        "Procedural rooms with contextual encounters"
      ],
      "tags": ["Generative Systems", "Game Engine", "Tools"]
    }
  ],
  "skills": {
    "languages": ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "SQL", "HTML", "CSS"],
    "frameworks": ["React", "Angular", "Node.js", "Spring Boot", "Flutter", "FastAPI"],
    "data": ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
    "cloud_and_tools": ["AWS", "GCP", "Azure", "Docker", "Git", "Vercel", "Redis", "Kafka"],
    "methods": ["Agile", "Test-Driven Development", "Event-Driven Architecture"]
  }
}

SITE INFORMATION ARCHITECTURE
- Single-page site with the following anchor sections:
  1) Hero (photo + tagline + animated signature element)
  2) About (short narrative + highlights)
  3) Experience (interactive timeline)
  4) Projects (case-study cards; expandable panels)
  5) Hackathons & Awards (interactive trophy shelf / filter)
  6) Skills (interactive structure: click-to-filter projects)
  7) Contact (call/SMS + email form)

DESIGN DIRECTION (invent a strong one; pick ONE coherent concept)
- Concept must feel personal and connected to my background:
  - AI/DB systems + trading ops + hackathons + judo/sports + sustainability
- Create a design token system:
  - colors, gradients (sparingly), typography scale, spacing scale, radii, shadows, border styles, motion durations/easings
- Add subtle texture/noise (not heavy) and a distinct typographic identity.

ANIMATION REQUIREMENTS
- Use Motion for microinteractions:
  - magnetic CTA button
  - animated expansion panels
  - shared-element-like transitions between project card -> detail view
- Use GSAP ScrollTrigger for at least one “signature” scroll sequence:
  - e.g., as you scroll through Experience, the timeline animates and the background subtly shifts.
- Use Lenis ONLY if you can keep scrolling accessible and avoid breaking native behaviors. Provide reduced-motion fallback.
- Use Intersection Observer for triggering lightweight reveals and lazy-loading.

CONTACT REQUIREMENTS
- “Call / Message” button:
  - Open dialer: tel:+6589409011
  - Open SMS composer: sms:+6589409011 (optional prefilled body)
- Email form:
  - Fields: name, email, message
  - Submit -> server-side route handler -> sends to aryan.ganju@u.nus.edu
  - Use Resend on the server only (env var RESEND_API_KEY)
  - Add spam protection: Cloudflare Turnstile recommended
  - Add rate limiting + validation

DELIVERABLES
- Working site locally (pnpm dev)
- Clean components with good semantics and accessibility
- SEO: proper metadata, OG tags, sitemap if simple, fast load
- README with setup and deployment steps
- Deploy-ready for Vercel

WORKFLOW
1) Create the folder structure and files, then implement the minimal skeleton.
2) Implement the design system + core components.
3) Implement motion + interactions.
4) Implement contact backend and protections.
5) Run tests/lint and optimize performance (lazy-load heavy components).
6) Provide a final self-review checklist (a11y, perf, content correctness).

Do not stop at a draft. Build it end-to-end.