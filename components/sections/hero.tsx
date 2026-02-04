"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import MagneticButton from "@/components/magnetic-button";
import profile from "@/data/profile.json";

function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-SG", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Singapore",
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      <span className="font-mono text-xs text-accent">
        {profile.location} &middot; {time}
      </span>
    </div>
  );
}

function ScrollChevron() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ opacity: visible ? 0.5 : 0, y: visible ? [0, 6, 0] : 0 }}
      transition={{
        opacity: { duration: 0.3 },
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
        <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Gradient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative w-full px-8 md:px-[6vw] lg:px-[8vw]">
        <div className="flex flex-col items-start gap-8">
          {/* Top row: status + photo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex w-full items-center gap-6"
          >
            {/* Small avatar */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-border md:h-20 md:w-20">
              {!imageError ? (
                <Image
                  src="/avatar.jpg"
                  alt={`Photo of ${profile.name}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="80px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <span className="font-heading text-lg font-semibold text-accent">AG</span>
                </div>
              )}
            </div>
            <LiveTime />
          </motion.div>

          {/* Name - massive typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="font-heading text-5xl font-semibold leading-[1.0] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {profile.name.split(" ")[0]}
            <br />
            <span className="text-muted">{profile.name.split(" ")[1]}</span>
          </motion.h1>

          {/* Subtitle + description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-xl space-y-3"
          >
            <p className="font-body text-lg text-foreground-secondary md:text-xl">
              Software Engineer &middot; NUS Computer Science
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              Final year undergrad specializing in AI/ML and database systems.
              I build systems that work under pressure&mdash;tested, observable,
              and simple enough for the next person to change confidently.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <MagneticButton href="#projects" variant="primary">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <ScrollChevron />
    </section>
  );
}
