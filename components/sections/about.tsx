"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const springConfig = { type: "spring" as const, stiffness: 60, damping: 18 };

export default function About() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
    {/* ── Left: bio ── */}
    <motion.div
      className="flex flex-col gap-7 min-w-0 flex-1"
      initial={{ opacity: 0, x: reduced ? 0 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0 } : { ...springConfig, delay: 0.05 }}
    >
      {/* Paragraph 1 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        I&rsquo;m pursuing Computer Science at{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">
          NUS
        </span>{" "}
        with dual specializations in{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">
          AI&thinsp;/&thinsp;ML
        </span>{" "}
        and{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">
          Database Systems
        </span>
        . These tracks shaped how I think about systems end-to-end — from
        model training pipelines to query optimization and data architecture
        at scale.
      </p>

      {/* Decorative rule */}
      <div
        className="flex items-center gap-4"
        aria-hidden="true"
      >
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(16,185,129,0.35), transparent)",
          }}
        />
        <div
          className="h-1 w-1 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* Paragraph 2 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        Professionally, I built an NLP trade-validation pipeline handling
        real commodity contracts at{" "}
        <span style={{ color: "var(--accent)" }} className="font-semibold">
          Mercuria
        </span>{" "}
        (
        <span
          className="font-mono font-bold"
          style={{ color: "var(--accent)" }}
        >
          97%
        </span>{" "}
        accuracy,{" "}
        <span
          className="font-mono font-bold"
          style={{ color: "var(--accent)" }}
        >
          80%
        </span>{" "}
        reduction in manual review), shipped messaging integrations across
        seven international telecom partners at{" "}
        <span style={{ color: "var(--cyan)" }} className="font-semibold">
          TVS Digital
        </span>
        , and championed TDD practices that raised test coverage to{" "}
        <span
          className="font-mono font-bold"
          style={{ color: "var(--violet, #a78bfa)" }}
        >
          95%
        </span>
        .
      </p>

      {/* Paragraph 3 */}
      <p className="font-body text-base leading-[1.85] text-muted md:text-[1.05rem]">
        Beyond code, I led operations for{" "}
        <span style={{ color: "var(--gold)" }} className="font-semibold">
          GDSC NUS
        </span>{" "}
        — coordinating tech, marketing, and partnerships for Hack for Good
        2025. I&rsquo;ve competed at{" "}
        <span
          className="font-mono font-bold"
          style={{ color: "var(--gold)" }}
        >
          5+
        </span>{" "}
        hackathons, reaching top placements at TikTok TechJam (top 12 of{" "}
        <span
          className="font-mono font-bold"
          style={{ color: "var(--cyan)" }}
        >
          2,300+
        </span>
        ), AIT Mini-Hack (top 5 in Singapore), and Cursor Hackathon (top 15).
      </p>

      {/* Decorative rule */}
      <div
        className="flex items-center gap-4"
        aria-hidden="true"
      >
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(16,185,129,0.2), transparent)",
          }}
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
    </motion.div>

    {/* ── Right: sidebar cards ── */}
    <motion.div
      className="flex w-full flex-col gap-4 lg:w-64 lg:shrink-0"
      initial={{ opacity: 0, x: reduced ? 0 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0 } : { ...springConfig, delay: 0.15 }}
    >
      {/* At a glance */}
      <div
        className="flex flex-col gap-4 rounded-2xl p-5"
        style={{
          background: "rgba(17, 25, 22, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(16, 185, 129, 0.09)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
          At a glance
        </p>

        <ul className="flex flex-col gap-3">
          {[
            { label: "Based in", value: "Singapore" },
            { label: "Degree", value: "NUS CS '26" },
            { label: "Focus", value: "AI / ML + Databases" },
            { label: "Status", value: "Open to roles" },
          ].map(({ label, value }) => (
            <li key={label} className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {label}
              </span>
              <span className="font-body text-sm font-medium" style={{ color: "var(--foreground-secondary)" }}>
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Off the clock */}
      <div
        className="flex flex-col gap-4 rounded-2xl p-5"
        style={{
          background: "rgba(17, 25, 22, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(16, 185, 129, 0.09)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
          Off the clock
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Judo & Volleyball",
            "Ocean cleanup kayaking",
            "Sustainability studies",
            "Hackathons",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(16,185,129,0.5)" }}
                aria-hidden="true"
              />
              <span className="font-body text-sm" style={{ color: "var(--muted)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
    </div>
  );
}
