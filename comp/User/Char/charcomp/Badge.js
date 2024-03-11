import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Badge = ({ number, text }) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  number: {
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  text: {
    color: "#000",
  },
});

export default Badge;
