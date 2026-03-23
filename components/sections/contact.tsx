"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ContactForm from "@/components/contact-form";
import type { ProfileData } from "@/lib/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function Contact({ profile }: { profile: ProfileData }) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const email = profile.contact.email;

  function handleCopyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: reduced ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const springTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 80, damping: 20 };

  return (
    <>
      {/* ── Headline ── */}
      <motion.div
        className="mb-16 text-left"
        {...fadeUp}
        transition={{ ...springTransition, delay: 0 }}
      >
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
          style={{ color: "var(--accent)" }}
        >
          Get in touch
        </p>
        <h2
          className="font-heading font-black leading-none tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
        >
          <span style={{ color: "var(--foreground)" }}>{"Let's build"}</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            something great.
          </span>
        </h2>
      </motion.div>

      {/* ── Two-column grid ── */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* LEFT — Direct contact panel */}
        <motion.div
          {...fadeUp}
          transition={{ ...springTransition, delay: reduced ? 0 : 0.1 }}
          className="flex flex-col gap-6 rounded-2xl p-8"
          style={{
            background: "rgba(17, 25, 22, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(16, 185, 129, 0.09)",
          }}
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Direct
            </p>

            {/* Email block */}
            <motion.a
              href={`mailto:${email}`}
              className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all"
              style={{
                background: "rgba(16, 185, 129, 0.04)",
                border: "1px solid rgba(16, 185, 129, 0.1)",
              }}
              whileHover={
                reduced
                  ? {}
                  : {
                      boxShadow: "0 0 30px rgba(16,185,129,0.2)",
                      borderColor: "rgba(16,185,129,0.3)",
                    }
              }
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            >
              <span
                className="font-mono text-sm break-all"
                style={{ color: "var(--accent)" }}
              >
                {email}
              </span>

              {/* Copy button — stops propagation so link isn't followed */}
              <button
                type="button"
                aria-label={copied ? "Copied" : "Copy email address"}
                onClick={(e) => {
                  e.preventDefault();
                  handleCopyEmail();
                }}
                className="flex-shrink-0 rounded-lg p-2 transition-all"
                style={{
                  color: copied ? "var(--accent)" : "var(--muted)",
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.1)",
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </motion.a>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ background: "rgba(16,185,129,0.08)" }}
            />
            <span className="font-mono text-xs text-muted">or connect</span>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(16,185,129,0.08)" }}
            />
          </div>

          {/* Social icon buttons */}
          <div className="flex items-center gap-3">
            <motion.a
              href={profile.contact.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center justify-center rounded-xl transition-all"
              style={{
                width: 48,
                height: 48,
                background: "rgba(16,185,129,0.04)",
                border: "1px solid rgba(16,185,129,0.12)",
                color: "var(--muted)",
              }}
              whileHover={
                reduced
                  ? {}
                  : {
                      y: -2,
                      borderColor: "var(--accent)",
                      color: "var(--foreground)",
                      boxShadow: "0 4px 20px rgba(16,185,129,0.15)",
                    }
              }
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            >
              <GithubIcon />
            </motion.a>

            <motion.a
              href={profile.contact.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center justify-center rounded-xl transition-all"
              style={{
                width: 48,
                height: 48,
                background: "rgba(16,185,129,0.04)",
                border: "1px solid rgba(16,185,129,0.12)",
                color: "var(--muted)",
              }}
              whileHover={
                reduced
                  ? {}
                  : {
                      y: -2,
                      borderColor: "var(--cyan)",
                      color: "var(--foreground)",
                      boxShadow: "0 4px 20px rgba(6,182,212,0.15)",
                    }
              }
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            >
              <LinkedInIcon />
            </motion.a>

            <div className="ml-1">
              <p className="font-mono text-xs text-muted leading-tight">GitHub</p>
              <p className="font-mono text-xs text-muted leading-tight">LinkedIn</p>
            </div>
          </div>

          {/* Availability badge */}
          <div
            className="mt-auto flex items-center gap-2.5 rounded-xl px-4 py-3"
            style={{
              background: "rgba(16,185,129,0.05)",
              border: "1px solid rgba(16,185,129,0.1)",
            }}
          >
            <span
              className="relative flex h-2 w-2 flex-shrink-0"
              aria-hidden="true"
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
              Open to opportunities
            </span>
          </div>
        </motion.div>

        {/* RIGHT — Contact form */}
        <motion.div
          {...fadeUp}
          transition={{ ...springTransition, delay: reduced ? 0 : 0.2 }}
          className="rounded-2xl p-8"
          style={{
            background: "rgba(17, 25, 22, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(16, 185, 129, 0.09)",
          }}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Send a message
          </p>
          <ContactForm />
        </motion.div>
      </div>

      {/* ── Footer strip ── */}
      <footer
        className="mt-16 pt-8 pb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        style={{ borderTop: "1px solid rgba(16, 185, 129, 0.06)" }}
      >
        <p className="font-mono text-xs text-muted order-2 sm:order-1">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind.
        </p>

        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="order-1 sm:order-2 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all"
          style={{
            border: "1px solid rgba(16,185,129,0.2)",
            color: "var(--muted)",
            background: "rgba(16,185,129,0.04)",
          }}
          whileHover={
            reduced
              ? {}
              : {
                  borderColor: "var(--accent)",
                  color: "var(--foreground)",
                  boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                  y: -1,
                }
          }
          transition={reduced ? { duration: 0 } : { duration: 0.2 }}
        >
          <ArrowUpIcon />
          Back to top
        </motion.button>
      </footer>
    </>
  );
}
