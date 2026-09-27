export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-busy="true">
      <p className="sr-only">Loading tasks...</p>
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
  );
}
