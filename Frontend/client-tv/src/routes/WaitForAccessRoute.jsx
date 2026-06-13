import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { hasVerifiedEmail, hasSelectedPlan, hasCompletedCheckout } from '../data/guards';

export function WaitForAccessRoute({ children }) {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    hasVerifiedEmail().then(setVerified);
  }, []);

  if (verified === null) return null;

  if (!verified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (!hasSelectedPlan()) {
    return <Navigate to="/choose-plan" replace />;
  }
  if (!hasCompletedCheckout()) {
    return <Navigate to="/checkout" replace />;
  }
  return children;
}
