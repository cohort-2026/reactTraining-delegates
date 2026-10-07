import type { Dispatch } from "react";
import type { Task } from "../types";
import type { TaskAction } from "../state/tasksReducer";

type Props = {
  task: Task;
  dispatch: Dispatch<TaskAction>;
};

export function TaskCard({ task, dispatch }: Props) {
  return (
    <li className="card">
      <span>
        {task.title} ({task.points} pts)
      </span>
      {task.status !== "done" && (
        <button
          aria-label={`Mark ${task.title} as done`}
          onClick={() => dispatch({ type: "moved", id: task.id, status: "done" })}
        >
          Done
        </button>
      )}
      <button
        aria-label={`Delete ${task.title}`}
        onClick={() => dispatch({ type: "deleted", id: task.id })}
      >
        Delete
      </button>
    </li>
  );
}
