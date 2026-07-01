import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  getUserSelector,
  loginUser
} from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector(getUserSelector);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
