import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { animeApi } from '../services/animeApi';
import { IAnime } from '@/types';

export interface AppState {
  term: string;
  limit: number;
  currentPage: number;
  isLoading: boolean;
  idDetailsLoading: boolean;
  details: IAnime | null ;
}



export const initialState: AppState = {
  term: '',
  limit: 25,
  currentPage: 1,
  isLoading: false,
  idDetailsLoading: false,
  details: null,
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
  extraReducers(builder) {
    builder.addMatcher(animeApi.endpoints.animeList.matchPending, (state) => {
      state.isLoading = true;
    }),
      builder.addMatcher(
        animeApi.endpoints.animeList.matchFulfilled,
        (state) => {
          state.isLoading = false;
        }
      ),
      builder.addMatcher(
        animeApi.endpoints.getDetails.matchPending,
        (state) => {
          state.idDetailsLoading = true;
        }
      ),
      builder.addMatcher(
        animeApi.endpoints.getDetails.matchFulfilled,
        (state, action) => {
          state.idDetailsLoading = false;
          state.details = action.payload;
        }
      );
  },
});

export const { updateTerm, updateLimit, updatePage } = appSlice.actions;

export default appSlice.reducer;