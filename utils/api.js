import AsyncStorage from '@react-native-async-storage/async-storage';
import {DECK_STORAGE_KEY} from './helpers'


export const getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export const getDeck = (title) => {
    return getDecks()
        .then((results) => {
            const data = JSON.parse(results);
            data[title]
        });
}

export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions: []
            },
        }));
}

export const addCardToDeck = ({title, card}) => {
    return getDeck(title)
        .then((deck) => {
            
        })
}