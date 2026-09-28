import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <section>
      <h2>
        {title} ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </section>
  );
}

export default Column;
