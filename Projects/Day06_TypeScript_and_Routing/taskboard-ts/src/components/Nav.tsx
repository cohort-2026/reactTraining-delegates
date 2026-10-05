import { NavLink } from "react-router";

function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-gray-900 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <nav className="flex gap-6 text-sm">
      <NavLink to="/" className={linkClass} end>
        Dashboard
      </NavLink>
      <NavLink to="/projects/p1" className={linkClass}>
        Projects
      </NavLink>
      <NavLink to="/settings" className={linkClass}>
        Settings
      </NavLink>
    </nav>
  );
}

export default Nav;