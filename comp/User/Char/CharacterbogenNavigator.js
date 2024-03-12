import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Charakterbogen } from "./Charakterbogen";
import { Fight } from "./Fight";
import { Inventar } from "./Inventar";
import { Story } from "./Story";
import { Spell } from "./Spell";

const Tab = createBottomTabNavigator();

function CharakterbogenTabs({ char }) {
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
      <Tab.Screen
        name="Character Stats"
        component={Charakterbogen}
        initialParams={{ char }}
      />
      <Tab.Screen name="Fight" component={Fight} initialParams={{ char }} />
      <Tab.Screen
        name="Skills & Magic"
        component={Spell}
        initialParams={{ char }}
      />
      <Tab.Screen
        name="Inventar"
        component={Inventar}
        initialParams={{ char }}
      />
      <Tab.Screen
        name="Story & Eid"
        component={Story}
        initialParams={{ char }}
      />
    </Tab.Navigator>
  );
}

function CharakterbogenNavigator({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <CharakterbogenTabs char={route.params.char} />
    </View>
  );
}

export default CharakterbogenNavigator;
