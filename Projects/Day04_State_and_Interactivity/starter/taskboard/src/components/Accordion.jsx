import { useState } from "react";

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle} aria-expanded={isOpen}>
        {isOpen ? "▼" : "▶"} {title}
      </button>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = index =>
    setOpenIndex(current => (current === index ? null : index));

  return (
    <section className="exercise">
      <h3>Accordion</h3>
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => toggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </section>
  );
}