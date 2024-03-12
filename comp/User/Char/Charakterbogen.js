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
import SkillBadge from "./charcomp/SkillBadge";

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
          <View>
            <View style={{ flexDirection: "row" }}>
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
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.badgesContainer}>
                {/* Character Badges */}
                {["str", "dex", "con", "int", "wis", "cha"].map((stat) => (
                  <View key={stat} style={{ flexDirection: "row" }}>
                    <CharacterBadge
                      stat={stat.toUpperCase()}
                      value={charData[stat]}
                      onPress={() => handlePressBadge(stat, charData[stat])}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.badgeContainer}>
                {/* Badge neben den Charakterabzeichen */}
                <Badge number={10} text="Inspiration" />
                <Badge number={10} text="Proficiency Bonus" />
                <View>
                  <Text>Saving Throws</Text>
                </View>
                <View style={styles.skillContainer}>
                  <View>
                    <SkillBadge
                      skillNumber="5"
                      skillText="Strength"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Dexterity"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Constitution"
                      isTrained={true}
                    />
                  </View>
                  <View>
                    <SkillBadge
                      skillNumber="5"
                      skillText="Intelligence"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Wisdom"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Charisma"
                      isTrained={false}
                    />
                  </View>
                </View>
                <View>
                  <Text>Skills</Text>
                </View>
                <View style={styles.skillContainer}>
                  <View>
                    <SkillBadge
                      skillNumber="5"
                      skillText="Acrobatics"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Animal Handling"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Arcana"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Athletics"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Deception"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="History"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Insight"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Intimidation"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Investigation"
                      isTrained={false}
                    />
                  </View>
                  <View>
                    <SkillBadge
                      skillNumber="5"
                      skillText="Medicine"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Nature"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Perception"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Performance"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Persuasion"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Religion"
                      isTrained={true}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Sleight of Hand"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Stealth"
                      isTrained={false}
                    />
                    <SkillBadge
                      skillNumber="5"
                      skillText="Survival"
                      isTrained={true}
                    />
                  </View>
                </View>
              </View>
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  badgesContainer: {
    flex: 1,
  },
  badgeContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  skillContainer: {
    flexDirection: "row",

    padding: 10,
  },
});
