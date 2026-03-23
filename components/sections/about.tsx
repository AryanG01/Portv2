"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const springConfig = { type: "spring" as const, stiffness: 60, damping: 18 };

const FACTS = [
  { icon: "🎓", label: "Education", value: "NUS CS — AI/ML & Database Systems" },
  { icon: "💼", label: "Industry", value: "Mercuria · TVS Digital · Credence" },
  { icon: "🚀", label: "Leadership", value: "Head of Ops, GDSC NUS" },
  { icon: "📚", label: "Teaching", value: "CS1101S Teaching Assistant" },
];

export default function About() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-7"
      initial={{ opacity: 0, x: reduced ? 0 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0 } : { ...springConfig, delay: 0.05 }}
    >
      {/* Paragraph 1 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        I&rsquo;m pursuing Computer Science at{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">NUS</span>{" "}
        with dual specializations in{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">AI&thinsp;/&thinsp;ML</span>{" "}
        and{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">Database Systems</span>.
        {" "}These tracks have shaped how I think about systems — from model training pipelines
        to query optimization and data architecture.
      </p>

      {/* Decorative rule */}
      <div className="flex items-center gap-4" aria-hidden="true">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, rgba(16,185,129,0.35), transparent)" }}
        />
        <div className="h-1 w-1 rounded-full" style={{ background: "var(--accent)" }} />
      </div>

      {/* Paragraph 2 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        Professionally, I&rsquo;ve built an NLP trade-validation pipeline handling real commodity
        contracts at{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">Mercuria</span>,
        shipped messaging integrations across seven international telecom partners at{" "}
        <span style={{ color: "var(--cyan)" }} className="font-semibold">TVS Digital</span>,
        and championed TDD practices that raised test coverage to{" "}
        <span className="font-mono font-bold" style={{ color: "var(--violet, #a78bfa)" }}>95%</span>.
      </p>

      {/* Paragraph 3 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        Beyond code, I led operations for{" "}
        <span style={{ color: "var(--gold)" }} className="font-semibold">GDSC NUS</span>
        {" "}— coordinating tech, marketing, and partnerships for Hack for Good 2025 — and served
        as a CS1101S Teaching Assistant, mentoring students through functional programming in Source.
        Hackathons have taught me to ship under pressure and make every architectural decision count.
      </p>

      {/* Decorative rule */}
      <div className="flex items-center gap-4" aria-hidden="true">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, rgba(16,185,129,0.2), transparent)" }}
        />
      </div>

      {/* Paragraph 4 — closing statement */}
      <p
        className="font-body text-base leading-[1.85] md:text-[1.05rem]"
        style={{ color: "var(--foreground)" }}
      >
        I care about code that works under pressure — tested, observable, and
        simple enough for the next person to change confidently.
      </p>

      {/* 4 fact tiles */}
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FACTS.map((fact, i) => (
          <motion.div
            key={fact.label}
            className="flex flex-col gap-2 rounded-xl p-4"
            style={{
              background: "rgba(17, 25, 22, 0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(16, 185, 129, 0.09)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduced ? { duration: 0 } : { ...springConfig, delay: 0.1 + i * 0.07 }}
          >
            <span className="text-xl" role="img" aria-label={fact.label}>{fact.icon}</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{fact.label}</p>
              <p className="mt-0.5 font-body text-xs leading-snug" style={{ color: "var(--foreground-secondary)" }}>
                {fact.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
