import {useState} from "react";

const items = [
  { id: "state", title: "What is state?", body: "Data a component remembers between renders." },
  { id: "props", title: "What are props?", body: "Read-only inputs passed in by the parent." },
  { id: "events", title: "What is an event handler?", body: "A function React calls when something happens." },
];

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <h3 onClick={onToggle}>{title}</h3>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const allOpen = openIds.length === items.length; // derived

  const onToggle = (id) => {
    setOpenIds(prevOpenIds => {
      if (prevOpenIds.includes(id)) {
        return prevOpenIds.filter((openId) => openId !== id);
      } else {
        return [...prevOpenIds, id];
      }
    });
  };

  const onToggleAll = () => {
    setOpenIds(allOpen ? [] : items.map((item) => item.id));
  };

  return (
    <div>
      <button onClick={onToggleAll}>{allOpen ? "Hide all" : "Show all"}</button>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => onToggle(item.id)}
        >
          {item.body}
        </AccordionItem>
      ))}
    </div>
  )};
  export default Accordion;