import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
