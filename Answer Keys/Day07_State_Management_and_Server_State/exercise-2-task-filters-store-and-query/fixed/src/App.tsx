import { AddTaskForm } from "./components/AddTaskForm";
import { FilterBar } from "./components/FilterBar";
import { TaskList } from "./components/TaskList";

export default function App() {
  return (
    <main>
      <h1>TaskBoard</h1>
      <AddTaskForm />
      <FilterBar />
      <TaskList />
    </main>
  );
}
