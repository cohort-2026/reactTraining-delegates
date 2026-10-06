// TODO (Lab 7.2 steps 5-7): the board reads task state from its stores.
import ProjectBoard from "../components/ProjectBoard";
import { projects } from "../data/projects";

export default function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <p className="hint">New tasks added here go into the {projects[0].name} project.</p>
      <ProjectBoard projectId={projects[0].id} />
    </section>
  );
}
