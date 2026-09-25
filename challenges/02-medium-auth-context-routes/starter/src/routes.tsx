import type { RouteObject } from "react-router";
import { AuthProvider } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

// The whole app lives under one root route. AuthProvider wraps the Layout, so
// every page (and the nav bar) can call useAuth(). The tests render these same
// routes with createMemoryRouter.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
