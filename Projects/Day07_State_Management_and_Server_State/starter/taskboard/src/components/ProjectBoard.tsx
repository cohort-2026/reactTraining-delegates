// TODO (Lab 7.2 steps 5-6): no more handlers passed as props.
// AddTaskForm and Board use the task store directly.

import AddTaskForm from "./AddTaskForm";
import Board from "./Board";

type ProjectBoardProps = {
  projectId: string;
};

export default function ProjectBoard({ projectId }: ProjectBoardProps) {
  return (
    <>
      <AddTaskForm projectId={projectId} />
      <Board />
    </>
  );
}
