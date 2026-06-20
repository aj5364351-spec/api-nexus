"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const stored = getStoredTheme();
    const resolved = stored ?? getSystemTheme();
    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      // Only follow system if no stored preference
      if (!getStoredTheme()) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage unavailable
      }
      applyTheme(next);
      return next;
    });
  }, []);

  // Render placeholder during SSR / before hydration to avoid layout shift
  if (!mounted) {
    return (
      <button
        aria-label="切换主题"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground"
        disabled
      >
        <Sun size={16} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      <Sun
        size={16}
        strokeWidth={1.5}
        className={`absolute transition-opacity duration-300 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      />
      <Moon
        size={16}
        strokeWidth={1.5}
        className={`absolute transition-opacity duration-300 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
    </button>
  );
}
