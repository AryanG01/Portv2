"use client";

import { useSyncExternalStore } from "react";
import { motion, useScroll, useSpring } from "motion/react";

function subscribe(callback: () => void) {
  // no-op — we just need a stable identity for initial render check
  callback();
  return () => {};
}

function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export default function ScrollProgress() {
  const mounted = useHasMounted();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #10b981, #06b6d4, #f59e0b)",
        boxShadow: "0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)",
      }}
    />
  );
}
