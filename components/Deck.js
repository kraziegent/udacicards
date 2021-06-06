import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {getDeck, removeDeck} from '../utils/api'

export default function Deck(props) {

    const [deck, setDeck] = useState();
    const {route: {params: {deckId}}, navigation} = props;

    const deleteDeck = () => {
        removeDeck(deckId);
        navigation.goBack();
    }

    useEffect(() => {
        getDeck(deckId)
        .then((result) => setDeck(result));
    },[])

    if(!deck) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <View style={{position: 'relative', top: '8%'}}>
                <Text style={{fontSize: 24}}>{deck.title}</Text>
                <Text>{deck.questions.length} Card(s)</Text>
            </View>
            <View style={{position: 'relative', top: '40%'}}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Stacks', {screen: 'Add Card', params: {deckId: deckId}})}>
                    <Text style={[styles.btnText, {color: '#383838'}]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#383838'}]} onPress={() => navigation.navigate('Stacks', {screen: 'Quiz', params: {deckId: deckId}})}>
                    <Text style={styles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteDeck}>
                    <Text style={[styles.btnText, {color: '#9b082f'}]}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    btn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 7,
        borderColor: '#383838',
        borderWidth: 2,
        marginBottom: 10,
    },

    btnText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center'
    },
})