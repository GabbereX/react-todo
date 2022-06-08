import { IPostDataAnswer } from '../../../interfaces/IPostDataAnswer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../../interfaces/ITasks';
import axios, { AxiosError } from 'axios';

interface IAttributes {
  task: ITask;
  id: number;
  token: string;
}

interface IInitialState {
  message: string | { token: string };
  isLoading: boolean;
  status: string;
}

const initialState: IPostDataAnswer = {
  message: '',
  isLoading: false,
  status: '',
};

export const editAPI = createAsyncThunk(
  'data/editAPI',
  async ({ task, id, token }: IAttributes, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=AlexGabber`,
        {
          token,
          text: task.text,
          status: task.status,
        },
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

const editData = createSlice({
  name: 'editData',
  initialState,
  reducers: {
    setStatusEditData(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setMessageEditData(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
  extraReducers: {
    [editAPI.pending.type]: state => {
      state.isLoading = true;
    },
    [editAPI.fulfilled.type]: (state, action: PayloadAction<IInitialState>) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message =
        typeof action.payload.message === 'object'
          ? action.payload.message.token
          : action.payload.message;
    },
    [editAPI.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = action.payload;
    },
  },
});

export const { setStatusEditData, setMessageEditData } = editData.actions;
export default editData.reducer;
