"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Command {
  id: string;
  label: string;
  icon: string;
  group: "navigate" | "action";
  action: () => void;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useCommands(): Command[] {
  return [
    { id: "about",      label: "Go to About",       icon: "◈", group: "navigate", action: () => scrollTo("about") },
    { id: "experience", label: "Go to Experience",   icon: "◈", group: "navigate", action: () => scrollTo("experience") },
    { id: "projects",   label: "Go to Projects",     icon: "◈", group: "navigate", action: () => scrollTo("projects") },
    { id: "awards",     label: "Go to Hackathons",   icon: "◈", group: "navigate", action: () => scrollTo("awards") },
    { id: "leadership", label: "Go to Leadership",   icon: "◈", group: "navigate", action: () => scrollTo("leadership") },
    { id: "contact",    label: "Get in Touch",        icon: "◉", group: "navigate", action: () => scrollTo("contact") },
    { id: "github",     label: "Open GitHub",         icon: "◎", group: "action",   action: () => window.open("https://github.com/AryanG01", "_blank") },
    { id: "linkedin",   label: "Open LinkedIn",       icon: "◎", group: "action",   action: () => window.open("https://www.linkedin.com/in/aryan-ganju", "_blank") },
    { id: "resume",     label: "Download Resume",     icon: "↓",  group: "action",   action: () => window.open("/Aryan_Ganju_Resume.pdf", "_blank") },
    { id: "theme",      label: "Open Theme Picker",   icon: "◑", group: "action",   action: () => (document.getElementById("theme-trigger") as HTMLElement)?.click() },
  ];
}

export default function CommandPalette() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS = useCommands();
  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const execute = useCallback(
    (cmd: Command) => {
      cmd.action();
      close();
    },
    [close]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setSelected(0);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((v) => (v + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((v) => (v - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, close, execute]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Group filtered results for display
  const navItems = filtered.filter((c) => c.group === "navigate");
  const actionItems = filtered.filter((c) => c.group === "action");

  const spring = reduced
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed left-1/2 top-[18%] z-[101] w-full max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl"
            style={{
              background: "rgba(10, 15, 13, 0.97)",
              border: "1px solid rgba(16,185,129,0.22)",
              boxShadow:
                "0 0 0 1px rgba(16,185,129,0.06), 0 24px 64px rgba(0,0,0,0.7), 0 0 80px rgba(16,185,129,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={spring}
          >
            {/* Search row */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(16,185,129,0.1)" }}
            >
              <svg
                className="h-4 w-4 shrink-0 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted"
                aria-label="Search commands"
              />
              <kbd
                className="rounded px-1.5 py-0.5 font-mono text-[10px] text-muted"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-xs text-muted">
                  No commands found
                </p>
              )}

              {navItems.length > 0 && (
                <div>
                  <p className="px-4 pb-1 pt-2 font-mono text-[9px] uppercase tracking-widest text-muted opacity-60">
                    Navigate
                  </p>
                  {navItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const isSelected = selected === globalIdx;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelected(globalIdx)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75"
                        style={{
                          background: isSelected
                            ? "rgba(16,185,129,0.08)"
                            : "transparent",
                        }}
                      >
                        <span className="w-5 text-center font-mono text-xs text-accent">
                          {cmd.icon}
                        </span>
                        <span
                          className="font-mono text-sm"
                          style={{
                            color: isSelected
                              ? "var(--foreground)"
                              : "var(--muted)",
                          }}
                        >
                          {cmd.label}
                        </span>
                        {isSelected && (
                          <span className="ml-auto font-mono text-[10px] text-muted">
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {actionItems.length > 0 && (
                <div>
                  <p className="px-4 pb-1 pt-2 font-mono text-[9px] uppercase tracking-widest text-muted opacity-60">
                    Actions
                  </p>
                  {actionItems.map((cmd) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const isSelected = selected === globalIdx;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => execute(cmd)}
                        onMouseEnter={() => setSelected(globalIdx)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75"
                        style={{
                          background: isSelected
                            ? "rgba(16,185,129,0.08)"
                            : "transparent",
                        }}
                      >
                        <span className="w-5 text-center font-mono text-xs text-accent">
                          {cmd.icon}
                        </span>
                        <span
                          className="font-mono text-sm"
                          style={{
                            color: isSelected
                              ? "var(--foreground)"
                              : "var(--muted)",
                          }}
                        >
                          {cmd.label}
                        </span>
                        {isSelected && (
                          <span className="ml-auto font-mono text-[10px] text-muted">
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div
              className="flex gap-4 px-4 py-2"
              style={{ borderTop: "1px solid rgba(16,185,129,0.08)" }}
            >
              {[
                ["↑↓", "navigate"],
                ["↵", "select"],
                ["esc", "close"],
              ].map(([key, desc]) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-muted"
                >
                  <kbd
                    className="rounded px-1 py-0.5"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {key}
                  </kbd>
                  {desc}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
