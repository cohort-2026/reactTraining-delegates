import Column from "./Column.jsx";

const columns = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

// TODO (Lab 4.3 step 6): receive onStatusChange, onRename and onDelete and pass them to each Column.
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
