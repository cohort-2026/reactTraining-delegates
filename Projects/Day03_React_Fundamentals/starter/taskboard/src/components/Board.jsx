import Column from "./Column";

function Board({ tasks }) {
  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const doingTasks = tasks.filter(
    (task) => task.status === "doing"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <main className="board">
      <Column
        title="To Do"
        tasks={todoTasks}
      />

      <Column
        title="Doing"
        tasks={doingTasks}
      />

      <Column
        title="Done"
        tasks={doneTasks}
      />
    </main>
  );
}

export default Board;