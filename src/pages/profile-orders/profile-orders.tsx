import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  getHistoryOrders,
  getHistoryOrdersSelector
} from '../../services/slices/userHistoryOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getHistoryOrdersSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
