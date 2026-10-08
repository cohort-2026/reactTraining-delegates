import AddTaskForm from "./AddTaskForm";
import Board from "./Board";
import type { Task } from "../types";

type ProjectBoardProps = {
  tasks: Task[];
  projectId: string;
};

export default function ProjectBoard({ tasks, projectId }: ProjectBoardProps) {
  return (
    <>
      <AddTaskForm projectId={projectId} />
      <Board tasks={tasks} />
    </>
  );
}
