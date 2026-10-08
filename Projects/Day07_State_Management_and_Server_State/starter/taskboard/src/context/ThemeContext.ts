import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void; //Its job will be to change the theme.
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
