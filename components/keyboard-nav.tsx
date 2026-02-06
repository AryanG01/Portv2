"use client";

import { useEffect } from "react";

const SECTIONS = ["hero", "about", "experience", "awards", "projects", "contact"];

export default function KeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "j" || e.key === "k") {
        e.preventDefault();
        const current = getCurrentSection();
        const idx = SECTIONS.indexOf(current);

        let next: number;
        if (e.key === "j") {
          next = Math.min(idx + 1, SECTIONS.length - 1);
        } else {
          next = Math.max(idx - 1, 0);
        }

        const el = document.getElementById(SECTIONS[next]);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

function getCurrentSection(): string {
  const scrollY = window.scrollY + window.innerHeight / 3;

  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i]);
    if (el && el.offsetTop <= scrollY) {
      return SECTIONS[i];
    }
  }
  return SECTIONS[0];
}
