function Card({ title, startTime, room, speaker, seatsLeft, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <div className="card-body">
        <p>
          {startTime} in {room}
        </p>
        {speaker && <p>Speaker: {speaker}</p>}
        {seatsLeft === 0 ? (
          <span className="badge badge-full">Fully booked</span>
        ) : (
          <span className="badge">{seatsLeft} seats left</span>
        )}
      </div>
    </article>
  );
}
export default Card;
