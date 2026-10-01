import { useState } from "react";

function Accordion({ id, title, content, isOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle}>{title}</button>

      {isOpen && <p>{content}</p>}
    </div>
  );
}

export default Accordion;
