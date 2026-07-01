import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitialState = {
  items: TIngredient[];
  isLoading: boolean;
  errors: string | null | undefined;
};

const initialState: TInitialState = {
  items: [],
  isLoading: false,
  errors: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    return getIngredientsApi();
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelectors: (state) => state,
    bunSelector: createSelector(
      (state: TInitialState) => state.items,
      (items) => items.filter((el) => el.type === 'bun')
    ),
    mainSelector: createSelector(
      (state: TInitialState) => state.items,
      (items) => items.filter((el) => el.type === 'main')
    ),
    sauceSelector: createSelector(
      (state: TInitialState) => state.items,
      (items) => items.filter((el) => el.type === 'sauce')
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      });
  }
});

export const {
  getIngredientsSelectors,
  bunSelector,
  mainSelector,
  sauceSelector
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
