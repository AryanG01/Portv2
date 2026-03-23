"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/hooks/use-theme";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Now", href: "#now" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { isDark, toggleDarkLight } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    },
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "shadow-[0_1px_0_rgba(16,185,129,0.08)]" : "bg-transparent"
      }`}
      style={{
        transitionDuration: "var(--duration-normal)",
        ...(scrolled
          ? {
              background: "var(--nav-scrolled-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(16, 185, 129, 0.07)",
            }
          : {}),
      }}
    >
      <nav className="flex items-center justify-between px-6 py-4 md:px-[5vw] lg:px-[7vw]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm font-semibold tracking-tight"
          style={{
            background: "var(--gradient-emerald-cyan)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AG
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <motion.li key={link.href} whileTap={{ scale: 0.95 }}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative rounded-lg px-3 py-1.5 font-body text-sm transition-all duration-150 ${
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground-secondary"
                }`}
                style={{
                  background:
                    activeSection === link.href
                      ? "rgba(16, 185, 129, 0.08)"
                      : "transparent",
                }}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    className="absolute -bottom-0.5 left-1/2 h-[2px] w-4"
                    style={{
                      background: "var(--gradient-emerald-cyan)",
                      filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))",
                      translateX: "-50%",
                    }}
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop: dark/light toggle + ⌘K hint */}
        <div className="hidden items-center gap-2 md:flex">
          {/* ⌘K hint pill */}
          <button
            id="cmd-k-hint"
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
            }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-150 hover:bg-accent/10"
            style={{ border: "1px solid rgba(16,185,129,0.12)" }}
            aria-label="Open command palette"
          >
            <span className="font-mono text-[10px] text-muted">⌘K</span>
          </button>

          {/* Dark/light toggle */}
          <button
            onClick={toggleDarkLight}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-foreground hover:bg-accent/10"
            style={{ border: "1px solid rgba(16,185,129,0.12)" }}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-px w-5 bg-foreground transition-transform ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
            style={{ transitionDuration: "var(--duration-normal)" }}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
            style={{ transitionDuration: "var(--duration-normal)" }}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-transform ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
            style={{ transitionDuration: "var(--duration-normal)" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all md:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transitionDuration: "var(--duration-normal)",
          background: "var(--nav-mobile-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: mobileOpen
            ? "1px solid rgba(16, 185, 129, 0.07)"
            : "1px solid transparent",
        }}
      >
        <ul className="flex flex-col gap-0.5 px-5 pb-5 pt-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`block rounded-lg px-3 py-2.5 font-body text-sm transition-colors ${
                  activeSection === link.href
                    ? "bg-accent-subtle text-foreground"
                    : "text-muted hover:text-foreground-secondary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile dark/light toggle */}
        <div className="mt-2 border-t px-3 pt-3" style={{ borderColor: "rgba(16,185,129,0.1)" }}>
          <button
            onClick={() => { toggleDarkLight(); setMobileOpen(false); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted transition-colors hover:text-foreground-secondary"
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="font-body text-sm">
              {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
