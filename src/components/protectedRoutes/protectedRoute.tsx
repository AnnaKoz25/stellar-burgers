import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const { isLoading, user, isAuthChecked } = useSelector(getUserSelector);
  if (isLoading || !isAuthChecked) {
    return <Preloader />;
  }
  if (!user && isAuthChecked) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
