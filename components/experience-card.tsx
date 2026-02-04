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
      className="group cursor-pointer rounded-xl border border-border bg-surface p-6 transition-all hover:border-border-hover hover:bg-surface-hover"
      style={{ transitionDuration: "var(--duration-fast)" }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
            {entry.company}
          </h3>
          <span className="shrink-0 rounded-md bg-accent-subtle px-2 py-0.5 font-mono text-xs text-accent">
            {entry.dates}
          </span>
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-3 border-t border-border pt-4">
              {entry.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 font-body text-sm">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span
                    className="text-muted"
                    dangerouslySetInnerHTML={{ __html: highlightStat(h) }}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-mono text-xs text-muted/40 transition-colors group-hover:text-accent">
          {isExpanded ? "Collapse" : "Details"}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`text-muted/40 transition-all group-hover:text-accent ${isExpanded ? "rotate-180" : ""}`}
          style={{ transitionDuration: "var(--duration-normal)" }}
        >
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
