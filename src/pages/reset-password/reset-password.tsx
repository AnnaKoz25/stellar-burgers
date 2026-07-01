import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  getUserSelector,
  resetPassword
} from '../../services/slices/userSlice';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const { error, isLoading, isSuccess } = useSelector(getUserSelector);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    //поменяли исходную реализацию, все приходит из стора
    e.preventDefault();
    dispatch(clearError());

    dispatch(resetPassword({ password, token }));
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !error) {
      navigate('/login', { replace: true });
    }
  }, [navigate, error, isLoading, isSuccess]);

  useEffect(() => {
    if (!isSuccess && !localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate, isSuccess]);

  return (
    <ResetPasswordUI
      errorText={error || undefined}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
