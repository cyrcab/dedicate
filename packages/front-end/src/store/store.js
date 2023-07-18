import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/reducer';

export default configureStore({
  reducer: { rootReducer },
});
