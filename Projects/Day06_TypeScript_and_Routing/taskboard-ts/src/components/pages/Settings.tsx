import ThemeToggle from "../ThemeToggle.tsx";

function Settings() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Settings
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Preferences
        </h2>
      </header>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Theme</p>
            <p className="text-sm text-gray-600">
              Switch between light and dark mode.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}

export default Settings;