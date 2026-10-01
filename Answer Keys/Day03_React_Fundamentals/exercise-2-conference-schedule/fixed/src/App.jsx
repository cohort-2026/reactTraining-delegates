import "./App.css";
import Header from "./components/Header.jsx";
import Schedule from "./components/Schedule.jsx";
import { rooms, sessions } from "./data/schedule.js";

function App() {
  return (
    <main>
      <Header sessionCount={sessions.length} rooms={rooms} />
      <Schedule sessions={sessions} />
    </main>
  );
}
export default App;
