import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '@/hooks/useAuthentication';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
