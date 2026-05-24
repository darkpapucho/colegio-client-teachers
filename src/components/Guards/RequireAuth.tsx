import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../config/zustand/user';

export default function RequireAuth() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
