import { createSlice } from '@reduxjs/toolkit';
import { timeToString } from '../utils/helpers';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {},
  reducers: {
    startQuiz: (state, action) => ({
        ...state,
        [action.payload.deck]: {
            questions: action.payload.questions,
            initial: action.payload.questions.length,
            answered: 0,
            correct: 0,
            // started: timeToString(),
        }
    }),
    answeredQuestion: (state, action) => {
        state[action.payload].questions.shift();
        state[action.payload].answered += 1;
    },
    correctAnswer: (state, action) => {
        state[action.payload].correct += 1
    },
    resetQuiz: (state, action) => {
        delete state[action.payload]
    }
  }
})

// Action creators are generated for each case reducer function
export const { startQuiz, answeredQuestion, correctAnswer, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;