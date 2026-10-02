// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
import { useState } from "react";

const items = [
  { id: "state", title: "What is state?", body: "Data a component remembers between renders." },
  { id: "props", title: "What are props?", body: "Read-only inputs passed in by the parent." },
  { id: "events", title: "What is an event handler?", body: "A function React calls when something happens." },
];

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle} aria-expanded={isOpen}>
        {title}
      </button>
      {isOpen && <p>{children}</p>}
    </div>
  );
}

function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const allOpen = openIds.length === items.length; // derived

  function handleToggle(id) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleToggleAll() {
    setOpenIds(allOpen ? [] : items.map((item) => item.id));
  }

  return (
    <section>
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
