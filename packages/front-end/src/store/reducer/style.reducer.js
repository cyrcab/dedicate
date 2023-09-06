import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  main: '#C45BAA',
  secondary: '#F8F8F8',
  mode: 'light',
};

const settingStyleSlice = createSlice({
  name: 'settingStyle',
  initialState,
  reducers: {
    setStyle: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setDarkMode: (state) => {
      state.mode = 'dark';
      localStorage.setItem('mode', state.mode);
      return state;
    },
    setLightMode: (state) => {
      state.mode = 'light';
      localStorage.setItem('mode', state.mode);
      return state;
    },
    removeStyle: (state) => {
      state = initialState;
      localStorage.removeItem('style');
      return state;
    },
  },
});

export const { setStyle, removeStyle, setDarkMode, setLightMode } =
  settingStyleSlice.actions;

export default settingStyleSlice.reducer;
