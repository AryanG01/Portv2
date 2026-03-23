import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789█▓▒░";

/**
 * Returns `{ text, scramble, reset }`.
 * Call `scramble()` on mouse enter, `reset()` on mouse leave (optional — it self-resolves).
 */
export function useScramble(original: string, duration = 700) {
  const [text, setText] = useState(original);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = Math.floor(duration / 30);

    if (animRef.current) clearInterval(animRef.current);
    animRef.current = setInterval(() => {
      setText(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            // Reveal from left as iterations progress
            if (i < Math.floor((iteration / totalFrames) * original.length)) {
              return original[i];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= totalFrames) {
        if (animRef.current) clearInterval(animRef.current);
        setText(original);
      }
      iteration++;
    }, 30);
  }, [original, duration]);

  const reset = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);
    setText(original);
  }, [original]);

  return { text, scramble, reset };
}

/**
 * Cursor-position-driven scramble.
 * `setPosition(0–1)` maps cursor X fraction to a reveal frontier:
 * characters left of the cursor show real text, right side shows random chars.
 * Call `reset()` on mouse leave to restore original text.
 */
export function usePositionalScramble(original: string) {
  const [text, setText] = useState(original);
  const frameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const setPosition = useCallback(
    (ratio: number) => {
      const clamped = Math.max(0, Math.min(1, ratio));
      const revealCount = Math.floor(clamped * original.length);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setText(
          original
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealCount) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
      });
    },
    [original]
  );

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setText(original);
  }, [original]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { text, setPosition, reset };
}
