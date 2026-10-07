import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router";
import AddTaskForm from "../components/AddTaskForm";
import Board from "../components/Board";
import { useTasks } from "../hooks/useTasks";
import {
  useAddTask,
  useDeleteTask,
  useMoveTask,
  useRenameTask,
} from "../hooks/useTaskMutations";
import { useFilterStore } from "../state/useFilterStore";

function Dashboard() {
  const { data } = useTasks();
  const tasks = data ?? [];
  const addTask = useAddTask();
  const moveTask = useMoveTask();
  const renameTask = useRenameTask();
  const deleteTask = useDeleteTask();
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const assignees = Array.from(
    new Set(tasks.map((t) => t.assignee).filter((a): a is string => !!a))
  );

  const visibleTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q.toLowerCase()) &&
      (assignee === "all" || t.assignee === assignee)
  );

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <>
      <label htmlFor="search">Search</label>
      <input id="search" type="search" value={q} onChange={handleSearch} />
      <label htmlFor="assignee">Assignee</label>
      <select
        id="assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      >
        <option value="all">All</option>
        {assignees.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <AddTaskForm onAdd={(task) => addTask.mutate({ task })} />
      <Board
        tasks={visibleTasks}
        onStatusChange={(id, status) => moveTask.mutate({ id, status })}
        onRename={(id, title) => renameTask.mutate({ id, title })}
        onDelete={(id) => deleteTask.mutate(id)}
      />
    </>
  );
}

export default Dashboard;