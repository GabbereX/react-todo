import { ITask } from '../../interfaces/ITasks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IPostDataAnswer } from '../../interfaces/IPostDataAnswer';

const initialState: IPostDataAnswer = {
  message: {},
  isLoading: false,
  status: '',
};

export const postAPI = createAsyncThunk(
  'data/postAPI',
  async (task: ITask, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Gabber',
        task,
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

const postData = createSlice({
  name: 'postData',
  initialState,
  reducers: {
    setStatusPostData(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [postAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [postAPI.fulfilled.type]: (
      state,
      action: PayloadAction<IPostDataAnswer>
    ) => {
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

export const { setStatusPostData } = postData.actions;
export default postData.reducer;
