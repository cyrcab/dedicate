import { configureStore } from '@reduxjs/toolkit';
import auth from './reducer/reducer';

export default configureStore({
  reducer: { auth },
});
