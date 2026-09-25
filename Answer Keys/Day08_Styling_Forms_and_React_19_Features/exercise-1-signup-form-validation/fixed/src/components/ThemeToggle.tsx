import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-900 dark:border-slate-600 dark:text-slate-100"
    >
      Theme: {theme}
    </button>
  );
}
