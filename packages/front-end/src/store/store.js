import { configureStore } from '@reduxjs/toolkit';
import auth from './reducer/reducer';
import notification from './reducer/notification';
import user from './reducer/user.reducer';
import settingStyle from './reducer/style.reducer';

export default configureStore({
  reducer: { auth, notification, user, settingStyle },
});
