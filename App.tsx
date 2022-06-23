import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, Button, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home';
import ProgressBar from './components/ProgressBar';
import Items from './pages/Items';
import AppBar from './components/AppBar';

export type TStackParamList = {
  Home: undefined;
  Items: undefined;
};

const Stack = createNativeStackNavigator<TStackParamList>();

const App = () => {
  return (
    <>
      <ProgressBar />
      <View style={styles.container}>
        <Text>{Math.random()}</Text>
        <View style={styles.subContainer}>
          <NavigationContainer>
            <AppBar />
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{header: () => null, animation: 'slide_from_left'}}
              />
              <Stack.Screen
                name="Items"
                component={Items}
                options={{header: () => null, animation: 'slide_from_right'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    height: '100%',
  },
});
