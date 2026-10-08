import { useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

function initialTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", initialTheme());

  // CSS variables are overridden under [data-theme="dark"] on <html>.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}