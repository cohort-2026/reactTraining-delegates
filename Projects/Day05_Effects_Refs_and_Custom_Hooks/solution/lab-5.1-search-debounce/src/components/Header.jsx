function Header({ tasks }) {
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
    </header>
  );
}

export default Header;
