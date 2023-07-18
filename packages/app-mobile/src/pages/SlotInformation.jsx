import React, { useEffect, useState } from 'react';
import { axiosApiInstance } from '../../axios.config';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { backendUrl } from '../backendUrl';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SlotInformation({ route }) {
  const { event } = route.params;
  const [accessToken, setAccessToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null); // New state for selected track
  const [enchere, setEnchere] = useState(0);
  const navigation = useNavigation();


  const clientid = '15bc2c43418a43699f3aa638e67ec78f';
  const secret = '487bf1340feb43b18118e9495836c7fd';

  useEffect(() => {
    axios
      .post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials&client_id=' +
          clientid +
          '&client_secret=' +
          secret,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      search();
    } else {
      setTracks([]);
    }
  }, [searchQuery]);

  async function search() {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  }

  function selectTrack(track) {
    setSelectedTrack(track);
  }

  function clearSelectedTrack() {
    setSelectedTrack(null);
    setEnchere(0);
    Keyboard.dismiss();
  }

  function handleEncherir() {
    AsyncStorage.getItem('userId') // Récupère la valeur de 'userId' depuis l'AsyncStorage
      .then((userId) => {
        const musicVoted = {
          eventId: event.id.toString(),
          userId: userId, // Utilise la valeur récupérée de l'AsyncStorage
          prix: enchere,
          nomMusique: selectedTrack.artists[0].name,
          artisteMusique: selectedTrack.name,
          album: selectedTrack.album.images[0].url,
        };
        axiosApiInstance
          .post(backendUrl + 'encheres', musicVoted)
          .then((response) => {
            console.log(response);
            navigation.navigate('Event'); 
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(tracks);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!selectedTrack && (
            <>
              <TextInput
                style={styles.input}
                label="Rechercher"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />

              <ScrollView style={styles.scrollView}>
                {tracks.map((track) => (
                  <TouchableOpacity
                    key={track.id}
                    style={styles.trackContainer}
                    onPress={() => selectTrack(track)}
                  >
                    <Image
                      source={{ uri: track.album.images[0].url }}
                      style={styles.albumImage}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.artistName}>
                        {track.artists[0].name}
                      </Text>
                      <Text style={styles.trackName}>{track.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {selectedTrack && (
            <>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={clearSelectedTrack}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <View style={styles.selectedTrackContainer}>
                <Image
                  source={{ uri: selectedTrack.album.images[0].url }}
                  style={styles.selectedTrackImage}
                />
                <View style={styles.selectedTrackInfo}>
                  <Text style={styles.selectedArtistName}>
                    {selectedTrack.artists[0].name}
                  </Text>
                  <Text style={styles.selectedTrackName}>
                    {selectedTrack.name}
                  </Text>
                  <View style={styles.bidContainer}>
                    <TextInput
                      style={styles.bidInput}
                      label={`Minimum ${event.prix}€`}
                      value={enchere}
                      mode="outlined"
                      onChangeText={(text) => setEnchere(parseFloat(text))}
                      keyboardType="numeric"
                    />
                    <Button
                      mode="contained"
                      onPress={handleEncherir}
                      disabled={enchere < event.prix}
                    >
                      Enchérir
                    </Button>
                  </View>
                </View>
              </View>
            </>
          )}
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
