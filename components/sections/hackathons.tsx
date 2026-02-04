"use client";

import { useRef, useEffect, useState } from "react";
import profile from "@/data/profile.json";

function isRanking(result: string): boolean {
  return /top \d+/i.test(result) || /most impressive/i.test(result);
}

function formatResult(result: string) {
  // Emphasize large numbers like "2300+"
  const parts = result.split(/(\d{3,}\+?)/);
  return parts.map((part, i) =>
    /\d{3,}\+?/.test(part) ? (
      <span key={i} className="font-mono font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Hackathons() {
  const listRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef} className="flex flex-col">
      {profile.hackathons_and_awards.map((item, i) => (
        <div
          key={item.name}
          className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
            i < profile.hackathons_and_awards.length - 1
              ? "border-b border-border"
              : ""
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default)`,
            transitionDelay: visible ? `${i * 30}ms` : "0ms",
          }}
        >
          <span className="font-body text-sm text-foreground md:text-base">
            {item.name}
          </span>
          <span
            className={`inline-flex w-fit shrink-0 items-center rounded-md px-3 py-1 font-mono text-xs ${
              isRanking(item.result)
                ? "bg-accent-subtle text-accent"
                : "bg-border/50 text-muted"
            }`}
          >
            {formatResult(item.result)}
          </span>
        </div>
      ))}
    </div>
  );
}
