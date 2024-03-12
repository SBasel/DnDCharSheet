import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firbase/firebase.settings";
import { useNavigation } from "@react-navigation/native";

export function User() {
  const user = auth.currentUser;
  const userEmail = user?.email;
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Successfully logged out");
        setModalVisible(false);
        navigation.navigate("Willkommen");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../assets/background.webp")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <Text style={styles.welcomeText}>Willkommen,</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
          <Pressable
            style={styles.menuIcon}
            onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon icon={faBars} size={24} color="white" />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/Badges-22Char.png")}
            style={styles.imageHead}
            resizeMode="contain"
          />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Charakterliste")}>
            <Text style={styles.buttonText}>Meine Charactere</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("NewChar")}>
            <Text style={styles.buttonText}>Neuer Character</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/Badges-22Adv.png")}
            style={styles.imageHead}
            resizeMode="contain"
          />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MyProjects")}>
            <Text style={styles.buttonText}>Meine Abenteuer</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("NewProject")}>
            <Text style={styles.buttonText}>Neues Abenteuer</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // hitSlop hinzufügen
            >
              <FontAwesomeIcon icon={faTimes} size={24} />
            </Pressable>

            <Text style={styles.modalOption}>Konto</Text>
            <Text style={styles.modalOption}>DarkMode</Text>
            <Text style={styles.modalOption} onPress={handleLogout}>
              Logout
            </Text>
          </View>
        </Modal>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Verwenden Sie flexGrow statt flex, damit es sich korrekt ausdehnt
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
  header: {
    color: "white",
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 40,
  },
  leftContainer: {
    flexDirection: "column",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    fontSize: 16,
    marginTop: 5,
    color: "white",
  },
  menuIcon: {
    position: "absolute",
    top: 0,
    right: 30,
    color: "white",
  },
  button: {
    margin: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20, // Vertikaler Abstand zwischen den View-Containern
    marginTop: 120,
    width: "80%",
    height: "30%",
  },
  modalContainer: {
    position: "absolute",
    top: 85,
    right: 15,
    width: 200,
    backgroundColor: "rgba(250, 250, 250, 1)",
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    padding: 10,
    top: 5,
    right: 5,
    zIndex: 1,
  },
  modalOption: {
    padding: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  imageHead: {
    width: "90%",
    height: "40%",
  },
});
