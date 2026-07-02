import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialFeedState = {
  orders: TOrder[];
  countAllorders: number;
  countTodayOrders: number;
  isLoadingFeed: boolean;
  error: string | null | undefined;
};

const initialState: TInitialFeedState = {
  orders: [],
  countAllorders: 0,
  countTodayOrders: 0,
  isLoadingFeed: false,
  error: null
};

export const getFeed = createAsyncThunk('orderFeed', async () => getFeedsApi());

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelectors: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoadingFeed = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoadingFeed = false;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoadingFeed = false;
        state.orders = action.payload.orders;
        state.countAllorders = action.payload.total;
        state.countTodayOrders = action.payload.totalToday;
      });
  }
});

export const { getFeedSelectors } = orderFeedSlice.selectors;
export default orderFeedSlice.reducer;
