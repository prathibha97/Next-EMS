import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { clearCurrentEmployee } from './employeeSlice';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setLogout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('persist:root')
    },
  },
  extraReducers(builder) {
    builder.addCase(setLogout, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      const dispatch = useAppDispatch();
      dispatch(clearCurrentEmployee());
    });
  },
});

export const { setAuthenticated, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
