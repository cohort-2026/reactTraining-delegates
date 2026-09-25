import Column from "./Column.jsx";

const columns = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ tasks }) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          tasks={tasks.filter((t) => t.status === status)}
        />
      ))}
    </div>
  );
}
export default Board;
