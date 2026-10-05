import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Project from "./components/pages/Project";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects/:id" element={<Project />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;