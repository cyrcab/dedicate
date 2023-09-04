import { configureStore } from '@reduxjs/toolkit';
import auth from './reducer/reducer';
import notification from './reducer/notification';

export default configureStore({
  reducer: { auth, notification },
});
