"use client";

import { useReveal } from "@/hooks/use-reveal";
import profile from "@/data/profile.json";

function isRanking(result: string): boolean {
  return /top \d+/i.test(result) || /most impressive/i.test(result);
}

function formatResult(result: string) {
  const parts = result.split(/(\d{3,}\+?)/);
  return parts.map((part, i) =>
    /\d{3,}\+?/.test(part) ? (
      <span key={i} className="font-mono font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Hackathons() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div ref={ref} className="flex flex-col">
      {profile.hackathons_and_awards.map((item, i) => (
        <div
          key={item.name}
          className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
            i < profile.hackathons_and_awards.length - 1
              ? "border-b border-border"
              : ""
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
            transitionDelay: visible ? `${i * 30}ms` : "0ms",
          }}
        >
          <span className="font-body text-sm text-foreground md:text-base">
            {item.name}
          </span>
          <span
            className={`inline-flex w-fit shrink-0 items-center rounded-md px-3 py-1 font-mono text-xs ${
              isRanking(item.result)
                ? "bg-accent-subtle text-accent"
                : "bg-border/50 text-muted"
            }`}
          >
            {formatResult(item.result)}
          </span>
        </div>
      ))}
    </div>
  );
}
