import { Link } from "react-router";
import { projects } from "../data/projects";

export default function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
