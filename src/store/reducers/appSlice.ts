import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnime } from '../../types';
import { animeApi } from '../../api/animeApi';

export interface AppState {
  term: string;
  limit: number;
  currentPage: number;
  items: Array<IAnime>;
  isLoading: boolean;
  idDetailsLoading: boolean;
}

const search = new URLSearchParams(window.location.search);
const _limit = search.has('limit') ? search.get('limit') : null;
const _currentPage = search.has('page') ? search.get('page') : null;

const initialState: AppState = {
  term: localStorage.getItem('searchTerm') ?? '',
  limit: _limit ? +_limit : 25,
  currentPage: _currentPage ? +_currentPage : 1,
  items: [],
  isLoading: false,
  idDetailsLoading: false,
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
    setItems: (state, action: PayloadAction<Array<IAnime>>) => {
      state.items = action.payload;
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
        (state) => {
          state.idDetailsLoading = false;
        }
      );
  },
});

export const { updateTerm, updateLimit, updatePage, setItems } =
  appSlice.actions;

export default appSlice.reducer;
