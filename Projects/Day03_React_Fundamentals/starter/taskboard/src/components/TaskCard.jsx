function TaskCard({ title, assignee, points }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>Assigned to {assignee}</p>
      <span className="points">{points} pts</span>
    </article>
  );
}
export default TaskCard;
