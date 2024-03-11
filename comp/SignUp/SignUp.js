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
import Icon from "react-native-vector-icons/FontAwesome"; // FontAwesome-Icon hinzufügen
import { createNewUserWithEmailAndPassword } from "../firbase/auth/auth.emailAndPassword";
import { signInWithGooglePopup } from "../firbase/auth/auth.googlePopup";
import { useNavigation } from "@react-navigation/native";

export function SignUp({ navigation }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = React.useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailSignUp = async () => {
    switch (true) {
      case !formValue.email:
        setErr("The Email field must not be empty.");
        return;
      case !emailRegex.test(formValue.email):
        setErr("The email must be a valid email format.");
        return;
      case !formValue.password:
        setErr("The Password field must not be empty.");
        return;
      case !formValue.confirmPassword:
        setErr("The Confirm Password field must not be empty.");
        return;
      case formValue.password.length < 8:
        setErr("The password must be at least 8 characters.");
        return;
      case formValue.password !== formValue.confirmPassword:
        setErr("The passwords do not match.");
        return;
    }

    try {
      await createNewUserWithEmailAndPassword(
        formValue.email,
        formValue.password
      );
      navigation.navigate("RegistrationSuccess");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErr("This email already exists");
          break;
        case "auth/invalid-email":
          setErr("The email is invalid");
          break;
        case "auth/operation-not-allowed":
          setErr(
            "An error has occurred here. Please contact support. [Operation not allowed]"
          );
          break;
        case "auth/weak-password":
          setErr("The password is too weak");
          break;
        default:
          setErr(error.code);
          break;
      }
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
        <Text style={styles.heading}>Sign Up</Text>
        {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
        <TextInput
          placeholder="Email"
          value={formValue.email}
          onChangeText={(text) =>
            setFormValue((prev) => ({ ...prev, email: text }))
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={formValue.password}
          onChangeText={(text) =>
            setFormValue((prev) => ({ ...prev, password: text }))
          }
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={formValue.confirmPassword}
          onChangeText={(text) =>
            setFormValue((prev) => ({ ...prev, confirmPassword: text }))
          }
          secureTextEntry
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleEmailSignUp}>
          <Text style={styles.buttonText}>SignUp with Email</Text>
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
