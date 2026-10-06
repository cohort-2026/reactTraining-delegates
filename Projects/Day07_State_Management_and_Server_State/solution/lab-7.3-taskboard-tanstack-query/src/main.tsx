// TODO (Lab 7.1 step 7): wrap <RouterProvider> in <AuthProvider> and <ThemeProvider>.
// TODO (Lab 7.3 step 3): create a QueryClient (staleTime 30_000) and add <QueryClientProvider> and <ReactQueryDevtools />.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "projects/:projectId", element: <Project /> },
      { path: "settings", element: <RequireAuth><Settings /></RequireAuth> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
