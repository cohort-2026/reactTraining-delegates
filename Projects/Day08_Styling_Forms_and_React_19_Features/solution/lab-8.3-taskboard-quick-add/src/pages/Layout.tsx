import { Link, NavLink, Outlet } from "react-router";
import Header from "@/components/Header";
import { ThemeButton } from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { projects } from "@/data/projects";

const navLinkClass =
  "rounded-md px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current=page]:bg-muted aria-[current=page]:font-semibold";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:px-8">
          <Header />
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>Dashboard</NavLink>
            {projects.map((p) => (
              <NavLink key={p.id} to={`/projects/${p.id}`} className={navLinkClass}>
                {p.name}
              </NavLink>
            ))}
            <NavLink to="/settings" className={navLinkClass}>Settings</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <ThemeButton />
            {user ? (
              <>
                <span>Signed in as {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout}>Log out</Button>
              </>
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
