import { useOutletContext, useSearchParams } from "react-router";
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";
import type { BoardContext } from "./Layout";

export default function Dashboard() {
  const { tasks } = useOutletContext<BoardContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const visible = tasks.filter((t) =>
    t.title.toLowerCase().includes(q.toLowerCase())
  );

  function handleSearch(value: string) {
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="search">
        <label htmlFor="search">Search tasks</label>
        <input id="search" type="search" value={q}
          onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <p className="hint">New tasks added here go into the {projects[0].name} project.</p>
      <ProjectBoard tasks={visible} projectId={projects[0].id} />
    </section>
  );
}
