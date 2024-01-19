import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import authReducer from './features/authSlice';
import departmentReducer from './features/departmentSlice';
import employeeReducer from './features/employeeSlice';
import attendanceReducer from './features/attendanceSlice';
import usersReducer from './features/usersSlice';
import payrollReducer from './features/payrollSlice';
import otpReducer from './features/otpSlice';
import { apiSlice } from './services/api';
import storage from './customStorage';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  users: usersReducer,
  employee: employeeReducer,
  department: departmentReducer,
  attendance: attendanceReducer,
  payroll: payrollReducer,
  otp: otpReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      apiSlice.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
