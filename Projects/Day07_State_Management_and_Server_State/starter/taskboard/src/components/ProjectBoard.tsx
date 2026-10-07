import AddTaskForm from "./AddTaskForm";
import type { NewTaskFields } from "./AddTaskForm";
import Board from "./Board";
import { projects } from "../data/projects";
import { useAddTask } from "../hooks/useAddTask";
import { useTaskStore } from "../state/useTaskStore";

type ProjectBoardProps = {
  projectId?: string;
  filtered?: boolean;
};

export default function ProjectBoard({ projectId, filtered = false }: ProjectBoardProps) {
  const addTask = useAddTask();
  const addTaskToStore = useTaskStore((state) => state.addTask);

  function handleAdd(newTask: NewTaskFields) {
    addTask.mutate({
      id: crypto.randomUUID(),
      ...newTask,
      status: "todo",
      projectId: projectId ?? projects[0].id,
      assignee: newTask.assignee.trim() || undefined,
      tags: [],
    }, {
      onSuccess: addTaskToStore,
    });
  }

  return (
    <>
      <AddTaskForm onAdd={handleAdd} isPending={addTask.isPending} />
      <Board projectId={projectId} filtered={filtered} />
    </>
  );
}
