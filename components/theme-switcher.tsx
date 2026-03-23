"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type ThemeId } from "@/hooks/use-theme";

// Half-dark / half-light icon for the toggle button
function ThemeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" />
    </svg>
  );
}

interface SwatchProps {
  id: ThemeId;
  label: string;
  bg: string;
  active: boolean;
  onClick: () => void;
}

function Swatch({ id, label, bg, active, onClick }: SwatchProps) {
  const isLight = ["parchment", "arctic", "softwhite"].includes(id);
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={`Switch to ${label} theme`}
      className="flex flex-col items-center gap-1.5 group"
    >
      <span
        className="block h-8 w-8 rounded-full transition-all duration-200 group-hover:scale-110"
        style={{
          background: bg,
          border: active
            ? "2px solid #10b981"
            : isLight
            ? "1.5px solid rgba(0,0,0,0.12)"
            : "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: active
            ? "0 0 0 2px rgba(16,185,129,0.4)"
            : "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
      <span
        className="font-mono text-[9px] leading-none transition-colors"
        style={{ color: active ? "#10b981" : "var(--muted)" }}
      >
        {label}
      </span>
    </button>
  );
}

export default function ThemeSwitcher() {
  const { theme, setTheme, darkThemes, lightThemes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-hover)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(16,185,129,0.06)",
              minWidth: "220px",
            }}
          >
            {/* System default shortcut */}
            <button
              onClick={() => {
                localStorage.removeItem("portfolio-theme");
                const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
                  ? "softwhite" as const
                  : "forest" as const;
                setTheme(systemTheme);
                setOpen(false);
              }}
              className="mb-3 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent/10"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span className="font-mono text-[10px] text-muted">Use system default</span>
            </button>

            {/* Dark themes */}
            <p
              className="mb-2.5 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Dark
            </p>
            <div className="mb-4 flex gap-3">
              {darkThemes.map((t) => (
                <Swatch
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  bg={t.bg}
                  active={theme === t.id}
                  onClick={() => { setTheme(t.id); }}
                />
              ))}
            </div>

            {/* Divider */}
            <div
              className="mb-3.5 h-px w-full"
              style={{ background: "var(--border)" }}
            />

            {/* Light themes */}
            <p
              className="mb-2.5 font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Light
            </p>
            <div className="flex gap-3">
              {lightThemes.map((t) => (
                <Swatch
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  bg={t.bg}
                  active={theme === t.id}
                  onClick={() => { setTheme(t.id); }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        id="theme-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Advanced theme options"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
        style={{
          background: open ? "rgba(16,185,129,0.15)" : "var(--surface)",
          border: `1.5px solid ${open ? "rgba(16,185,129,0.5)" : "var(--border-hover)"}`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: open
            ? "0 0 20px rgba(16,185,129,0.2)"
            : "0 4px 16px rgba(0,0,0,0.2)",
          color: open ? "#10b981" : "var(--muted)",
          opacity: open ? 1 : 0.7,
        }}
        whileHover={{ scale: 1.04, opacity: 1 }}
        whileTap={{ scale: 0.94 }}
      >
        <ThemeIcon />
      </motion.button>
    </div>
  );
}
