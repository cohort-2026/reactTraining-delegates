import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Project not found</h1>
      <p className="text-sm text-muted-foreground">
        There is no project at this URL.
      </p>
      <Link href="/" className="text-sm font-medium underline underline-offset-4">
        Back to dashboard
      </Link>
    </section>
  );
}
