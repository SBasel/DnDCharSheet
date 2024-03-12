import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const Badge = ({ number, text }) => {
  return (
    <View style={styles.badgeContainer}>
      <View style={styles.circle}>
        <ImageBackground
          source={require("../../../../assets/plainpergament.webp")}
          resizeMode="cover"
          style={styles.circleImage}>
          <Text style={styles.number}>{number}</Text>
        </ImageBackground>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  circle: {
    width: 40, // Adjust width and height to make it circular
    height: 40,
    borderRadius: 20, // Half of width/height
    borderWidth: 2,
    borderColor: "black",
    marginRight: -10, // Negative margin to create overlap
    overflow: "hidden", // Ensures the image does not bleed outside the border
    zIndex: 10,
  },
  circleImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rectangle: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10, // Adjust for rounded corners
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    marginLeft: -10, // Negative margin to create overlap
    minWidth: 250,
  },
  number: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 20,
  },
  text: {
    color: "#000",
    fontSize: 16,
    paddingLeft: 10,
    textAlign: "center",
  },
});

export default Badge;
