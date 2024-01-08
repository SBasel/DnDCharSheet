import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { signInThisUserWithEmailAndPassword } from '../firbase/auth/auth.emailAndPassword';
import { signInWithGooglePopup } from '../firbase/auth/auth.googlePopup';
import { useNavigation } from '@react-navigation/native';


export function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setErr] = React.useState('');
  const navigation = useNavigation();


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleEmailLogin = async () => {
    if (!email) {
        setErr("The Email field must not be empty.");
        return;
    }
    if (!emailRegex.test(email)) {
        setErr("The email must be a valid email format.");
        return;
    }
    if (!password) {
        setErr("The Password field must not be empty.");
        return;
    }
    try {
        await signInThisUserWithEmailAndPassword(email, password);
        navigation.navigate('UserArea', { screen: 'User'});
    } catch (error) {
        console.error("Error logging in with email and password:", error);
        setErr("Error logging in with email and password");
        return;
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {err ? <Text style={{color: 'red'}}>{err}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Pressable style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login with Email</Text>
      </Pressable>
      
      <Pressable style={styles.button} onPress={() => signInWithGooglePopup(navigation, 'User')}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20, // space between heading and inputs
  },
  input: {
    borderWidth: 1,
    width: 250, // increased width
    fontSize: 18, // increased font size
    padding: 10, // added padding for bigger touch area
    marginBottom: 15, // increased space between inputs
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
