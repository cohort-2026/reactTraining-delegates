import TaskCard from "./TaskCard.jsx";

// Lab 4.3: Column forwards each task and its actions to TaskCard.
function Column({ heading, tasks, onStatusChange, onRename, onDelete }) {
  return (
    <section className="column">
      <h2>{heading} ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onStatusChange={onStatusChange}
                onRename={onRename}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default Column;
