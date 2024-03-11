import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";

const imageMap = {
  STR: {
    0: require("../../../../assets/Stats/Stat0-Str.png"),
    1: require("../../../../assets/Stats/Stat1-Str.png"),
    2: require("../../../../assets/Stats/Stat2-Str.png"),
    3: require("../../../../assets/Stats/Stat3-Str.png"),
    4: require("../../../../assets/Stats/Stat4-Str.png"),
    5: require("../../../../assets/Stats/Stat5-Str.png"),
    6: require("../../../../assets/Stats/Stat6-Str.png"),
    7: require("../../../../assets/Stats/Stat7-Str.png"),
    8: require("../../../../assets/Stats/Stat8-Str.png"),
    9: require("../../../../assets/Stats/Stat9-Str.png"),
    10: require("../../../../assets/Stats/Stat10-Str.png"),
    11: require("../../../../assets/Stats/Stat11-Str.png"),
    12: require("../../../../assets/Stats/Stat12-Str.png"),
    13: require("../../../../assets/Stats/Stat13-Str.png"),
    14: require("../../../../assets/Stats/Stat14-Str.png"),
    15: require("../../../../assets/Stats/Stat15-Str.png"),
    16: require("../../../../assets/Stats/Stat16-Str.png"),
    17: require("../../../../assets/Stats/Stat17-Str.png"),
    18: require("../../../../assets/Stats/Stat18-Str.png"),
    19: require("../../../../assets/Stats/Stat19-Str.png"),
    20: require("../../../../assets/Stats/Stat20-Str.png"),
  },
  DEX: {
    0: require("../../../../assets/Stats/Stat0-dex.png"),
    1: require("../../../../assets/Stats/Stat1-dex.png"),
    2: require("../../../../assets/Stats/Stat2-dex.png"),
    3: require("../../../../assets/Stats/Stat3-dex.png"),
    4: require("../../../../assets/Stats/Stat4-dex.png"),
    5: require("../../../../assets/Stats/Stat5-dex.png"),
    6: require("../../../../assets/Stats/Stat6-dex.png"),
    7: require("../../../../assets/Stats/Stat7-dex.png"),
    8: require("../../../../assets/Stats/Stat8-dex.png"),
    9: require("../../../../assets/Stats/Stat9-dex.png"),
    10: require("../../../../assets/Stats/Stat10-dex.png"),
    11: require("../../../../assets/Stats/Stat11-dex.png"),
    12: require("../../../../assets/Stats/Stat12-dex.png"),
    13: require("../../../../assets/Stats/Stat13-dex.png"),
    14: require("../../../../assets/Stats/Stat14-dex.png"),
    15: require("../../../../assets/Stats/Stat15-dex.png"),
    16: require("../../../../assets/Stats/Stat16-dex.png"),
    17: require("../../../../assets/Stats/Stat17-dex.png"),
    18: require("../../../../assets/Stats/Stat18-dex.png"),
    19: require("../../../../assets/Stats/Stat19-dex.png"),
    20: require("../../../../assets/Stats/Stat20-dex.png"),
  },
  CON: {
    0: require("../../../../assets/Stats/Stat0-con.png"),
    1: require("../../../../assets/Stats/Stat1-con.png"),
    2: require("../../../../assets/Stats/Stat2-con.png"),
    3: require("../../../../assets/Stats/Stat3-con.png"),
    4: require("../../../../assets/Stats/Stat4-con.png"),
    5: require("../../../../assets/Stats/Stat5-con.png"),
    6: require("../../../../assets/Stats/Stat6-con.png"),
    7: require("../../../../assets/Stats/Stat7-con.png"),
    8: require("../../../../assets/Stats/Stat8-con.png"),
    9: require("../../../../assets/Stats/Stat9-con.png"),
    10: require("../../../../assets/Stats/Stat10-con.png"),
    11: require("../../../../assets/Stats/Stat11-con.png"),
    12: require("../../../../assets/Stats/Stat12-con.png"),
    13: require("../../../../assets/Stats/Stat13-con.png"),
    14: require("../../../../assets/Stats/Stat14-con.png"),
    15: require("../../../../assets/Stats/Stat15-con.png"),
    16: require("../../../../assets/Stats/Stat16-con.png"),
    17: require("../../../../assets/Stats/Stat17-con.png"),
    18: require("../../../../assets/Stats/Stat18-con.png"),
    19: require("../../../../assets/Stats/Stat19-con.png"),
    20: require("../../../../assets/Stats/Stat20-con.png"),
  },
  INT: {
    0: require("../../../../assets/Stats/Stat0-int.png"),
    1: require("../../../../assets/Stats/Stat1-int.png"),
    2: require("../../../../assets/Stats/Stat2-int.png"),
    3: require("../../../../assets/Stats/Stat3-int.png"),
    4: require("../../../../assets/Stats/Stat4-int.png"),
    5: require("../../../../assets/Stats/Stat5-int.png"),
    6: require("../../../../assets/Stats/Stat6-int.png"),
    7: require("../../../../assets/Stats/Stat7-int.png"),
    8: require("../../../../assets/Stats/Stat8-int.png"),
    9: require("../../../../assets/Stats/Stat9-int.png"),
    10: require("../../../../assets/Stats/Stat10-int.png"),
    11: require("../../../../assets/Stats/Stat11-int.png"),
    12: require("../../../../assets/Stats/Stat12-int.png"),
    13: require("../../../../assets/Stats/Stat13-int.png"),
    14: require("../../../../assets/Stats/Stat14-int.png"),
    15: require("../../../../assets/Stats/Stat15-int.png"),
    16: require("../../../../assets/Stats/Stat16-int.png"),
    17: require("../../../../assets/Stats/Stat17-int.png"),
    18: require("../../../../assets/Stats/Stat18-int.png"),
    19: require("../../../../assets/Stats/Stat19-int.png"),
    20: require("../../../../assets/Stats/Stat20-int.png"),
  },
  WIS: {
    0: require("../../../../assets/Stats/Stat0-wis.png"),
    1: require("../../../../assets/Stats/Stat1-wis.png"),
    2: require("../../../../assets/Stats/Stat2-wis.png"),
    3: require("../../../../assets/Stats/Stat3-wis.png"),
    4: require("../../../../assets/Stats/Stat4-wis.png"),
    5: require("../../../../assets/Stats/Stat5-wis.png"),
    6: require("../../../../assets/Stats/Stat6-wis.png"),
    7: require("../../../../assets/Stats/Stat7-wis.png"),
    8: require("../../../../assets/Stats/Stat8-wis.png"),
    9: require("../../../../assets/Stats/Stat9-wis.png"),
    10: require("../../../../assets/Stats/Stat10-wis.png"),
    11: require("../../../../assets/Stats/Stat11-wis.png"),
    12: require("../../../../assets/Stats/Stat12-wis.png"),
    13: require("../../../../assets/Stats/Stat13-wis.png"),
    14: require("../../../../assets/Stats/Stat14-wis.png"),
    15: require("../../../../assets/Stats/Stat15-wis.png"),
    16: require("../../../../assets/Stats/Stat16-wis.png"),
    17: require("../../../../assets/Stats/Stat17-wis.png"),
    18: require("../../../../assets/Stats/Stat18-wis.png"),
    19: require("../../../../assets/Stats/Stat19-wis.png"),
    20: require("../../../../assets/Stats/Stat20-wis.png"),
  },
  CHA: {
    0: require("../../../../assets/Stats/Stat0-cha.png"),
    1: require("../../../../assets/Stats/Stat1-cha.png"),
    2: require("../../../../assets/Stats/Stat2-cha.png"),
    3: require("../../../../assets/Stats/Stat3-cha.png"),
    4: require("../../../../assets/Stats/Stat4-cha.png"),
    5: require("../../../../assets/Stats/Stat5-cha.png"),
    6: require("../../../../assets/Stats/Stat6-cha.png"),
    7: require("../../../../assets/Stats/Stat7-cha.png"),
    8: require("../../../../assets/Stats/Stat8-cha.png"),
    9: require("../../../../assets/Stats/Stat9-cha.png"),
    10: require("../../../../assets/Stats/Stat10-cha.png"),
    11: require("../../../../assets/Stats/Stat11-cha.png"),
    12: require("../../../../assets/Stats/Stat12-cha.png"),
    13: require("../../../../assets/Stats/Stat13-cha.png"),
    14: require("../../../../assets/Stats/Stat14-cha.png"),
    15: require("../../../../assets/Stats/Stat15-cha.png"),
    16: require("../../../../assets/Stats/Stat16-cha.png"),
    17: require("../../../../assets/Stats/Stat17-cha.png"),
    18: require("../../../../assets/Stats/Stat18-cha.png"),
    19: require("../../../../assets/Stats/Stat19-cha.png"),
    20: require("../../../../assets/Stats/Stat20-cha.png"),
  },
};

export const CharacterBadge = ({ value, stat, onPress }) => {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    if (stat in imageMap && value in imageMap[stat]) {
      setImageSource(imageMap[stat][value]);
    }
  }, [value, stat]);

  if (!imageSource) return <View style={styles.imageContainerStat} />;

  return (
    <Pressable style={styles.imageContainerStat} onPress={() => onPress(stat)}>
      <ImageBackground
        source={imageSource}
        style={styles.backgroundImageStat}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainerStat: {
    height: 100,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  backgroundImageStat: {
    width: "100%",
    height: "100%",
    justifyContent: "start",
    alignItems: "center",
  },
  textStatone: {
    fontSize: 16,
    color: "black",
    alignSelf: "center",
    padding: 5,
  },
});
