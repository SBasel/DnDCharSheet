import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Charakterbogen } from "./Charakterbogen";

const Tab = createBottomTabNavigator();

function CharakterbogenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "darkgrey",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "transparent" }} />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Character Stats") iconName = "male";
          else if (route.name === "Fight") iconName = "shield";
          else if (route.name === "Skills & Magic") iconName = "star";
          else if (route.name === "Inventar") iconName = "briefcase";
          else if (route.name === "Story & Eid") iconName = "book";

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarLabel: () => null,
      })}>
      <Tab.Screen name="Character Stats" component={Charakterbogen} />
      <Tab.Screen name="Fight" component={Charakterbogen} />
      <Tab.Screen name="Skills & Magic" component={Charakterbogen} />
      <Tab.Screen name="Inventar" component={Charakterbogen} />
      <Tab.Screen name="Story & Eid" component={Charakterbogen} />
    </Tab.Navigator>
  );
}

function CharakterbogenNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <CharakterbogenTabs />
    </View>
  );
}

export default CharakterbogenNavigator;
