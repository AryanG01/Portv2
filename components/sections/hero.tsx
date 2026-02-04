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
    <span className="font-mono text-xs text-muted">
      {profile.location} &middot; {time}
    </span>
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
      animate={{ opacity: visible ? 1 : 0, y: visible ? [0, 6, 0] : 0 }}
      transition={{
        opacity: { duration: 0.3 },
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="text-muted"
      >
        <path
          d="M4 7l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16 md:px-12 lg:px-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="order-2 md:order-1"
        >
          <LiveTime />
          <h1 className="mt-3 font-heading text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-md font-body text-lg text-muted md:text-xl">
            Software Engineer &middot; NUS Computer Science
          </p>
          <p className="mt-2 max-w-md font-body text-base text-muted/70">
            Building AI systems, breaking down complexity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in Touch
            </MagneticButton>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:ml-auto md:max-w-none"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-l-[3px] border-accent md:aspect-[3/4] md:max-h-[70vh] md:rounded-3xl">
            {!imageError ? (
              <Image
                src="/avatar.jpg"
                alt={`Photo of ${profile.name}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-subtle to-background">
                <span className="font-heading text-6xl font-semibold text-accent/40">
                  AG
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <ScrollChevron />
    </section>
  );
}
