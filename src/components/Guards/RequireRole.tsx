import useAuth from '../../config/zustand/user';
import { Navigate, Outlet } from 'react-router-dom';

export type AllowedRoles = 'profesor' | 'psicologo';

export interface RequireRoleProps {
  allowedRoles: AllowedRoles[];
  fallback: string;
}
export default function RequireRole({ allowedRoles, fallback = 'unauthorized' }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
