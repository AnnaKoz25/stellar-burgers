import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

type TInitialState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
};

export const initialState: TInitialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'postOrderBurger',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { bun, ingredients } = state.burgerConstructor;
    if (!bun) {
      // без булки бургер не существует
      return rejectWithValue('Выберите булку для бургера');
    }
    const allId = ingredients.map((el) => el._id);
    allId.push(bun._id);
    allId.unshift(bun._id);
    try {
      const response = await orderBurgerApi(allId);
      const orderWithIngredients = { ...response.order, ingredients: allId }; //из-за несоответствия типов, в extraReducer нужно поле ingredients в заказе
      const responseWithIngredients = {
        ...response,
        order: orderWithIngredients
      };
      return responseWithIngredients;
    } catch (err) {
      return rejectWithValue((err as Error).message); //будем передавать в extraReducer, чтобы была возможность отобразить читаемую ошибку
    }
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const moveElem: TConstructorIngredient[] = state.ingredients.splice(
        from,
        1
      ); //массив с одним элементом
      state.ingredients.splice(to, 0, moveElem[0]);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newConstructor = state.ingredients.filter((el) => el.id !== id);
      state.ingredients = newConstructor;
    },
    clearAllConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.error = null;
      state.orderModalData = null;
      state.orderRequest = false;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },

    chooseBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (bun: TIngredient) => ({
        payload: { ...bun, id: crypto.randomUUID() }
      })
    },

    closeModalOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getBurgerConstructorState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message;
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.bun = null;
        state.ingredients = [];
      });
  }
});

export const { getBurgerConstructorState } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
export const {
  closeModalOrder,
  chooseBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearAllConstructor
} = burgerConstructorSlice.actions;
