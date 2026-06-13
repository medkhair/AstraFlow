import { useState, useEffect } from 'react';
import { verifyEmail, resendVerificationEmail, isEmailVerified } from '../data/crud';
import { useAuth } from './useAuthentication';

export function useVerification() {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) return;
    isEmailVerified(clientId).then((verified) => {
      if (verified) setIsVerified(true);
    });
  }, []);

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
