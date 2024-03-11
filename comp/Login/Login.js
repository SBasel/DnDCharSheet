import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInThisUserWithEmailAndPassword } from "../firbase/auth/auth.emailAndPassword";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState("");
  const navigation = useNavigation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailLogin = async () => {
    if (!email) {
      setErr("The Email field must not be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setErr("The email must be a valid email format.");
      return;
    }
    if (!password) {
      setErr("The Password field must not be empty.");
      return;
    }
    try {
      await signInThisUserWithEmailAndPassword(email, password);
      navigation.navigate("UserArea", { screen: "User" });
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      setErr("Error logging in with email and password");
      return;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../../assets/background.webp")}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </Pressable>
        </View>
        <Text style={styles.heading}>Login</Text>
        {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleEmailLogin}>
          <Text style={styles.buttonText}>Login with Email</Text>
        </Pressable>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Verwenden Sie flexGrow statt flex, damit es sich korrekt ausdehnt
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
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: 250, // increased width
    fontSize: 18, // increased font size
    padding: 10, // added padding for bigger touch area
    marginBottom: 15, // increased space between inputs
    backgroundColor: "white",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    alignItems: "center",
    minWidth: 250,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50, // Abstand vom oberen Rand
    left: 20, // Abstand vom linken Rand
    zIndex: 10, // Stellt sicher, dass der Button über anderen Elementen liegt
  },
});
