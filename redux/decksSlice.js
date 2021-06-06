import { createSlice } from '@reduxjs/toolkit';
import { addCardToDeck, saveDeckTitle, deleteDeck, getDecks } from '../utils/api';

export const decksSlice = createSlice({
  name: 'decks',
  initialState: null,
  reducers: {
    loadDecks: (state, action) => ({
      ...state,
      ...action.payload
    }),
    saveDeck: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload] = {
        title: action.payload,
        questions: []
      }
    },
    saveCard: (state, action) => {
      state[action.payload.title].questions.push(action.payload.card)
    },
    removeDeck: (state, action) => {
      delete state[action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { loadDecks, saveDeck, saveCard, removeDeck } = decksSlice.actions;

// The functions below are called thunks and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(<action>(<payload>))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadDecksAsync = () => dispatch => {
  getDecks()
  .then((decks) => dispatch(loadDecks(decks)));
}

export const saveDeckAsync = payload => dispatch => {
  saveDeckTitle(payload)
  .then(() => dispatch(saveDeck(payload)));
}

export const saveCardAsync = payload => dispatch => {
  addCardToDeck(payload.title, payload.card)
  .then(() => dispatch(saveCard(payload)));
}

export const removeDeckAsync = payload => dispatch => {
  deleteDeck(payload)
  .then(() => dispatch(removeDeck(payload)));
}

// The functions below are called selectors and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDeck = (state, payload) => state.decks[payload];

export default decksSlice.reducer;