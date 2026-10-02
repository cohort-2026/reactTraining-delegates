function Header({ tasks }) {
  const doneCount = tasks.filter((task) => task.status === "done").length;
  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
    </header>
  );
}
export default Header;
