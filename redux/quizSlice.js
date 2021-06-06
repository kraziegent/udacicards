import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {},
  reducers: {
    startQuiz: (state, action) => ({
        ...state,
        [action.payload.deck]: {
            questions: action.payload.questions,
            answered: 0,
            correct: 0
        }
    }),
    answeredQuestion: (state, action) => {
        state[action.payload].questions.shift();
        state[action.payload].answered += 1;
    },
    correctAnswer: (state, action) => {
        state[action.payload].correct += 1
    },
    addQuestion: (state, action) => {
        state[action.payload.deck].questions.push(action.payload.questions)
    }
  }
})

// Action creators are generated for each case reducer function
export const { startQuiz, answeredQuestion, correctAnswer, addQuestion } = quizSlice.actions;

export default quizSlice.reducer;