import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  id: null,
  idEtablissement: null,
  mail: null,
  nom: null,
  prenom: null,
  roleId: null,
  tel: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      if (action.type === 'auth/setSignedIn') {
        state.isSignedIn = action.payload;
      }
      state = { ...state, ...action.payload };
    },
  },
});

export const { setSignedIn } = authSlice.actions;

export default authSlice.reducer;
