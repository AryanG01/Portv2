import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement | Aryan Ganju",
  description:
    "Accessibility features and commitment to inclusive design on Aryan Ganju's portfolio website.",
};

const KEYBOARD_SHORTCUTS = [
  { keys: ["j", "↓"], action: "Navigate to next section" },
  { keys: ["k", "↑"], action: "Navigate to previous section" },
  { keys: ["Tab"], action: "Move focus to next interactive element" },
  { keys: ["Shift", "+", "Tab"], action: "Move focus to previous interactive element" },
  { keys: ["Enter", "Space"], action: "Activate buttons and links" },
  { keys: ["Escape"], action: "Close modals and dialogs" },
];

const A11Y_FEATURES = [
  {
    title: "Keyboard Navigation",
    description:
      "Full keyboard support for all interactive elements. Use Tab to navigate and Enter/Space to activate. Custom shortcuts (j/k) for section navigation.",
  },
  {
    title: "Screen Reader Support",
    description:
      "Semantic HTML with proper ARIA labels, roles, and live regions. Tested with VoiceOver and NVDA.",
  },
  {
    title: "Color Contrast",
    description:
      "All text meets WCAG 2.1 AA contrast requirements. Interactive elements have visible focus indicators.",
  },
  {
    title: "Reduced Motion",
    description:
      "Respects the prefers-reduced-motion media query. Animations are disabled for users who prefer reduced motion.",
  },
  {
    title: "Focus Management",
    description:
      "Focus is trapped within modals. Skip-to-content link available. Focus indicators are clearly visible.",
  },
  {
    title: "Responsive Design",
    description:
      "Content is accessible at all viewport sizes. No horizontal scrolling required. Touch targets are appropriately sized.",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← Back to home
        </Link>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Accessibility Statement
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted">
            I&apos;m committed to making this website accessible to everyone. This page
            outlines the accessibility features implemented and how to use them.
          </p>
        </header>

        {/* Accessibility Features */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Accessibility Features
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {A11Y_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(21, 29, 25, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(16, 185, 129, 0.08)",
                }}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Keyboard Shortcuts
          </h2>
          <div
            className="overflow-hidden rounded-xl"
            style={{
              background: "rgba(21, 29, 25, 0.5)",
              border: "1px solid rgba(16, 185, 129, 0.08)",
            }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted">
                    Keys
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {KEYBOARD_SHORTCUTS.map((shortcut, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, j) => (
                          <span key={j}>
                            {key === "+" ? (
                              <span className="px-1 text-muted">+</span>
                            ) : (
                              <kbd
                                className="rounded-md px-2 py-1 font-mono text-xs text-foreground-secondary"
                                style={{
                                  background: "rgba(16, 185, 129, 0.1)",
                                  border: "1px solid rgba(16, 185, 129, 0.15)",
                                }}
                              >
                                {key}
                              </kbd>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 font-body text-sm text-muted">
                      {shortcut.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Standards */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Standards & Compliance
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(21, 29, 25, 0.5)",
              border: "1px solid rgba(16, 185, 129, 0.08)",
            }}
          >
            <p className="mb-4 font-body leading-relaxed text-muted">
              This website aims to conform to{" "}
              <strong className="text-foreground">WCAG 2.1 Level AA</strong>{" "}
              guidelines. The site has been tested using:
            </p>
            <ul className="space-y-2">
              {[
                "Lighthouse accessibility audit",
                "axe DevTools browser extension",
                "VoiceOver screen reader (macOS)",
                "NVDA screen reader (Windows)",
                "Manual keyboard navigation testing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Feedback */}
        <section>
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Feedback
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(21, 29, 25, 0.5)",
              border: "1px solid rgba(16, 185, 129, 0.08)",
            }}
          >
            <p className="font-body leading-relaxed text-muted">
              I&apos;m always looking to improve accessibility. If you encounter any
              barriers or have suggestions, please reach out at{" "}
              <a
                href="mailto:aryan.ganju@u.nus.edu"
                className="text-accent underline transition-colors hover:text-foreground"
              >
                aryan.ganju@u.nus.edu
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
