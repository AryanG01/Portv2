import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Aryan Ganju",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.15), transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center">
        {/* 404 Number */}
        <h1
          className="mb-4 font-heading text-[120px] font-bold leading-none tracking-tighter md:text-[180px]"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #f59e0b 50%, #06b6d4 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradient-shift 6s ease-in-out infinite",
          }}
        >
          404
        </h1>

        {/* Message */}
        <h2 className="mb-4 font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mb-8 max-w-md font-body text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              color: "var(--background)",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
            }}
          >
            Go Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-body text-sm font-medium transition-all"
            style={{
              background: "rgba(21, 29, 25, 0.4)",
              backdropFilter: "blur(8px)",
              color: "var(--foreground)",
              border: "1px solid rgba(16, 185, 129, 0.12)",
            }}
          >
            View Projects
          </Link>
        </div>

        {/* Decorative elements */}
        <div
          className="mx-auto mt-12 h-px w-48"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.3,
          }}
        />
      </div>
    </main>
  );
}
