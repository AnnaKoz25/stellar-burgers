import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialStateHistoryOrders = {
  isLoading: boolean;
  error: string | null | undefined;
  orders: TOrder[];
};

const initialState: TInitialStateHistoryOrders = {
  isLoading: false,
  error: null,
  orders: []
};

export const getHistoryOrders = createAsyncThunk(
  'getHistoryOrders',
  async () => await getOrdersApi()
);

export const userHistoryOrdersSlice = createSlice({
  name: 'historyOrders',
  initialState,
  reducers: {},
  selectors: {
    getHistoryOrdersSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHistoryOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getHistoryOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { getHistoryOrdersSelector } = userHistoryOrdersSlice.selectors;
export default userHistoryOrdersSlice.reducer;
