import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

export function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.webp")}
        resizeMode="cover"
        style={styles.image}>
        <Text style={[styles.descriptionText, styles.titleText]}>
          Online DnD Charakterbogen
        </Text>
        <Text style={styles.descriptionText}>
          Erstelle deinen Charakter für Dungeons & Dragon. Verwalten deine
          Zauber und Fähigkeiten, Statuswerte und deinen Background-Story.
        </Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? "#0056b3" : "#007BFF" },
            ]}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#227a4f" : "#28a745",
                marginLeft: 10,
              },
            ]}>
            <Text style={styles.buttonText}>SignUp</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionText: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 20,
  },
  titleText: {
    fontSize: 48,
    fontWeight: "bold",
    padding: 10,
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    minWidth: 90,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
