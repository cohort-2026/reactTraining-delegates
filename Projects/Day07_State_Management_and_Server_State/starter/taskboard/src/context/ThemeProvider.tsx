import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((current) => current === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext value={{ theme, toggle }}>
      {children}
    </ThemeContext>
  );
}
