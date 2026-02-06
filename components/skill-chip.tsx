"use client";

import { motion } from "motion/react";
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaDatabase,
  FaRocket,
  FaCode,
  FaLeaf,
  FaMicrosoft,
  FaCloud,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { SiTypescript, SiFlutter, SiFastapi, SiMongodb, SiRedis, SiApachekafka, SiVercel, SiSupabase } from "react-icons/si";
import { TbTestPipe, TbBrandCpp } from "react-icons/tb";
import { MdSpeed } from "react-icons/md";
import { IconType } from "react-icons";

// Map skill names to icons
const SKILL_ICONS: Record<string, IconType> = {
  // Languages
  Python: FaPython,
  Java: FaJava,
  TypeScript: SiTypescript,
  JavaScript: FaJs,
  C: FaCode,
  "C++": TbBrandCpp,
  SQL: FaDatabase,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  // Frameworks
  React: FaReact,
  Angular: FaAngular,
  "Node.js": FaNodeJs,
  "Spring Boot": FaLeaf,
  Flutter: SiFlutter,
  FastAPI: SiFastapi,
  // Data
  PostgreSQL: FaDatabase,
  MySQL: FaDatabase,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  // Cloud & Tools
  AWS: FaAws,
  GCP: FaCloud,
  Azure: FaMicrosoft,
  Docker: FaDocker,
  Git: FaGitAlt,
  Vercel: SiVercel,
  Redis: SiRedis,
  Kafka: SiApachekafka,
  // Methods
  Agile: FaRocket,
  "Test-Driven Development": TbTestPipe,
  "Event-Driven Architecture": MdSpeed,
};

// Skill colors for icons and active state
const SKILL_COLORS: Record<string, string> = {
  Python: "#3776AB",
  Java: "#ED8B00",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  C: "#A8B9CC",
  "C++": "#00599C",
  SQL: "#336791",
  HTML: "#E34F26",
  CSS: "#1572B6",
  React: "#61DAFB",
  Angular: "#DD0031",
  "Node.js": "#339933",
  "Spring Boot": "#6DB33F",
  Flutter: "#02569B",
  FastAPI: "#009688",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  MongoDB: "#47A248",
  Supabase: "#3FCF8E",
  AWS: "#FF9900",
  GCP: "#4285F4",
  Azure: "#0078D4",
  Docker: "#2496ED",
  Git: "#F05032",
  Vercel: "#ffffff",
  Redis: "#DC382D",
  Kafka: "#231F20",
  Agile: "#10b981",
  "Test-Driven Development": "#10b981",
  "Event-Driven Architecture": "#10b981",
};

interface SkillChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SkillChip({ label, isActive, onClick }: SkillChipProps) {
  const Icon = SKILL_ICONS[label] || FaCode;
  const iconColor = SKILL_COLORS[label] || "#10b981";

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={`group flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs transition-all ${
        isActive
          ? "text-background"
          : "text-muted hover:text-foreground"
      }`}
      style={{
        transitionDuration: "var(--duration-fast)",
        ...(isActive
          ? {
              background: `linear-gradient(135deg, ${iconColor}, ${iconColor}cc)`,
              boxShadow: `0 0 20px ${iconColor}50, 0 0 40px ${iconColor}20`,
              border: "1px solid transparent",
            }
          : {
              background: "rgba(21, 29, 25, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(16, 185, 129, 0.1)",
            }),
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: isActive
          ? `0 0 25px ${iconColor}60, 0 0 50px ${iconColor}30`
          : `0 0 15px ${iconColor}30`,
        borderColor: isActive ? "transparent" : `${iconColor}40`,
      }}
      aria-pressed={isActive}
    >
      <motion.span
        className="inline-flex"
        whileHover={{ rotate: 360, scale: 1.3 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Icon
          className="text-base"
          style={{ color: isActive ? "var(--background)" : iconColor }}
        />
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}
