import { useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      <p>The current theme is {isDark ? "dark" : "light"}.</p>
      <button onClick={() => setIsDark((d) => !d)}>Toggle theme</button>
    </div>
  );
}

export default ThemeToggle;
