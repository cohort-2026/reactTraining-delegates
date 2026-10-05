
function Board({ tasks }) {
  const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  return (
    <div className="board">
      {columns.map((column) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === column.status
        );

        return (
          <section className="column" key={column.status}>
            <h2>
              {column.title} ({filteredTasks.length})
            </h2>

            {filteredTasks.map((task) => (
              <article className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default Board;