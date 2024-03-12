import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ToggleCircles = ({ text1, text2 }) => {
  const [circleStatus, setCircleStatus] = useState([false, false, false]);

  const toggleCircle = (index) => {
    setCircleStatus(
      circleStatus.map((status, i) => (i === index ? !status : status))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text1}</Text>
      <View style={styles.circlesContainer}>
        {circleStatus.map((isActive, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.circle, isActive ? styles.filledCircle : null]}
            onPress={() => toggleCircle(index)}
          />
        ))}
      </View>
      <Text style={styles.text}>{text2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  circlesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    marginHorizontal: 5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  filledCircle: {
    backgroundColor: "black",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ToggleCircles;
