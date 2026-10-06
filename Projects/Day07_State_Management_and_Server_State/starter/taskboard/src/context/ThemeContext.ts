import { createContext } from "react";

export type Theme = "light" | "dark";
type ThemeValue = { theme: Theme; toggle: () => void };

export const ThemeContext = createContext<ThemeValue>({
  theme: "light",
  toggle: () => {},
});
