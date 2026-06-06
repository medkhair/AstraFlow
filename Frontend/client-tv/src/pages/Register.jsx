import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthentication';
import { useRegistration } from '../hooks/useRegistration';

export function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { registerUser, loading, error } = useRegistration();

  useEffect(() => {
    document.body.classList.add('scrollable');
    return () => document.body.classList.remove('scrollable');
  }, []);

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  if (user) return <Navigate to="/" replace />;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const tenantId = localStorage.getItem('tenantId') || '5094c936-5662-43c0-adb6-91804e68359e';
    try {
      await registerUser({ ...form, tenantId });
      navigate('/signin', { replace: true, state: { registered: true } });
    } catch {
      // error already set in hook
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card" style={{ maxWidth: 460 }}>
        <div className="login-logo">
          <svg
            className="login-logo-icon"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="14" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.15" />
            <rect x="8" y="14" width="32" height="20" rx="4" stroke="#7c3aed" strokeWidth="2" />
            <rect x="4" y="8" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.3" />
            <rect x="4" y="8" width="32" height="20" rx="4" stroke="#a855f7" strokeWidth="2" />
          </svg>
          <span className="login-logo-name">AstraFlow</span>
        </div>

        <p className="login-subtitle">Create your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="reg-fullName">Full Name</label>
            <input
              id="reg-fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              name="username"
              type="text"
              placeholder="johndoe"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="reg-phone">Phone</label>
            <input
              id="reg-phone"
              name="phone"
              type="tel"
              placeholder="+1234567890"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="login-spinner" /> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
