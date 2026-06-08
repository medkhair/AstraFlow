import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerification } from '../hooks/useVerification';

const Logo = () => (
  <svg className="login-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="14" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.15" />
    <rect x="8" y="14" width="32" height="20" rx="4" stroke="#7c3aed" strokeWidth="2" />
    <rect x="4" y="8" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.3" />
    <rect x="4" y="8" width="32" height="20" rx="4" stroke="#a855f7" strokeWidth="2" />
  </svg>
);

export function VerifyEmail() {
  const [code, setCode] = useState('');
  const [resendSent, setResendSent] = useState(false);
  const { verifyOtp, resendOtp, isVerified, loading, error } = useVerification();
  const navigate = useNavigate();

  useEffect(() => {
    if (isVerified) {
      navigate('/choose-plan', { replace: true });
    }
  }, [isVerified, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp(code.trim());
  };

  const handleResend = async () => {
    setResendSent(false);
    await resendOtp();
    if (!error) setResendSent(true);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <Logo />
          <span className="login-logo-name">AstraFlow</span>
        </div>

        <p className="login-subtitle">Verify your email address</p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 24px' }}>
          Enter the 6-digit code we sent to your email.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="otp-code">Verification Code</label>
            <input
              id="otp-code"
              type="text"
              inputMode="numeric"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              autoComplete="one-time-code"
              required
              style={{ letterSpacing: '0.3em', textAlign: 'center', fontSize: 22 }}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          {resendSent && (
            <p style={{ fontSize: 13, color: '#4ade80', margin: 0 }}>Code resent successfully.</p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || code.length < 6}
          >
            {loading ? <span className="login-spinner" /> : 'Verify Email'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-muted)' }}>
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              padding: 0,
              opacity: loading ? 0.6 : 1,
            }}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
