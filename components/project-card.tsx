"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
}

const CONTEXT_COLORS: Record<string, { gradient: string; glow: string }> = {
  "TikTok TechJam 2025": { gradient: "linear-gradient(135deg, #10b981, #06b6d4)", glow: "rgba(16, 185, 129, 0.3)" },
  "Cursor Hackathon": { gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)", glow: "rgba(139, 92, 246, 0.3)" },
  "Personal Project": { gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", glow: "rgba(245, 158, 11, 0.3)" },
  "HackRoll 2024": { gradient: "linear-gradient(135deg, #06b6d4, #10b981)", glow: "rgba(6, 182, 212, 0.3)" },
  "Community Project": { gradient: "linear-gradient(135deg, #10b981, #22c55e)", glow: "rgba(16, 185, 129, 0.3)" },
  "AIT x Redis x Cloudflare Mini-Hack": { gradient: "linear-gradient(135deg, #ef4444, #f59e0b)", glow: "rgba(239, 68, 68, 0.3)" },
};

const DEFAULT_COLORS = { gradient: "linear-gradient(135deg, #10b981, #06b6d4)", glow: "rgba(16, 185, 129, 0.3)" };

export default function ProjectCard({
  project,
  index,
  isSelected,
  onSelect,
  dimmed,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const reduced = useReducedMotion();
  const colors = CONTEXT_COLORS[project.context] || DEFAULT_COLORS;

  // Capture card height for ghost placeholder
  useEffect(() => {
    if (cardRef.current && !isSelected) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [isSelected]);

  // When selected, render a ghost placeholder to prevent grid layout shift
  if (isSelected) {
    return (
      <div
        className="rounded-xl"
        style={{
          height: cardHeight || "auto",
          background: "rgba(21, 29, 25, 0.2)",
          border: "1px dashed rgba(16, 185, 129, 0.06)",
        }}
      />
    );
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={reduced ? undefined : `project-card-${index}`}
      layout={!reduced}
      className={`group relative rounded-xl p-6 transition-colors ${
        dimmed ? "pointer-events-none opacity-30" : "cursor-pointer opacity-100"
      }`}
      style={{
        background: "rgba(21, 29, 25, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        overflow: "hidden",
      }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 30 }
      }
      whileHover={
        !dimmed && !reduced
          ? {
              y: -6,
              borderColor: "rgba(16, 185, 129, 0.25)",
              boxShadow:
                `inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 40px ${colors.glow}, 0 0 30px rgba(16, 185, 129, 0.08)`,
            }
          : {}
      }
      onClick={() => {
        if (!dimmed) onSelect();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {/* Hover reveal gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: isHovered && !dimmed ? "inset(60% 0 0 0)" : "inset(100% 0 0 0)" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: colors.gradient,
          opacity: 0.1,
        }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isHovered && !dimmed ? "200%" : "-100%", opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          width: "50%",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-block rounded-md px-2.5 py-1 font-mono text-xs text-accent"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.1)",
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
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                aria-label={`View ${project.name} on GitHub`}
              >
                <FaGithub className="text-lg" />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted transition-colors hover:text-accent"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View ${project.name} live demo`}
              >
                <FaExternalLinkAlt className="text-sm" />
              </motion.a>
            )}
          </div>
        </div>

        <h3 className="mt-3 font-heading text-xl font-semibold text-foreground md:text-2xl">
          {project.name}
        </h3>

        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="rounded-md px-2.5 py-1 font-mono text-xs text-muted transition-colors group-hover:text-foreground-secondary"
              style={{
                background: "rgba(21, 29, 25, 0.8)",
                border: "1px solid rgba(16, 185, 129, 0.06)",
              }}
              whileHover={{ scale: 1.1, borderColor: "rgba(16, 185, 129, 0.3)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {project.caseStudy && (
          <motion.div
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)" }} />
            Click for case study
          </motion.div>
        )}
      </div>

      {/* Corner accent */}
      <div
        className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: colors.gradient,
          filter: "blur(30px)",
        }}
      />
    </motion.div>
  );
}
