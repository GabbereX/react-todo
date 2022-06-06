import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ILogin, ILoginValues } from '../../../interfaces/ILogin';

const initialState: ILogin = {
  message: {},
  isLoading: false,
  status: '',
};

export const getTokenAPI = createAsyncThunk(
  'getTokenAPI',
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

const getToken = createSlice({
  name: 'getToken',
  initialState,
  reducers: {
    setStatusGetToken(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.message.token = action.payload
    }
  },
  extraReducers: {
    [getTokenAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [getTokenAPI.fulfilled.type]: (state, action: PayloadAction<ILogin>) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    [getTokenAPI.rejected.type]: (state, action: PayloadAction<ILoginValues>) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = action.payload;
    },
  },
});

export const { setStatusGetToken, setToken } = getToken.actions;
export default getToken.reducer;
