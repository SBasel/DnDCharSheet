import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";

const TableComponent = ({ data }) => {
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddWeapon = (weapon) => {
    setSelectedWeapons([...selectedWeapons, weapon]);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>ATK Bonus</Text>
        <Text style={styles.headerText}>Damage</Text>
        <Text style={styles.headerText}>Type</Text>
      </View>
      {selectedWeapons.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.rowText}>{item.name}</Text>
          <Text style={styles.rowText}>{item.atkBonus}</Text>
          <Text style={styles.rowText}>{item.damage}</Text>
          <Text style={styles.rowText}>{item.type}</Text>
        </View>
      ))}
      <Pressable style={styles.addRow} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addRowText}>Add Weapon</Text>
      </Pressable>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <Pressable
              style={styles.modalItem}
              onPress={() => handleAddWeapon(item)}>
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Deine vorhandenen Styles...
  addRow: {
    padding: 10,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  addRowText: {
    fontSize: 16,
    color: "#000",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableContainer: {
    margin: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginLeft: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  rowText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default TableComponent;
