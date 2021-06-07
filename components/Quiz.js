import AppLoading from 'expo-app-loading';
import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {selectDeck} from '../redux/decksSlice';
import {answeredQuestion, startQuiz, correctAnswer, resetQuiz} from '../redux/quizSlice';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

export default function Quiz(props) {

    const {route: {params: {deckId}}} = props;
    const deck = useSelector(state => selectDeck(state, deckId));
    const quiz = useSelector(state => state.quiz[deckId]);
    const dispatch = useDispatch();
    const [question, setQuestion] = useState(true);

    useEffect(() => {
        if(!quiz) {
          dispatch(startQuiz({deck: deckId, questions: deck.questions}));
        }
        return () => {
            dispatch(resetQuiz(deckId));
        }
    },[])

    const submit = (correct = false) => {

        dispatch(answeredQuestion(deckId))
        correct && dispatch(correctAnswer(deckId))
        setQuestion(true);

        if(quiz.answered === quiz.initial) {
            clearLocalNotification()
            .then(setLocalNotification)
        }
    }

    if(deck && deck.questions.length < 1) {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 24}}>You cannot play the quiz as there are no cards in this deck yet.</Text>
            </View>
        )
    }

    if(!quiz) {
        return <AppLoading />
    }

    if(quiz.answered === quiz.initial) {
        return (
            <View style={[styles.container, {position: 'relative', top: '30%'}]}>
                <Text style={styles.card}>You scored:</Text>
                <Text style={styles.card}>{Math.round((quiz.correct * 100) / quiz.initial)}%</Text>

                <TouchableOpacity style={[styles.btn, {backgroundColor: '#383838', marginTop: 5}]} onPress={() => dispatch(resetQuiz(deckId))}>
                    <Text style={styles.btnText}>Reset Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18, marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>{`${quiz.answered + 1}/${quiz.initial}`}</Text>
            <View style={{position: 'relative', top: '10%', alignItems: 'center'}}>
                {question ?
                    <Text style={styles.card}>{quiz.questions[0].question}</Text>
                :
                    <Text style={styles.card}>{quiz.questions[0].answer}</Text>
                }
                <TouchableOpacity onPress={() => setQuestion(!question)}>
                    <Text style={{fontSize: 18, marginTop: 5, fontWeight: 'bold', color: '#cc0505'}}>{question ? 'View Answer' : ' View Question'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{position: 'relative', top: '50%'}}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'green'}]} onPress={() => submit(true)}>
                    <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#cc0505'}]} onPress={() => submit()}>
                    <Text style={styles.btnText}>Incorrect</Text>
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        borderRadius: 7,
        marginBottom: 10,
    },

    btnText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center'
    },

    card: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    }
})