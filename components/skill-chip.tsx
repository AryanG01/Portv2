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
      className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
        isActive
          ? "bg-accent text-background shadow-[0_0_12px_rgba(20,184,166,0.3)]"
          : "border border-border text-muted hover:border-border-hover hover:text-foreground"
      }`}
      style={{ transitionDuration: "var(--duration-fast)" }}
      aria-pressed={isActive}
    >
      {label}
    </motion.button>
  );
}
