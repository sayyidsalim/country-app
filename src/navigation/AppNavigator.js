import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ButtomNavigator from './ButtomNavigator';
import SplashScreen from '../screens/SplashScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerTitle: ''}}
        />
        <Stack.Screen
          name="MainTabs"
          component={ButtomNavigator}
          options={{headerTitle: ''}}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{headerTitle: ''}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
