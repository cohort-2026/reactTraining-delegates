import Column from "./Column.jsx";

const columns = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

// Lab 4.3: Board filters tasks by status and forwards task actions.
function Board({ tasks, onStatusChange, onRename, onDelete }) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          tasks={tasks.filter((task) => task.status === status)}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
export default Board;
