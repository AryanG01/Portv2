"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/magnetic-button";
import profile from "@/data/profile.json";

const PARTICLES = [
  { size: 4, left: "8%", top: "15%", duration: "6s", delay: "0s" },
  { size: 3, left: "92%", top: "12%", duration: "8s", delay: "-2s" },
  { size: 5, left: "75%", top: "70%", duration: "7s", delay: "-4s" },
  { size: 3, left: "20%", top: "85%", duration: "9s", delay: "-1s" },
  { size: 4, left: "60%", top: "25%", duration: "7.5s", delay: "-3s" },
  { size: 3, left: "35%", top: "60%", duration: "6.5s", delay: "-5s" },
  { size: 4, left: "85%", top: "55%", duration: "8.5s", delay: "-2.5s" },
  { size: 3, left: "15%", top: "45%", duration: "7s", delay: "-6s" },
];

// Character animation variants
const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

function AnimatedText({
  text,
  className,
  style,
  startDelay = 0
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  startDelay?: number;
}) {
  return (
    <span className={className} style={{ ...style, perspective: "1000px" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i + startDelay}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

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
    <motion.div
      className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"
      style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)" }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)" }}
    >
      <span className="h-2 w-2 rounded-full bg-accent" style={{ animation: "glow-pulse 2s ease-in-out infinite", boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)" }} />
      <span className="font-mono text-sm text-accent">
        {profile.location} &middot; {time}
      </span>
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: i % 2 === 0 ? "var(--accent)" : "var(--gold)",
            boxShadow: `0 0 ${p.size * 4}px ${i % 2 === 0 ? "rgba(16, 185, 129, 0.7)" : "rgba(245, 158, 11, 0.7)"}`,
            animation: `float-particle ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
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
      className="absolute bottom-12 left-1/2 -translate-x-1/2"
      animate={{ opacity: visible ? 0.6 : 0, y: visible ? [0, 8, 0] : 0 }}
      transition={{
        opacity: { duration: 0.3 },
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-muted">Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent" style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))" }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ")[1];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Main gradient glow — larger and pulsing */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[1000px] w-[1400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.18) 0%, transparent 65%)",
          animation: "hero-glow-pulse 8s ease-in-out infinite",
          willChange: "transform, opacity",
          transform: "translateX(-50%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary gold accent glow */}
      <div
        className="pointer-events-none absolute right-[5%] top-[15%] h-[500px] w-[500px] opacity-[0.1] blur-[100px]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Cyan accent */}
      <div
        className="pointer-events-none absolute left-[10%] bottom-[20%] h-[400px] w-[400px] opacity-[0.08] blur-[120px]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        aria-hidden="true"
      />

      <FloatingParticles />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12"
        style={{ y, opacity, scale }}
      >
        {/* Main content - side by side */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Portrait - Large and prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative shrink-0 order-first lg:order-none"
          >
            <motion.div
              className="group relative h-[400px] w-[320px] overflow-hidden rounded-3xl sm:h-[480px] sm:w-[380px] md:h-[540px] md:w-[420px] lg:h-[600px] lg:w-[480px]"
              style={{
                border: "3px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 0 60px rgba(16, 185, 129, 0.25), 0 0 120px rgba(16, 185, 129, 0.1), inset 0 0 60px rgba(16, 185, 129, 0.05)",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 80px rgba(16, 185, 129, 0.35), 0 0 150px rgba(16, 185, 129, 0.15)",
              }}
              transition={{ duration: 0.5 }}
            >
              {!imageError ? (
                <Image
                  src="/avatar.jpg"
                  alt={`Photo of ${profile.name}`}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 420px, 480px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <span className="font-heading text-8xl font-semibold text-accent">AG</span>
                </div>
              )}
              {/* Gradient overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background: "linear-gradient(to top, rgba(10, 15, 13, 0.95) 0%, rgba(10, 15, 13, 0.5) 50%, transparent 100%)",
                }}
              />
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 60%)",
                }}
              />
            </motion.div>
            {/* Decorative rings */}
            <div
              className="absolute -inset-4 -z-10 rounded-[2rem] opacity-20"
              style={{
                border: "1px solid rgba(16, 185, 129, 0.3)",
                animation: "border-glow 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -inset-8 -z-20 rounded-[2.5rem] opacity-10"
              style={{
                border: "1px solid rgba(6, 182, 212, 0.3)",
                animation: "border-glow 4s ease-in-out infinite 1s",
              }}
            />
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            {/* LiveTime badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <LiveTime />
            </motion.div>

            {/* Name — animated character reveal with 3D effect */}
            <h1 className="font-heading text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <AnimatedText
                text={firstName}
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #f59e0b 40%, #06b6d4 80%, #10b981 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradient-shift 8s ease-in-out infinite",
                }}
              />
              <br />
              <AnimatedText
                text={lastName}
                className="text-foreground-secondary"
                startDelay={firstName.length}
              />
            </h1>

            {/* Subtitle + description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="max-w-xl space-y-4"
            >
              <p className="font-body text-lg text-foreground-secondary sm:text-xl md:text-2xl">
                <span className="relative inline-block">
                  Software Engineer
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
                    style={{ background: "var(--gradient-emerald-cyan)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  />
                </span>
                {" "}&middot; NUS Computer Science
              </p>
              <p className="font-body text-base leading-relaxed text-muted sm:text-lg">
                Final year undergrad specializing in AI/ML and database systems.
                I build systems that work under pressure&mdash;tested, observable,
                and simple enough for the next person to change confidently.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start"
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
      </motion.div>

      <ScrollChevron />
    </section>
  );
}
