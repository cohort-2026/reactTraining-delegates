import { useOutletContext } from "react-router";
import type { BoardContext } from "./Layout";

export default function Settings() {
  const { setTasks } = useOutletContext<BoardContext>();

  return (
    <section>
      <h1>Settings</h1>
      <p>Reset the board to load the starter tasks again.</p>
      <button className="reset-button" onClick={() => setTasks(null)}>Reset board</button>
    </section>
  );
}
