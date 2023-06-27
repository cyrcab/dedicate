import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { setSignedIn } from "../store/reducers/reducer";

export default function Register() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const dispatch = useDispatch();


  const handleLogin = () => {
    const data = {
      email: email,
      password: mdp,
      nom: nom,
      prenom: prenom,
      tel: tel,
    };

    axios
      .post(backendUrl +"auth/register", data)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_USER_DATA", payload: response.data });
        AsyncStorage.setItem("token", response.data.token);
        console.log(AsyncStorage.getItem('token'));
        AsyncStorage.setItem("userId", JSON.stringify(response.data.data.id));
        dispatch(setSignedIn(true));
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setVisible(true);
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
          value={nom}
          onChangeText={setNom}
          mode="outlined"
          label="Nom"
          placeholder="Entrez votre nom"
        />
        <TextInput
          style={styles.textInput}
          value={prenom}
          onChangeText={setPrenom}
          mode="outlined"
          label="Prénom"
          placeholder="Entrez votre prénom"
        />
        <TextInput
          style={styles.textInput}
          value={tel}
          onChangeText={setTel}
          mode="outlined"
          label="Téléphone"
          placeholder="Entrez votre numéro de téléphone"
          maxLength={10}
        />
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          label="Email"
          placeholder="Entrez votre adresse mail"
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
          S'inscrire
        </Button>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          {messageError}
        </Snackbar>
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
