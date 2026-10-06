import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import AddTaskForm from "./AddTaskForm";
import Board from "./Board";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

type ProjectBoardProps = {
  projectId: string;
};

export default function ProjectBoard({ projectId }: ProjectBoardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const setAssignee = useFilterStore((s) => s.setAssignee);
  const q = searchParams.get("q") ?? "";
  const assignees = [...new Set(
    tasks
      .filter((task) => task.projectId === projectId)
      .map((task) => task.assignee?.trim())
      .filter((name): name is string => Boolean(name)),
  )].sort((a, b) => a.localeCompare(b));

  function handleSearch(value: string) {
    setSearchParams((params) => {
      if (value) params.set("q", value);
      else params.delete("q");
      return params;
    });
  }

  return (
    <>
      <div className="search">
        <label htmlFor="search">Search tasks</label>
        <input id="search" type="search" value={q}
          onChange={(e) => handleSearch(e.target.value)} />
        <label htmlFor="assignee-filter">Filter by assignee</label>
        <select id="assignee-filter" value={assignee}
          onChange={(e) => setAssignee(e.target.value)}>
          <option value="">All assignees</option>
          {assignees.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <AddTaskForm projectId={projectId} />
      <Board projectId={projectId} />
    </>
  );
}
