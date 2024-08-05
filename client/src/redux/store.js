import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import wordReducer from './wordsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    words: wordReducer
  },
});

export default store;