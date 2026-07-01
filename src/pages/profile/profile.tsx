import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { getUserSelector, setUser } from '../../services/slices/userSlice';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const { user } = useSelector(getUserSelector);
  const dispatch: AppDispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      // если изменилось хоть одно поле - надо знать, какое именно
      const changeData: Partial<TRegisterData> = {};
      if (formValue.name !== user?.name) {
        changeData.name = formValue.name;
      }
      if (formValue.email !== user?.email) {
        changeData.email = formValue.email;
      }
      if (formValue.password) {
        changeData.password = formValue.password;
      }
      dispatch(setUser(changeData));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '', //т.к. user может быть null
      email: user?.email ?? '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
