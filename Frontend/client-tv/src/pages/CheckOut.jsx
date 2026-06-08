import { Navigate, useNavigate } from 'react-router-dom';

const Logo = () => (
  <svg className="login-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="14" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.15" />
    <rect x="8" y="14" width="32" height="20" rx="4" stroke="#7c3aed" strokeWidth="2" />
    <rect x="4" y="8" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.3" />
    <rect x="4" y="8" width="32" height="20" rx="4" stroke="#a855f7" strokeWidth="2" />
  </svg>
);

function getSelectedPlan() {
  try {
    const stored = localStorage.getItem('selected_plan');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function CheckOut() {
  const selectedPlan = getSelectedPlan();
  const navigate = useNavigate();

  if (!selectedPlan) {
    return <Navigate to="/choose-plan" replace />;
  }

  const handleCompletePayment = () => {
    localStorage.setItem('checkout_completed', 'true');
    navigate('/', { replace: true });
  };

  return (
    <div className="login-screen">
      <div className="login-card" style={{ maxWidth: 480, width: '100%' }}>
        <div className="login-logo">
          <Logo />
          <span className="login-logo-name">AstraFlow</span>
        </div>

        <p className="login-subtitle">Order Summary</p>

        <div
          style={{
            padding: '20px 24px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            margin: '8px 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)', fontSize: 14 }}>Plan</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{selectedPlan.name}</span>
          </div>

          {selectedPlan.description && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ color: 'var(--text-dim)', fontSize: 14, flexShrink: 0 }}>Description</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'right' }}>
                {selectedPlan.description}
              </span>
            </div>
          )}

          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--text-dim)', fontSize: 14, fontWeight: 600 }}>Total</span>
            <span style={{ color: 'var(--accent)', fontSize: 24, fontWeight: 800 }}>
              {selectedPlan.price != null ? `$${selectedPlan.price}` : 'Free'}
              {selectedPlan.billingCycle && (
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>
                  /{selectedPlan.billingCycle}
                </span>
              )}
            </span>
          </div>
        </div>

        <button className="login-btn" onClick={handleCompletePayment} style={{ width: '100%' }}>
          Complete Payment
        </button>

        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          By continuing you agree to our terms of service.
        </p>

        <button
          type="button"
          onClick={() => navigate('/choose-plan')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            cursor: 'pointer',
            fontSize: 14,
            textAlign: 'center',
            display: 'block',
            margin: '4px auto 0',
            padding: 0,
          }}
        >
          ← Change plan
        </button>
      </div>
    </div>
  );
}
