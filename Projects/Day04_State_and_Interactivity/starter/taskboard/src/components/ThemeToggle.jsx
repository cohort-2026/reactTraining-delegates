import {useState} from "react";
function ThemeToggle(){
    const [theme, setTheme] = useState("light");
  return (
    <div className={theme}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
    </div>
  );
}
export default ThemeToggle;