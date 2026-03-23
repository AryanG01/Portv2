import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Software Engineer",
  "AI/ML Researcher",
  "Systems Builder",
  "Quant Developer",
];

/**
 * Returns the currently-displayed string with a cursor appended.
 * Pass `enabled=false` to disable (e.g. when prefers-reduced-motion).
 */
export function useTypewriter(
  speed = 55,
  eraseSpeed = 28,
  pauseMs = 2200,
  enabled = true
): string {
  const [text, setText] = useState(ROLES[0]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setText(ROLES[0]);
      return;
    }

    const target = ROLES[roleIdx];

    if (paused) {
      timeoutRef.current = setTimeout(() => setPaused(false), pauseMs);
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }

    if (typing) {
      if (text.length < target.length) {
        timeoutRef.current = setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          speed
        );
      } else {
        setPaused(true);
        setTyping(false);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(
          () => setText(target.slice(0, text.length - 1)),
          eraseSpeed
        );
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [text, typing, paused, roleIdx, speed, eraseSpeed, pauseMs, enabled]);

  return text;
}
