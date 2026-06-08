import { Navigate } from 'react-router-dom';
import { hasVerifiedEmail, hasSelectedPlan, hasCompletedCheckout } from '../data/guards';

export function WaitForAccessRoute({ children }) {
  if (!hasVerifiedEmail()) {
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
