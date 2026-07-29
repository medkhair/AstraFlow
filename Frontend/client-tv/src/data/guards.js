import { isEmailVerified, fetchSubscriptionStatus } from './crud';

export const hasVerifiedEmail = async () => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return false;
  console.log('Checking email verification for clientId:', clientId);
  const verified = await isEmailVerified(clientId);
  console.log('Email verification status:', verified);
  return verified;
}

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
