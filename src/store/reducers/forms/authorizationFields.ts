import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  username: string;
  password: string;
}

const initialState: IInitialState = {
  username: '',
  password: '',
};

const authorizationFields = createSlice({
  name: 'addTaskField',
  initialState,
  reducers: {
    usernameAuthField(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    passwordAuthField(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setClearTaskFields(state) {
      state.username = '';
      state.password = '';
    },
  },
});

export const { usernameAuthField, passwordAuthField, setClearTaskFields } =
  authorizationFields.actions;
export default authorizationFields.reducer;
