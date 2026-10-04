import { NavLink, Outlet, useNavigate } from "react-router";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Task } from "../types";

export type BoardContext = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Build login page",
    assignee: "Alice",
    points: 3,
    status: "todo",
    projectId: "website",
  },
  {
    id: "2",
    title: "Create API endpoint",
    assignee: "Bob",
    points: 5,
    status: "doing",
    projectId: "website",
  },
  {
    id: "3",
    title: "Design mobile screen",
    assignee: "Charlie",
    points: 2,
    status: "done",
    projectId: "mobile-app",
  },
  {
    id: "4",
    title: "Write tests",
    assignee: "Alice",
    points: 3,
    status: "todo",
    projectId: "mobile-app",
  },
];

function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const navigate = useNavigate();

  useEffect(() => {
    if (tasks.length === 0) {
      setTasks(sampleTasks);
    }
  }, [tasks, setTasks]);

  function handleReset() {
    localStorage.removeItem("tasks");
    setTasks([]);
    navigate("/");
  }

  return (
    <>
      <header>
        <h1>TaskBoard</h1>

        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink to="/projects/website">Website</NavLink>

          <NavLink to="/projects/mobile-app">Mobile App</NavLink>

          <NavLink to="/settings">Settings</NavLink>
        </nav>

        <button type="button" onClick={handleReset}>
          Reset board
        </button>
      </header>

      <Outlet context={{ tasks, setTasks }} />
    </>
  );
}

export default Layout;
