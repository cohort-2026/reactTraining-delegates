// Lab 4.1: Theme toggle with component-local state.
import { useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`theme-toggle ${isDark ? "dark" : "light"}`}>
      <p>The current theme is {isDark ? "dark" : "light"}.</p>
      <button onClick={() => setIsDark((currentTheme) => !currentTheme)}>
        Toggle theme
      </button>
    </div>
  );
}

export default ThemeToggle;