import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';
import quizReducer from './quizSlice';

export default configureStore({
  reducer: {
      decks: decksReducer,
      quiz: quizReducer,
  }
})