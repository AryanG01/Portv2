import { useCallback, useRef, useState } from "react";

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
