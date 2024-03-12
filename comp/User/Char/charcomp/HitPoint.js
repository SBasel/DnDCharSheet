import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const containerWidth = Platform.select({
  ios: windowWidth - 40,
  android: windowWidth - 40,
  web: 600,
});

const HitPointsBadge = ({ maxHp, currentHp, tempHp }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editableMaxHp, setEditableMaxHp] = useState(maxHp.toString());
  const [editableCurrentHp, setEditableCurrentHp] = useState(
    currentHp.toString()
  );
  const [editableTempHp, setEditableTempHp] = useState(tempHp.toString());

  const handleSave = () => {
    console.log("Speichern", {
      editableMaxHp,
      editableCurrentHp,
      editableTempHp,
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.innerContainer}>
          <Text>Hit Points</Text>
          <View style={styles.lineItem}>
            <Text style={styles.label}>Max HP:</Text>
            <Text style={styles.value}>{maxHp}</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.label}>Current HP:</Text>
            <Text style={styles.value}>{currentHp}</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.label}>Temporary HP:</Text>
            <Text style={styles.value}>{tempHp}</Text>
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <ImageBackground
            source={require("../../../../assets/plainpergament.webp")}
            resizeMode="cover"
            style={styles.modalViewBackground}>
            <View style={styles.modalView}>
              <Text style={styles.label}>Max HP:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEditableMaxHp}
                value={editableMaxHp}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Current HP:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEditableCurrentHp}
                value={editableCurrentHp}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Temporary HP:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEditableTempHp}
                value={editableTempHp}
                keyboardType="numeric"
              />

              <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Speichern</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    width: containerWidth,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalViewBackground: {
    margin: 20,
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
    width: containerWidth - 40,
    maxHeight: Dimensions.get("window").height - 80, // Optional, um eine maximale Höhe festzulegen
    overflow: "hidden", // Verhindert, dass das Hintergrundbild über die Ränder hinausgeht
  },
  modalView: {
    width: "100%", // Damit es die gesamte Breite des Hintergrundbildes einnimmt
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#FF4136",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  lineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  value: {
    color: "#000",
  },
  innerContainer: {
    padding: 10,
    width: "100%",
  },
  lineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default HitPointsBadge;
