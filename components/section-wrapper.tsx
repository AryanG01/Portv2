"use client";

import { useReveal } from "@/hooks/use-reveal";

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      id={id}
      className={`mx-auto max-w-6xl px-6 py-20 md:py-28 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity var(--duration-slow) var(--ease-default), transform var(--duration-slow) var(--ease-default)`,
      }}
    >
      {title && (
        <h2 className="mb-12 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
