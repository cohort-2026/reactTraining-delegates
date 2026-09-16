import type { RouteObject } from "react-router";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Settings from "./pages/Settings";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "projects/projectId", element: <Project /> },
      {
        path: "settings",
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
      },
      { path: "login", element: <Login /> },
    ],
  },
];
