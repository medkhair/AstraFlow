import { useState } from "react";
import { currentUser } from "../data/data";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        email.trim() === currentUser.email &&
        password === currentUser.password
      ) {
        onLogin(currentUser);
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 800);
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <svg
            className="login-logo-icon"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="8"
              y="14"
              width="32"
              height="20"
              rx="4"
              fill="#7c3aed"
              opacity="0.15"
            />
            <rect
              x="8"
              y="14"
              width="32"
              height="20"
              rx="4"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="8"
              width="32"
              height="20"
              rx="4"
              fill="#7c3aed"
              opacity="0.3"
            />
            <rect
              x="4"
              y="8"
              width="32"
              height="20"
              rx="4"
              stroke="#a855f7"
              strokeWidth="2"
            />
          </svg>
          <span className="login-logo-name">AstraFlow</span>
        </div>

        <p className="login-subtitle">Sign in to watch live TV</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="tv-email">Email</label>
            <input
              id="tv-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="tv-password">Password</label>
            <input
              id="tv-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span className="login-spinner" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-hint">
          <span className="hint-label">Demo credentials</span>
          <code>client@example.com</code>
          <code>client123</code>
        </div>
      </div>
    </div>
  );
}
