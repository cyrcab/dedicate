import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer'; 

const rootReducer = combineReducers({
  user: userReducer,
  // Ajoutez d'autres réducteurs si nécessaire
});

export default rootReducer;
