"use client";

import { useRef, useEffect, useCallback, useState } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;

      // Check immediately if reduced motion - show content right away
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold }
      );

      observer.observe(node);
    },
    [threshold]
  );

  return { ref: callbackRef, visible };
}
