import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TInitialStateUser = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null | undefined;
  isSuccess: boolean;
  isAuthChecked: boolean;
};

const initialState: TInitialStateUser = {
  user: null,
  isLoading: false,
  error: null,
  isSuccess: false,
  isAuthChecked: false
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi({ email, password });
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user; //т.к. токены нельзя хранить в store
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi({ email, name, password });
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi({ email });
      localStorage.setItem('resetPassword', 'true');
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await resetPasswordApi({ password, token });
      if (response.success) {
        localStorage.removeItem('resetPassword');
      }
      return response;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const getUser = createAsyncThunk('getUser', async () => {
  return await getUserApi();
});

export const setUser = createAsyncThunk(
  'setUserData',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user; //нужны только данные пользователя
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk('logoutUser', async () => {
  const response = await logoutApi();
  if (response.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    }
  },
  selectors: {
    getUserSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = (action.payload as string) || action.error.message; //т.к. в экшене rejectWithValue - получим кастомную читаемую ошибку
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message;
        state.isSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(setUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      });
  }
});

export const { getUserSelector } = userSlice.selectors;
export default userSlice.reducer;
export const { clearError, clearSuccess } = userSlice.actions;
