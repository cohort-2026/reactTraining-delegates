function Header({ tasks }) {
  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{tasks.length} tasks</p>
    </header>
  );
}
export default Header;
