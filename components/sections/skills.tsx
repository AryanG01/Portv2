"use client";

import { motion } from "motion/react";
import SkillChip from "@/components/skill-chip";
import type { ProfileData } from "@/lib/profile";

const CATEGORY_KEYS = ["languages", "frameworks", "data", "cloud_and_tools", "methods"] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  data: "Data",
  cloud_and_tools: "Cloud & Tools",
  methods: "Methods",
};

const PROFICIENCY_LEVELS = [
  { key: "expert", label: "Expert", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
  { key: "proficient", label: "Proficient", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
  { key: "familiar", label: "Familiar", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)" },
] as const;

interface SkillsSectionProps {
  profile: ProfileData;
  activeSkill: string | null;
  onSkillToggle: (skill: string) => void;
}

type ProficiencyKey = "expert" | "proficient" | "familiar";

function getSkillProficiency(skill: string, proficiency: ProfileData["skillProficiency"]): ProficiencyKey | null {
  if (proficiency.expert.includes(skill)) return "expert";
  if (proficiency.proficient.includes(skill)) return "proficient";
  if (proficiency.familiar.includes(skill)) return "familiar";
  return null;
}

function getProficiencyStyle(level: ProficiencyKey | null) {
  const found = PROFICIENCY_LEVELS.find(p => p.key === level);
  return found || { color: "#10b981", glow: "rgba(16, 185, 129, 0.2)" };
}

export default function Skills({ profile, activeSkill, onSkillToggle }: SkillsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Proficiency Legend */}
      <div className="flex flex-wrap items-center gap-4 pb-2">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          Proficiency:
        </span>
        {PROFICIENCY_LEVELS.map((level) => (
          <div key={level.key} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: level.color,
                boxShadow: `0 0 8px ${level.glow}`,
              }}
            />
            <span className="font-mono text-xs text-muted">{level.label}</span>
          </div>
        ))}
      </div>

      {/* Skill Categories */}
      {CATEGORY_KEYS.map((key) => (
        <div key={key}>
          <span className="mb-3 block font-mono text-xs uppercase tracking-wider text-muted">
            {CATEGORY_LABELS[key]}
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.skills[key].map((skill) => {
              const proficiency = getSkillProficiency(skill, profile.skillProficiency);
              const style = getProficiencyStyle(proficiency);

              return (
                <motion.div
                  key={skill}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Proficiency indicator dot */}
                  {proficiency && (
                    <span
                      className="absolute -right-0.5 -top-0.5 z-10 h-2 w-2 rounded-full"
                      style={{
                        background: style.color,
                        boxShadow: `0 0 6px ${style.glow}`,
                      }}
                    />
                  )}
                  <SkillChip
                    label={skill}
                    isActive={activeSkill === skill}
                    onClick={() => onSkillToggle(skill)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Currently Learning */}
      {profile.skillProficiency.learning && profile.skillProficiency.learning.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Currently Learning
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.skillProficiency.learning.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-md px-3 py-1.5 font-mono text-xs"
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px dashed rgba(16, 185, 129, 0.25)",
                  color: "var(--accent)",
                }}
                whileHover={{
                  borderColor: "rgba(16, 185, 129, 0.5)",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active filter indicator */}
      {activeSkill && (
        <p className="pt-2 font-mono text-xs text-muted">
          Showing matching projects{" "}&middot;{" "}
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
