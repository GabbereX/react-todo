import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ILogin, ILoginValues } from '../../interfaces/ILogin';

const initialState: ILogin = {
  message: {},
  isLoading: false,
  status: '',
};

export const loginAPI = createAsyncThunk(
  'loginAPI',
  async (loginValues: ILoginValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Gabber',
        loginValues,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (err: any | AxiosError) {
      return rejectWithValue('Ошибка! Сервер не отвечает, попробуйте позже');
    }
  }
);

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setStatusLogin(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [loginAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [loginAPI.fulfilled.type]: (state, action: PayloadAction<ILogin>) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    [loginAPI.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = action.payload;
    },
  },
});

export const { setStatusLogin } = login.actions;
export default login.reducer;
