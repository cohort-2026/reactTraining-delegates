import Column from "./Column.jsx";
import { tracks } from "../data/schedule.js";

function Schedule({ sessions }) {
  return (
    <div className="schedule">
      {tracks.map((track) => (
        <Column
          key={track.id}
          heading={track.heading}
          sessions={sessions.filter((s) => s.track === track.id)}
        />
      ))}
    </div>
  );
}
export default Schedule;
