function Header({ sessionCount, rooms }) {
  return (
    <header className="header">
      <h1>DevDay schedule</h1>
      <p>{sessionCount} sessions today</p>
      <ul className="rooms" aria-label="Rooms">
        {rooms.map((room) => {
          <li key={room}>{room}</li>;
        })}
      </ul>
    </header>
  );
}
export default Header;
