"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

type FormState = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback": () => void;
          size: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

// Confetti particle component
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 1,
    color: ["#10b981", "#06b6d4", "#f59e0b", "#8b5cf6"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-2 w-2 rounded-full"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: "100%", opacity: 1, scale: 1 }}
          animate={{
            y: "-100%",
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0.5],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>("");

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    // Load Turnstile script
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;

    (window as unknown as Record<string, () => void>).onTurnstileLoad = () => {
      if (turnstileRef.current && window.turnstile) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          size: "invisible",
        });
      }
    };

    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.");
      setFormState("error");
      return;
    }

    if (message.length < 10) {
      setError("Message must be at least 10 characters.");
      setFormState("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          turnstileToken: turnstileToken || "dev-bypass",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setFormState("error");
        return;
      }

      setFormState("success");
      setShowConfetti(true);
      form.reset();

      // Reset turnstile
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }

      setTimeout(() => {
        setShowConfetti(false);
        setFormState("idle");
      }, 3000);
    } catch {
      setError("Network error. Please try again.");
      setFormState("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti on success */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label
          htmlFor="contact-name"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Name
        </label>
        <motion.input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-2 w-full border-b bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-all"
          style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}
          whileFocus={{
            borderColor: "rgba(16, 185, 129, 0.5)",
            boxShadow: "0 2px 10px rgba(16, 185, 129, 0.15)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label
          htmlFor="contact-email"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Email
        </label>
        <motion.input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border-b bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-all"
          style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}
          whileFocus={{
            borderColor: "rgba(16, 185, 129, 0.5)",
            boxShadow: "0 2px 10px rgba(16, 185, 129, 0.15)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Message
        </label>
        <motion.textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          minLength={10}
          maxLength={2000}
          className="mt-2 w-full resize-none border-b bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-all"
          style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}
          whileFocus={{
            borderColor: "rgba(16, 185, 129, 0.5)",
            boxShadow: "0 2px 10px rgba(16, 185, 129, 0.15)",
          }}
        />
      </motion.div>

      {/* Turnstile widget (invisible) */}
      <div ref={turnstileRef} />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-body text-sm text-error"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={formState === "loading" || formState === "success"}
        className="relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-3 font-body text-sm font-medium transition-all disabled:cursor-not-allowed"
        style={{
          background: formState === "success"
            ? "var(--success)"
            : "linear-gradient(135deg, #10b981, #06b6d4)",
          color: "var(--background)",
        }}
        whileHover={formState !== "success" ? {
          scale: 1.05,
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.4), 0 0 80px rgba(16, 185, 129, 0.2)",
        } : {}}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        <AnimatePresence mode="wait">
          {formState === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <motion.svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </motion.svg>
              Sending...
            </motion.div>
          )}
          {formState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <motion.svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.svg>
              Message Sent!
            </motion.div>
          )}
          {(formState === "idle" || formState === "error") && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}
