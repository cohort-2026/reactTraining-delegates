import { NavLink, Outlet } from "react-router";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Task, Status } from "../types";

export default function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    setTasks([
      { id: "1", title: "File monthly reports", status: "To do" as Status, points: 3, projectId: "work" },
      { id: "2", title: "Reply to emails", status: "In progress" as Status, points: 2, projectId: "work" },
      { id: "3", title: "Organize paperwork", status: "To do" as Status, points: 1, projectId: "work" },
      { id: "4", title: "Update attendance register", status: "Done" as Status, points: 2, projectId: "work" },
    ]);
  }, [needsSeed, setTasks]);

  function handleAdd(newTask: { title: string; assignee: string; points: number }) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...(prev ?? []), { ...newTask, id, status: "To do" as Status, projectId: "work" }]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) => (prev ?? []).map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function handleRename(id: string, title: string) {
    setTasks((prev) => (prev ?? []).map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function handleDelete(id: string) {
    setTasks((prev) => (prev ?? []).filter((t) => t.id !== id));
  }

  if (tasks === null) return <p>Loading starter tasks...</p>;

  return (
    <div>
      <nav style={{ display: "flex", gap: "15px", padding: "15px", background: "#eee" }}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/project/work">Work</NavLink>
        <NavLink to="/project/personal">Personal</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <button onClick={() => setTasks(null)}>Reset board</button>
      </nav>
      <main style={{ padding: "20px" }}>
        <Outlet context={{ tasks, setTasks, handleAdd, handleStatusChange, handleRename, handleDelete }} />
      </main>
    </div>
  );
}