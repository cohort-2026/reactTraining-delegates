
import { useState } from "react";
import "./App.css";

// 1 and 2. Counter with Plus, Minus, Reset and Plus 5
function Counter() {
  const [count, setCount] = useState(0);

  function addFive() {
    for (let i = 0; i < 5; i++) {
      setCount((previousCount) => previousCount + 1);
    }
  }

  return (
    <section className="card">
      <h2>Counter</h2>
      <h3>{count}</h3>

      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>
        Minus
      </button>

      <button onClick={() => setCount((c) => c + 1)}>
        Plus
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

      <button onClick={addFive}>
        Plus 5
      </button>
    </section>
  );
}

// 3. ThemeToggle
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <section className={`theme-wrapper ${dark ? "dark" : "light"}`}>
      <h2>Theme Toggle</h2>
      <p>Current theme: {dark ? "Dark" : "Light"}</p>

      <button onClick={() => setDark((current) => !current)}>
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
    </section>
  );
}

// 4. One Accordion item
function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <section className="accordion-item">
      <button
        className="accordion-heading"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {title} {isOpen ? "−" : "+"}
      </button>

      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </section>
  );
}

// 5 and 6. Three independent items and Show All / Hide All
function Accordion() {
  const [openItems, setOpenItems] = useState([false, false, false]);

  function toggleItem(index) {
    setOpenItems((previous) =>
      previous.map((isOpen, i) =>
        i === index ? !isOpen : isOpen
      )
    );
  }

  const allOpen = openItems.every(Boolean);

  function toggleAll() {
    setOpenItems([!allOpen, !allOpen, !allOpen]);
  }

  const items = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces."
    },
    {
      title: "What is state?",
      content: "State is data that React remembers and uses to update the screen."
    },
    {
      title: "What is a component?",
      content: "A component is a reusable piece of a React user interface."
    }
  ];

  return (
    <section className="card">
      <h2>Accordion</h2>

      <button onClick={toggleAll}>
        {allOpen ? "Hide All" : "Show All"}
      </button>

      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          isOpen={openItems[index]}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </section>
  );
}

function App() {
  return (
    <main className="app">
      <h1>React State Practice</h1>
      <Counter />
      <ThemeToggle />
      <Accordion />
    </main>
  );
}

export default App;