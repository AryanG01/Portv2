"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTilt } from "@/hooks/use-tilt";

interface ProjectCaseStudy {
  problem?: string;
  approach?: string;
  challenges?: string[];
  metrics?: string[];
  codeHighlight?: string;
}

interface Project {
  name: string;
  context: string;
  summary: string;
  details: string[];
  tags: string[];
  github?: string | null;
  demo?: string | null;
  caseStudy?: ProjectCaseStudy;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  dimmed: boolean;
  featured?: boolean;
}

const CONTEXT_COLORS: Record<string, { accent: string; glow: string; gradient: string }> = {
  "TikTok TechJam 2025": {
    accent: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.08))",
  },
  "Cursor Hackathon": {
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(6,182,212,0.08))",
  },
  "Personal Project": {
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.08))",
  },
  "HackRoll 2024": {
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.08))",
  },
  "Community Project": {
    accent: "#22c55e",
    glow: "rgba(34,197,94,0.3)",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.08))",
  },
  "AIT x Redis x Cloudflare Mini-Hack": {
    accent: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.08))",
  },
  "OpenAI Codex Hackathon": {
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(16,185,129,0.08))",
  },
};

const DEFAULT_C = {
  accent: "#10b981",
  glow: "rgba(16,185,129,0.3)",
  gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.08))",
};

// Key metric pulled from case study for featured cards
const FEATURED_METRICS: Record<string, string> = {
  "GUI Murphy": "Top 12 / 2300+",
  "Agentformer": "Top 5 · Singapore",
  "AlphaForge": "<100ms latency",
};

export default function ProjectCard({
  project,
  index,
  isSelected,
  onSelect,
  dimmed,
  featured = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const c = CONTEXT_COLORS[project.context] ?? DEFAULT_C;

  const { ref: tiltRef, handlers: tiltHandlers } = useTilt(6);

  // Compose cardRef (height measurement) + tiltRef (DOM style mutations)
  const composedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (cardRef.current && !isSelected) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [isSelected]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || dimmed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (isSelected) {
    return (
      <div
        className="rounded-2xl"
        style={{
          height: cardHeight || 220,
          background: "rgba(17,25,22,0.2)",
          border: "1px dashed rgba(16,185,129,0.08)",
        }}
      />
    );
  }

  const minHeight = featured ? 280 : 200;

  return (
    <motion.div
      ref={composedRef}
      layoutId={reduced ? undefined : `project-card-${index}`}
      layout={!reduced}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
        dimmed ? "pointer-events-none opacity-25" : "cursor-pointer"
      }`}
      style={{
        background: "rgba(17,25,22,0.65)",
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(16,185,129,0.09)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        minHeight,
        willChange: "transform",
      }}
      whileHover={
        !dimmed && !reduced
          ? {
              y: -6,
              borderColor: `${c.accent}35`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px ${c.glow}, 0 0 40px ${c.glow.replace("0.3", "0.08")}`,
            }
          : {}
      }
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
      onClick={() => { if (!dimmed) onSelect(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => { setIsHovered(false); tiltHandlers.onMouseLeave(); }}
      onMouseMove={(e) => { handleMouseMove(e); tiltHandlers.onMouseMove(e); }}
      role="button"
      tabIndex={dimmed ? -1 : 0}
      aria-haspopup="dialog"
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !dimmed) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Mouse-tracked radial glow */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, ${c.glow.replace("0.3", "0.12")}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Context gradient sweep from top */}
      <div
        className="absolute inset-x-0 top-0 h-48 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: c.gradient }}
      />

      {/* Top colored border accent */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, ${c.accent}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[11px] font-medium"
            style={{
              background: `${c.accent}18`,
              color: c.accent,
              border: `1px solid ${c.accent}28`,
            }}
          >
            {project.context}
          </span>

          <div className="flex items-center gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted transition-colors hover:text-accent"
                whileHover={reduced ? {} : { scale: 1.2 }}
                whileTap={reduced ? {} : { scale: 0.9 }}
                aria-label={`View ${project.name} on GitHub`}
              >
                <FaGithub className="text-base" />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted transition-colors hover:text-accent"
                whileHover={reduced ? {} : { scale: 1.2 }}
                aria-label={`View ${project.name} live demo`}
              >
                <FaExternalLinkAlt className="text-xs" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Featured metric badge */}
        {featured && FEATURED_METRICS[project.name] && (
          <div className="mt-4">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-sm font-bold"
              style={{
                background: `${c.accent}15`,
                color: c.accent,
                border: `1px solid ${c.accent}30`,
                boxShadow: `0 0 20px ${c.glow.replace("0.3", "0.15")}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c.accent, boxShadow: `0 0 6px ${c.accent}` }}
              />
              {FEATURED_METRICS[project.name]}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="mt-4 font-heading font-bold text-foreground transition-colors duration-200 group-hover:text-foreground"
          style={{ fontSize: featured ? "1.6rem" : "1.2rem", lineHeight: 1.2 }}
        >
          {project.name}
        </h3>

        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 font-mono text-[11px] text-muted transition-colors duration-200 group-hover:text-foreground-secondary"
              style={{
                background: "rgba(17,25,22,0.8)",
                border: "1px solid rgba(16,185,129,0.07)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case study CTA — pushed to bottom */}
        {project.caseStudy && (
          <div className="mt-auto pt-4">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-xs transition-all duration-200"
              style={{ color: c.accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c.accent, boxShadow: `0 0 6px ${c.accent}` }}
              />
              Case study
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
