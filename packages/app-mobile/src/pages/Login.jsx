import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: mdp,
    };

    axios.post("http://10.15.193.112:5001/api/auth/login", data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          label="Email"
          placeholder="Entrez votre adresse"
        />
        <TextInput
          style={styles.textInput}
          value={mdp}
          onChangeText={setMdp}
          mode="outlined"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          secureTextEntry // Pour masquer le mot de passe
        />
        <Button
          mode="contained"
          onPress={handleLogin} // Appeler la fonction handleLogin lors du clic sur le bouton
          style={styles.connexionButton}
        >
          Se connecter
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "50%",
  },
  connexionButton: {
    marginTop: 10,
  },
});
