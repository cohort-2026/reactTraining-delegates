import Link from "next/link";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();
  return (
    <section>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
