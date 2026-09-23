import { Link, useParams } from "react-router";
import { projects } from "../data/projects";

export default function Project() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </section>
  );
}
