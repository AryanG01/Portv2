"use client";

import { useReveal } from "@/hooks/use-reveal";
import type { ProfileData } from "@/lib/profile";

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

export default function Hackathons({ profile }: { profile: ProfileData }) {
  const { ref, visible } = useReveal(0.2);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      {profile.hackathons_and_awards.map((item, i) => (
        <div
          key={item.name}
          className="flex flex-col gap-3 rounded-xl p-5 transition-all"
          style={{
            background: "rgba(21, 29, 25, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(16, 185, 129, 0.08)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
            transition: `all var(--duration-normal) var(--ease-default)`,
            transitionDelay: visible ? `${i * 50}ms` : "0ms",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(16, 185, 129, 0.2)";
            el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 0 20px rgba(16, 185, 129, 0.1)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(16, 185, 129, 0.08)";
            el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.03)";
          }}
        >
          <span className="font-body text-sm text-foreground md:text-base">
            {item.name}
          </span>
          <span
            className="inline-flex w-fit shrink-0 items-center rounded-md px-3 py-1 font-mono text-xs"
            style={
              isRanking(item.result)
                ? {
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.1))",
                    color: "var(--gold)",
                    border: "1px solid rgba(245, 158, 11, 0.15)",
                    boxShadow: "0 0 12px rgba(245, 158, 11, 0.08)",
                  }
                : {
                    background: "rgba(21, 29, 25, 0.5)",
                    color: "var(--muted)",
                    border: "1px solid rgba(16, 185, 129, 0.06)",
                  }
            }
          >
            {formatResult(item.result)}
          </span>
        </div>
      ))}
    </div>
  );
}
