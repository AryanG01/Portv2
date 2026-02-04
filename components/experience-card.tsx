"use client";

import { AnimatePresence, motion } from "motion/react";

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

function extractStat(text: string): { stat: string; rest: string } | null {
  const match = text.match(
    /(\d+%|\d+\+?|\~\d+%)\s*(accuracy|workload|turnaround|time|coverage|passing|recruits|students|partners|unit tests|production bugs)/i
  );
  if (match) {
    return { stat: match[1], rest: text };
  }
  return null;
}

export default function ExperienceCard({
  entry,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  return (
    <div
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
      className="group cursor-pointer rounded-xl border border-border bg-surface px-6 py-5 transition-colors hover:border-accent/30"
      style={{ transitionDuration: "var(--duration-fast)" }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            {entry.company}
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">
            {entry.dates}
          </span>
        </div>
        <p className="font-body text-sm text-muted">{entry.role}</p>
      </div>

      {/* Preview line when collapsed */}
      {!isExpanded && entry.highlights.length > 0 && (
        <p className="mt-3 line-clamp-1 font-body text-sm text-muted/70">
          {entry.highlights[0]}
        </p>
      )}

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-3 border-t border-border pt-4">
              {entry.highlights.map((h, i) => {
                const statInfo = extractStat(h);
                return (
                  <li key={i} className="flex gap-3 font-body text-sm">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-muted">
                      {statInfo ? (
                        <>
                          {h.split(statInfo.stat)[0]}
                          <span className="font-mono font-medium text-accent">
                            {statInfo.stat}
                          </span>
                          {h.split(statInfo.stat).slice(1).join(statInfo.stat)}
                        </>
                      ) : (
                        h
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-mono text-xs text-muted/50 transition-colors group-hover:text-accent">
          {isExpanded ? "Collapse" : "Details"}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-muted/50 transition-transform group-hover:text-accent ${
            isExpanded ? "rotate-180" : ""
          }`}
          style={{ transitionDuration: "var(--duration-normal)" }}
        >
          <path
            d="M3 5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
