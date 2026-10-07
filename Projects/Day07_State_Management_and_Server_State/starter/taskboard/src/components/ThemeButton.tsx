import { useTheme } from "../context/useTheme";

export default function ThemeButton() {
  const { theme, toggle } = useTheme();
  return <button className="theme-button" onClick={toggle}>Theme: {theme}</button>;
}
