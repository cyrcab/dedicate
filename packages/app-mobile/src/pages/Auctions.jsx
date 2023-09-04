import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import { useNavigation } from '@react-navigation/native';

export default function Auctions({ route }) {
  const { event, item } = route.params;
  const [enchere, setEnchere] = useState(0);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState('');

  function handleEncherir() {
    AsyncStorage.getItem('userId')
      .then((userId) => {
        const musicVoted = {
          eventId: event.id.toString(),
          userId: userId,
          prix: enchere,
          nomMusique: item.Musique.titre,
          artisteMusique: item.Musique.artiste,
          album: item.Musique.album,
          enchereId: item.id,
        };
        axiosApiInstance
          .post(backendUrl + 'encheres', musicVoted)
          .then((response) => {
            navigation.navigate('Event');
          })
          .catch((error) => {
            if (error.response.data.prix) {
              item.prix = error.response.data.prix;
            }
            setMessageError(error.response.data.message);
            setVisible(true);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDismissSnackBar = () => setVisible(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.selectedTrackContainer}>
          <Image
            source={{ uri: item.Musique.album }}
            style={styles.selectedTrackImage}
          />
          <View style={styles.selectedTrackInfo}>
            <Text style={styles.selectedArtistName}>
              {item.Musique.artiste}
            </Text>
            <Text style={styles.selectedTrackName}>{item.Musique.titre}</Text>
            <View style={styles.bidContainer}>
              <TextInput
                style={styles.bidInput}
                label={`Minimum ${item.prix + 1  }€`}
                value={enchere}
                mode="outlined"
                onChangeText={(text) => setEnchere(parseFloat(text))}
                keyboardType="numeric"
              />
              <Button
                mode="contained"
                onPress={handleEncherir}
                disabled={enchere < item.prix + 1|| isNaN(enchere)}
              >
                Enchérir
              </Button>
            </View>
          </View>
          <Snackbar
            wrapperStyle={{ top: 0 }}
            visible={visible}
            onDismiss={onDismissSnackBar}
          >
            {messageError}
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 40,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  albumImage: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  trackInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trackName: {
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedTrackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTrackImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  selectedTrackInfo: {
    alignItems: 'center',
  },
  selectedArtistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedTrackName: {
    fontSize: 18,
  },
  bidContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  bidInput: {
    width: 200,
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});
