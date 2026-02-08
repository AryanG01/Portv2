"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaGithub, FaStar, FaCodeBranch, FaCode } from "react-icons/fa";
import profile from "@/data/profile.json";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

// Language colors from GitHub
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

  const githubUsername = profile.contact.links.github.split("/").pop() || "";

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        // Fetch repos for language stats and stars
        const reposRes = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`
        );
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();

        // Calculate total stars
        const totalStars = reposData.reduce(
          (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
          0
        );

        // Calculate language distribution
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

  if (error) {
    return null; // Silently fail if GitHub API is unavailable
  }

  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        background: "rgba(21, 29, 25, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(16, 185, 129, 0.08)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
          }}
        >
          <FaGithub className="text-xl text-accent" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            GitHub Activity
          </h3>
          <a
            href={profile.contact.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            @{githubUsername}
          </a>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-surface"
              style={{ width: `${100 - i * 20}%` }}
            />
          ))}
        </div>
      ) : stats ? (
        <>
          {/* Stats grid */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 flex items-center justify-center gap-1 text-accent">
                <FaCodeBranch className="text-sm" />
              </div>
              <span className="block font-heading text-2xl font-bold text-foreground">
                {stats.publicRepos}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Repos
              </span>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 flex items-center justify-center gap-1 text-gold">
                <FaStar className="text-sm" />
              </div>
              <span className="block font-heading text-2xl font-bold text-foreground">
                {stats.totalStars}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Stars
              </span>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-1 flex items-center justify-center gap-1 text-accent">
                <FaCode className="text-sm" />
              </div>
              <span className="block font-heading text-2xl font-bold text-foreground">
                {stats.topLanguages.length}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Languages
              </span>
            </motion.div>
          </div>

          {/* Language bars */}
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-wider text-muted">
              Top Languages
            </span>
            <div className="space-y-3">
              {stats.topLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-xs text-foreground-secondary">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: lang.color,
                          boxShadow: `0 0 6px ${lang.color}40`,
                        }}
                      />
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ background: "rgba(16, 185, 129, 0.1)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: lang.color,
                        boxShadow: `0 0 10px ${lang.color}60`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View profile link */}
          <motion.a
            href={profile.contact.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-accent transition-colors hover:text-foreground"
            whileHover={{ x: 4 }}
          >
            View full profile →
          </motion.a>
        </>
      ) : null}
    </motion.div>
  );
}
