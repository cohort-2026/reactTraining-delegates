import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Project not found</h1>
      <Link href="/">Back to all projects</Link>
    </section>
  );
}
