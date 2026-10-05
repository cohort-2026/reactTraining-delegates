import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export default function NotFound() {
  const error = useRouteError()
  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Page not found'

  return (
    <main className="error-page">
      <h1>{title}</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Back to dashboard</Link>
    </main>
  )
}