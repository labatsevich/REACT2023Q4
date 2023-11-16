import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
import { animeApi } from '../api/animeApi';

const store = configureStore({
  reducer: {
    app: appReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ immutableCheck: true }).concat(
      animeApi.middleware
    );
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
