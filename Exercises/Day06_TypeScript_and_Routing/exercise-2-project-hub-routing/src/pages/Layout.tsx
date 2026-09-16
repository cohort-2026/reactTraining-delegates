import { NavLink, Outlet } from "react-router-dom";
import { projects } from "../data/projects";

export default function Layout() {
  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        {projects.map((project) => (
          <NavLink key={project.id} to={`/projects/${project.id}`}>
            {project.name}
          </NavLink>
        ))}
        <a href="/settings">Settings</a>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
