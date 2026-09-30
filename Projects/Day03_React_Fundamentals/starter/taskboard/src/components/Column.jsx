import TaskCard from "./TaskCard.jsx";

function Column({ heading, tasks }) {
  return (
    <section className="column">
      <h2>{heading} ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard {...task} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default Column;
