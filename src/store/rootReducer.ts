import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import apiReducer from './slices/apiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
