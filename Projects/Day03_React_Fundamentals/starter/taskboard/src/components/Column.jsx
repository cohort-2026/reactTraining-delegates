
import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <section className="column">
      <h2>
        {title} ({tasks.length})
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}

export default Column; 