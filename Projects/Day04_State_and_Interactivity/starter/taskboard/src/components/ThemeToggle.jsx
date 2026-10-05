import { useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      <h2>Theme Toggle</h2>

      <button onClick={() => setIsDark((d) => !d)}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;
