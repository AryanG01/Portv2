import { useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Applies a 3D perspective tilt transform on mouse move.
 * Attach `ref` to the element, spread `handlers` on it.
 */
export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg) translateZ(6px)`;
      el.style.transition = "transform 0.06s linear";
    },
    [maxDeg, reduced]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
