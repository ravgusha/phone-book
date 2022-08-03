import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../components/api/apiSlice';
import slice from './slice';

const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
