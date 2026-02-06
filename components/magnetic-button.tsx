"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-all";

  const variantStyles = {
    primary: {
      base: {
        background: "linear-gradient(135deg, #10b981, #06b6d4)",
        color: "var(--background)",
        boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
      },
      hover: {
        background: "linear-gradient(135deg, #10b981, #06b6d4)",
        color: "var(--background)",
        boxShadow: "0 0 30px rgba(16, 185, 129, 0.35), 0 0 60px rgba(16, 185, 129, 0.1)",
      },
    },
    outline: {
      base: {
        background: "rgba(21, 29, 25, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "var(--foreground)",
        border: "1px solid rgba(16, 185, 129, 0.12)",
      },
      hover: {
        background: "rgba(21, 29, 25, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "var(--foreground)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)",
      },
    },
  };

  const currentStyle = hovered
    ? variantStyles[variant].hover
    : variantStyles[variant].base;

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={(e) => {
          if (href?.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
          }
          onClick?.();
        }}
        className={`${baseStyles} ${className}`}
        style={{
          ...currentStyle,
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transitionDuration: "var(--duration-fast)",
        }}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
