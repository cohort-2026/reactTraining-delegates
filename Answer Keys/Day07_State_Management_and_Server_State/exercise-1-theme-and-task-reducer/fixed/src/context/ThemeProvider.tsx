import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./themeContext";
import type { Theme } from "./themeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
}
