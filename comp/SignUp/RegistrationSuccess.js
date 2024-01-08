import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export function RegistrationSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registrierung erfolgreich!</Text>
      <Pressable style={styles.button}
        onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Zum Login</Text>
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
    marginBottom: 20,
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