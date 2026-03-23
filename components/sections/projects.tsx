"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import ProjectCard from "@/components/project-card";
import ProjectDetailModal from "@/components/project-detail-modal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProfileData } from "@/lib/profile";

interface ProjectsSectionProps {
  profile: ProfileData;
  activeSkill: string | null;
}

// Bento grid column spans per project index (desktop ≥1280px, 12-col grid).
// Row 1: GUI Murphy (7) + Agentformer (5)
// Row 2: 2D Roguelike (4) + AlphaForge (4) + LinkGuard (4)
// Row 3: Do-It Volunteering (12)
const DESKTOP_SPANS: Record<number, number> = {
  0: 7, // GUI Murphy — hero
  5: 5, // Agentformer — shares row 1
  1: 4, // 2D Roguelike
  2: 4, // AlphaForge
  3: 4, // LinkGuard
  4: 12, // Do-It Volunteering — full-width banner
};

export default function Projects({ profile, activeSkill }: ProjectsSectionProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const isMatch = useCallback(
    (tags: string[]) => {
      if (!activeSkill) return true;
      const lower = activeSkill.toLowerCase();
      return tags.some((t) => t.toLowerCase().includes(lower));
    },
    [activeSkill]
  );

  const selectedProject =
    selectedProjectIndex !== null ? profile.projects[selectedProjectIndex] : null;

  const matchCount = profile.projects.filter((p) => isMatch(p.tags)).length;

  // Bento grid ordering: GUI Murphy(0), Agentformer(5), 2D Roguelike(1),
  // AlphaForge(2), LinkGuard(3), Do-It(4)
  const bentoOrder = [0, 5, 1, 2, 3, 4];

  return (
    <LayoutGroup>
      {/* Section header + stats bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent opacity-70">
          Selected Work
        </span>
        <div className="flex items-center gap-2">
          {[
            { label: "projects", value: profile.projects.length },
            { label: "hackathons", value: profile.hackathons_and_awards.length },
            { label: "wins", value: 3 },
          ].map((stat) => (
            <span
              key={stat.label}
              className="font-mono text-[11px]"
              style={{
                color: "var(--accent)",
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                borderRadius: "4px",
                padding: "2px 8px",
              }}
            >
              {stat.value} {stat.label}
            </span>
          ))}
        </div>
        <div className="flex-1" style={{ height: "1px", background: "rgba(16, 185, 129, 0.08)", minWidth: "20px" }} />
      </div>

      {/*
        Bento grid — xl+ uses a 12-column CSS grid with intentional spans.
        Below xl the grid collapses to a standard 2-col (md) or 1-col (sm) layout
        via Tailwind classes on a wrapping div.
      */}

      {/* xl+ bento layout */}
      <div
        className="hidden xl:grid"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "16px" }}
      >
        {bentoOrder.map((projectIndex, order) => {
          const project = profile.projects[projectIndex];
          if (!project) return null;
          const span = DESKTOP_SPANS[projectIndex] ?? 4;
          return (
            <motion.div
              key={project.name}
              style={{ gridColumn: `span ${span}` }}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={reduced ? { duration: 0 } : { duration: 0.5, delay: order * 0.08, ease: "easeOut" }}
            >
              <ProjectCard
                project={project}
                index={projectIndex}
                isSelected={selectedProjectIndex === projectIndex}
                onSelect={() => setSelectedProjectIndex(projectIndex)}
                dimmed={!!activeSkill && !isMatch(project.tags)}
                featured={projectIndex === 0 || projectIndex === 5}
              />
            </motion.div>
          );
        })}
      </div>

      {/* md tablet layout — 2-col uniform (natural order) */}
      <div className="hidden md:grid xl:hidden gap-5 grid-cols-2">
        {profile.projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          >
            <ProjectCard
              project={project}
              index={i}
              isSelected={selectedProjectIndex === i}
              onSelect={() => setSelectedProjectIndex(i)}
              dimmed={!!activeSkill && !isMatch(project.tags)}
            />
          </motion.div>
        ))}
      </div>

      {/* mobile layout — 1-col stacked (natural order) */}
      <div className="grid md:hidden gap-5 grid-cols-1">
        {profile.projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          >
            <ProjectCard
              project={project}
              index={i}
              isSelected={selectedProjectIndex === i}
              onSelect={() => setSelectedProjectIndex(i)}
              dimmed={!!activeSkill && !isMatch(project.tags)}
            />
          </motion.div>
        ))}
      </div>

      {/* Active-skill filter count */}
      {activeSkill && (
        <p className="mt-6 text-center font-mono text-xs text-muted">
          {matchCount} project{matchCount !== 1 ? "s" : ""} using{" "}
          <span className="text-accent">{activeSkill}</span>
        </p>
      )}

      <AnimatePresence>
        {selectedProject && selectedProjectIndex !== null && (
          <ProjectDetailModal
            project={selectedProject}
            index={selectedProjectIndex}
            onClose={() => setSelectedProjectIndex(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
