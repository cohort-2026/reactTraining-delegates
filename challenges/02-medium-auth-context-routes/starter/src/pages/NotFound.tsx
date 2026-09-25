import { Link } from "react-router";

export default function NotFound() {
  return (
    <section>
      <h1>404 Not Found</h1>
      <Link to="/">Back to home</Link>
    </section>
  );
}
