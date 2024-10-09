import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { api } from '../services/api';
import { demoApi } from '../services/demoService';
import { publicApi } from '../services/publicService';
import { rootApi } from '../services/rootService';
import root from './rootSlice';
import user from './userSlice';

const rootReducer = combineReducers({
  root,
  user,
  [publicApi.reducerPath]: publicApi.reducer,
  [rootApi.reducerPath]: rootApi.reducer,
  [demoApi.reducerPath]: demoApi.reducer,
});

export const initializeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};
