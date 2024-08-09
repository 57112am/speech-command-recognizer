import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import wordReducer from './wordsSlice';

/**
 * Configures and creates the Redux store.
 * 
 * The store includes two slices of state:
 * - `auth`: Handles authentication state.
 * - `words`: Manages word-related state.
 * 
 * @constant {Object} store - The configured Redux store.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    words: wordReducer
  },
});

export default store;