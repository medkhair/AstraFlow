import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-eyebrow">404</p>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="login-btn not-found-btn">
          Go back home
        </Link>
      </div>
    </div>
  )
}
