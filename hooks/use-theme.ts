"use client";

import { useState, useCallback, useEffect } from "react";

export const THEMES = [
  { id: "forest",    label: "Forest",     bg: "#080c0a", dark: true  },
  { id: "midnight",  label: "Midnight",   bg: "#090b0f", dark: true  },
  { id: "obsidian",  label: "Obsidian",   bg: "#0c0a08", dark: true  },
  { id: "charcoal",  label: "Charcoal",   bg: "#0a0a0a", dark: true  },
  { id: "parchment", label: "Parchment",  bg: "#f5f0e8", dark: false },
  { id: "arctic",    label: "Arctic",     bg: "#f0f4f8", dark: false },
  { id: "softwhite", label: "Soft White", bg: "#fafaf8", dark: false },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "portfolio-theme";
const VALID_IDS = THEMES.map((t) => t.id) as string[];
const DEFAULT_DARK: ThemeId = "forest";
const DEFAULT_LIGHT: ThemeId = "softwhite";

function getInitialTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_DARK;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_IDS.includes(saved)) return saved as ThemeId;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? DEFAULT_LIGHT
      : DEFAULT_DARK;
  } catch {
    return DEFAULT_DARK;
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_DARK);

  // Sync DOM on mount (anti-flash script may have already set data-theme)
  useEffect(() => {
    setThemeState(getInitialTheme());
  }, []);

  // Listen for OS-level light/dark change while tab is open
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually chosen a theme this session
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const next = e.matches ? DEFAULT_LIGHT : DEFAULT_DARK;
        setThemeState(next);
        document.documentElement.setAttribute("data-theme", next);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      document.documentElement.setAttribute("data-theme", id);
    } catch {
      // ignore in SSR
    }
  }, []);

  /** One-tap toggle: flips between the active theme's dark/light default. */
  const toggleDarkLight = useCallback(() => {
    const next = current.dark ? DEFAULT_LIGHT : DEFAULT_DARK;
    setTheme(next);
  }, [current.dark, setTheme]);
  const darkThemes = THEMES.filter((t) => t.dark);
  const lightThemes = THEMES.filter((t) => !t.dark);

  return {
    theme,
    setTheme,
    toggleDarkLight,
    isDark: current.dark,
    darkThemes,
    lightThemes,
    themes: THEMES,
  };
}
