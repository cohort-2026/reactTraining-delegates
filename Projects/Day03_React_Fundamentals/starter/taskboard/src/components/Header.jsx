function Header({ taskCount }) {
  return (
    <header className="task-header">
      <h1>TaskBoard</h1>
      <p>Total tasks: {taskCount}</p>
    </header>
  );
}

export default Header;