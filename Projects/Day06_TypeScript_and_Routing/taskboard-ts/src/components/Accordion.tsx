import { useState } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((x) => x !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  }

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="accordion-item">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="accordion-trigger"
            >
              <span>{item.title}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;