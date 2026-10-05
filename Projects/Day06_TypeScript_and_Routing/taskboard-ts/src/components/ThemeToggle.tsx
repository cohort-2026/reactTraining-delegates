import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <div>
      <p>The current theme is {isDark ? "dark" : "light"}.</p>
      <button
        type="button"
        aria-pressed={isDark}
        onClick={() => setIsDark((current) => !current)}
      >
        Toggle theme
      </button>
    </div>
  );
}

export default ThemeToggle;
