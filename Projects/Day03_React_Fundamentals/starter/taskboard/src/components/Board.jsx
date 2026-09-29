import Column from "./Column";
import tasks from "../data/tasks";

function Board() {
    const columns = ["todo", "in-progress", "done"];

  return (
    <section className="board">{
      columns.map((status, title) => {
        const filteredTasks = tasks.filter((task) => task.status === status);
        return <Column key={status} title={title} tasks={filteredTasks} />;
      })
    }</section>
  );
}

export default Board;