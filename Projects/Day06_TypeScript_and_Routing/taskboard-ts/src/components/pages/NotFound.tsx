import { Link } from "react-router";

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="text-6xl font-bold text-gray-300">404</p>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        Page not found
      </h2>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white transition-colors hover:bg-gray-800"
      >
        Back to dashboard
      </Link>
    </main>
  );
}

export default NotFound;