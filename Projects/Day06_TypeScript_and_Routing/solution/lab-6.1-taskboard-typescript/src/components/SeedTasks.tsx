import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import type { Task, Todo } from "../types";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

type SeedTasksProps = {
  onSeed: (tasks: Task[]) => void;
};

export default function SeedTasks({ onSeed }: SeedTasksProps) {
  const { data, error, loading, retry } = useFetch<Todo[]>(SEED_URL);

  useEffect(() => {
    if (!data) return;
    onSeed(
      data.map((todo) => ({
        id: String(todo.id),
        title: todo.title,
        status: todo.completed ? "done" : "todo",
        points: 1,
      })),
    );
  }, [data, onSeed]);

  if (error) {
    return (
      <p role="alert">
        Could not load starter tasks: {error}{" "}
        <button onClick={retry}>Retry</button>
      </p>
    );
  }

  return <p>{loading ? "Loading starter tasks..." : "Preparing starter tasks..."}</p>;
}
