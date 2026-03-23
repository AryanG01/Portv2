"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Section index map — used for the counter display
const SECTION_INDEX: Record<string, string> = {
  about:      "01",
  now:        "02",
  experience: "03",
  awards:     "04",
  projects:   "05",
  skills:     "06",
  leadership: "07",
  contact:    "08",
};

// Per-section accent color shift
const SECTION_ACCENT: Record<string, { color: string; glow: string }> = {
  about:      { color: "#10b981", glow: "rgba(16,185,129,0.18)" },
  now:        { color: "#06b6d4", glow: "rgba(6,182,212,0.15)" },
  experience: { color: "#f59e0b", glow: "rgba(245,158,11,0.15)" },
  awards:     { color: "#f59e0b", glow: "rgba(245,158,11,0.14)" },
  projects:   { color: "#10b981", glow: "rgba(16,185,129,0.16)" },
  skills:     { color: "#06b6d4", glow: "rgba(6,182,212,0.14)" },
  leadership: { color: "#a78bfa", glow: "rgba(167,139,250,0.15)" },
  contact:    { color: "#10b981", glow: "rgba(16,185,129,0.18)" },
};

export default function SectionWrapper({
  id,
  title,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.4, 1], [30, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.9]);

  const accent = SECTION_ACCENT[id] ?? { color: "#10b981", glow: "rgba(16,185,129,0.15)" };
  const index = SECTION_INDEX[id] ?? "—";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-14 md:py-20 ${className}`}
    >
      {/* Ambient section glow — strong, per-section color */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] rounded-full blur-[160px]"
          style={{
            background: `radial-gradient(circle, ${accent.glow}, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12"
        style={reduced ? {} : { y, opacity }}
      >
        {title && (
          <div className="mb-8 md:mb-12">
            {/* Index + divider line */}
            <div className="mb-6 flex items-center gap-4">
              <span
                className="font-mono text-xs font-bold tracking-widest"
                style={{ color: accent.color }}
              >
                {index}
              </span>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, ${accent.color}50, transparent)` }}
              />
            </div>

            {/* Section title — large display */}
            <motion.h2
              className="font-heading font-black leading-none tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                color: "var(--foreground)",
                letterSpacing: "-0.025em",
              }}
              initial={{ opacity: 0, y: reduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {title}
              {/* Accent dot */}
              <span style={{ color: accent.color }}>.</span>
            </motion.h2>
          </div>
        )}

        <div className="relative">{children}</div>
      </motion.div>
    </section>
  );
}
