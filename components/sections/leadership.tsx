"use client";

import { useState, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LeadershipEntry {
  role: string;
  org: string;
  date: string;
  bullets: string[];
  accentColor: string;
  accentRgb: string;
  glowColor: string;
}

const ENTRIES: LeadershipEntry[] = [
  {
    role: "Head of Operations",
    org: "GDSC NUS",
    date: "Aug 2024 – Aug 2025",
    bullets: [
      "Led booth at Computing Fair 2024, driving a 50% increase in chapter sign-ups",
      "Spearheaded Hack for Good 2025 — coordinated tech, marketing, finance, and partnerships",
      "Developed event roadmaps and proposals cross-functionally with branding and finance teams",
    ],
    accentColor: "var(--accent)",
    accentRgb: "16, 185, 129",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    role: "Teaching Assistant — CS1101S",
    org: "National University of Singapore",
    date: "Aug – Dec 2023",
    bullets: [
      "Mentored 10+ students in functional programming using Source and JavaScript",
      "Held weekly office hours and provided hands-on project guidance",
      "Achieved 100% passing rate across all mentored students",
    ],
    accentColor: "var(--cyan)",
    accentRgb: "6, 182, 212",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    role: "Welfare Committee Head & Sustainability",
    org: "Ridge View Residential College",
    date: "NUS Residential",
    bullets: [
      "Led the House Welfare Committee at Ridge View Residential College",
      "Organised kayaking trips to collect and remove ocean trash",
      "Completed the Certificate in Sustainability Studies",
    ],
    accentColor: "var(--violet)",
    accentRgb: "167, 139, 250",
    glowColor: "rgba(167, 139, 250, 0.15)",
  },
];

// Inline SVG dot icon — replaces emoji per codebase convention
function AccentDot({ color }: { color: string }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      aria-hidden="true"
      className="mt-[6px] shrink-0"
    >
      <circle cx="3" cy="3" r="3" fill={color} />
    </svg>
  );
}

interface LeadershipCardProps {
  entry: LeadershipEntry;
  index: number;
  visible: boolean;
  reduced: boolean;
  onClick: () => void;
}

function LeadershipCard({ entry, index, visible, reduced, onClick }: LeadershipCardProps) {
  const delay = reduced ? 0 : index * 80;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${entry.role} at ${entry.org} — click to expand`}
      className="group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-xl p-6 transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: "rgba(17, 25, 22, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(16, 185, 129, 0.09)",
        borderLeft: `4px solid ${entry.accentColor}`,
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        outlineColor: entry.accentColor,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
        transition: reduced
          ? "none"
          : `opacity var(--duration-slow) var(--ease-default), transform var(--duration-slow) var(--ease-default)`,
        transitionDelay: `${delay}ms`,
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={(e) => {
        if (reduced) return;
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px) scale(1)";
        el.style.borderColor = `rgba(${entry.accentRgb}, 0.35)`;
        el.style.borderLeftColor = entry.accentColor;
        el.style.boxShadow = `inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 28px ${entry.glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4)`;
      }}
      onMouseLeave={(e) => {
        if (reduced) return;
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.borderColor = "rgba(16, 185, 129, 0.09)";
        el.style.borderLeftColor = entry.accentColor;
        el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.03)";
      }}
    >
      {/* Corner glow — appears on hover via group */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: entry.glowColor }}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-sm font-semibold text-foreground sm:text-base">
            {entry.role}
          </h3>
          <span
            className="font-body text-xs font-medium"
            style={{ color: entry.accentColor }}
          >
            {entry.org}
          </span>
        </div>

        {/* Date badge */}
        <span
          className="shrink-0 rounded-md px-2.5 py-1 font-mono text-[10px] leading-none"
          style={{
            background: `rgba(${entry.accentRgb}, 0.08)`,
            color: entry.accentColor,
            border: `1px solid rgba(${entry.accentRgb}, 0.15)`,
          }}
        >
          {entry.date}
        </span>
      </div>

      {/* Bullet points */}
      <ul className="flex flex-col gap-2" role="list">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <AccentDot color={entry.accentColor} />
            <span className="font-body text-xs leading-relaxed text-muted sm:text-sm">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* "Click to expand" hint */}
      <div
        className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 2h3M2 2v3M10 10H7M10 10V7M2 10h3M2 10V7M10 2H7M10 2v3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="font-body text-[10px]"
          style={{ color: entry.accentColor }}
        >
          Expand
        </span>
      </div>
    </article>
  );
}

interface LeadershipPaneProps {
  entry: LeadershipEntry;
  onClose: () => void;
  reduced: boolean;
}

function LeadershipPane({ entry, onClose, reduced }: LeadershipPaneProps) {
  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: reduced ? "none" : "fadeIn 150ms ease",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.role} at ${entry.org}`}
    >
      {/* Pane */}
      <div
        className="relative w-full max-w-lg overflow-y-auto rounded-2xl p-7 sm:p-9"
        style={{
          background: "rgba(8, 12, 10, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid rgba(${entry.accentRgb}, 0.22)`,
          borderLeft: `4px solid ${entry.accentColor}`,
          boxShadow: `0 0 0 1px rgba(${entry.accentRgb}, 0.06), 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 48px ${entry.glowColor}`,
          maxHeight: "calc(100vh - 4rem)",
          animation: reduced ? "none" : "slideUp 180ms ease",
        }}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: entry.accentColor }}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Role + org */}
        <div className="mb-6 flex flex-col gap-1 pr-8">
          <h2 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
            {entry.role}
          </h2>
          <span className="font-body text-sm font-medium" style={{ color: entry.accentColor }}>
            {entry.org}
          </span>
          <span
            className="mt-1 w-fit rounded-md px-2.5 py-1 font-mono text-[10px] leading-none"
            style={{
              background: `rgba(${entry.accentRgb}, 0.08)`,
              color: entry.accentColor,
              border: `1px solid rgba(${entry.accentRgb}, 0.18)`,
            }}
          >
            {entry.date}
          </span>
        </div>

        {/* Divider */}
        <div
          className="mb-6 h-px w-full"
          style={{ background: `rgba(${entry.accentRgb}, 0.12)` }}
          aria-hidden="true"
        />

        {/* Highlights */}
        <ul className="flex flex-col gap-3.5" role="list">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <AccentDot color={entry.accentColor} />
              <span className="font-body text-sm leading-relaxed text-muted">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Leadership() {
  const { ref, visible } = useReveal(0.1);
  const reduced = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIdx(null), []);

  useEffect(() => {
    if (selectedIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedIdx, close]);

  // Prevent body scroll while pane is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIdx]);

  return (
    <>
      <div className="space-y-8">
        {/* Section intro */}
        <p
          className="font-body text-sm text-muted sm:text-base"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: reduced
              ? "none"
              : `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
          }}
        >
          Beyond engineering{" "}
          <span className="text-foreground">
            — leadership, teaching, and community impact.
          </span>
        </p>

        {/* 2x2 grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {ENTRIES.map((entry, i) => (
            <LeadershipCard
              key={entry.org + entry.role}
              entry={entry}
              index={i}
              visible={visible}
              reduced={reduced}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Modal pane — rendered outside the grid flow */}
      {selectedIdx !== null && (
        <LeadershipPane
          entry={ENTRIES[selectedIdx]}
          onClose={close}
          reduced={reduced}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
}
