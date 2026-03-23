"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedCounterProps {
  /** Full display string, e.g. "97%", "2300+", "4" */
  value: string;
  color: string;
  className?: string;
}

export default function AnimatedCounter({ value, color, className }: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(reduced ? value : "0");
  const hasAnimated = useRef(false);

  // Parse: "97%" → numeric=97, suffix="%"
  //        "2300+" → numeric=2300, suffix="+"
  //        "4" → numeric=4, suffix=""
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/^[\d.]+/, "");

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1600;
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * numeric);
          setDisplay(`${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value); // snap to exact string
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, numeric, suffix, value]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ color, filter: `drop-shadow(0 0 12px ${color}60)` }}
    >
      {display}
    </span>
  );
}
