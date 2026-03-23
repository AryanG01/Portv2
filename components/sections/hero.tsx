"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FaDownload } from "react-icons/fa";
import MagneticButton from "@/components/magnetic-button";
import { useToast } from "@/components/toast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProfileData } from "@/lib/profile";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.16, 1, 0.3, 1];

export default function Hero({ profile }: { profile: ProfileData }) {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const smoothY = useSpring(scrollY, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Deep emerald glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[1400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(16,185,129,0.28) 0%, transparent 60%)",
          transform: "translateX(-50%)",
          animation: reduced ? "none" : "hero-glow-pulse 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      {/* Gold accent */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[700px] w-[400px] opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Cyan accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[400px] opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Content — parallax container */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col"
        style={reduced ? {} : { y: smoothY, opacity: fadeOut, scale: scaleDown }}
      >
        {/* ── Main content: name + photo side-by-side ── */}
        <div className="mx-auto flex w-full max-w-[98vw] flex-1 flex-col items-center gap-4 px-6 py-20 md:px-10 lg:flex-row lg:items-center lg:gap-6 lg:px-14 xl:gap-8">

          {/* Left col: name + subtitle + bio + CTAs */}
          <div className="min-w-0 flex-1 space-y-6">
            {/* Name */}
            <div>
              <motion.span
                className="block font-heading font-black leading-none tracking-tight select-none"
                style={{
                  fontSize: "clamp(3.2rem, 7vw, 8.5rem)",
                  WebkitTextStroke: "2px rgba(16, 185, 129, 0.6)",
                  color: "transparent",
                  letterSpacing: "-0.02em",
                }}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={reduced ? { duration: 0 } : { delay: 0.3, duration: 0.9, ease: EASE }}
              >
                ARYAN
              </motion.span>
              <motion.span
                className="block font-heading font-black leading-none tracking-tight select-none"
                style={{
                  fontSize: "clamp(3.2rem, 7vw, 8.5rem)",
                  background: "var(--hero-name-gradient)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                }}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={reduced ? { duration: 0 } : { delay: 0.45, duration: 0.9, ease: EASE }}
              >
                GANJU
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { delay: 0.7, duration: 0.8 }}
              className="max-w-lg space-y-3"
            >
              <p className="font-body text-xl font-medium text-foreground-secondary md:text-2xl">
                Software Engineer · NUS Computer Science
              </p>
              <p className="font-body text-base leading-relaxed text-muted">
                Final year undergrad specializing in AI/ML and database systems.
                I build systems that work under pressure — tested, observable, and
                simple enough for the next person to change confidently.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { delay: 0.85, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton href="#projects" variant="primary">View Work</MagneticButton>
              <MagneticButton href="#contact" variant="outline">Get in Touch</MagneticButton>
              <MagneticButton
                href="/Aryan_Ganju_Resume.pdf"
                variant="outline"
                download
                onClick={() => toast("Resume download started", "success")}
              >
                <FaDownload className="mr-2 text-sm" />
                Resume
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right col: portrait */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.6, duration: 1.1, ease: EASE }}
          >
            <div
              className="group relative h-[400px] w-[320px] overflow-hidden rounded-3xl sm:h-[460px] sm:w-[360px] lg:h-[540px] lg:w-[420px] xl:h-[600px] xl:w-[470px]"
              style={{
                border: "2px solid rgba(16,185,129,0.35)",
                boxShadow:
                  "0 0 80px rgba(16,185,129,0.22), 0 0 160px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {!imageError ? (
                <Image
                  src="/avatar.jpg"
                  alt={`Photo of ${profile.name}`}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, (max-width: 1280px) 420px, 470px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <span className="font-heading text-6xl font-bold text-accent">AG</span>
                </div>
              )}

              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{ background: "linear-gradient(to top, rgba(8,12,10,0.88), transparent)" }}
              />

              {/* Email badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[11px] text-accent">{profile.contact.email}</p>
              </div>

              {/* University chip */}
              <div
                className="absolute right-3 top-3 rounded-lg px-2.5 py-1"
                style={{
                  background: "rgba(8,12,10,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <p className="font-mono text-[10px] text-accent">NUS · CS &apos;26</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
