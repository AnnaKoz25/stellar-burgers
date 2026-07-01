import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialStateBurgerById = {
  isLoading: boolean;
  error: string | null | undefined;
  orderById: TOrder | null;
};

const initialState: TInitialStateBurgerById = {
  isLoading: false,
  error: null,
  orderById: null
};

export const getOrderBurgerById = createAsyncThunk(
  'orderBurgerById',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      if (!response.success || !response.orders.length) {
        return rejectWithValue('Ошибка, заказ не найден');
      }
      return response.orders[0];
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const burgerByIdSlice = createSlice({
  name: 'burgerById',
  initialState,
  reducers: {},
  selectors: {
    getOrderBurgerByIdSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurgerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderBurgerById.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Ошибка, заказ не найден';
        state.isLoading = false;
      })
      .addCase(getOrderBurgerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderById = action.payload;
      });
  }
});

export const { getOrderBurgerByIdSelector } = burgerByIdSlice.selectors;
export default burgerByIdSlice.reducer;
