import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, user } = useSelector(getUserSelector);
  if (isLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
