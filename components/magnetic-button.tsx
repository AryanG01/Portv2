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
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set(distX * 0.15);
    y.set(distY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-colors";
  const variants = {
    primary: `${baseStyles} bg-foreground text-background hover:bg-foreground/85`,
    outline: `${baseStyles} border border-border text-foreground hover:border-foreground/30`,
  };

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
            document
              .querySelector(href)
              ?.scrollIntoView({ behavior: "smooth" });
          }
          onClick?.();
        }}
        className={`${variants[variant]} ${className}`}
        style={{
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transitionDuration: "var(--duration-fast)",
        }}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
