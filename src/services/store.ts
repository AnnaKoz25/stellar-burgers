import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientReducer from './slices/ingridientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/orderFeedSlice';
import userReduser from './slices/userSlice';
import userHistoryOrderReducer from './slices/userHistoryOrdersSlice';
import burgerByIdReducer from './slices/burgerByIdSlice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  orderFeed: feedReducer,
  userData: userReduser,
  historyOrders: userHistoryOrderReducer,
  burgerById: burgerByIdReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
