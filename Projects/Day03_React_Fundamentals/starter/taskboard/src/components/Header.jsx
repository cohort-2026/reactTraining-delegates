import tasks from "../data/tasks";

function Header() {
  return (
    <header>
      <h1>TaskBoard</h1>
      <p>Total tasks: {tasks.length}</p>
    </header>
  );
}

export default Header;
