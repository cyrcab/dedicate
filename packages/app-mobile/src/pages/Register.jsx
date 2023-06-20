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

export default function Register() {
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [tel, setTel] = useState("");
  
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
  
    const handleLogin = () => {
      const data = {
        email: email,
        password: mdp,
        nom: nom,
        prenom: prenom,
        tel: tel,

      };
  
      axios.post("http://10.15.193.112:5001/api/auth/register", data)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error.response.data.message);
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