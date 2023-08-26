import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import employeeReducer from './features/employeeSlice';
import { employeeApi } from './services/employeeApi';

export const store = configureStore({
  reducer: {
    employeeReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([employeeApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
