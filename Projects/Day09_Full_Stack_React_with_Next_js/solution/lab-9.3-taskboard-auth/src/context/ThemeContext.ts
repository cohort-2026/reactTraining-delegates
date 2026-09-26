import { createContext } from "react";

export type Theme = "light" | "dark";
export type ThemeValue = { theme: Theme; toggle: () => void };

export const ThemeContext = createContext<ThemeValue | null>(null);
