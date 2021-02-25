import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WriteScreen from './screens/WriteStoryScreen'
import ReadScreen from './screens/ReadStoryScreen'

export default function App() {
  return (
    <AppContainer/>
  );
}

const tabNavigator = createBottomTabNavigator({
  A : {screen : WriteScreen},
  B : {screen : ReadScreen}
})

const AppContainer = createAppContainer(tabNavigator);

const styles = StyleSheet.create({
  
});
