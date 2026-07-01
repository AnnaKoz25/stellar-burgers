import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {
  closeModalOrder,
  getBurgerConstructorState,
  orderBurger
} from '../../services/slices/burgerConstructorSlice';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients, orderRequest, orderModalData } = useSelector(
    getBurgerConstructorState
  );
  const { user } = useSelector(getUserSelector);
  const navigate = useNavigate();
  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const dispatch: AppDispatch = useDispatch();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user || !getCookie('accessToken')) {
      navigate('/login');
      return;
    }
    dispatch(orderBurger());
  };
  const closeOrderModal = () => {
    dispatch(closeModalOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
