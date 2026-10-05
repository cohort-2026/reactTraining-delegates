import { NavLink, Outlet } from "react-router";
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
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
