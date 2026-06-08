export const hasVerifiedEmail = () => localStorage.getItem('email_verified') === 'true';
export const hasSelectedPlan = () => !!localStorage.getItem('selected_plan');
export const hasCompletedCheckout = () => localStorage.getItem('checkout_completed') === 'true';
