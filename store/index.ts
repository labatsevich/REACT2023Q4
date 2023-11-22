import {
    PreloadedState,
    combineReducers,
    configureStore,
  } from '@reduxjs/toolkit';
  import appReducer from './reducers/appSlice';
  import { animeApi } from './services/animeApi';
import { createWrapper } from 'next-redux-wrapper';
  
  const rootReducer = combineReducers({
    app: appReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  });
  
  export const setupStore = () => {
    return configureStore({
      reducer: rootReducer,
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

  export const wrapper = createWrapper<AppStore>(setupStore);