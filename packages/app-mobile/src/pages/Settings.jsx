import React, { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Avatar,
  TextInput,
  Snackbar,
  HelperText,
  Button,
} from "react-native-paper";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setSignedIn } from "../store/reducers/reducer";
import styles from "./styles";

export default function Settings({ route }) {
  const { user, setUser } = route.params;
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [selectedInput, setSelectedInput] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const handleSaveChanges = () => {
    const updatedUser = {};
    if (nom !== user.nom) {
      updatedUser.nom = nom;
    }
    if (prenom !== user.prenom) {
      updatedUser.prenom = prenom;
    }
    if (email !== user.mail) {
      updatedUser.email = email;
    }

    axiosApiInstance
      .put(backendUrl + "users/" + user?.id, updatedUser)
      .then((response) => {
        setMessageError(response.data.message);
        setVisible(true);
        if (updatedUser.nom) {
          setUser((prevUser) => ({ ...prevUser, nom: updatedUser.nom }));
        }
        if (updatedUser.prenom) {
          setUser((prevUser) => ({ ...prevUser, prenom: updatedUser.prenom }));
        }
        if (updatedUser.email) {
          setUser((prevUser) => ({ ...prevUser, mail: updatedUser.email }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSavePassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length === 0) {
      setPasswordError("Le mot de passe doit contenir au moins un caractère");
      return;
    }
    setPasswordError("");
    setConfirmPasswordError("");
    axiosApiInstance
      .put(backendUrl + "users/password/" + user?.id, { password: password })
      .then((response) => {
        setMessageError(response.data.message);
        setVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputFocus = (inputName) => {
    setSelectedInput(inputName);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setSelectedInput(null);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setSelectedInput(null)
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError("");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError("");
  };

  const dispatch = useDispatch();

  function removeAsyncToken() {
    AsyncStorage.removeItem("token");
    dispatch(setSignedIn(false));
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, padding: 16 }}>
            <View style={styles.centerView}>
              <Avatar.Image
                size={100}
                source={require("../../assets/profile.jpg")}
              />
            </View>
            <TextInput
              label="Nom"
              value={nom}
              onChangeText={(text) => setNom(text)}
              mode="outlined"
              onFocus={() => handleInputFocus("nom")}
              style={selectedInput === "nom" ? { borderColor: "blue" } : null}
            />
            <TextInput
              label="Prénom"
              value={prenom}
              onChangeText={(text) => setPrenom(text)}
              mode="outlined"
              onFocus={() => handleInputFocus("prenom")}
              style={
                selectedInput === "prenom" ? { borderColor: "blue" } : null
              }
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              onFocus={() => handleInputFocus("email")}
              style={selectedInput === "email" ? { borderColor: "blue" } : null}
            />
            <View style={styles.centerButton}>
              <Button onPress={handleSaveChanges}>
                Enregistrer les modifications
              </Button>
            </View>

            <TextInput
              label="Nouveau mot de passe"
              value={password}
              onChangeText={handlePasswordChange}
              mode="outlined"
              secureTextEntry
            />
            {passwordError && (
              <HelperText type="error" visible={passwordError !== ""}>
                {passwordError}
              </HelperText>
            )}

            <TextInput
              label="Confirmez votre mot de passe"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              mode="outlined"
              secureTextEntry
            />
            {confirmPasswordError && (
              <HelperText type="error" visible={confirmPasswordError !== ""}>
                {confirmPasswordError}
              </HelperText>
            )}
            <View style={styles.centerButton}>
              <Button
                onPress={handleSavePassword}
                style={styles.settingsButton}
              >
                Enregistrer le nouveau mot de passe
              </Button>
            </View>
            <View style={styles.centerButton}>
              <Button onPress={removeAsyncToken} mode="contained">
                Logout
              </Button>
            </View>
          </View>
        </ScrollView>
        <Snackbar
          wrapperStyle={{ top: 0 }}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {messageError}
        </Snackbar>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
