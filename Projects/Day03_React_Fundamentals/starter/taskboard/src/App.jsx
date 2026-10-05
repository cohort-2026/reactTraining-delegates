// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
// TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  const [tasks, setTasks] = useLocalStorage("taskboard-tasks", []);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  // Seed tasks from JSONPlaceholder on first run
  useEffect(() => {
    async function seedTasks() {
      const storedTasks = localStorage.getItem("taskboard-tasks");

      if (storedTasks) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const todos = await response.json();

        const newTasks = todos.map((todo, index) => ({
          id: todo.id,
          title: todo.title,
          assignee: "Unassigned",
          points: (index + 1) * 2,
          status: todo.completed ? "done" : "todo",
        }));

        setTasks(newTasks);
      } catch (error) {
        console.error("Failed to seed tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    seedTasks();
  }, [setTasks]);

  // Focus the input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update browser tab with open task count
  useEffect(() => {
    const openCount = tasks.filter(
      (task) => task.status !== "done"
    ).length;

    document.title = `TaskBoard (${openCount} open)`;
  }, [tasks]);

  function resetBoard() {
    localStorage.removeItem("taskboard-tasks");
    window.location.reload();
  }

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <Header />

      <button onClick={resetBoard}>
        Reset board
      </button>

      <input
        ref={inputRef}
        type="text"
        placeholder="Add a task..."
      />

      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;