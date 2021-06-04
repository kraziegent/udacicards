import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {FontAwesome, Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#f5f5f5',
        headerStyle: {
          backgroundColor: '#4e4cb8',
        }
      }}
    >
      <Stack.Screen name='Deck' component={Deck} options={({route}) => ({title: route.params.deckId})} />
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
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
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
