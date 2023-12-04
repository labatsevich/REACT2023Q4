import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountType } from '../../types';
import { items } from '../../data/index';

export interface AppState {
  items: AccountType[];
  countries: string[];
}

export const initialState: AppState = {
  items: [] as AccountType[],
  countries: [...items],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    insertAccount: (state, action: PayloadAction<AccountType>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { insertAccount } = appSlice.actions;

export default appSlice.reducer;
