export default function ThemeToggle({ theme, onToggle }) {
  return (
    <section className="exercise">
      <h3>Theme toggle</h3>
      <p>Current theme: {theme}</p>
      <button onClick={onToggle}>
        Switch to {theme === "light" ? "dark" : "light"}
      </button>
    </section>
  );
}