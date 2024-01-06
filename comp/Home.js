import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';



export function Home({ navigation }) {
  return (
    <ImageBackground source={require('../assets/backround.png')} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      

        <Image
        source={require('../assets/Badges-DNDCHAR.png')}
        style={styles.imageHead}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        
        <Text style={styles.text}>Logge dich ein um deine DnD Characktere zu erstellen und dich mit einer Party ins Abentuer zu stürtzen.</Text>
      </View>
      
    </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  textContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'darkgrey',
  },
  text: {
    color: 'white',
    textAlign: 'center', // Zentriert den Text innerhalb des Textcontainers
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
    
  },
  imageHead: {
    width: '90%',
    height: '40%',
    
  }
});

