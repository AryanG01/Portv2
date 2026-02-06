"use client";

import { useReveal } from "@/hooks/use-reveal";

const HIGHLIGHTS = [
  { label: "Education", value: "NUS CS — AI/ML & Database Systems", icon: "🎓" },
  { label: "Industry", value: "Mercuria · TVS Digital · Credence", icon: "💼" },
  { label: "Leadership", value: "Head of Ops, GDSC NUS", icon: "🚀" },
  { label: "Teaching", value: "CS1101S Teaching Assistant", icon: "📚" },
];

const CARD_GLOWS = [
  "rgba(16, 185, 129, 0.15)",
  "rgba(6, 182, 212, 0.15)",
  "rgba(245, 158, 11, 0.12)",
  "rgba(16, 185, 129, 0.15)",
];

export default function About() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div className="space-y-5 font-body text-base leading-relaxed text-muted md:text-lg">
        <p>
          I&rsquo;m pursuing Computer Science at NUS with dual specializations in{" "}
          <span className="text-foreground">AI/ML</span> and{" "}
          <span className="text-foreground">Database Systems</span>. These tracks
          have shaped how I think about systems&mdash;from model training pipelines
          to query optimization and data architecture.
        </p>
        <p>
          Professionally, I&rsquo;ve built an NLP trade-validation pipeline handling
          real commodity contracts at <span className="text-accent">Mercuria</span>,
          shipped messaging integrations across seven international telecom partners
          at <span className="text-accent">TVS Digital</span>, and championed TDD
          practices that raised test coverage to 95%.
        </p>
        <p>
          Beyond code, I led operations for{" "}
          <span className="text-accent">GDSC NUS</span>&mdash;coordinating tech,
          marketing, and partnerships for Hack for Good 2025&mdash;and served as a
          CS1101S Teaching Assistant, mentoring students through functional
          programming in Source. Hackathons have taught me to ship under pressure
          and make every architectural decision count.
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
            className="rounded-xl p-5 transition-all"
            style={{
              background: "rgba(21, 29, 25, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(16, 185, 129, 0.08)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
              transition: `all var(--duration-normal) var(--ease-default)`,
              transitionDelay: visible ? `${i * 60}ms` : "0ms",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(16, 185, 129, 0.2)";
              el.style.boxShadow = `inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 0 20px ${CARD_GLOWS[i]}`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(16, 185, 129, 0.08)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.03)";
            }}
          >
            <div className="flex items-center gap-3">
              {/* Icon with glow ring */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
                style={{
                  background: "rgba(16, 185, 129, 0.06)",
                  boxShadow: `0 0 12px ${CARD_GLOWS[i]}`,
                }}
              >
                {h.icon}
              </div>
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
