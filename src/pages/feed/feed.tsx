import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedSelectors
} from '../../services/slices/orderFeedSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getFeedSelectors);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

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
