import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Platform, TextInput, TouchableOpacity } from 'react-native';
import { saveDeckTitle } from '../utils/api';

export default function AddDeck(props) {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const submit = () => {
        if(text) {
            saveDeckTitle(text);
            props.navigation.navigate('Decks');
            setText('');
        }else{
            setError(true);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 24}}>What is the title of your new deck?</Text>
            </View>

            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 5 }}
                    onChangeText={text => setText(text)}
                    onFocus={() => setError(false)}
                    placeholder='Deck Title'
                    autoCapitalize='words'
                    value={text}
                />
                {error &&
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Title cannot be empty, kindly enter a title to continue</Text>
                }
            </View>

            <View style={{position: 'relative', top: '60%'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={submit}
                >
                    <Text style={styles.btnText}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    btn: {
        backgroundColor: '#383838',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },

    btnText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center'
    },
})