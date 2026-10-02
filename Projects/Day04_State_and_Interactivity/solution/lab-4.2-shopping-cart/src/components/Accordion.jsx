import { useState } from "react";

const items = [
  { id: "state", title: "What is state?", body: "Data a component remembers between renders." },
  { id: "props", title: "What are props?", body: "Read-only inputs passed in by a parent." },
  { id: "events", title: "What is an event handler?", body: "A function React calls when something happens." },
];

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <button aria-expanded={isOpen} onClick={onToggle}>{title}</button>
      {isOpen && <p>{children}</p>}
    </div>
  );
}

function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const allOpen = openIds.length === items.length;

  function handleToggle(id) {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((openId) => openId !== id)
        : [...current, id]
    );
  }

  function handleToggleAll() {
    setOpenIds(allOpen ? [] : items.map((item) => item.id));
  }

  return (
    <section aria-label="React concepts">
      <h3>React concepts</h3>
      <button onClick={handleToggleAll}>{allOpen ? "Hide all" : "Show all"}</button>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.body}
        </AccordionItem>
      ))}
    </section>
  );
}

export default Accordion;