"use client";

import { useReveal } from "@/hooks/use-reveal";
import type { ProfileData } from "@/lib/profile";

const RANK_BADGE: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  gold: {
    bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(249, 115, 22, 0.12))",
    border: "rgba(245, 158, 11, 0.25)",
    text: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  emerald: {
    bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.10))",
    border: "rgba(16, 185, 129, 0.22)",
    text: "#10b981",
    glow: "rgba(16, 185, 129, 0.12)",
  },
};

function formatResult(result: string) {
  const parts = result.split(/(\d{3,}\+?)/);
  return parts.map((part, i) =>
    /\d{3,}\+?/.test(part) ? (
      <span key={i} className="font-mono font-semibold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function isTopRanking(result: string): boolean {
  return /top \d+/i.test(result) || /most impressive/i.test(result) || /1st/i.test(result);
}

export default function Hackathons({ profile }: { profile: ProfileData }) {
  const { ref, visible } = useReveal(0.2);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {profile.hackathons_and_awards.map((item, i) => {
        const ranked = isTopRanking(item.result);
        const badge = ranked ? RANK_BADGE.gold : RANK_BADGE.emerald;

        return (
          <div
            key={item.name}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-xl p-5 transition-all duration-300"
            style={{
              background: "rgba(17, 25, 22, 0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(16, 185, 129, 0.09)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
              transition: "opacity 300ms ease, transform 300ms ease, border-color 200ms ease, box-shadow 200ms ease",
              transitionDelay: visible ? `${i * 55}ms` : "0ms",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = badge.border;
              el.style.boxShadow = `inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 28px ${badge.glow}`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(16, 185, 129, 0.09)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.04)";
            }}
          >
            {/* Trophy icon for top rankings */}
            {ranked && (
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                </svg>
              </div>
            )}

            <p className="font-body text-sm leading-snug text-foreground pr-6">
              {item.name}
            </p>

            <span
              className="inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 font-mono text-xs font-medium"
              style={{
                background: badge.bg,
                color: badge.text,
                border: `1px solid ${badge.border}`,
                boxShadow: `0 0 12px ${badge.glow}`,
              }}
            >
              {formatResult(item.result)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

