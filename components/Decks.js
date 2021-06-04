import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { getDecks } from '../utils/api';
import { DECK_STORAGE_KEY, data } from '../utils/helpers';

export default function App(props) {
    const [decks, setDecks] = useState();
  
    useEffect(() => {
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
      getDecks()
      .then((result) => setDecks(JSON.parse(result)));
    },[])
  
    return (
      <ScrollView style={styles.container}>
        {decks && Object.keys(decks).map((key) => {
          const deck = decks[key];
  
          return (
            <TouchableOpacity key={key} onPress={() => props.navigation.navigate('Stacks', {screen: 'Deck', params: {deckId: key}})}>
                <Card containerStyle={{width: '100%', backgroundColor: '#f5f5f5'}}>
                    <Card.Title>{deck.title}</Card.Title>
                    <Card.Divider />
                    <Text style={{textAlign: 'center'}}>Deck has {deck.questions.length} card(s)</Text>
                </Card>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingRight: 30,
    },
});