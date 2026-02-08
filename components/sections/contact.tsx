"use client";

import ContactForm from "@/components/contact-form";
import profile from "@/data/profile.json";

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14.5 11.35v1.9a1.27 1.27 0 01-1.38 1.27 12.55 12.55 0 01-5.47-1.95 12.37 12.37 0 01-3.8-3.8A12.55 12.55 0 011.9 3.28 1.27 1.27 0 013.15 1.9h1.9a1.27 1.27 0 011.27 1.09 8.15 8.15 0 00.44 1.78 1.27 1.27 0 01-.28 1.34l-.8.8a10.16 10.16 0 003.8 3.8l.8-.8a1.27 1.27 0 011.34-.28 8.15 8.15 0 001.78.44 1.27 1.27 0 011.09 1.29z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14 10a1.33 1.33 0 01-1.33 1.33H4.67L2 14V3.33A1.33 1.33 0 013.33 2h9.34A1.33 1.33 0 0114 3.33V10z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Direct contact */}
        <div>
          <p className="mb-6 font-body text-sm text-muted">
            Prefer a quick conversation?
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={`tel:${profile.contact.phone_e164}`}
              className="inline-flex w-fit items-center gap-2.5 rounded-lg px-5 py-2.5 font-body text-sm text-foreground transition-all"
              style={{
                background: "rgba(21, 29, 25, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(16, 185, 129, 0.08)",
                transitionDuration: "var(--duration-fast)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(16, 185, 129, 0.25)";
                el.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(16, 185, 129, 0.08)";
                el.style.boxShadow = "none";
              }}
            >
              <PhoneIcon />
              Call
            </a>
            <a
              href={`sms:${profile.contact.phone_e164}`}
              className="inline-flex w-fit items-center gap-2.5 rounded-lg px-5 py-2.5 font-body text-sm text-foreground transition-all"
              style={{
                background: "rgba(21, 29, 25, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(16, 185, 129, 0.08)",
                transitionDuration: "var(--duration-fast)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(16, 185, 129, 0.25)";
                el.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(16, 185, 129, 0.08)";
                el.style.boxShadow = "none";
              }}
            >
              <MessageIcon />
              Message
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={profile.contact.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-all"
              style={{ transitionDuration: "var(--duration-fast)" }}
              aria-label="GitHub"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--foreground)";
                el.style.filter = "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--muted)";
                el.style.filter = "none";
              }}
            >
              <GithubIcon />
            </a>
            <a
              href={profile.contact.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-all"
              style={{ transitionDuration: "var(--duration-fast)" }}
              aria-label="LinkedIn"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--foreground)";
                el.style.filter = "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--muted)";
                el.style.filter = "none";
              }}
            >
              <LinkedInIcon />
            </a>
          </div>

          <a
            href={`mailto:${profile.contact.email}`}
            className="mt-4 block font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {profile.contact.email}
          </a>
        </div>

        {/* Contact form */}
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 pb-12 text-center" style={{ borderTop: "1px solid rgba(16, 185, 129, 0.06)" }}>
        {/* Social links row */}
        <div className="mb-6 flex items-center justify-center gap-5">
          <a
            href={profile.contact.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-all hover:text-foreground"
            style={{ transitionDuration: "var(--duration-fast)" }}
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={profile.contact.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-all hover:text-foreground"
            style={{ transitionDuration: "var(--duration-fast)" }}
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            {profile.contact.email}
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-3 font-mono text-xs text-muted underline transition-colors hover:text-accent"
        >
          Back to top
        </button>
      </footer>
    </>
  );
}
