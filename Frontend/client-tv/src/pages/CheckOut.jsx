import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '../data/crud';
import { hasCompletedCheckout } from '../data/guards';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
/*
const ifHasCompletedCheckout = async () => {
  const completed = await hasCompletedCheckout();
  console.log("Checkout completed status:", completed);
  if (completed) {
    console.log("Checkout already completed, redirecting to /.");
    return <Navigate to="/" replace />;
  }
}

ifHasCompletedCheckout().then((redirect) => {
  if (redirect) {
    // This is a placeholder for handling the redirect in a real application.
    console.log("Redirecting to / because checkout is already completed.");
  }
}
)
*/




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

function PaymentForm({ selectedPlan, navigate }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
    } else {
      localStorage.setItem('checkout_completed', 'true');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000); // Delay to allow Stripe to process the payment
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PaymentElement />
      {error && <p className="login-error" style={{ margin: 0 }}>{error}</p>}
      <button className="login-btn" type="submit" disabled={!stripe || loading} style={{ width: '100%' }}>
        {loading ? <span className="login-spinner" /> : `Pay $${selectedPlan.price}`}
      </button>
    </form>
  );
}

export function CheckOut() {
  const selectedPlan = getSelectedPlan();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [intentError, setIntentError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function check() {
      setCompleted(await hasCompletedCheckout());
    }

    check();
  }, []);

  if (completed) {
    navigate('/', { replace: true });
  }

  // Handle redirect return from Stripe (for redirect-based payment methods)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectStatus = params.get('redirect_status');
    if (redirectStatus === 'succeeded') {
      localStorage.setItem('checkout_completed', 'true');
      navigate('/', { replace: true });
    } else if (redirectStatus) {
      setIntentError('Payment was not completed. Please try again.');
    }
  }, [navigate]);

  useEffect(() => {
    if (!selectedPlan) return;
    const planId = selectedPlan.id;
    const clientId = localStorage.getItem('clientId');
    createCheckoutSession({ planId, clientId })
      .then((data) => {
        console.log('[CheckOut] payment intent response:', data);
        const secret = data.clientSecret ?? data.client_secret;
        if (!secret) {
          setIntentError('No client secret returned from server.');
        } else {
          setClientSecret(secret);
        }
      })
      .catch((err) => {
        console.error('[CheckOut] createCheckoutSession error:', err?.response ?? err);
        setIntentError('Failed to initialize payment. Please try again.');
      });
  }, []);

  if (!selectedPlan) {
    return <Navigate to="/choose-plan" replace />;
  }

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

        {intentError && (
          <p className="login-error" style={{ marginBottom: 16 }}>{intentError}</p>
        )}

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
            <PaymentForm selectedPlan={selectedPlan} navigate={navigate} />
          </Elements>
        ) : !intentError ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <span className="login-spinner" />
          </div>
        ) : null}

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
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
