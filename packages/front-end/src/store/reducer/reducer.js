import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state = { user: { ...action.payload }, isSignedIn: true };
      return state;
    },
    setSignedOut: (state) => {
      state = initialState;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return state;
    },
  },
});

export const { setSignedIn, setSignedOut } = authSlice.actions;

export default authSlice.reducer;
