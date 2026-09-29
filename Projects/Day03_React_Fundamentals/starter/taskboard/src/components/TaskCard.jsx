function TaskCard({ task }) {
  return (
    <article className="task-card">
      <h3>{task.title}</h3>

      {task.assignee && (
        <p>Assignee: {task.assignee}</p>
      )}

      <p>Points: {task.points}</p>
    </article>
  );
}

export default TaskCard;