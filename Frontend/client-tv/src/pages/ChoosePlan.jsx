import { useNavigate } from 'react-router-dom';
import { usePlans } from '../hooks/usePlans';

const Logo = () => (
  <svg className="login-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="14" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.15" />
    <rect x="8" y="14" width="32" height="20" rx="4" stroke="#7c3aed" strokeWidth="2" />
    <rect x="4" y="8" width="32" height="20" rx="4" fill="#7c3aed" opacity="0.3" />
    <rect x="4" y="8" width="32" height="20" rx="4" stroke="#a855f7" strokeWidth="2" />
  </svg>
);

export function ChoosePlan() {
  const { plans, selectedPlan, selectPlan, loading, error } = usePlans();
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    selectPlan(plan);
    navigate('/checkout');
  };

  return (
    <div className="login-screen" style={{ alignItems: 'flex-start' }}>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <div className="login-logo" style={{ justifyContent: 'center', marginBottom: 8 }}>
          <Logo />
          <span className="login-logo-name">AstraFlow</span>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>
          Choose a plan to continue
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <span className="login-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
          </div>
        )}

        {error && (
          <p className="login-error" style={{ maxWidth: 420, margin: '0 auto 24px' }}>
            {error}
          </p>
        )}

        {!loading && !error && plans.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No plans available at this time.</p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {plans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => handleSelect(plan)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(plan)}
                style={{
                  padding: '28px 24px',
                  background: isSelected ? 'var(--accent-soft)' : 'var(--surface)',
                  border: `1px solid ${isSelected ? 'var(--accent-border)' : 'var(--border)'}`,
                  borderRadius: 16,
                  cursor: 'pointer',
                  transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s',
                  boxShadow: isSelected
                    ? '0 0 0 1px var(--accent-border), 0 8px 32px rgba(124,58,237,0.15)'
                    : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  outline: 'none',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                    {plan.name}
                  </p>
                  {plan.description && (
                    <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {plan.description}
                    </p>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: 30, fontWeight: 800, color: 'var(--accent)' }}>
                  {plan.price != null ? `$${plan.price}` : 'Free'}
                  {plan.billingCycle && (
                    <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>
                      /{plan.billingCycle}
                    </span>
                  )}
                </p>

                <button
                  className="login-btn"
                  tabIndex={-1}
                  style={{ marginTop: 'auto', pointerEvents: 'none' }}
                >
                  {isSelected ? 'Selected ✓' : 'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
