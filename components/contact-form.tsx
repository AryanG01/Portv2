"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

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

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
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
      form.reset();

      // Reset turnstile
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }

      setTimeout(() => setFormState("idle"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setFormState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="contact-name"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-2 w-full border-b border-border bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-colors focus:border-accent"
          style={{ transitionDuration: "var(--duration-normal)" }}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border-b border-border bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-colors focus:border-accent"
          style={{ transitionDuration: "var(--duration-normal)" }}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-wider text-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          minLength={10}
          maxLength={2000}
          className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2 font-body text-sm text-foreground outline-none transition-colors focus:border-accent"
          style={{ transitionDuration: "var(--duration-normal)" }}
        />
      </div>

      {/* Turnstile widget (invisible) */}
      <div ref={turnstileRef} />

      {error && (
        <p className="font-body text-sm text-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "loading" || formState === "success"}
        className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-colors ${
          formState === "success"
            ? "bg-success text-white"
            : "bg-foreground text-background hover:bg-foreground/85"
        } disabled:cursor-not-allowed disabled:opacity-70`}
        style={{ transitionDuration: "var(--duration-normal)" }}
      >
        {formState === "loading" && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
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
          </svg>
        )}
        {formState === "loading"
          ? "Sending..."
          : formState === "success"
            ? "Sent"
            : "Send Message"}
      </button>
    </form>
  );
}
