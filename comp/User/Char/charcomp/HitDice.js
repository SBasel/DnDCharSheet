import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const HitDice = ({ hitDiceType, numberOfDice }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [diceRoll, setDiceRoll] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [diceResults, setDiceResults] = useState([]);
  const [totalRoll, setTotalRoll] = useState(0);

  const diceImages = {
    1: require("../../../../assets/Dice/dice1.png"),
    2: require("../../../../assets/Dice/dice2.png"),
    3: require("../../../../assets/Dice/dice3.png"),
    4: require("../../../../assets/Dice/dice4.png"),
    5: require("../../../../assets/Dice/dice5.png"),
    6: require("../../../../assets/Dice/dice6.png"),
    7: require("../../../../assets/Dice/dice7.png"),
    8: require("../../../../assets/Dice/dice8.png"),
    9: require("../../../../assets/Dice/dice9.png"),
    10: require("../../../../assets/Dice/dice10.png"),
    11: require("../../../../assets/Dice/dice11.png"),
    12: require("../../../../assets/Dice/dice12.png"),
    13: require("../../../../assets/Dice/dice13.png"),
    14: require("../../../../assets/Dice/dice14.png"),
    15: require("../../../../assets/Dice/dice15.png"),
    16: require("../../../../assets/Dice/dice16.png"),
    17: require("../../../../assets/Dice/dice17.png"),
    18: require("../../../../assets/Dice/dice18.png"),
    19: require("../../../../assets/Dice/dice19.png"),
    20: require("../../../../assets/Dice/dice20.png"),
  };

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
        // Wähle ein zufälliges Würfelbild aus
        setCurrentImage(images[Math.floor(Math.random() * images.length)]); // Hier müssen Sie die Logik entsprechend Ihrem Anwendungsfall anpassen
      }, 150);

      setTimeout(() => {
        clearInterval(intervalId);
        setAnimationRunning(false);
        let total = 0;
        let results = [];
        for (let i = 0; i < numberOfDice; i++) {
          const roll = Math.floor(Math.random() * hitDiceType) + 1;
          total += roll;
          results.push(roll);
        }
        setTotalRoll(total); // Setze das Gesamtergebnis
        setDiceResults(results); // Speichern Sie die Ergebnisse im Zustand
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [animationRunning, diceImages, numberOfDice, hitDiceType]);

  const handlePress = () => {
    const roll = Math.floor(Math.random() * hitDiceType) + 1;
    setDiceRoll(roll);
    setAnimationRunning(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.badgeContainer}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>Hit Dice</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.number}>{numberOfDice}x</Text>
          <Image source={diceImages[hitDiceType]} style={styles.diceImage} />
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
            style={styles.modalView}
            resizeMode="cover">
            <Text style={styles.modalText}>Hit Dice Roll</Text>
            {!animationRunning &&
              diceResults.map((result, index) => (
                <View key={index} style={styles.diceResultContainer}>
                  {/* Bild für jedes Würfelergebnis */}
                  <Image source={diceImages[result]} style={styles.diceImage} />
                </View>
              ))}
            <Text style={styles.totalRoll}>Total: {totalRoll}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close Roll</Text>
            </Pressable>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  text: {
    color: "#000", // Oder eine andere Farbe nach Wahl
    marginRight: 5, // Gibt etwas Abstand zwischen der Zahl und dem Bild
  },
  number: {
    fontSize: 20, // Oder eine andere passende Größe
    fontWeight: "bold",
    color: "#000", // Oder eine andere Farbe nach Wahl
    marginRight: 5, // Gibt etwas Abstand zwischen der Zahl und dem Bild
  },
  diceImage: {
    width: 100, // Oder eine passende Breite
    height: 100, // Oder eine passende Höhe, sollte dem Wert der Breite entsprechen für ein quadratisches Bild
    resizeMode: "contain", // Behält das Seitenverhältnis des Bildes bei
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
});

export default HitDice;
