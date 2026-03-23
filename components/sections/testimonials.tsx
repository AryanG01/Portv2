"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accentColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aryan is one of the most technically sharp interns I've worked with. He shipped a full observability pipeline in his first three weeks — clean code, well-tested, and with zero hand-holding. Rare at this stage.",
    name: "Jane Smith",
    role: "Engineering Manager",
    company: "Company A",
    initials: "JS",
    accentColor: "rgba(16, 185, 129, 0.8)",
  },
  {
    quote:
      "What sets Aryan apart is how he thinks about tradeoffs. During our hackathon sprint he kept the team grounded when we were over-engineering — and we shipped something that actually worked end-to-end.",
    name: "Alex Chen",
    role: "Senior Software Engineer",
    company: "Company B",
    initials: "AC",
    accentColor: "rgba(6, 182, 212, 0.8)",
  },
  {
    quote:
      "Aryan picked up our ML infrastructure codebase in days and immediately started contributing meaningful improvements. His instinct for readable, maintainable code is well above average for a student hire.",
    name: "Priya Nair",
    role: "ML Engineer",
    company: "Company C",
    initials: "PN",
    accentColor: "rgba(245, 158, 11, 0.8)",
  },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 20V12.267C0 5.422 4.156 1.356 12.467 0l1.2 2.133C9.8 3 7.6 4.489 6.933 7.2H12V20H0zm16 0V12.267C16 5.422 20.156 1.356 28.467 0l1.2 2.133C25.8 3 23.6 4.489 22.933 7.2H28V20H16z"
        fill={color}
        fillOpacity="0.35"
      />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  index,
  reduced,
}: {
  testimonial: Testimonial;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.5, delay: index * 0.12, ease: "easeOut" }
      }
      className="group relative flex flex-col gap-5 rounded-2xl p-7"
      style={{
        background: "rgba(21, 29, 25, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.08)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      whileHover={
        reduced
          ? {}
          : {
              borderColor: "rgba(16, 185, 129, 0.2)",
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.06)",
            }
      }
    >
      {/* Accent top bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, ${testimonial.accentColor}, transparent)` }}
      />

      <QuoteIcon color={testimonial.accentColor} />

      <blockquote className="flex-1 font-body text-sm leading-relaxed text-muted md:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${testimonial.accentColor.replace("0.8", "0.2")}, rgba(10, 16, 13, 0.8))`,
            border: `1px solid ${testimonial.accentColor.replace("0.8", "0.3")}`,
          }}
        >
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: testimonial.accentColor }}
          >
            {testimonial.initials}
          </span>
        </div>

        <div>
          <p className="font-body text-sm font-medium text-foreground">
            {testimonial.name}
          </p>
          <p className="font-mono text-xs text-muted">
            {testimonial.role} &middot; {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Section label */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent opacity-70">
          Kind Words
        </span>
        <div
          className="flex-1"
          style={{ height: "1px", background: "rgba(16, 185, 129, 0.08)", minWidth: "20px" }}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} reduced={reduced} />
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-muted opacity-50">
        Placeholder testimonials — reach out for the real ones on{" "}
        <a
          href="https://linkedin.com/in/aryan-ganju"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
      </p>
    </>
  );
}
