// TODO (Lab 7.2 step 5): Reset board uses Layout's Outlet context, which this lab removes.
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
