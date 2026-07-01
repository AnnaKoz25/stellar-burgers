import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, user, isAuthChecked } = useSelector(getUserSelector);
  const location = useLocation();

  if (isLoading || !isAuthChecked) {
    return <Preloader />;
  }

  if (user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  return children;
};
