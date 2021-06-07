import { StatusBar } from 'expo-status-bar';
import React, { createRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Deck from './components/Deck';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import Quiz from './components/Quiz';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setLocalNotification } from './utils/helpers';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const navigationRef = createRef();

function Stacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#f5f5f5',
        headerStyle: {
          backgroundColor: '#4e4cb8',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center'
        },
      }}
    >
      <Stack.Screen name='Deck' component={Deck} options={(props) => ({
        title: props.route.params.deckId,
        headerBackTitle: 'Decks',
        headerLeft: (props) => (<HeaderBackButton {...props} onPress={() => navigationRef.current?.navigate('Decks')} />)
      })} />
      <Stack.Screen name='Add Card' component={AddCard} />
      <Stack.Screen name='Quiz' component={Quiz} />
    </Stack.Navigator>
  )
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {

          if (route.name === 'Decks') {
            return <Ionicons name='home' size={30} color={color} />;
          } else if (route.name === 'Add Deck') {
            return <FontAwesome name='plus-square' size={30} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4e4cb8',
        tabStyle: {
          backgroundColor: '#f5f5f5',
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: {
            width:0,
            height: 1
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        }
      }}
    >
      <Tab.Screen name="Decks" component={Decks} options={{title: 'Decks'}} />
      <Tab.Screen name="Add Deck" component={AddDeck} options={{title: 'Add Deck'}} />
    </Tab.Navigator>
  )
}

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#f5f5f5',
        headerStyle: {
          backgroundColor: '#4e4cb8',
        }
      }}
    >
      <Stack.Screen name='Tabs' component={Tabs} options={{title: ''}} />
      <Stack.Screen name='Stacks' component={Stacks} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default function App() {
  
  useEffect(() => {
    setLocalNotification();
  },[])

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer ref={navigationRef}>
            <MainNavigator />
          </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
