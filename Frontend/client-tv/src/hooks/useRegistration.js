import { useState } from 'react';
import { register } from '../data/crud';
import { signUpErros } from '../data/errors';

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerUser = async ({ fullName, username, email, password, phone, tenantId }) => {
    setLoading(true);
    setError('');
    try {
      const data = await register(fullName, username, email, password, phone, tenantId);
      return data;
    } catch (err) {
      const raw = err?.response?.data;
      console.error('Registration error:', raw);
      if (raw) {
        const errorObj = signUpErros.find((err) => err.id === raw);
        if (errorObj) {
          setError(errorObj.message);
          console.log('Error state set to:', error);
        } else {
          setError("An unknown error occurred. Please try again.");
        }
      } else {
        setError("An unknown error occurred. Please try again.");
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, setError };
}
