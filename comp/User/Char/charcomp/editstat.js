import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { saveCharStatsToFirestore } from "../../../firbase/data/SaveElapsedTime";

export const EditStatsModal = ({
  docId,
  stat,
  value,
  visible,
  onClose,
  onUpdate,
}) => {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const handleInputChange = (newValue) => {
    setLocalValue(newValue);
  };

  const handleCloseModal = async () => {
    if (stat) {
      await saveCharStatsToFirestore(docId, { [stat]: localValue });
      onUpdate(stat, localValue);
    }
    onClose(); // This should be outside the if block to ensure it's always called
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.inputLabel}>{stat}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            placeholder={value.toString()}
            value={localValue}
            keyboardType="numeric"
          />
          <TouchableHighlight
            style={styles.openButton}
            onPress={handleCloseModal}>
            <Text style={styles.textStyle}>Save & Close</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={handleCancel}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
});
