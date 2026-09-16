import SessionCard from "./SessionCard.jsx";

function Column({ heading, sessions }) {
  return (
    <section className="column">
      <h2>
        {heading} ({sessions.length})
      </h2>
      {sessions.length === 0 && <p className="empty">Nothing scheduled yet</p>}
      {sessions.length && (
        <ul>
          {sessions.map((session) => (
            <li>
              <SessionCard key={session.id} {...session} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
export default Column;
