import { User } from '@prisma/client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: null as User | null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      // @ts-ignore
      state.users.push(action.payload);
    },
  },
});

export const { setUsers, setUser, addUser } = usersSlice.actions;

export default usersSlice.reducer;
