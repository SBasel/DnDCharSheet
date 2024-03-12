import React from "react";
import { View, Text } from "react-native";

export const CharakterInfo = ({
  charDataone,
  charDatatwo,
  infoone,
  infotwo,
}) => {
  return (
    <View style={{ marginRight: 10 }}>
      <Text style={{ fontSize: 16 }}>{charDataone}</Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }}>{infoone}</Text>
      <Text style={{ fontSize: 16 }}>{charDatatwo}</Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }}>{infotwo}</Text>
    </View>
  );
};
