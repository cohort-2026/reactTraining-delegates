import { SignupForm } from "./components/SignupForm";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto grid max-w-md gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Join the TaskBoard beta</h1>
          <ThemeToggle />
        </header>
        <SignupForm />
      </main>
    </div>
  );
}
