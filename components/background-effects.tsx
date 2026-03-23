"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function DotGrid() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.10) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage:
          "radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 75% at 50% 40%, black 30%, transparent 75%)",
      }}
    />
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 90% 60% at 50% 50%, black 10%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 50%, black 10%, transparent 70%)",
      }}
    />
  );
}

function LightRays() {
  return (
    <>
      <div
        className="absolute -left-[300px] -top-[300px] h-[1000px] w-[500px] opacity-[0.06]"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, transparent 60%)",
          transform: "rotate(-20deg)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -right-[150px] -top-[150px] h-[700px] w-[350px] opacity-[0.05]"
        style={{
          background: "linear-gradient(-135deg, #06b6d4 0%, transparent 60%)",
          transform: "rotate(20deg)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
}

export default function BackgroundEffects() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-2000);
  const mouseY = useMotionValue(-2000);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="bg-effects pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dot grid for depth */}
      <DotGrid />

      {/* Grid lines */}
      <GridLines />

      {/* Light rays from corners */}
      <LightRays />

      {/* Emerald — primary orb (top-left) */}
      <div
        className="absolute -left-[250px] -top-[150px] h-[800px] w-[800px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.28), transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 28s ease-in-out infinite alternate",
        }}
      />

      {/* Gold — secondary orb (right side) */}
      <div
        className="absolute -right-[150px] top-[35%] h-[700px] w-[700px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 33s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Cyan — bottom orb */}
      <div
        className="absolute -bottom-[300px] left-[25%] h-[900px] w-[900px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 24s ease-in-out infinite alternate",
          animationDelay: "-10s",
        }}
      />

      {/* Violet — top-right accent */}
      <div
        className="absolute -top-[100px] right-[15%] h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.13), transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 30s ease-in-out infinite alternate",
          animationDelay: "-15s",
        }}
      />

      {/* Cursor spotlight */}
      {!reducedMotion && (
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
