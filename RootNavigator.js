import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "./comp/SignUp/SignUp";
import { Login } from "./comp/Login/Login";
import { User } from "./comp/User/User";
import { MyChar } from "./comp/User/Char/MyChar";
import { NewChar } from "./comp/User/Char/NewChar";
import { Charakterbogen } from "./comp/User/Char/Charakterbogen";
import { RegistrationSuccess } from "./comp/SignUp/RegistrationSuccess";
import { StyleSheet } from "react-native";
import { Home } from "./comp/Home";
import CharakterbogenNavigator from "./comp/User/Char/CharacterbogenNavigator";

const options = { backgroundColor: "#292b29", color: "white" };
const Stack = createStackNavigator();

function UserNavigator() {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="Dein Berreich"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistrationSuccess"
        component={RegistrationSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Charakterliste"
        component={MyChar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewChar"
        component={NewChar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Charakterbogen"
        component={CharakterbogenNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function RootNavigator({ initialRouteName = "Home" }) {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="Willkommen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserArea"
        component={UserNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292b29",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#292b29",
  },
  heading: {
    fontSize: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "white",
  },
});
