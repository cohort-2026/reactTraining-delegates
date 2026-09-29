import SessionCard from "./SessionCard.jsx";

function Column({ heading, sessions }) {
  return (
    <section className="column">
      <h2>
        {heading} ({sessions.length})
      </h2>
      {sessions.length === 0 && <p className="empty">Nothing scheduled yet</p>}
      {/* 0 would show on screen, so compare first */}
      {sessions.length > 0 && (
        <ul>
          {sessions.map((session) => (
            // key goes on the li, the element this map returns
            <li key={session.id}>
              <SessionCard {...session} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default Column;
