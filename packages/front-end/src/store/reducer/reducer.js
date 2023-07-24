import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  idCompany: 1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setSignedIn } = authSlice.actions;

export default authSlice.reducer;
