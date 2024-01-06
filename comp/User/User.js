import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firbase/firebase.settings";
import { useNavigation } from '@react-navigation/native';


export function User() {
  const user = auth.currentUser;
  const userEmail = user?.email; 
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut()
    .then(() => {
        console.log('Successfully logged out');
        setModalVisible(false);  
        navigation.navigate('Willkommen');  
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
  }




  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Text style={styles.welcomeText}>Willkommen,</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
      <Pressable style={styles.menuIcon} onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faBars} size={24} />
      </Pressable>
    </View>

    <View style={styles.buttonContainer}>
      <Text>Character</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MyProjects')}>
        <Text style={styles.buttonText}>Meine Charactere</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('NewProject')}>
        <Text style={styles.buttonText}>Neuer Character</Text>
      </Pressable>
    </View>

    <View style={styles.buttonContainer}>
      <Text>Abenteuer</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MyProjects')}>
        <Text style={styles.buttonText}>Meine Abenteuer</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('NewProject')}>
        <Text style={styles.buttonText}>Neues Abenteuer</Text>
      </Pressable>
    </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <Pressable 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} // hitSlop hinzufügen
            >
            <FontAwesomeIcon icon={faTimes} size={24} />
          </Pressable>

          <Text style={styles.modalOption}>Konto</Text>
          <Text style={styles.modalOption} >DarkMode</Text>
          <Text style={styles.modalOption} onPress={handleLogout}>Logout</Text>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 20, 
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  menuIcon: {
    position: 'absolute',
    top: 0, 
    right: 30,
  },
  button: {
    margin: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
   buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around', // Zentriert die Buttons horizontal mit gleichem Abstand
    alignItems: 'center',
    borderWidth: 1, // Rahmenbreite
    borderColor: '#ddd', // Rahmenfarbe
    borderRadius: 10, // Abgerundete Ecken
    marginVertical: 20, // Vertikaler Abstand zwischen den View-Containern
    width: '90%', // Breite der View-Container
    alignSelf: 'center', // Zentriert die View-Container in der Gesamtansicht
  },
  modalContainer: {
  position: 'absolute', 
  top: 85,
  right: 15, 
  width: 200, 
  backgroundColor: 'rgba(250, 250, 250, 1)',
  borderRadius: 10,
  padding: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
closeButton: {
  position: 'absolute',
  padding: 10,
  top: 5, 
  right: 5,
  zIndex: 1,
},
modalOption: {
  padding: 15,
  borderBottomColor: 'grey',
  borderBottomWidth: 1,
},
});

