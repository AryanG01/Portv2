"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import ProjectCard from "@/components/project-card";
import ProjectDetailModal from "@/components/project-detail-modal";
import type { ProfileData } from "@/lib/profile";

interface ProjectsSectionProps {
  profile: ProfileData;
  activeSkill: string | null;
}

export default function Projects({ profile, activeSkill }: ProjectsSectionProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const isMatch = useCallback(
    (tags: string[]) => {
      if (!activeSkill) return true;
      const lower = activeSkill.toLowerCase();
      return tags.some((t) => t.toLowerCase().includes(lower));
    },
    [activeSkill]
  );

  const selectedProject = selectedProjectIndex !== null ? profile.projects[selectedProjectIndex] : null;

  return (
    <LayoutGroup>
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
        {profile.projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            isSelected={selectedProjectIndex === i}
            onSelect={() => setSelectedProjectIndex(i)}
            dimmed={!!activeSkill && !isMatch(project.tags)}
          />
        ))}
      </div>

      {activeSkill && (
        <p className="mt-6 text-center font-mono text-xs text-muted">
          {profile.projects.filter((p) => isMatch(p.tags)).length} project
          {profile.projects.filter((p) => isMatch(p.tags)).length !== 1
            ? "s"
            : ""}{" "}
          using{" "}
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
