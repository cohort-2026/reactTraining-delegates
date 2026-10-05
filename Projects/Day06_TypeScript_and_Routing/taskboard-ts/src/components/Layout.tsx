import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import useLocalStorage from "../hooks/useLocalStorage";
import seedTasks from "../data/seedTasks";
import type { Task, Status } from "../types";

function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);
  const [seeding, setSeeding] = useState(false);
  const [seedError, setSeedError] = useState("");
  const hasSeededRef = useRef(false);

  useEffect(() => {
    if (tasks !== null) return;
    if (hasSeededRef.current) return;
    hasSeededRef.current = true;

    (async () => {
      setSeeding(true);
      setSeedError("");
      try {
        const seeded = await seedTasks(12);
        setTasks(seeded);
      } catch (err) {
        setSeedError(err instanceof Error ? err.message : "Failed to seed");
      } finally {
        setSeeding(false);
      }
    })();
  }, [tasks, setTasks]);

  function handleAdd(newTask: { title: string; assignee: string; points: number }) {
    const id = crypto.randomUUID();
    setTasks((prev) => [
      ...(prev ?? []),
      { ...newTask, id, status: "todo" as Status, projectId: "p1" },
    ]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function handleRename(id: string, title: string) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => (prev ?? []).filter((t) => t.id !== id));
  }

  async function handleReset() {
    setSeeding(true);
    setSeedError("");
    try {
      const seeded = await seedTasks(12);
      setTasks(seeded);
    } catch (err) {
      setSeedError(err instanceof Error ? err.message : "Failed to reset");
    } finally {
      setSeeding(false);
    }
  }

  const safeTasks = tasks ?? [];
  const openCount = safeTasks.filter((t) => t.status !== "done").length;

  useEffect(() => {
    const original = document.title;
    document.title = `TaskBoard (${openCount} open)`;
    return () => {
      document.title = original;
    };
  }, [openCount]);

  const context = {
    tasks: safeTasks,
    onAdd: handleAdd,
    onStatusChange: handleStatusChange,
    onRename: handleRename,
    onDelete: handleDelete,
    onReset: handleReset,
    seeding,
    seedError,
  };

  return (
    <>
      <Header tasks={safeTasks} />
      <Outlet context={context} />
    </>
  );
}

export default Layout;