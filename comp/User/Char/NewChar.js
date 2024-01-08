import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, CheckBox, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addProjectToFirestore } from '../../firbase/data/firestoreUtility';
import { auth } from '../../firbase/firebase.settings';

const languageOptions = [
  { id: 'java', label: 'Java' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
];

export function NewChar({ navigation }) {
  const [name, setName] = useState('');
  const [vorname, setVorname] = useState('');
  const [level, setLevel] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [str, setStr] = useState('');
  const [agi, setAgi] = useState('');
  const [con, setCon] = useState('');
  const [int, setInt] = useState('');
  const [wis, setWis] = useState('');
  const [cha, setCha] = useState('');

  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const projectData = {
      userId, 
      name,
      vorname,
      level,
      selectedClass,
      str,
      agi,
      con,
      int,
      wis,
      cha
    };

    try {
      await addProjectToFirestore(projectData);
      setIsLoading(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigation.navigate('UserArea', { screen: 'User' });
      }, 2000);
    } catch (error) {
      console.error("Error adding project: ", error);
      setIsLoading(false);
    }
  };

  if(isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if(showSuccessMessage) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Charakter erfolgreich erstellt!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      

      <Text>Vorname:</Text>
      <TextInput value={vorname} onChangeText={setVorname} style={styles.input} />
      
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text>Level:</Text>
      <TextInput value={level} onChangeText={setLevel} style={styles.input}/>

      <Text>Klasse:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedClass}
        onValueChange={(itemValue) => setSelectedClass(itemValue)}
      >
        <Picker.Item label="Wähle deine Klasse" value="" />
        <Picker.Item label="Kleriker" value="Kleriker" />
        <Picker.Item label="Paladin" value="Paladin" />
        <Picker.Item label="Krieger" value="Krieger" />
      </Picker>
      <Text>STR:</Text>
      <TextInput value={str} onChangeText={setStr} style={styles.input}/>
      <Text>AGI:</Text>
      <TextInput value={agi} onChangeText={setAgi} style={styles.input}/>
      <Text>CON:</Text>
      <TextInput value={con} onChangeText={setCon} style={styles.input}/>
      <Text>INT:</Text>
      <TextInput value={int} onChangeText={setInt} style={styles.input}/>
      <Text>WIS:</Text>
      <TextInput value={wis} onChangeText={setWis} style={styles.input}/>
      <Text>CHA:</Text>
      <TextInput value={cha} onChangeText={setCha} style={styles.input}/>

      <Button title="Absenden" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 15
  },
});
