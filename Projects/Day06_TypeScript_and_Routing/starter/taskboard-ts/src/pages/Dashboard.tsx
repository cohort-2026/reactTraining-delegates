import { useOutletContext, useSearchParams } from "react-router";
import type { BoardContext } from "./Layout";

function Dashboard() {
  const { tasks } = useOutletContext<BoardContext>();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  return (
    <main>
      <h2>Dashboard</h2>

      <p>Total tasks: {tasks.length}</p>

      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => {
          setSearchParams(e.target.value ? { search: e.target.value } : {});
        }}
      />

      {tasks
        .filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase()),
        )
        .map((task) => (
          <article key={task.id}>
            <h3>{task.title}</h3>
            <p>Project: {task.projectId}</p>
            <p>Status: {task.status}</p>
          </article>
        ))}
    </main>
  );
}

export default Dashboard;
