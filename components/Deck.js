import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

export default function Deck(props) {
    return (
        <View>
            <Text>This is the deck {props.route.params.deckId}</Text>
        </View>
    )
}