import { useParams } from "react-router";
import AddTaskForm from "../components/AddTaskForm";
import Board from "../components/Board";
import { PROJECTS } from "../data/projects";
import { useTasks } from "../hooks/useTasks";
import {
  useAddTask,
  useDeleteTask,
  useMoveTask,
  useRenameTask,
} from "../hooks/useTaskMutations";
import NotFound from "./NotFound";

function Project() {
  const { projectId } = useParams();
  const { data } = useTasks();
  const tasks = data ?? [];
  const addTask = useAddTask();
  const moveTask = useMoveTask();
  const renameTask = useRenameTask();
  const deleteTask = useDeleteTask();

  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return <NotFound />;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <>
      <h2>{project.name}</h2>
      <AddTaskForm
        onAdd={(task) => addTask.mutate({ task, projectId: project.id })}
      />
      <Board
        tasks={projectTasks}
        onStatusChange={(id, status) => moveTask.mutate({ id, status })}
        onRename={(id, title) => renameTask.mutate({ id, title })}
        onDelete={(id) => deleteTask.mutate(id)}
      />
    </>
  );
}

export default Project;