import styles from './styles';
import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendUrl } from '../backendUrl';
import { setSignedIn, setUserId } from '../store/reducers/reducer';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  const dispatch = useDispatch();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  const handleLogin = () => {
    const data = {
      email: email,
      password: mdp,
    };

    axios
      .post(backendUrl + 'auth/login', data)
      .then((response) => {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('userId', response.data.data.id.toString());
        dispatch(setSignedIn(true));
        dispatch(setUserId(response.data.data.id));
      })
      .catch((error) => {
        setMessageError(error.response.data.message);
        setVisible(true);
        console.log(error);
      });
  };


  return (
    <ImageBackground
      source={require('../../assets/login.jpg')}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              onPress={() => navigation.navigate("Créer un compte")}
            >
              S'inscrire !
            </Text>
          </View>
          <Snackbar
            wrapperStyle={{ top: 0 }}
            visible={visible}
            onDismiss={onDismissSnackBar}
          >
            {messageError}
          </Snackbar>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
