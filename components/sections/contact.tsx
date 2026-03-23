"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ContactForm from "@/components/contact-form";
import type { ProfileData } from "@/lib/profile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
  const phone = profile.contact.phone_e164;

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
      {/* ── Quick contact ── */}
      <motion.div
        {...fadeUp}
        transition={{ ...springTransition, delay: 0 }}
        className="mb-8"
      >
        <p className="mb-4 font-body text-base text-muted">
          Prefer a quick conversation?
        </p>
        <div className="flex flex-wrap gap-3">
          <motion.a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-sm transition-all"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              color: "var(--accent)",
            }}
            whileHover={reduced ? {} : { borderColor: "var(--accent)", boxShadow: "0 0 20px rgba(16,185,129,0.2)" }}
            transition={reduced ? { duration: 0 } : { duration: 0.15 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call
          </motion.a>
          <motion.a
            href={`sms:${phone}`}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-sm transition-all"
            style={{
              background: "rgba(6,182,212,0.06)",
              border: "1px solid rgba(6,182,212,0.18)",
              color: "var(--cyan)",
            }}
            whileHover={reduced ? {} : { borderColor: "var(--cyan)", boxShadow: "0 0 20px rgba(6,182,212,0.15)" }}
            transition={reduced ? { duration: 0 } : { duration: 0.15 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Message
          </motion.a>
        </div>
      </motion.div>

      {/* ── Contact form ── */}
      <motion.div
        {...fadeUp}
        transition={{ ...springTransition, delay: reduced ? 0 : 0.1 }}
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

      {/* ── Footer strip ── */}
      <footer
        className="mt-16 pt-8 pb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        style={{ borderTop: "1px solid rgba(16, 185, 129, 0.06)" }}
      >
        <p className="font-mono text-xs text-muted order-2 sm:order-1">
          &copy; {new Date().getFullYear()} Aryan Ganju &mdash; designed &amp; built in Singapore.
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
