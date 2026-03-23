"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 8;

interface TrailDot {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<TrailDot[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }))
  );
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
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Shift trail positions — push new position to front
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY });
      trailPositions.current.length = TRAIL_LENGTH;
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(!!interactive);
    };

    const animate = () => {
      // Lerp ring
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      // Update trail dots
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = trailPositions.current[i];
        if (pos) {
          el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
          el.style.opacity = visible ? String((1 - i / TRAIL_LENGTH) * 0.4) : "0";
        }
      });

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
      {/* Trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full"
          style={{
            width: Math.max(3, 7 - i),
            height: Math.max(3, 7 - i),
            marginLeft: -Math.max(1.5, (7 - i) / 2),
            marginTop: -Math.max(1.5, (7 - i) / 2),
            background: "var(--accent)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}

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
          ...(hovering ? { width: 6, height: 6, marginLeft: -3, marginTop: -3 } : {}),
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
          transition: "opacity 0.2s, width 0.25s ease-out, height 0.25s ease-out, margin 0.25s ease-out, border-color 0.25s",
          background: hovering ? "rgba(16, 185, 129, 0.06)" : "transparent",
          boxShadow: hovering ? "0 0 20px rgba(16, 185, 129, 0.15)" : "none",
          willChange: "transform",
        }}
      />
    </>
  );
}
