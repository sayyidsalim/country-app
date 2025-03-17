import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTabs'); // Pindah ke Main Tabs
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color="tomato" />
      <Text style={styles.splashText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splashText: {marginTop: 10, fontSize: 18, color: 'gray'},
});

export default SplashScreen;
