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
  isAuthentificate: boolean;
  isLoading: boolean;
  error: string | null | undefined;
  isSucces: boolean;
};

const initialState: TInitialStateUser = {
  user: null,
  isAuthentificate: false,
  isLoading: false,
  error: null,
  isSucces: false
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
        state.isAuthentificate = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = (action.payload as string) || action.error.message; //т.к. в экшене rejectWithValue - получим кастомную читаемую ошибку
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthentificate = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthentificate = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthentificate = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthentificate = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthentificate = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthentificate = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log('ошибка');
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = (action.payload as string) || action.error.message;
        state.isSucces = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = null;
        state.isSucces = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthentificate = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthentificate = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(setUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthentificate = true;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = true;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthentificate = true;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthentificate = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthentificate = true;
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthentificate = false;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      });
  }
});

export const { getUserSelector } = userSlice.selectors;
export default userSlice.reducer;
export const { clearError } = userSlice.actions;
