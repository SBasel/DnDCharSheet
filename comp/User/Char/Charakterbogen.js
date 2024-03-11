import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChangeListener } from "../../firbase/auth/auth.listener";
import { CharacterBadge } from "./charcomp/statcomp";
import { CharakterInfo } from "./charcomp/charinfo";
import { EditStatsModal } from "./charcomp/editstat";
import db from "../../firbase/data/firestoreInit";
import Icon from "react-native-vector-icons/FontAwesome";
import Badge from "./charcomp/Badge";

export function Charakterbogen({ route, navigation }) {
  const { char } = route.params;
  const [charData, setCharData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentStats, setCurrentStats] = useState({
    str: "",
    dex: "",
    con: "",
    wis: "",
    cha: "",
    int: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePressBadge = (statName, value) => {
    setSelectedStat(statName);
    setSelectedValue(value);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (charData) {
      setCurrentStats({
        str: charData.str || "",
        dex: charData.dex || "",
        con: charData.con || "",
        wis: charData.wis || "",
        cha: charData.cha || "",
        int: charData.int || "",
      });
    }
  }, [charData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const charCollection = collection(db, "Charakter");
    const q = query(charCollection, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chars = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const foundChar = chars.find((c) => c.name === char.name);
      setCharData(foundChar);
    });

    // Cleanup-Function
    return () => unsubscribe();
  }, [userId, char.name]);

  if (!charData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../../assets/plainpergament.webp")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </Pressable>
        </View>
        <View style={{ flex: 1, marginTop: 80 }}>
          <View containerStyle={styles.cardContainer}>
            <View>
              <View style={styles.imageContainer}>
                <Text style={styles.text}>
                  {charData.vorname} {charData.name}
                </Text>
              </View>
              <Text>Charakter Name</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 5,
              }}>
              <CharakterInfo
                charDataone={charData.selectedClass}
                charDatatwo={charData.level}
                infoone={"Klasse"}
                infotwo={"Level"}
              />
              <CharakterInfo
                charDataone={charData.selectedClass}
                charDatatwo={charData.level}
                infoone={"Hintergrund"}
                infotwo={"Exp. Points"}
              />
              <CharakterInfo
                charDataone={charData.selectedClass}
                charDatatwo={charData.level}
                infoone={"Alignment"}
                infotwo={"Rasse"}
              />
              <CharakterInfo
                charDataone={charData.selectedClass}
                charDatatwo={charData.level}
                infoone={"Vorname"}
                infotwo={"Nachname"}
              />
            </View>
            <View style={{ flexDirection: "row", border: "solid red" }}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"STR"}
                    value={charData.str}
                    onPress={() => handlePressBadge("str", charData.str)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"DEX"}
                    value={charData.dex}
                    onPress={() => handlePressBadge("dex", charData.dex)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"CON"}
                    value={charData.con}
                    onPress={() => handlePressBadge("con", charData.con)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"INT"}
                    value={charData.int}
                    onPress={() => handlePressBadge("int", charData.int)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"WIS"}
                    value={charData.wis}
                    onPress={() => handlePressBadge("wis", charData.wis)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <CharacterBadge
                    stat={"CHA"}
                    value={charData.cha}
                    onPress={() => handlePressBadge("cha", charData.cha)}
                  />
                </View>
              </View>
              <Badge number={10} text="Neue Nachrichten" />
            </View>
          </View>
        </View>
        {isModalVisible && (
          <EditStatsModal
            docId={charData.docId}
            stat={selectedStat}
            value={selectedValue}
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onUpdate={(newStat, newValue) => {
              setCurrentStats({ ...currentStats, [newStat]: newValue });
            }}
          />
        )}
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
    marginTop: 30,
    color: "white",
    marginTop: 200,
  },
  imageContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 50, // Abstand vom oberen Rand
    left: 20, // Abstand vom linken Rand
    zIndex: 10, // Stellt sicher, dass der Button über anderen Elementen liegt
  },

  backgroundImage: {
    width: "100%", // Full width of its container
    height: "100%", // Full height of its container
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    color: "black",
  },
  cardContainer: {},
});
