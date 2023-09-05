import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    removeUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
