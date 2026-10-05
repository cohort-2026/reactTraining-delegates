import tasks from "../data/tasks";
import Column from "./Column";

function Board() {
  const columns = [
    ["todo", "To do"],
    ["doing", "In progress"],
    ["done", "Done"],
  ];

  return (
    <section className="board">
      {columns.map(([status, title]) => {
        const columnTasks = tasks.filter((task) => task.status === status);

        return <Column key={status} title={title} tasks={columnTasks} />;
      })}
    </section>
  );
}

export default Board;
