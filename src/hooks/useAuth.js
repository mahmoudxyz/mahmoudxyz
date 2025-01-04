import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptAndVerifyToken } from '../utils/encryption';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('authToken');
      if (token && !decryptAndVerifyToken(token)) {
        // If token is invalid or expired, remove it and redirect to login
        sessionStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    // Check auth status every minute
    const interval = setInterval(checkAuth, 60000);
    
    // Check immediately on mount
    checkAuth();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [navigate]);
};
