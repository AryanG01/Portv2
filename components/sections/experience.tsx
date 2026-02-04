"use client";

import { useState, useRef, useEffect } from "react";
import ExperienceCard from "@/components/experience-card";
import profile from "@/data/profile.json";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      if (timelineRef.current) {
        timelineRef.current.style.strokeDashoffset = "0";
      }
      return;
    }

    // Dynamic import GSAP to code-split
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const line = timelineRef.current;
      if (!container || !line) return;

      // Get the line length for drawing
      const lineLength = line.getTotalLength?.() || container.offsetHeight;
      line.style.strokeDasharray = `${lineLength}`;
      line.style.strokeDashoffset = `${lineLength}`;

      // Timeline draw animation
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Animate each card sliding in
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        gsap.fromTo(
          node,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    };

    loadGSAP();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line - desktop only */}
      <svg
        className="absolute left-4 top-0 hidden h-full w-px md:block"
        aria-hidden="true"
      >
        <line
          ref={timelineRef}
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="var(--accent)"
          strokeWidth="1"
        />
      </svg>

      {/* Cards */}
      <div className="flex flex-col gap-4 md:pl-12">
        {profile.experience.map((entry, i) => (
          <div
            key={entry.company}
            ref={(el) => { nodeRefs.current[i] = el; }}
            className="relative"
          >
            {/* Timeline node - desktop only */}
            <div
              className="absolute -left-12 top-6 hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-background md:block"
              aria-hidden="true"
            />
            <ExperienceCard
              entry={entry}
              isExpanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
