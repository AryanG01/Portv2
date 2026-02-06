"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Floating geometric shapes
const FLOATING_SHAPES = [
  { type: "circle", size: 60, left: "15%", top: "25%", duration: 20, delay: 0, color: "emerald" },
  { type: "circle", size: 40, left: "80%", top: "15%", duration: 25, delay: -5, color: "cyan" },
  { type: "triangle", size: 50, left: "70%", top: "60%", duration: 22, delay: -10, color: "gold" },
  { type: "circle", size: 30, left: "25%", top: "75%", duration: 28, delay: -3, color: "emerald" },
  { type: "triangle", size: 35, left: "60%", top: "85%", duration: 24, delay: -8, color: "violet" },
  { type: "circle", size: 45, left: "90%", top: "45%", duration: 26, delay: -12, color: "cyan" },
  { type: "triangle", size: 40, left: "5%", top: "50%", duration: 30, delay: -6, color: "gold" },
];

const COLORS = {
  emerald: { fill: "rgba(16, 185, 129, 0.08)", glow: "rgba(16, 185, 129, 0.3)" },
  cyan: { fill: "rgba(6, 182, 212, 0.08)", glow: "rgba(6, 182, 212, 0.3)" },
  gold: { fill: "rgba(245, 158, 11, 0.06)", glow: "rgba(245, 158, 11, 0.25)" },
  violet: { fill: "rgba(139, 92, 246, 0.06)", glow: "rgba(139, 92, 246, 0.25)" },
};

function FloatingShape({ shape }: { shape: typeof FLOATING_SHAPES[0] }) {
  const colors = COLORS[shape.color as keyof typeof COLORS];

  if (shape.type === "triangle") {
    return (
      <div
        className="absolute"
        style={{
          left: shape.left,
          top: shape.top,
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${colors.fill}`,
          filter: `drop-shadow(0 0 ${shape.size / 2}px ${colors.glow})`,
          animation: `float-shape ${shape.duration}s ease-in-out infinite`,
          animationDelay: `${shape.delay}s`,
        }}
      />
    );
  }

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: shape.left,
        top: shape.top,
        width: shape.size,
        height: shape.size,
        background: colors.fill,
        boxShadow: `0 0 ${shape.size}px ${colors.glow}`,
        animation: `float-shape ${shape.duration}s ease-in-out infinite`,
        animationDelay: `${shape.delay}s`,
      }}
    />
  );
}

function GradientMesh() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mesh1" cx="20%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mesh2" cx="80%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mesh3" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mesh4" cx="90%" cy="10%" r="40%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh1)" />
      <rect width="100%" height="100%" fill="url(#mesh2)" />
      <rect width="100%" height="100%" fill="url(#mesh3)" />
      <rect width="100%" height="100%" fill="url(#mesh4)" />
    </svg>
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 20%, transparent 70%)",
      }}
    />
  );
}

function LightRays() {
  return (
    <>
      {/* Top-left ray */}
      <div
        className="absolute -left-[200px] -top-[200px] h-[800px] w-[400px] opacity-[0.04]"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, transparent 60%)",
          transform: "rotate(-15deg)",
          filter: "blur(60px)",
        }}
      />
      {/* Top-right ray */}
      <div
        className="absolute -right-[100px] -top-[100px] h-[600px] w-[300px] opacity-[0.03]"
        style={{
          background: "linear-gradient(-135deg, #06b6d4 0%, transparent 60%)",
          transform: "rotate(15deg)",
          filter: "blur(50px)",
        }}
      />
      {/* Bottom ray */}
      <div
        className="absolute -bottom-[200px] left-[30%] h-[500px] w-[600px] opacity-[0.04]"
        style={{
          background: "linear-gradient(0deg, #f59e0b 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </>
  );
}

function NoiseTexture() {
  return (
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

export default function BackgroundEffects() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base gradient mesh */}
      <GradientMesh />

      {/* Grid lines with fade */}
      <GridLines />

      {/* Light rays from corners */}
      <LightRays />

      {/* Animated gradient orbs — more saturated */}
      <div
        className="absolute -left-[200px] -top-[100px] h-[700px] w-[700px] rounded-full opacity-[0.15] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #10b981, transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 25s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -right-[100px] top-[40%] h-[600px] w-[600px] rounded-full opacity-[0.12] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #f59e0b, transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 30s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        className="absolute bottom-[-200px] left-[30%] h-[800px] w-[800px] rounded-full opacity-[0.12] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 22s ease-in-out infinite alternate",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute -top-[100px] right-[20%] h-[500px] w-[500px] rounded-full opacity-[0.08] blur-[110px]"
        style={{
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          animation: reducedMotion ? "none" : "float-orbs 28s ease-in-out infinite alternate",
          animationDelay: "-12s",
        }}
      />

      {/* Floating geometric shapes */}
      {!reducedMotion && FLOATING_SHAPES.map((shape, i) => (
        <FloatingShape key={i} shape={shape} />
      ))}

      {/* Noise texture overlay */}
      <NoiseTexture />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Cursor spotlight — larger and more visible */}
      {!reducedMotion && (
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
