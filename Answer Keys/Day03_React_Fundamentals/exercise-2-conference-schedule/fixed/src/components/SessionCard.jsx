import Card from "./ui/Card.jsx";

function SessionCard({ title, startTime, room, speaker, seatsLeft }) {
  return (
    <Card title={title}>
      <p>
        {startTime} in {room}
      </p>
      {speaker && <p>Speaker: {speaker}</p>}
      {seatsLeft === 0 ? (
        <span className="badge badge-full">Fully booked</span>
      ) : (
        <span className="badge">{seatsLeft} seats left</span>
      )}
    </Card>
  );
}
export default SessionCard;
