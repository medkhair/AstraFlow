import { isEmailVerified, fetchSubscriptionStatus } from './crud';

export const hasVerifiedEmail = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  return await isEmailVerified(clientId);
};
export const hasSelectedPlan = () => !!localStorage.getItem('selected_plan');

export const hasCompletedCheckout = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  const subscriptionStatus = await fetchSubscriptionStatus(clientId);
  return subscriptionStatus;
}
