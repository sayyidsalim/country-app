import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import ButtomNavigator from './ButtomNavigator';
import SplashScreen from '../screens/SplashScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={ButtomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles

export default AppNavigator;
