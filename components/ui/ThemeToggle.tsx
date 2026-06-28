"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { m } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-surface/50 border border-primary-600/20 hover:bg-surface transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <m.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Sun className="w-5 h-5 text-primary-400" />
        </m.div>
      ) : (
        <m.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Moon className="w-5 h-5 text-primary-600" />
        </m.div>
      )}
    </button>
  );
}
