
function Header({ appName, taskCount }) {
  return (
    <header>
      <h1>{appName}</h1>
      <p>Total tasks: {taskCount}</p>
    </header>
  );
}

export default Header;