import AsyncStorage from '@react-native-async-storage/async-storage';
import {DECK_STORAGE_KEY} from './helpers'


export const getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data) => JSON.parse(data));
}

export const getDeck = (title) => {
    return getDecks()
        .then((data) => data[title]);
}

export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions: [],
            },
        }));
}

export const removeDeck = (title) => {
    return getDecks()
        .then((data) => {
            delete data[title];
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        });
}

export const addCardToDeck = (title, card) => {
    let decks;
    getDecks().then((data) => decks = data);

    return getDeck(title)
        .then((deck) => {
            deck.questions.push(card);
            decks[title] = deck;
            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks));
        });
}