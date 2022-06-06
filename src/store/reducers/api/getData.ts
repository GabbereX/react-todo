import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ITasks } from '../../../interfaces/ITasks';
import { IParams } from '../../../interfaces/IParams';

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

export const fetchAPI = createAsyncThunk(
  'data/fetchAPI',
  async ({ page, sortField, sortDirection }: IParams, { rejectWithValue }) => {
    const link =
      'https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Gabber';
    const pageParam = page !== 1 ? `&page=${page}` : '';
    const sortFieldParam = `&sort_field=${sortField}`;
    const sortDirectionParam = `&sort_direction=${
      sortDirection ? 'desc' : 'asc'
    }`;

    try {
      const response = await axios.get(
        link + pageParam + sortFieldParam + sortDirectionParam
      );
      return response.data;
    } catch (err: any | AxiosError) {
      return rejectWithValue('Ошибка! Сервер не отвечает, попробуйте позже');
    }
  }
);

const getData = createSlice({
  name: 'getData',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchAPI.fulfilled.type]: (
      state,
      action: PayloadAction<IInitialState>
    ) => {
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
