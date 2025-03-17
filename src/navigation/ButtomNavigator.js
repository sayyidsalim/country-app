import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
// const HomeScreen = () => <Text style={styles.screen}>🏠 Home Screen</Text>;
const ProfileScreen = () => (
  <Text style={styles.screen}>👤 Profile Screen</Text>
);
const SettingsScreen = () => (
  <Text style={styles.screen}>⚙️ Settings Screen</Text>
);

const Tab = createBottomTabNavigator();

const ButtomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'account-outline';
          else if (route.name === 'Settings') iconName = 'cog-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Styles
const styles = {
  screen: {flex: 1, textAlign: 'center', marginTop: 50},
};

export default ButtomNavigator;
