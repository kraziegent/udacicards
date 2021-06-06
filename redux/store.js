import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';

export default configureStore({
  reducer: {
      decks: decksReducer
  }
})