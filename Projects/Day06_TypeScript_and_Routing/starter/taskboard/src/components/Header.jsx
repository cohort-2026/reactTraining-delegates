// TODO (Lab 5.3 step 7): update the tab title with the open count in an effect.
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
