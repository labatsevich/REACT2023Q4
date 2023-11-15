import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  term: string;
  limit: number;
  currentPage: number;
  viewMode: boolean;
}

const initialState: AppState = {
  term: localStorage.getItem('searchTerm') ?? '',
  limit: 25,
  currentPage: 1,
  viewMode: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTerm: (state, action: PayloadAction<string>) => {
      localStorage.setItem('searchTerm', action.payload);
      state.term = action.payload;
    },
    updateLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { updateTerm, updateLimit, updatePage } = appSlice.actions;

export default appSlice.reducer;
