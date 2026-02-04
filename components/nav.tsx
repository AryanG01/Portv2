"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Skills", href: "#skills" },
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
          ? "bg-surface/90 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ transitionDuration: "var(--duration-normal)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm font-medium tracking-tight text-foreground"
        >
          AG
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`font-body text-sm transition-colors hover:text-foreground ${
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted"
                }`}
                style={{ transitionDuration: "var(--duration-fast)" }}
              >
                {link.label}
              </a>
            </li>
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

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-b border-border bg-surface/95 backdrop-blur-md transition-all md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
        style={{ transitionDuration: "var(--duration-normal)" }}
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
