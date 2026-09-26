import { notFound } from "next/navigation";
import { getProject, getTasks } from "@/lib/data";
import { TaskCard } from "@/components/TaskCard";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();
  const tasks = await getTasks(projectId);
  return (
    <section>
      <h1>{project.name}</h1>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
