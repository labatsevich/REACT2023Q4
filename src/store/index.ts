import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
import { animeApi } from '../api/animeApi';

const rootReducer = combineReducers({
  app: appReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({ immutableCheck: true }).concat(
        animeApi.middleware
      );
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
