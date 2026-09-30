import Card from "./ui/Card.jsx";

function SessionCard({ title, startTime, room, speaker, seatsLeft }) {
  // if (!speaker) return null;

  return (
      <Card title={title} startTime={startTime} room={room} speaker={speaker} seatsLeft={seatsLeft}/>
  );
}
export default SessionCard;
