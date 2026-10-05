// TODO (Lab 7.2 step 5): Reset board uses the task store.
import { useTaskStore } from "../state/useTaskStore";

export default function Settings() {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const tasks = useTaskStore((state) => state.tasks);

  function handleReset() {
    tasks.forEach((task) => deleteTask(task.id));
  }

  return (
    <section>
      <h1>Settings</h1>
      <p>Reset the board to load the starter tasks again.</p>
      <button className="reset-button" onClick={handleReset}>
        Reset board
      </button>
    </section>
  );
}
