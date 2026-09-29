import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <section className="column">
      <h2>{title}</h2>

      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))
      )}
    </section>
  );
}

export default Column;