import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

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
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "projects/:projectId",
        Component: Project,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
