"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const bgGlowStyle = {
  background: "radial-gradient(ellipse, rgba(239, 68, 68, 0.15), transparent 60%)",
} as const;

const iconContainerStyle = {
  background: "rgba(239, 68, 68, 0.1)",
  border: "2px solid rgba(239, 68, 68, 0.3)",
  boxShadow: "0 0 30px rgba(239, 68, 68, 0.15)",
} as const;

const primaryBtnStyle = {
  background: "linear-gradient(135deg, #10b981, #06b6d4)",
  color: "var(--background)",
  boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
} as const;

const outlineBtnStyle = {
  background: "rgba(21, 29, 25, 0.4)",
  backdropFilter: "blur(8px)",
  color: "var(--foreground)",
  border: "1px solid rgba(16, 185, 129, 0.12)",
} as const;

const devDetailStyle = {
  background: "rgba(10, 15, 13, 0.8)",
  border: "1px solid rgba(239, 68, 68, 0.2)",
} as const;

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={bgGlowStyle}
      />

      <div className="relative z-10 text-center">
        {/* Error icon */}
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={iconContainerStyle}
        >
          <svg
            className="h-10 w-10 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="mb-4 font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Something went wrong
        </h1>
        <p className="mx-auto mb-8 max-w-md font-body text-muted">
          An unexpected error occurred. Don&apos;t worry, it&apos;s not you—it&apos;s us.
          Please try again.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
            style={primaryBtnStyle}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
            style={outlineBtnStyle}
          >
            Go Home
          </Link>
        </div>

        {/* Error details (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <div
            className="mx-auto mt-8 max-w-lg overflow-auto rounded-lg p-4 text-left"
            style={devDetailStyle}
          >
            <p className="mb-2 font-mono text-xs text-error">Error Details:</p>
            <pre className="font-mono text-xs text-muted">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
