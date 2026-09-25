import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function NotFound() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong";

  return (
    <main className="mx-auto grid max-w-6xl gap-4 p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <Link to="/" className="text-sm font-medium underline underline-offset-4">Back to dashboard</Link>
    </main>
  );
}
