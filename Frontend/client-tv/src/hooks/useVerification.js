import { useState } from 'react';
import { verifyEmail, resendVerificationEmail } from '../data/crud';
import { useAuth } from './useAuthentication';

export function useVerification() {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem('email_verified') === 'true'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyOtp = async (code) => {
    setLoading(true);
    setError(null);
    try {
      await verifyEmail(code);
      localStorage.setItem('email_verified', 'true');
      setIsVerified(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await resendVerificationEmail(user?.email);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, resendOtp, isVerified, loading, error };
}
