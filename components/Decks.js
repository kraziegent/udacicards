import React, { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { getDecks } from '../utils/api';

export default function Decks(props) {
    const [decks, setDecks] = useState();
  
    useEffect(() => {
      getDecks()
      .then((decks) => setDecks(decks));
    },[])
  
    console.log(decks)
    return (
      <ScrollView style={{paddingRight: 30}}>
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