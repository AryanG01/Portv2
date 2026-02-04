"use client";

import { useState, useCallback } from "react";
import ProjectCard from "@/components/project-card";
import profile from "@/data/profile.json";

interface ProjectsSectionProps {
  activeSkill: string | null;
}

export default function Projects({ activeSkill }: ProjectsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isMatch = useCallback(
    (tags: string[]) => {
      if (!activeSkill) return true;
      const lower = activeSkill.toLowerCase();
      return tags.some((t) => t.toLowerCase().includes(lower));
    },
    [activeSkill]
  );

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            isExpanded={expandedIndex === i}
            onToggle={() =>
              setExpandedIndex(expandedIndex === i ? null : i)
            }
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
          {" "}
          <span aria-hidden="true">&uarr;</span>
        </p>
      )}
    </>
  );
}
