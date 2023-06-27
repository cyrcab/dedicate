import styles from './styles';
import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendUrl } from '../backendUrl';


export default function Login({ navigation }) {


  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const dispatch = useDispatch();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const handleLogin = () => {
    const data = {
      email: email,
      password: mdp,
    };

    axios
      .post(backendUrl + "auth/login", data)
      .then((response) => {
        dispatch({ type: "SET_USER_DATA", payload: response.data });
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userId", JSON.stringify(response.data.data.id));
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
        <View style={styles.registerContainer}>
          <Text>Vous n'avez pas de compte ? </Text>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            S'inscrire !
          </Text>
        </View>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          {messageError}
        </Snackbar>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
