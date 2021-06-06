import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { addCardToDeck } from '../utils/api';

export default function AddCard(props) {

    const {route: {params: {deckId}}, navigation} = props;
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState({question: false, answer: false});

    const submit = () => {

        if(!question) {
            setError({question: true});
        }else if(!answer) {
            setError({answer: true});
        }else {
            addCardToDeck(deckId, {question, answer}); //TODO:: switch to redux
            setQuestion('');
            setAnswer('');
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setQuestion(text)}
                    onFocus={() => setError({question: false})}
                    placeholder='Question'
                    value={question}
                />
                {(error && error.question) && 
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Question is required, kindly enter a question to continue</Text>
                }

                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setAnswer(text)}
                    onFocus={() => setError({answer: false})}
                    placeholder='Answer'
                    value={answer}
                />
                {(error && error.answer) &&
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Answer is required, kindly enter the answer to continue</Text>
                }

            </View>

            <View style={{position: 'relative', top: '60%'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={submit}
                >
                    <Text style={styles.btnText}>Submit</Text>
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

    textInput: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        padding: 5, 
        marginBottom: 10
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