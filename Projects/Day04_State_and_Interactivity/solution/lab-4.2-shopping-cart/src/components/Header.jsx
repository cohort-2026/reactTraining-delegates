// TODO (Lab 4.3 step 7): show a derived count, for example "2 of 8 done".
function Header({ tasks }) {
  return (
    <header className="header">
      <h1>TaskBoard</h1>
      <p>{tasks.length} tasks</p>
    </header>
  );
}
export default Header;
