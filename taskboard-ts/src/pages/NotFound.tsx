import { Link } from "react-router";

function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>That address doesn't match any page.</p>
      <Link to="/">Back to the Dashboard</Link>
    </section>
  );
}

export default NotFound;