import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import notificationSlice from './notificationSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: { notificationSlice, userSlice, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
