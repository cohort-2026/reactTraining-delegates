import { useState } from "react";
import Counter from "./components/Counter";
import ThemeToggle from "./components/ThemeToggle";
import Accordion from "./components/Accordion";
// ...your existing imports

const faqItems = [
  { title: "What is state?", content: "Data a component remembers between renders." },
  { title: "Why use an updater function?", content: "It always receives the latest queued value." },
  { title: "What is lifting state up?", content: "Moving state to the closest common parent." },
];

export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`}>
      {/* ...your existing board / header here */}

      <Counter />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Accordion items={faqItems} />
    </div>
  );
}