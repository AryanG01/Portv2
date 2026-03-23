"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SKILL_CATEGORIES = [
  {
    label: "AI / ML",
    color: "#10b981",
    skills: [
      "Python", "FastAPI", "LLM Orchestration", "RAG", "CLIP",
      "YOLOv8", "Semantic Search", "NLP Pipelines", "GPT-4V", "Vector DBs",
    ],
  },
  {
    label: "Systems / Backend",
    color: "#06b6d4",
    reverse: true,
    skills: [
      "TypeScript", "Node.js", "PostgreSQL", "Redis", "Kafka",
      "Docker", "FastAPI", "WebSockets", "Event-Driven Architecture", "TDD",
    ],
  },
  {
    label: "Cloud / Infra",
    color: "#f59e0b",
    skills: [
      "AWS", "GCP", "Azure", "Vercel", "CI/CD", "Supabase",
      "MongoDB", "MySQL", "Cloudflare Workers", "Microservices",
    ],
  },
];

interface SkillPillProps {
  skill: string;
  color: string;
  label?: string;
}

function SkillPill({ skill, color }: SkillPillProps) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-sm"
      style={{
        background: "rgba(17, 25, 22, 0.7)",
        border: `1px solid ${color}20`,
        color: "var(--muted)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {skill}
    </span>
  );
}

interface MarqueeRowProps {
  skills: string[];
  color: string;
  reverse?: boolean;
  label: string;
  reduced: boolean;
}

function MarqueeRow({ skills, color, reverse = false, label, reduced }: MarqueeRowProps) {
  const duplicated = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="flex flex-col gap-2">
      {/* Category label */}
      <div className="flex items-center gap-2 px-2">
        <span
          className="h-1 w-6 rounded-full"
          style={{ background: color }}
        />
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color }}
        >
          {label}
        </span>
      </div>

      {/* Scrolling track */}
      <div
        className="marquee-wrapper overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="flex gap-2"
          style={{
            animation: reduced
              ? "none"
              : `${reverse ? "marquee-right" : "marquee-left"} ${reverse ? "40s" : "35s"} linear infinite`,
            willChange: reduced ? "auto" : "transform",
          }}
        >
          {duplicated.map((skill, i) => (
            <SkillPill key={`${skill}-${i}`} skill={skill} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-6 py-4">
      {SKILL_CATEGORIES.map((cat) => (
        <MarqueeRow
          key={cat.label}
          skills={cat.skills}
          color={cat.color}
          reverse={cat.reverse}
          label={cat.label}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
