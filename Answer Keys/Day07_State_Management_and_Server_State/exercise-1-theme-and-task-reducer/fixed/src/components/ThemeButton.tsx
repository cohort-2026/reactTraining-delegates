import { useTheme } from "../context/useTheme";

export function ThemeButton() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Theme: {theme}</button>;
}
