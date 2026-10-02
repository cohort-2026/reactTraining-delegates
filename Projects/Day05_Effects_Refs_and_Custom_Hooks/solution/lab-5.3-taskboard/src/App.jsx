import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import Counter from "./components/Counter.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Accordion from "./components/Accordion.jsx";
import Shop from "./components/catalogue/Shop.jsx";
import ProductSearch from "./components/ProductSearch.jsx";
import WeatherDashboard from "./components/WeatherDashboard.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";
const ENGLISH_TITLES = [
  "Set up the project",
  "Create the task list",
  "Review pending work",
  "Update project documentation",
  "Organize the task board",
];
const LEGACY_TITLE_TRANSLATIONS = {
  "delectus aut autem": ENGLISH_TITLES[0],
  "quis ut nam facilis et officia qui": ENGLISH_TITLES[1],
  "fugiat veniam minus": ENGLISH_TITLES[2],
  "et porro tempora": ENGLISH_TITLES[3],
  "laboriosam mollitia et enim quasi adipisci quia provident illum": ENGLISH_TITLES[4],
};

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const [seedError, setSeedError] = useState("");
  const [seedAttempt, setSeedAttempt] = useState(0);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (tasks === null) return;
    const hasLegacyTitles = tasks.some((task) => LEGACY_TITLE_TRANSLATIONS[task.title]);
    if (!hasLegacyTitles) return;

    setTasks((current) =>
      current.map((task) => ({
        ...task,
        title: LEGACY_TITLE_TRANSLATIONS[task.title] ?? task.title,
      }))
    );
  }, [tasks, setTasks]);

  useEffect(() => {
    if (!needsSeed) return undefined;
    const controller = new AbortController();

    fetch(SEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((todos) => {
        setTasks(
          todos.map((todo) => ({
            id: String(todo.id),
            title: ENGLISH_TITLES[todo.id - 1] ?? todo.title,
            status: todo.completed ? "done" : "todo",
            points: 1,
          }))
        );
        setSeedError("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setSeedError(error instanceof Error ? error.message : "Unknown error");
        }
      });

    return () => controller.abort();
  }, [needsSeed, seedAttempt, setTasks]);

  function handleAdd(newTask) {
    setTasks((current) => [
      ...current,
      { ...newTask, id: crypto.randomUUID(), status: "todo" },
    ]);
  }

  function handleStatusChange(id, status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleRename(id, title) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }

  function handleDelete(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  if (tasks === null) {
    return (
      <p role={seedError ? "alert" : "status"}>
        {seedError ? (
          <>
            Could not load starter tasks: {seedError}{" "}
            <button type="button" onClick={() => {
              setSeedError("");
              setSeedAttempt((attempt) => attempt + 1);
            }}>Try again</button>
          </>
        ) : "Loading starter tasks..."}
      </p>
    );
  }

  return (
    <>
      <Header tasks={tasks} />
      <button className="reset-button" type="button" onClick={() => {
        setSeedError("");
        setTasks(null);
      }}>Reset board</button>
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <section className="practice" aria-label="Product search exercise">
        <h2>Product search</h2>
        <ProductSearch />
      </section>
      <section className="practice" aria-label="Weather dashboard exercise">
        <WeatherDashboard />
      </section>
      <section className="practice" aria-label="Shopping cart exercise">
        <h2>Shopping cart</h2>
        <Shop />
      </section>
      <section className="practice" aria-label="State practice">
        <h2>State exercises</h2>
        <Counter />
        <ThemeToggle />
        <Accordion />
      </section>
    </>
  );
}
export default App;
