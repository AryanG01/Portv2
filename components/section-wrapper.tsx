"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SECTION_GLOWS: Record<string, string> = {
  about: "radial-gradient(ellipse 800px 500px at 10% 50%, rgba(16, 185, 129, 0.06), transparent 70%)",
  experience: "radial-gradient(ellipse 800px 500px at 90% 30%, rgba(245, 158, 11, 0.05), transparent 70%)",
  projects: "radial-gradient(ellipse 800px 500px at 50% 20%, rgba(6, 182, 212, 0.06), transparent 70%)",
  awards: "radial-gradient(ellipse 800px 500px at 80% 60%, rgba(245, 158, 11, 0.05), transparent 70%)",
  skills: "radial-gradient(ellipse 800px 500px at 20% 40%, rgba(16, 185, 129, 0.05), transparent 70%)",
  contact: "radial-gradient(ellipse 800px 500px at 50% 80%, rgba(16, 185, 129, 0.06), transparent 70%)",
};

export default function SectionWrapper({
  id,
  title,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  // Apple-like scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax and fade effects
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-20 md:py-32 ${className}`}
    >
      {/* Section ambient glow */}
      {SECTION_GLOWS[id] && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: SECTION_GLOWS[id],
            opacity,
          }}
          aria-hidden="true"
        />
      )}

      <motion.div
        className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12"
        style={{ y, opacity, scale }}
      >
        {title && (
          <motion.h2
            className="relative mb-12 font-heading text-4xl font-bold tracking-tight md:mb-16 md:text-5xl lg:text-6xl"
            style={{
              background: "linear-gradient(135deg, var(--foreground) 0%, var(--accent) 50%, var(--gold) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 6s ease-in-out infinite",
            }}
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 40px rgba(16, 185, 129, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-2 left-0 h-1 rounded-full"
              style={{ background: "var(--gradient-emerald-cyan)" }}
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.h2>
        )}
        <div className="relative">{children}</div>
      </motion.div>
    </section>
  );
}
