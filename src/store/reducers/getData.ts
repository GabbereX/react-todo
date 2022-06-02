import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {ITasks} from "../../interfaces/ITasks";

interface IInitialState {
  message: ITasks | string;
  isLoading: boolean;
  status: string;
}

const initialState: IInitialState = {
  message: {},
  isLoading: false,
  status: '',
};

export const fetchAPI = createAsyncThunk('data/fetchAPI', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Gabber'
    );
    return response.data
  } catch (err: any | AxiosError) {
    return thunkAPI.rejectWithValue('Ошибка! Сервер не отвечает, попробуйте позже');
  }
});

const getData = createSlice({
  name: 'getData',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchAPI.fulfilled.type]: (state, action: PayloadAction<IInitialState>) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    [fetchAPI.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = action.payload;
    },
  },
});

export default getData.reducer;
