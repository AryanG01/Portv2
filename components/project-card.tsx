"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

interface Project {
  name: string;
  context: string;
  summary: string;
  details: string[];
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  dimmed: boolean;
}

export default function ProjectCard({
  project,
  isExpanded,
  onToggle,
  dimmed,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggle();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onToggle]);

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`rounded-xl border border-border bg-surface p-6 transition-all ${
        dimmed
          ? "pointer-events-none opacity-40"
          : "cursor-pointer opacity-100"
      }`}
      style={{ transitionDuration: "var(--duration-normal)" }}
      whileHover={!dimmed && !isExpanded ? { y: -2, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" } : {}}
      onClick={() => {
        if (!dimmed && !isExpanded) onToggle();
      }}
      role="button"
      tabIndex={dimmed ? -1 : 0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !dimmed) {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Context badge */}
      <span className="inline-block rounded-md bg-accent-subtle px-2.5 py-1 font-mono text-xs text-accent">
        {project.context}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-heading text-xl font-semibold text-foreground md:text-2xl">
        {project.name}
      </h3>

      {/* Summary */}
      <p className="mt-2 font-body text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              <ul className="space-y-2.5">
                {project.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-3 font-body text-sm text-muted"
                  >
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="mt-4 font-mono text-xs text-muted transition-colors hover:text-foreground"
                aria-label={`Close ${project.name} details`}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
