"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Don't use smooth scroll if user prefers reduced motion
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1, // Smoothness (lower = smoother)
      smoothWheel: true,
      syncTouch: false, // Don't smooth on touch devices
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    const syncScrollTrigger = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      lenis.on("scroll", ScrollTrigger.update);

      // Use GSAP ticker for smooth animation frame sync
      const { gsap } = await import("gsap");
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    syncScrollTrigger();

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
