"use client";

import { motion } from "motion/react";

interface SkillChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SkillChip({ label, isActive, onClick }: SkillChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
        isActive
          ? "bg-accent text-white"
          : "border border-border text-muted hover:border-foreground/30 hover:text-foreground"
      }`}
      style={{ transitionDuration: "var(--duration-fast)" }}
      aria-pressed={isActive}
    >
      {label}
    </motion.button>
  );
}
