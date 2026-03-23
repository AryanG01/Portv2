"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "@/components/magnetic-button";
import AnimatedCounter from "@/components/animated-counter";
import { useToast } from "@/components/toast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { usePositionalScramble } from "@/hooks/use-scramble";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { ProfileData } from "@/lib/profile";

// ─── Canvas Particle System ───────────────────────────────────────────────────

function ParticleCanvas({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Task 9: only render on desktop (≥1024px) to spare mobile CPU/battery
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number; pulse: number;
    }> = [];

    const COLORS = ["#10b981", "#f59e0b", "#06b6d4", "#a78bfa", "#10b981", "#10b981"];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      particles.length = 0;
      const count = Math.min(Math.floor((canvas!.width * canvas!.height) / 12000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.6 + 0.2,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = a;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = p.color;
        ctx!.fill();
      });

      ctx!.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.globalAlpha = (1 - dist / 120) * 0.12;
            ctx!.strokeStyle = "#10b981";
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [reduced, isDesktop]);

  if (reduced || !isDesktop) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

// ─── Live clock ───────────────────────────────────────────────────────────────

function LiveTime({ location }: { location: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-SG", {
        hour: "2-digit", minute: "2-digit", timeZone: "Asia/Singapore",
      }));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full bg-accent"
        style={{ boxShadow: "0 0 8px rgba(16,185,129,0.9)", animation: "glow-pulse 2s ease-in-out infinite" }}
      />
      <span className="font-mono text-sm text-accent">
        {location} · {time}
      </span>
    </div>
  );
}

// ─── Display text ─────────────────────────────────────────────────────────────

function OutlinedText({ text, delay = 0, reduced }: { text: string; delay?: number; reduced: boolean }) {
  return (
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
      transition={reduced ? { duration: 0 } : { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  );
}

function SolidText({ text, delay = 0, reduced }: { text: string; delay?: number; reduced: boolean }) {
  return (
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
      transition={reduced ? { duration: 0 } : { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────

// Verified against profile.json:
// 97% NLP accuracy → Mercuria highlight
// 4 hackathon top finishes → AIT Top 5 SG, Cursor Top 15 SG, TikTok Top 12/2300+, Lifehack Most Impressive
// 2300+ → TikTok TechJam 2025 participant count
// 95% test coverage → TVS Digital highlight
const STATS = [
  { value: "97%", label: "NLP accuracy", color: "#10b981" },
  { value: "4", label: "Hackathon top finishes", color: "#f59e0b" },
  { value: "2300+", label: "TechJam competitors", color: "#06b6d4" },
  { value: "95%", label: "Test coverage", color: "#a78bfa" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Hero({ profile }: { profile: ProfileData }) {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const reduced = useReducedMotion();

  // Task 5b: cursor-position-driven scramble on name hover
  const { text: aryanText, setPosition: setAryanPos, reset: resetAryan } = usePositionalScramble("ARYAN");
  const { text: ganjuText, setPosition: setGanjuPos, reset: resetGanju } = usePositionalScramble("GANJU");
  const nameWrapperRef = useRef<HTMLDivElement>(null);

  // Task 7b: typewriter role cycle
  const role = useTypewriter(75, 38, 2800, !reduced);

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
      {/* Canvas particles */}
      <ParticleCanvas reduced={reduced} />

      {/* Deep emerald glow from top-center */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[1400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(16,185,129,0.28) 0%, transparent 60%)",
          transform: "translateX(-50%)",
          animation: reduced ? "none" : "hero-glow-pulse 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Gold accent — right */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[700px] w-[400px] opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Cyan accent — bottom left */}
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
        {/* ── Top bar: status + social ── */}
        <div className="mx-auto w-full max-w-[98vw] px-6 pt-20 md:px-10 lg:px-14">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.2, duration: 0.7 }}
          >
            <LiveTime location={profile.location} />
            <div className="flex items-center gap-3">
              <a
                href={profile.contact.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-accent hover:bg-accent/10"
                style={{ border: "1px solid rgba(16,185,129,0.12)" }}
                aria-label="GitHub"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href={profile.contact.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-accent hover:bg-accent/10"
                style={{ border: "1px solid rgba(16,185,129,0.12)" }}
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Main content: name + photo side-by-side ── */}
        <div className="mx-auto flex w-full max-w-[98vw] flex-1 flex-col items-center gap-4 px-6 py-6 md:px-10 lg:flex-row lg:items-center lg:gap-6 lg:px-14 xl:gap-8">

          {/* Left col: name + role + bio + CTAs */}
          <div className="min-w-0 flex-1 space-y-5">
            {/* Task 5b: cursor-position scramble on name hover */}
            <div
              ref={nameWrapperRef}
              onMouseMove={(e) => {
                if (reduced) return;
                const rect = nameWrapperRef.current?.getBoundingClientRect();
                if (!rect) return;
                const ratio = (e.clientX - rect.left) / rect.width;
                setAryanPos(ratio);
                setGanjuPos(ratio);
              }}
              onMouseLeave={() => {
                resetAryan();
                resetGanju();
              }}
            >
              <OutlinedText text={aryanText} delay={0.3} reduced={reduced} />
              <SolidText text={ganjuText} delay={0.45} reduced={reduced} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { delay: 0.7, duration: 0.8 }}
              className="max-w-lg space-y-2"
            >
              {/* Task 7b: typewriter role cycle */}
              <p className="font-body text-xl font-medium text-foreground-secondary md:text-2xl">
                <span>{reduced ? "Software Engineer" : role}</span>
                {!reduced && (
                  <span
                    className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-accent"
                    style={{ animation: "blink 1s step-start infinite" }}
                    aria-hidden="true"
                  />
                )}
                <span className="text-muted"> · NUS CS &apos;26</span>
              </p>
              <p className="font-body text-base leading-relaxed text-muted">
                AI/ML + Database Systems. I build systems that survive contact with
                reality — tested, observable, and simple enough for the next person to change.
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

          {/* Right col: portrait — large, prominent, visible on all screen sizes */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, (max-width: 1280px) 390px, 440px"
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

              {/* University chip — top right */}
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

        {/* ── Stats strip ── */}
        <div className="mx-auto w-full max-w-[98vw] px-6 pb-10 pt-2 md:px-10 lg:px-14">
          <motion.div
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 1.0, duration: 0.8 }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group flex flex-col gap-1 rounded-xl p-4 transition-all duration-300"
                style={{
                  background: "var(--stat-card-bg)",
                  border: "1px solid var(--stat-card-border)",
                  backdropFilter: "blur(16px)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduced ? { duration: 0 } : { delay: 1.05 + i * 0.08, duration: 0.6 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${stat.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 24px ${stat.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Task 4b: animated counter replaces static span */}
                <AnimatedCounter
                  value={stat.value}
                  color={stat.color}
                  className="font-heading text-3xl font-bold leading-none"
                />
                <span className="font-mono text-xs text-muted">{stat.label}</span>
              </motion.div>
            ))}
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
