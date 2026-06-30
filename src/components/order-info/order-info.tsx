import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsSelectors
} from '../../services/slices/ingridientsSlice';
import { getBurgerConstructorState } from '../../services/slices/burgerConstructorSlice';
import { useParams } from 'react-router-dom';
import { getFeedSelectors } from '../../services/slices/orderFeedSlice';
import { getHistoryOrdersSelector } from '../../services/slices/userHistoryOrdersSlice';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const { orderModalData } = useSelector(getBurgerConstructorState);

  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector(getIngredientsSelectors);
  const ingredients = items;

  const feedOrders = useSelector(getFeedSelectors).orders || [];
  const userHistoryOrders = useSelector(getHistoryOrdersSelector).orders || [];

  const { number } = useParams<{ number: string }>();
  const orderNumber = number ? Number(number) : null;

  const allOrders =
    feedOrders
      .concat(userHistoryOrders)
      .find((el) => el.number === orderNumber) || null;

  const [orderForModal, setOrderForModal] = useState<TOrder | null>(null);

  useEffect(() => {
    if (orderNumber && !allOrders && !orderModalData) {
      getOrderByNumberApi(orderNumber)
        .then((res) => setOrderForModal(res.orders[0] || null))
        .catch(() => setOrderForModal(null));
    } else {
      setOrderForModal(null);
    }
  }, [orderNumber, orderModalData, allOrders]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  const orderData = orderModalData || allOrders || orderForModal;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
