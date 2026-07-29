import { isEmailVerified, fetchSubscriptionStatus } from './crud';

export const hasVerifiedEmail = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  return await isEmailVerified(clientId);
};
export const hasSelectedPlan = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  const subscriptionStatus = await fetchSubscriptionStatus(clientId);
  return subscriptionStatus;
}

export const hasCompletedCheckout = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  const subscriptionStatus = await fetchSubscriptionStatus(clientId);
  return subscriptionStatus;
}
