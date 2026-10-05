import { Outlet, NavLink } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex">
      <nav>
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : "" }>Dashboard</NavLink>
        <NavLink to="/projects/p1" className={({isActive}) => isActive ? "active" : "" }>Project 1</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main><Outlet /></main>
    </div>
  )
}