import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';

export default function LoginScreen({navigation}) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => console.log('Login')}
        style={styles.button}>
        Login
      </Button>

      <Button
        onPress={() => navigation.navigate('Register')}
        style={styles.link}>
        Belum punya akun? Daftar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
  },
});
