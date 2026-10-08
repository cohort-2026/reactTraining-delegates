import { useResetTasks } from "../hooks/useTasks";

export default function Settings() {
  const reset = useResetTasks();

  return (
    <section>
      <h1>Settings</h1>
      <p>Replace the tasks on the server with the starter tasks.</p>
      {reset.isError && (
        <p role="alert">Could not reset tasks: {reset.error.message}</p>
      )}
      <button
        className="reset-button"
        type="button"
        disabled={reset.isPending}
        onClick={() => reset.mutate()}
      >
        {reset.isPending ? "Resetting..." : "Reset board"}
      </button>
    </section>
  );
}
