import tasks from "../data/tasks";

function Board() {
  const statuses = ["todo", "doing", "done"];

  return (
    <div className="board">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === status
        );

        return (
          <div className="column" key={status}>
            <h2>{status.toUpperCase()}</h2>

            {filteredTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <p>Assignee: {task.assignee}</p>
                <p>Points: {task.points}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Board;