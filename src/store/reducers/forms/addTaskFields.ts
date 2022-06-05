import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  username: string;
  email: string;
  text: string;
}

const initialState: IInitialState = {
  username: '',
  email: '',
  text: '',
};

const addTaskFields = createSlice({
  name: 'addTaskField',
  initialState,
  reducers: {
    usernameField(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    emailField(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    textField(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    setClearTaskFields(state) {
      state.username = '';
      state.email = '';
      state.text = '';
    },
  },
});

export const { usernameField, emailField, textField, setClearTaskFields } =
  addTaskFields.actions;
export default addTaskFields.reducer;
