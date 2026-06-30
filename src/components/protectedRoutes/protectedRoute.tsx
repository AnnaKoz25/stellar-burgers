import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isLoading, user } = useSelector(getUserSelector);
  if (isLoading) {
    return <Preloader />;
  }

  if (!user && getCookie('accessToken')) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }
  return children;
};
