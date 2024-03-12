import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  ImageBackground,
} from "react-native";

const SkillBadge = ({ skillNumber, skillText, isTrained }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [diceRoll, setDiceRoll] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [animationRunning, setAnimationRunning] = useState(false);

  const backgroundImage = require("../../../../assets/plainpergament.webp");

  const images = [
    require("../../../../assets/Dice/dice1.png"),
    require("../../../../assets/Dice/dice2.png"),
    require("../../../../assets/Dice/dice3.png"),
    require("../../../../assets/Dice/dice4.png"),
    require("../../../../assets/Dice/dice5.png"),
    require("../../../../assets/Dice/dice6.png"),
    require("../../../../assets/Dice/dice7.png"),
    require("../../../../assets/Dice/dice8.png"),
    require("../../../../assets/Dice/dice9.png"),
    require("../../../../assets/Dice/dice10.png"),
    require("../../../../assets/Dice/dice11.png"),
    require("../../../../assets/Dice/dice12.png"),
    require("../../../../assets/Dice/dice13.png"),
    require("../../../../assets/Dice/dice14.png"),
    require("../../../../assets/Dice/dice15.png"),
    require("../../../../assets/Dice/dice16.png"),
    require("../../../../assets/Dice/dice17.png"),
    require("../../../../assets/Dice/dice18.png"),
    require("../../../../assets/Dice/dice19.png"),
    require("../../../../assets/Dice/dice20.png"),
  ];

  useEffect(() => {
    let intervalId;
    if (animationRunning) {
      intervalId = setInterval(() => {
        setCurrentImage(images[Math.floor(Math.random() * images.length)]);
      }, 150);

      setTimeout(() => {
        clearInterval(intervalId);
        setAnimationRunning(false);
        setCurrentImage(images[diceRoll - 1]);
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [animationRunning, images, diceRoll]);

  const handlePress = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    setDiceRoll(roll);
    setAnimationRunning(true);
    setModalVisible(true);
  };

  return (
    <Pressable style={styles.badgeContainer} onPress={handlePress}>
      <Text style={[styles.number, isTrained ? styles.trained : null]}>
        {skillNumber}
      </Text>
      <Text style={[styles.text, isTrained ? styles.trained : null]}>
        {skillText}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ImageBackground
            source={require("../../../../assets/plainpergament.webp")}
            style={styles.modalView}
            resizeMode="cover">
            <Text style={styles.modalTitle}>{skillText}</Text>
            <View style={styles.imageContainer}>
              {/* Basisbild */}
              <Image
                source={require("../../../../assets/Dice/dice0.png")}
                style={styles.image}
              />
              {/* Animiertes Bild */}
              {currentImage && (
                <Image source={currentImage} style={styles.image} />
              )}
            </View>
            <Text style={styles.modalText}>Skill Number: {skillNumber}</Text>
            {!animationRunning && (
              <Text style={styles.modalText}>
                Total: {diceRoll + parseInt(skillNumber)}
              </Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close Roll</Text>
            </Pressable>
          </ImageBackground>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%", // oder die gewünschte Breite
    height: "100%", // oder die gewünschte Höhe
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 150,
    marginLeft: 10,
  },
  number: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 5,
    marginLeft: 15,
    padding: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // oder die gewünschte Breite
    height: "100%", // oder die gewünschte Höhe
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
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
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
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  trained: {
    textDecorationLine: "underline",
  },
});

export default SkillBadge;
