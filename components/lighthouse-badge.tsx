"use client";

import { motion } from "motion/react";
import { FaRocket, FaUniversalAccess, FaCheckCircle, FaSearch } from "react-icons/fa";

interface LighthouseScore {
  label: string;
  score: number;
  icon: React.ReactNode;
  color: string;
}

const LIGHTHOUSE_SCORES: LighthouseScore[] = [
  { label: "Performance", score: 95, icon: <FaRocket />, color: "#10b981" },
  { label: "Accessibility", score: 100, icon: <FaUniversalAccess />, color: "#06b6d4" },
  { label: "Best Practices", score: 100, icon: <FaCheckCircle />, color: "#f59e0b" },
  { label: "SEO", score: 100, icon: <FaSearch />, color: "#8b5cf6" },
];

function getScoreColor(score: number): string {
  if (score >= 90) return "#10b981"; // Green
  if (score >= 50) return "#f59e0b"; // Orange
  return "#ef4444"; // Red
}

function ScoreCircle({ score, color, delay }: { score: number; color: string; delay: number }) {
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-12 w-12">
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="3"
        />
        {/* Score circle */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
      {/* Score text */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        {score}
      </motion.span>
    </div>
  );
}

export default function LighthouseBadge() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aryanganju.com";
  const pagespeedUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(siteUrl)}`;

  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        background: "rgba(21, 29, 25, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
            }}
          >
            <FaRocket className="text-lg text-accent" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Lighthouse Scores
            </h3>
            <p className="font-mono text-xs text-muted">
              Built with performance in mind
            </p>
          </div>
        </div>

        {/* Verify link */}
        <motion.a
          href={pagespeedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
          style={{
            background: "rgba(16, 185, 129, 0.05)",
            border: "1px solid rgba(16, 185, 129, 0.1)",
          }}
          whileHover={{
            borderColor: "rgba(16, 185, 129, 0.25)",
            boxShadow: "0 0 10px rgba(16, 185, 129, 0.1)",
          }}
        >
          Verify →
        </motion.a>
      </div>

      {/* Scores grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {LIGHTHOUSE_SCORES.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-lg p-3"
            style={{
              background: "rgba(10, 15, 13, 0.4)",
            }}
            whileHover={{
              background: "rgba(16, 185, 129, 0.05)",
              boxShadow: `0 0 20px ${item.color}15`,
            }}
          >
            <ScoreCircle
              score={item.score}
              color={getScoreColor(item.score)}
              delay={i * 0.15}
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-center font-mono text-[10px] text-muted">
        Scores measured on a simulated mobile device
      </p>
    </motion.div>
  );
}
