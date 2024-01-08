import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.settings.js";


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});


export const signInWithGooglePopup = async (navigation, redirectTo) => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google authentication was successful");
    navigation.navigate('UserArea', { screen: redirectTo });
  } catch (error) {
    console.error("Error with Google authentication:", error);
  }
};



