import { useOutletContext, useParams } from "react-router";
import Board from "../Board";
import projects from "../../data/projects";
import type { Task, Status } from "../../types";

type OutletContext = {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Project() {
  const { id } = useParams<{ id: string }>();
  const { tasks, onStatusChange, onRename, onDelete } =
    useOutletContext<OutletContext>();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-6">
        <p className="text-gray-600">Project "{id}" not found.</p>
      </main>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Project
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          {project.name}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{project.description}</p>
      </header>

      <Board
        tasks={projectTasks}
        onStatusChange={onStatusChange}
        onRename={onRename}
        onDelete={onDelete}
      />
    </main>
  );
}

export default Project;