import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IParams } from '../../interfaces/IParams';

const initialState: IParams = {
  page: 1,
  sortField: 'id',
  sortDirection: true,
};

const params = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSortField(state, action: PayloadAction<string>) {
      state.sortField = action.payload;
      state.page = 1;
    },
    setSortDirection(state, action: PayloadAction<boolean>) {
      state.sortDirection = action.payload;
      state.page = 1;
    },
  },
});

export const { setPage, setSortField, setSortDirection } = params.actions;
export default params.reducer;
