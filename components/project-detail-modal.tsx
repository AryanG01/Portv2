"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLightbulb, FaTools, FaChartLine, FaCode } from "react-icons/fa";
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

interface ProjectDetailModalProps {
  project: Project;
  index: number;
  onClose: () => void;
}

const CONTEXT_COLORS: Record<string, { gradient: string; glow: string; accent: string }> = {
  "TikTok TechJam 2025": { gradient: "linear-gradient(135deg, #10b981, #06b6d4)", glow: "rgba(16, 185, 129, 0.3)", accent: "#10b981" },
  "Cursor Hackathon": { gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)", glow: "rgba(139, 92, 246, 0.3)", accent: "#8b5cf6" },
  "Personal Project": { gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", glow: "rgba(245, 158, 11, 0.3)", accent: "#f59e0b" },
  "HackRoll 2024": { gradient: "linear-gradient(135deg, #06b6d4, #10b981)", glow: "rgba(6, 182, 212, 0.3)", accent: "#06b6d4" },
  "Community Project": { gradient: "linear-gradient(135deg, #10b981, #22c55e)", glow: "rgba(16, 185, 129, 0.3)", accent: "#10b981" },
  "AIT x Redis x Cloudflare Mini-Hack": { gradient: "linear-gradient(135deg, #ef4444, #f59e0b)", glow: "rgba(239, 68, 68, 0.3)", accent: "#ef4444" },
};

const DEFAULT_COLORS = { gradient: "linear-gradient(135deg, #10b981, #06b6d4)", glow: "rgba(16, 185, 129, 0.3)", accent: "#10b981" };

export default function ProjectDetailModal({
  project,
  index,
  onClose,
}: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const colors = CONTEXT_COLORS[project.context] || DEFAULT_COLORS;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const caseStudy = project.caseStudy;

  // Spring transition for the layout morph
  const springTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  // Delayed content fade (waits for morph to begin)
  const contentDelay = reduced ? 0 : 0.15;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      />

      {/* Modal — uses layoutId to morph from card */}
      <motion.div
        ref={modalRef}
        layoutId={reduced ? undefined : `project-card-${index}`}
        className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl"
        style={{
          background: "rgba(21, 29, 25, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(16, 185, 129, 0.15)",
          boxShadow: `0 0 60px ${colors.glow}, 0 25px 80px rgba(0, 0, 0, 0.5)`,
        }}
        transition={springTransition}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header gradient bar */}
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{ background: colors.gradient }}
        />

        {/* Close button */}
        <motion.button
          className="absolute right-4 top-5 z-20 rounded-full p-2 text-muted transition-colors hover:text-foreground"
          style={{ background: "rgba(21, 29, 25, 0.8)" }}
          onClick={onClose}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </motion.button>

        {/* Content fades in with delay after morph begins */}
        <motion.div
          className="p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, delay: contentDelay }}
        >
          {/* Header */}
          <div className="mb-8">
            <span
              className="mb-3 inline-block rounded-md px-3 py-1.5 font-mono text-xs"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
                border: `1px solid ${colors.accent}30`,
                color: colors.accent,
              }}
            >
              {project.context}
            </span>
            <h2
              id="modal-title"
              className="mb-3 font-heading text-3xl font-bold text-foreground md:text-4xl"
            >
              {project.name}
            </h2>
            <p className="font-body text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md px-3 py-1.5 font-mono text-xs text-foreground-secondary"
                style={{
                  background: "rgba(21, 29, 25, 0.8)",
                  border: "1px solid rgba(16, 185, 129, 0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Case Study Sections */}
          {caseStudy && (
            <div className="space-y-8">
              {caseStudy.problem && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelay + 0.1 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <FaLightbulb className="text-gold" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Problem Statement
                    </h3>
                  </div>
                  <p className="font-body leading-relaxed text-muted">
                    {caseStudy.problem}
                  </p>
                </motion.div>
              )}

              {caseStudy.approach && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelay + 0.2 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <FaTools className="text-accent" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Solution Approach
                    </h3>
                  </div>
                  <p className="font-body leading-relaxed text-muted">
                    {caseStudy.approach}
                  </p>
                </motion.div>
              )}

              {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelay + 0.3 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <FaTools className="text-gold" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Challenges Overcome
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {caseStudy.challenges.map((challenge, i) => (
                      <li key={i} className="flex gap-3 font-body text-muted">
                        <span
                          className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: colors.accent, boxShadow: `0 0 6px ${colors.accent}` }}
                        />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelay + 0.4 }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <FaChartLine className="text-accent" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Impact & Metrics
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        className="rounded-xl p-4"
                        style={{
                          background: "rgba(16, 185, 129, 0.05)",
                          border: "1px solid rgba(16, 185, 129, 0.1)",
                        }}
                        whileHover={{
                          borderColor: "rgba(16, 185, 129, 0.25)",
                          boxShadow: `0 0 20px ${colors.glow}`,
                        }}
                      >
                        <span className="font-mono text-sm text-accent">
                          {metric}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {caseStudy.codeHighlight && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contentDelay + 0.5 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <FaCode className="text-accent" />
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Code Highlight
                    </h3>
                  </div>
                  <pre
                    className="overflow-x-auto rounded-xl p-4 font-mono text-sm leading-relaxed"
                    style={{
                      background: "rgba(10, 15, 13, 0.8)",
                      border: "1px solid rgba(16, 185, 129, 0.1)",
                    }}
                  >
                    <code className="text-foreground-secondary">
                      {caseStudy.codeHighlight}
                    </code>
                  </pre>
                </motion.div>
              )}
            </div>
          )}

          {/* Details */}
          {project.details && project.details.length > 0 && (
            <motion.div
              className="mt-8"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: contentDelay + 0.6 }}
            >
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.details.map((detail, i) => (
                  <li key={i} className="flex gap-3 font-body text-muted">
                    <span
                      className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)" }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: contentDelay + 0.7 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
                style={{
                  background: "rgba(21, 29, 25, 0.8)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  color: "var(--foreground)",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaGithub className="text-lg" />
                View Source Code
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
                style={{
                  background: colors.gradient,
                  color: "var(--background)",
                  boxShadow: `0 0 20px ${colors.glow}`,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 30px ${colors.glow}`,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <FaExternalLinkAlt />
                Live Demo
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
