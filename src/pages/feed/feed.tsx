import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedSelectors
} from '../../services/slices/orderFeedSlice';
import { useDispatch } from '../../services/store';
import {
  getIngredients,
  getIngredientsSelectors
} from '../../services/slices/ingridientsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getFeedSelectors);
  const { items } = useSelector(getIngredientsSelectors);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeed());
    if (!items.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, items.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
