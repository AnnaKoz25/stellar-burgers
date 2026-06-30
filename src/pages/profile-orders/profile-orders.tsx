import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  getHistoryOrders,
  getHistoryOrdersSelector
} from '../../services/slices/userHistoryOrdersSlice';
import {
  getIngredients,
  getIngredientsSelectors
} from '../../services/slices/ingridientsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getHistoryOrdersSelector);
  const { items } = useSelector(getIngredientsSelectors);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryOrders());
    if (!items.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, items.length]);

  return <ProfileOrdersUI orders={orders} />;
};
