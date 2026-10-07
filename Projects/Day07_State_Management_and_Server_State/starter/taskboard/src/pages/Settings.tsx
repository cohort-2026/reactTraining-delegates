import { useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const queryClient = useQueryClient();

  return (
    <section>
      <h1>Settings</h1>
      <p>Refresh the task list from the server.</p>
      <button className="reset-button" onClick={() => queryClient.invalidateQueries({ queryKey: ["tasks"] })}>
        Refresh board
      </button>
    </section>
  );
}
