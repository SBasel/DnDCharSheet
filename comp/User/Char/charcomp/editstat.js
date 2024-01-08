import React, { useState, useEffect } from 'react';
import { Modal, TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { saveCharStatsToFirestore } from '../../../firbase/data/SaveElapsedTime';

export const EditStatsModal = ({ docId, currentStats, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // Verwenden Sie einen lokalen Zustand, um die Änderungen zu verfolgen
  const [localStats, setLocalStats] = useState({ ...currentStats });

  useEffect(() => {
    // Aktualisieren Sie den lokalen Zustand, wenn sich die aktuellen Statistiken ändern
    setLocalStats({ ...currentStats });
  }, [currentStats]);

  const handleInputChange = (name, value) => {
    setLocalStats(prevStats => ({
      ...prevStats,
      [name]: value,
    }));
  };

  const handleCloseModal = async () => {
    setModalVisible(false);
    await saveCharStatsToFirestore(docId, localStats);
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => setModalVisible(true)}
        style={styles.iconContainer}>
        <FontAwesome name="pencil" size={24} />
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Stats</Text>
            {Object.keys(currentStats).map(key => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{key.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handleInputChange(key, value)}
            value={localStats[key]}
            keyboardType="numeric"
          />
        </View>
            ))}
            <TouchableHighlight
              style={styles.openButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.textStyle}>Save & Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container style
  },
  iconContainer: {
    // Style for the icon container if needed
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  // ... Rest of your styles
});






