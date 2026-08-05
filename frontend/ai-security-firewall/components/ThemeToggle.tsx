"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="rounded-lg border border-slate-700 p-2 opacity-50"
        aria-label="Loading theme"
      >
        <Moon size={20} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-lg border border-slate-700 p-2 transition hover:bg-slate-800"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}