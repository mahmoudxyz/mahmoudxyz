import { Navigate, useLocation } from 'react-router-dom';
import { decryptAndVerifyToken } from '../../utils/encryption';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Get token from sessionStorage
  const token = sessionStorage.getItem('authToken');
  
  // Verify token
  const isAuthenticated = token ? decryptAndVerifyToken(token) : false;
  
  // If token is invalid or expired, remove it
  if (!isAuthenticated && token) {
    sessionStorage.removeItem('authToken');
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
