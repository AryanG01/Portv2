"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaGithub, FaStar, FaCodeBranch, FaCode } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import profile from "@/data/profile.json";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
};

export default function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();

  const githubUsername = profile.contact.links.github.split("/").pop() || "";

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`
        );
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
          0
        );

        const langBytes: Record<string, number> = {};
        for (const repo of reposData) {
          if (repo.language) {
            langBytes[repo.language] = (langBytes[repo.language] || 0) + (repo.size || 1);
          }
        }

        const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
        const topLanguages = Object.entries(langBytes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100),
            color: LANGUAGE_COLORS[name] || "#10b981",
          }));

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          totalStars,
          topLanguages,
        });
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [githubUsername]);

  if (error) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          className="rounded-xl p-6 md:p-8"
          style={{
            background: "rgba(21, 29, 25, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(16, 185, 129, 0.08)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
          }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="h-5 w-32 animate-pulse rounded bg-surface" />
              <div className="h-5 w-48 animate-pulse rounded bg-surface" />
              <div className="ml-auto h-5 w-24 animate-pulse rounded bg-surface" />
            </div>
          ) : stats ? (
            <div className="space-y-5">
              {/* Top row: icon + title + stats + link */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: icon + title */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      boxShadow: "0 0 12px rgba(16, 185, 129, 0.15)",
                    }}
                  >
                    <FaGithub className="text-lg text-accent" />
                  </div>
                  <div>
                    <span className="font-heading text-base font-semibold text-foreground">
                      GitHub Activity
                    </span>
                    <a
                      href={profile.contact.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 font-mono text-xs text-muted transition-colors hover:text-accent"
                    >
                      @{githubUsername}
                    </a>
                  </div>
                </div>

                {/* Center: inline stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <FaCodeBranch className="text-xs text-accent" />
                    <span className="font-heading text-lg font-bold text-foreground">
                      {stats.publicRepos}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Repos
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaStar className="text-xs text-gold" />
                    <span className="font-heading text-lg font-bold text-foreground">
                      {stats.totalStars}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Stars
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCode className="text-xs text-accent" />
                    <span className="font-heading text-lg font-bold text-foreground">
                      {stats.topLanguages.length}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Languages
                    </span>
                  </div>
                </div>

                {/* Right: view profile */}
                <motion.a
                  href={profile.contact.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-2 font-mono text-xs text-accent transition-colors hover:text-foreground sm:inline-flex"
                  whileHover={reduced ? {} : { x: 4 }}
                >
                  View Profile →
                </motion.a>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: "rgba(16, 185, 129, 0.08)" }}
              />

              {/* Stacked language bar */}
              <div>
                <div
                  className="flex h-3 w-full overflow-hidden rounded-full"
                  style={{ background: "rgba(16, 185, 129, 0.06)" }}
                >
                  {stats.topLanguages.map((lang, i) => (
                    <motion.div
                      key={lang.name}
                      className="h-full"
                      style={{
                        background: lang.color,
                        borderRight:
                          i < stats.topLanguages.length - 1
                            ? "2px solid rgba(10, 15, 13, 0.6)"
                            : undefined,
                      }}
                      initial={reduced ? { width: `${lang.percentage}%` } : { width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + i * 0.08,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                {/* Legend row */}
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {stats.topLanguages.map((lang) => (
                    <span
                      key={lang.name}
                      className="flex items-center gap-1.5 font-mono text-xs text-muted"
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          background: lang.color,
                          boxShadow: `0 0 6px ${lang.color}40`,
                        }}
                      />
                      {lang.name}{" "}
                      <span className="text-foreground-secondary">{lang.percentage}%</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile-only view profile link */}
              <motion.a
                href={profile.contact.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent transition-colors hover:text-foreground sm:hidden"
                whileHover={reduced ? {} : { x: 4 }}
              >
                View Profile →
              </motion.a>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
