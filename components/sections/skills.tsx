"use client";

import SkillChip from "@/components/skill-chip";
import profile from "@/data/profile.json";

const CATEGORIES: { key: keyof typeof profile.skills; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "data", label: "Data" },
  { key: "cloud_and_tools", label: "Cloud & Tools" },
  { key: "methods", label: "Methods" },
];

interface SkillsSectionProps {
  activeSkill: string | null;
  onSkillToggle: (skill: string) => void;
}

export default function Skills({ activeSkill, onSkillToggle }: SkillsSectionProps) {
  return (
    <div className="space-y-6">
      {CATEGORIES.map(({ key, label }) => (
        <div key={key}>
          <span className="mb-3 block font-mono text-xs uppercase tracking-wider text-muted">
            {label}
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.skills[key].map((skill) => (
              <SkillChip
                key={skill}
                label={skill}
                isActive={activeSkill === skill}
                onClick={() => onSkillToggle(skill)}
              />
            ))}
          </div>
        </div>
      ))}

      {activeSkill && (
        <p className="pt-2 font-mono text-xs text-muted">
          Showing projects using{" "}
          <span className="text-accent">{activeSkill}</span>
          {" "}above{" "}
          <span aria-hidden="true">&uarr;</span>
          {" "}&middot;{" "}
          <button
            onClick={() => onSkillToggle(activeSkill)}
            className="underline transition-colors hover:text-foreground"
          >
            Clear filter
          </button>
        </p>
      )}
    </div>
  );
}
