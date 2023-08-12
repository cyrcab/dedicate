import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state = initialState, action) => {
      state.isSignedIn = action.payload;
    },
    setUserId: (state = initialState, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setSignedIn, setUserId } = authSlice.actions;

export default authSlice.reducer;
