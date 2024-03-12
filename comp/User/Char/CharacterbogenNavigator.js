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
      })}>
      <Tab.Screen
        name="Character Stats"
        component={Charakterbogen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="male" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fight"
        component={Charakterbogen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Skills & Magic"
        component={Charakterbogen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventar"
        component={Charakterbogen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Story & Eid"
        component={Charakterbogen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
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
