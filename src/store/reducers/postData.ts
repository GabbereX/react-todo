import { ITask } from '../../interfaces/ITasks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface IInitialState {
  message: ITask | string;
  isLoading: boolean;
  status: string;
}

const initialState: IInitialState = {
  message: {},
  isLoading: false,
  status: '',
};

export const postAPI = createAsyncThunk(
  'data/postAPI',
  async (task: ITask, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(
          'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Gabber',
          task,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

      return response.data
    } catch (err: any | AxiosError) {
      return rejectWithValue('Ошибка! Сервер не отвечает, попробуйте позже');
    }
  }
);

const postData = createSlice({
  name: 'postData',
  initialState,
  reducers: {},
  extraReducers: {
    [postAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [postAPI.fulfilled.type]: (state, action: PayloadAction<IInitialState>) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    [postAPI.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = action.payload;
    },
  },
});

export default postData.reducer;
