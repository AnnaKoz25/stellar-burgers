import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  clearSuccess,
  forgotPassword,
  getUserSelector
} from '../../services/slices/userSlice';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { error, isLoading, isSuccess } = useSelector(getUserSelector);

  //все апи вызываются в сторе, все данные находятся там же, поэтому поменяли стартовую реализацию
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError()); //обнулим error, как в начальном коде было
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (
      isSuccess &&
      !isLoading &&
      !error &&
      localStorage.getItem('resetPassword') === 'true'
    ) {
      //взяли из исходного кода
      navigate('/reset-password');
      dispatch(clearSuccess());
    }
  }, [isLoading, error, navigate, isSuccess]);

  return (
    <ForgotPasswordUI
      errorText={error || undefined}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
