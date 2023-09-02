import { createSlice } from '@reduxjs/toolkit';

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
    }
  },
});

export const { setAuthenticated, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
