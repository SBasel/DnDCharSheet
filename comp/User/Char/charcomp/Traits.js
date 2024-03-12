import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const TraitsComponent = ({ spells }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState(null);

  const handlePress = (spell) => {
    setSelectedSpell(spell);
    setModalVisible(true);
  };

  return (
    <View>
      <Text>Features & Traits</Text>
      {spells.map((spell, index) => (
        <TouchableOpacity
          key={index}
          style={styles.spellItem}
          onPress={() => handlePress(spell)}>
          <Text style={styles.spellText}>{spell.name}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {selectedSpell ? selectedSpell.name : ""}
            </Text>
            {/* Hier können Sie weitere Informationen zum Spell anzeigen, die von der API abgerufen werden */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  spellItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  spellText: {
    fontSize: 18,
  },
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});

export default TraitsComponent;
