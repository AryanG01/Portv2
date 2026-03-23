"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NowCard {
  title: string;
  color: string;       // CSS color value
  glow: string;        // rgba glow
  borderColor: string; // hover border
  items: string[];
  icon: React.ReactNode;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const BuildIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LearnIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const OpenToIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS: NowCard[] = [
  {
    title: "Currently Building",
    color: "var(--accent)",
    glow: "rgba(16, 185, 129, 0.18)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    icon: BuildIcon,
    items: [
      "AI × Systems tooling",
      "LLM-powered data pipelines",
      "Low-latency quant systems research",
    ],
  },
  {
    title: "Learning",
    color: "var(--gold)",
    glow: "rgba(245, 158, 11, 0.18)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    icon: LearnIcon,
    items: [
      "Market microstructure (quant focus)",
      "Distributed systems at scale (DDIA)",
      "Rust for performance-critical paths",
    ],
  },
  {
    title: "Open to",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.18)",
    borderColor: "rgba(6, 182, 212, 0.35)",
    icon: OpenToIcon,
    items: [
      "Full-time SWE · AI/ML · Quant (2026)",
      "Early-stage startups with hard problems",
      "Research roles at the systems/AI frontier",
    ],
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
      className="flex w-fit items-center gap-2.5 rounded-full px-4 py-2"
      style={{
        background: "rgba(16, 185, 129, 0.07)",
        border: "1px solid rgba(16, 185, 129, 0.18)",
      }}
      aria-label="Availability status"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        {!reduced && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ background: "var(--accent)" }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </span>
      <span
        className="font-mono text-xs tracking-wide"
        style={{ color: "var(--accent)" }}
      >
        Available from Jun 2026
      </span>
    </motion.div>
  );
}

interface NowCardProps {
  card: NowCard;
  index: number;
  reduced: boolean;
}

function NowCardItem({ card, index, reduced }: NowCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.45, ease: "easeOut", delay: index * 0.1 }
      }
      whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
      className="group relative flex flex-col gap-4 rounded-2xl p-6"
      style={{
        background: "rgba(17, 25, 22, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(16, 185, 129, 0.09)",
        borderTop: `4px solid ${card.color}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = card.borderColor;
        el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px ${card.glow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(16, 185, 129, 0.09)";
        el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03)";
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-semibold uppercase tracking-widest" style={{ color: card.color }}>
          {card.title}
        </h3>
        <span
          className="mt-0.5 shrink-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: card.color }}
        >
          {card.icon}
        </span>
      </div>

      {/* Bullet list */}
      <ul className="flex flex-col gap-2.5" role="list">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: card.color, opacity: 0.7 }}
              aria-hidden="true"
            />
            <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function NowSection() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-8">
      <StatusPill reduced={reduced} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <NowCardItem key={card.title} card={card} index={i} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}
