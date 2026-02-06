"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
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
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "shadow-[0_1px_0_rgba(16,185,129,0.1)]"
          : "bg-transparent"
      }`}
      style={{
        transitionDuration: "var(--duration-normal)",
        ...(scrolled
          ? {
              background: "rgba(10, 15, 13, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(16, 185, 129, 0.06)",
            }
          : {}),
      }}
    >
      <nav className="flex items-center justify-between px-8 py-4 md:px-[6vw] lg:px-[8vw]">
        {/* AG logo with gradient */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm font-medium tracking-tight gradient-text"
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
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative font-body text-sm transition-all ${
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
                style={{
                  transitionDuration: "var(--duration-fast)",
                  textShadow:
                    activeSection === link.href
                      ? "0 0 10px rgba(16, 185, 129, 0.3)"
                      : "none",
                }}
              >
                {link.label}
                {/* Active indicator glow line */}
                {activeSection === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] w-full"
                    style={{
                      background: "var(--gradient-emerald-cyan)",
                      filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))",
                    }}
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

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

      {/* Mobile menu — glass effect */}
      <div
        className={`overflow-hidden transition-all md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transitionDuration: "var(--duration-normal)",
          background: "rgba(10, 15, 13, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: mobileOpen ? "1px solid rgba(16, 185, 129, 0.08)" : "1px solid transparent",
        }}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`block rounded-lg px-3 py-2.5 font-body text-sm transition-colors ${
                  activeSection === link.href
                    ? "bg-accent-subtle text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
