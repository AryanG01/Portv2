"use client";

import { useReveal } from "@/hooks/use-reveal";

const HIGHLIGHTS = [
  { label: "Current", value: "Final Year @ NUS", icon: "🎓" },
  { label: "Focus", value: "AI/ML · Database Systems", icon: "🧠" },
  { label: "Recent", value: "Trade Validation AI @ Mercuria", icon: "📊" },
  { label: "Leadership", value: "Head of Ops, GDSC NUS", icon: "🚀" },
];

export default function About() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div className="space-y-5 font-body text-base leading-relaxed text-muted md:text-lg">
        <p>
          I started out managing logistics for 250+ army recruits and came away
          knowing that systems&mdash;whether physical or digital&mdash;break
          down the same way: bad data, bad handoffs, and no feedback loops.
          That insight pushed me into computer science at NUS, where I
          specialized in <span className="text-foreground">AI/ML</span> and{" "}
          <span className="text-foreground">database systems</span>.
        </p>
        <p>
          Since then I&rsquo;ve built an NLP trade-validation pipeline that
          handles real commodity contracts at{" "}
          <span className="text-accent">Mercuria</span>, shipped production
          integrations across seven international partners at{" "}
          <span className="text-accent">TVS Digital</span>, and competed in
          hackathons where 48-hour constraints force you to make every
          architectural decision count.
        </p>
        <p>
          I care about code that works under pressure&mdash;tested, observable,
          and simple enough for the next person to change confidently.
        </p>
      </div>

      <div ref={ref} className="flex flex-col gap-3">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.label}
            className="rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-border-hover"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `all var(--duration-normal) var(--ease-default)`,
              transitionDelay: visible ? `${i * 60}ms` : "0ms",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{h.icon}</span>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                  {h.label}
                </span>
                <span className="mt-0.5 block font-body text-sm font-medium text-foreground">
                  {h.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
