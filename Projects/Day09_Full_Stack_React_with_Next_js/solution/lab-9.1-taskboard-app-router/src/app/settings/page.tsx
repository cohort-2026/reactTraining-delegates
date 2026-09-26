export const metadata = { title: "Settings | TaskBoard" };

export default function SettingsPage() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Account and project settings will live here. Lab 9.3 adds sign up,
        log in and per-user data with Supabase.
      </p>
    </section>
  );
}
