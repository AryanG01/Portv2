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
}

function highlightStat(text: string) {
  return text.replace(
    /(\d+%|~\d+%|\d+\+)/g,
    '<span class="font-mono font-medium text-accent">$1</span>'
  );
}

export default function ExperienceCard({
  entry,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  const reduced = useReducedMotion();

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
      className="group relative cursor-pointer overflow-hidden rounded-xl p-6"
      style={{
        background: "rgba(21, 29, 25, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
      whileHover={
        reduced
          ? {}
          : {
              y: -4,
              borderColor: "rgba(16, 185, 129, 0.25)",
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 40px rgba(16, 185, 129, 0.12), 0 0 30px rgba(16, 185, 129, 0.08)",
            }
      }
      animate={reduced ? {} : { scale: 1 }}
      transition={springTransition}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <motion.h3
            className="font-heading text-xl font-semibold text-foreground md:text-2xl"
            whileHover={reduced ? {} : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {entry.company}
          </motion.h3>
          <motion.span
            className="shrink-0 rounded-md px-2 py-0.5 font-mono text-xs text-accent"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.1)",
            }}
            whileHover={reduced ? {} : { scale: 1.05 }}
          >
            {entry.dates}
          </motion.span>
        </div>
        <p className="font-body text-sm text-muted">{entry.role}</p>
      </div>

      {!isExpanded && entry.highlights.length > 0 && (
        <p className="relative z-10 mt-3 line-clamp-1 font-body text-sm text-muted/60">
          {entry.highlights[0]}
        </p>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={springTransition}
            className="relative z-10 overflow-hidden"
          >
            {/* Glowing underline that expands across the card */}
            <motion.div
              className="mt-4 h-px"
              style={{
                background: "linear-gradient(90deg, rgba(16, 185, 129, 0.5), rgba(6, 182, 212, 0.3), transparent)",
              }}
              initial={reduced ? { width: "100%" } : { width: 0 }}
              animate={{ width: "100%" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 25, delay: 0.05 }
              }
            />
            {/* Glow effect underneath the line */}
            <motion.div
              className="h-px"
              style={{
                background: "linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.15), transparent)",
                filter: "blur(4px)",
              }}
              initial={reduced ? { width: "100%" } : { width: 0 }}
              animate={{ width: "100%" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 25, delay: 0.05 }
              }
            />

            <ul className="mt-4 space-y-3 pt-2">
              {entry.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={
                    reduced
                      ? { opacity: 1 }
                      : { opacity: 0, x: -10, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          delay: i * 0.08,
                        }
                  }
                  className="flex gap-3 font-body text-sm"
                >
                  <motion.span
                    className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 4px rgba(16, 185, 129, 0.4)" }}
                    whileHover={reduced ? {} : { scale: 1.5 }}
                  />
                  <span
                    className="text-muted"
                    dangerouslySetInnerHTML={{ __html: highlightStat(h) }}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 mt-3 flex items-center gap-1.5"
        whileHover={reduced ? {} : { x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-mono text-xs text-muted/40 transition-colors group-hover:text-accent">
          {isExpanded ? "Collapse" : "Details"}
        </span>
        <motion.svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="text-muted/40 transition-colors group-hover:text-accent"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.3 }}
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {/* Corner glow on hover */}
      <div
        className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}
