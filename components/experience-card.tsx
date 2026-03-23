"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  highlights: string[];
}

interface ExperienceCardProps {
  entry: ExperienceEntry;
  isExpanded: boolean;
  onToggle: () => void;
  accentColor?: string;
  accentGlow?: string;
}

const COMPANY_ACCENTS: Record<string, { color: string; glow: string }> = {
  Mercuria: { color: "#10b981", glow: "rgba(16, 185, 129, 0.25)" },
  "TVS Digital Pte. Ltd.": { color: "#06b6d4", glow: "rgba(6, 182, 212, 0.25)" },
  "Google Developer Student Clubs NUS": { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.22)" },
  "National University of Singapore": { color: "#a78bfa", glow: "rgba(167, 139, 250, 0.22)" },
  "Credence Singapore": { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.22)" },
};

const DEFAULT_ACCENT = { color: "#10b981", glow: "rgba(16, 185, 129, 0.25)" };

function highlightStat(text: string) {
  return text.replace(
    /(\d+%|~\d+%|\d+\+)/g,
    '<span class="font-mono font-semibold" style="color: var(--accent)">$1</span>'
  );
}

export default function ExperienceCard({
  entry,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  const reduced = useReducedMotion();
  const accent = COMPANY_ACCENTS[entry.company] || DEFAULT_ACCENT;

  const springTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 400, damping: 30 };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      style={{
        background: "rgba(17, 25, 22, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(16, 185, 129, 0.09)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
      }}
      whileHover={
        reduced
          ? {}
          : {
              y: -4,
              borderColor: `${accent.color}40`,
              boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 16px 48px ${accent.glow}, 0 0 32px ${accent.glow.replace("0.25", "0.10")}`,
            }
      }
      animate={reduced ? {} : { scale: 1 }}
      transition={springTransition}
    >
      {/* Colored left-border accent */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, ${accent.color}, ${accent.color}40)`,
          opacity: isExpanded ? 1 : 0.5,
        }}
      />

      {/* Hover gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${accent.color}08 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 p-6 pl-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-4">
            <motion.h3
              className="font-heading text-xl font-semibold text-foreground md:text-2xl"
              whileHover={reduced ? {} : { x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {entry.company}
            </motion.h3>
            <motion.span
              className="shrink-0 rounded-md px-2.5 py-1 font-mono text-xs"
              style={{
                background: `${accent.color}18`,
                color: accent.color,
                border: `1px solid ${accent.color}25`,
              }}
              whileHover={reduced ? {} : { scale: 1.05 }}
            >
              {entry.dates}
            </motion.span>
          </div>
          <p className="font-body text-sm text-muted">{entry.role}</p>
        </div>

        {!isExpanded && entry.highlights.length > 0 && (
          <p className="mt-3 line-clamp-1 font-body text-sm text-muted/60">
            {entry.highlights[0]}
          </p>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={springTransition}
              className="overflow-hidden"
            >
              <motion.div
                className="mt-4 h-px"
                style={{
                  background: `linear-gradient(90deg, ${accent.color}60, ${accent.color}20, transparent)`,
                }}
                initial={reduced ? { width: "100%" } : { width: 0 }}
                animate={{ width: "100%" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 300, damping: 25, delay: 0.05 }
                }
              />

              <ul className="mt-4 space-y-3 pt-1">
                {entry.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={
                      reduced
                        ? { opacity: 1 }
                        : { opacity: 0, x: -10, filter: "blur(3px)" }
                    }
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: i * 0.07,
                          }
                    }
                    className="flex gap-3 font-body text-sm"
                  >
                    <span
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: accent.color,
                        boxShadow: `0 0 5px ${accent.glow}`,
                      }}
                    />
                    <span
                      className="text-muted leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: highlightStat(h) }}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-3 flex items-center gap-1.5"
          whileHover={reduced ? {} : { x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <span
            className="font-mono text-xs transition-colors"
            style={{ color: isExpanded ? accent.color : "var(--muted)" }}
          >
            {isExpanded ? "Collapse" : "Details"}
          </span>
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ color: isExpanded ? accent.color : "var(--muted)" }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3 }}
          >
            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Corner glow on hover */}
      <div
        className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${accent.color}50, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}
