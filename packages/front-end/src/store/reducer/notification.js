import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDisplay: false,
  message: '',
  severity: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setDisplayNotification: (state, action) => {
      state = { isDisplay: true, message: action.payload.message };
      switch (action.payload.severity) {
        case 'SUCCESS':
          state = { ...state, severity: 'success' };
          return state;
        case 'ERROR':
          state = { ...state, severity: 'error' };
          return state;
        case 'WARNING':
          state = { ...state, severity: 'warning' };
          return state;
        case 'INFO':
          state = { ...state, severity: 'info' };
          return state;
        default:
          state = { isDisplay: false, message: '', severity: '' };
          return state;
      }
    },
  },
});

export const { setDisplayNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
