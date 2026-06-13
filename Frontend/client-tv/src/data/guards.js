import { isEmailVerified } from './crud';

export const hasVerifiedEmail = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  return await isEmailVerified(clientId);
};
export const hasSelectedPlan = () => !!localStorage.getItem('selected_plan');
export const hasCompletedCheckout = () => localStorage.getItem('checkout_completed') === 'true';
