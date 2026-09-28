import Card from "./ui/Card.jsx";

function TaskCard({ title, assignee, points }) {
  if (!title) return null;

  return (
    <Card>
      <h3>{title}</h3>
      {assignee && <p>Assigned to {assignee}</p>}
      {points > 0 && <span className="points">{points} pts</span>}
    </Card>
  );
}

export default TaskCard;