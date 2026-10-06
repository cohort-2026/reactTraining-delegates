// TODO (Lab 7.2 steps 5-7): stop reading Outlet context; the board reads tasks from the store.
// The search can stay in the URL; add an assignee filter from a filter store.
import AddTaskForm from "../components/AddTaskForm";
import Board from "../components/Board";
import FilterBar from "../components/FilterBar";
import { projects } from "../data/projects";

export default function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <FilterBar />
      <p className="hint">New tasks added here go into the {projects[0].name} project.</p>
      <AddTaskForm projectId={projects[0].id} />
      <Board />
    </section>
  );
}
