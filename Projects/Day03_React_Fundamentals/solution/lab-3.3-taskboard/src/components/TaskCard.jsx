function TaskCard({ title, assignee, points }) {
  if (!title) return null;
  return (
    <article className="card">
      <h3>{title}</h3>
      {assignee && <p>Assigned to {assignee}</p>}
      {points > 0 && <span className="points">{points} pts</span>}
    </article>
  );
}
export default TaskCard;
