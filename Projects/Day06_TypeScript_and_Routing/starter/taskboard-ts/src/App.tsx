// TODO (Lab 6.1 steps 2 and 5): in taskboard-ts this becomes App.tsx. Type every handler parameter
// (id: string, status: Status) and pass the type to the Hook: useLocalStorage<Task[] | null>("tasks", null).
// TODO (Lab 6.2 steps 2-5): move the tasks state, the seeding effect and the handlers into src/pages/Layout.tsx,
// share tasks with the pages through Outlet context, and add a projectId to every seeded and new task.
// TODO (Lab 6.3 step 6): show the user's name and a Log out button in Layout.
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "project/:projectId", Component: Project },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}