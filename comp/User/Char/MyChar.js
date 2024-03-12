import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firbase/data/firestoreInit";
import { onAuthStateChangeListener } from "../../firbase/auth/auth.listener";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const containerWidth = Platform.select({
  ios: width - 20,
  android: width - 20,
  web: 600,
});

export function MyChar() {
  const [charInfo, setCharInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const charCollection = collection(db, "Charakter");
      const q = query(charCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => doc.data());
      setCharInfo(docs); // Speichert alle Dokumente in charInfo
    };

    fetchData();
  }, [userId]);

  if (!charInfo) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/background.webp")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </Pressable>
        </View>
        <Text style={styles.heading}>Charakter</Text>
        <View style={styles.cardsContainer}>
          {charInfo.map((char, index) => (
            <TouchableHighlight
              key={index}
              onPress={() =>
                navigation.navigate("UserArea", {
                  screen: "Charakterbogen",
                  params: { char: char }, // Char-Daten werden hier übergeben
                })
              }>
              <Card containerStyle={styles.containerStyle}>
                <ImageBackground
                  source={require("../../../assets/pergament.webp")}
                  style={styles.cardBackground}
                  resizeMode="cover">
                  <View style={styles.cardContent}>
                    <View style={styles.cardTextContainer}>
                      <Card.Divider />
                      <Text style={styles.cardtext}>
                        Vorname: {char.vorname}
                      </Text>
                      <Text style={styles.cardtext}>Name: {char.name}</Text>
                      <Text style={styles.cardtext}>
                        Klasse: {char.selectedClass}
                      </Text>
                      <Text style={styles.cardtext}>Level: {char.level}</Text>
                    </View>
                    <View style={styles.characterImageContainer}>
                      <Image
                        source={require("../../../assets/placeholdermen.webp")}
                        resizeMode="contain" // Replace with actual path to the placeholder image
                        style={styles.characterImage}
                      />
                    </View>
                  </View>
                </ImageBackground>
              </Card>
            </TouchableHighlight>
          ))}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    padding: 10,
    color: "white",
    marginTop: 80,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTextContainer: {
    flex: 3,
    padding: 10,
  },
  characterImageContainer: {
    flex: 1, // Adjust this flex ratio to change the image's size
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  characterImage: {
    width: "100%", // You can adjust this as needed
    height: "100%", // Make sure the height is adjusted to maintain the aspect ratio
  },
  cardtext: {
    color: "white",
    marginBottom: 10,
    backgroundColor: "transparent",
    paddingLeft: 10,
  },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
    height: 80,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  containerStyle: {
    marginBottom: 20,
    padding: 0,
    borderRadius: 10,
    backgroundColor: "transparent",
    width: containerWidth,
    overflow: "hidden",
  },
  cardBackground: {
    borderRadius: 10,
  },
});
