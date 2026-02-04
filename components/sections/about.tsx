"use client";

import { useReveal } from "@/hooks/use-reveal";

const HIGHLIGHTS = [
  { label: "Current", value: "Final Year @ NUS" },
  { label: "Focus", value: "AI/ML · Database Systems" },
  {
    label: "Recent",
    value: "Trade Validation AI @ Mercuria",
  },
  { label: "Leadership", value: "Head of Ops, GDSC NUS" },
];

export default function About() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
      {/* Narrative */}
      <div className="space-y-4 font-body text-base leading-relaxed text-muted md:text-lg">
        <p>
          I started out managing logistics for 250+ army recruits and came away
          knowing that systems&mdash;whether physical or digital&mdash;break
          down the same way: bad data, bad handoffs, and no feedback loops.
          That insight pushed me into computer science at NUS, where I
          specialized in AI/ML and database systems.
        </p>
        <p>
          Since then I&rsquo;ve built an NLP trade-validation pipeline that
          handles real commodity contracts at{" "}
          <span className="text-foreground">Mercuria</span>, shipped production
          integrations across seven international partners at{" "}
          <span className="text-foreground">TVS Digital</span>, and competed in
          hackathons where 48-hour constraints force you to make every
          architectural decision count.
        </p>
        <p>
          I care about code that works under pressure&mdash;tested, observable,
          and simple enough for the next person to change confidently.
        </p>
      </div>

      {/* Highlights */}
      <div ref={ref} className="flex flex-col gap-4">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.label}
            className="rounded-xl border border-border bg-surface px-5 py-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
              transitionDelay: visible ? `${i * 50}ms` : "0ms",
            }}
          >
            <span className="block font-mono text-xs uppercase tracking-wider text-muted">
              {h.label}
            </span>
            <span className="mt-1 block font-body text-sm font-medium text-foreground">
              {h.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
