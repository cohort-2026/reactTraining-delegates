import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
