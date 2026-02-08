"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Inject global cursor-hiding style
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    // Respect reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(!!interactive);
    };

    // Smooth ring following with lerp
    const animate = () => {
      const lerp = 0.15;
      ringPos.current.x +=
        (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y +=
        (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <>
      {/* Inner dot — moves instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s, width 0.25s, height 0.25s, margin 0.25s",
          boxShadow: "0 0 12px rgba(16, 185, 129, 0.8)",
          willChange: "transform",
          ...(hovering
            ? {
                width: 6,
                height: 6,
                marginLeft: -3,
                marginTop: -3,
              }
            : {}),
        }}
      />

      {/* Outer ring — lerp-follows with delay */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          marginLeft: hovering ? -24 : -18,
          marginTop: hovering ? -24 : -18,
          borderRadius: "50%",
          border: `1.5px solid rgba(16, 185, 129, ${hovering ? 0.5 : 0.25})`,
          opacity: visible ? 1 : 0,
          transition:
            "opacity 0.2s, width 0.25s ease-out, height 0.25s ease-out, margin 0.25s ease-out, border-color 0.25s",
          background: hovering
            ? "rgba(16, 185, 129, 0.06)"
            : "transparent",
          boxShadow: hovering
            ? "0 0 20px rgba(16, 185, 129, 0.15)"
            : "none",
          willChange: "transform",
        }}
      />

    </>
  );
}
