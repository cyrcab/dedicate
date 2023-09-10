import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import { backendUrl } from '../backendUrl';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import axios from 'axios';
import { axiosApiInstance } from '../../axios.config';
import { useFocusEffect } from '@react-navigation/native'; // Importez useFocusEffect depuis React Navigation

export default function SlotInformation({ route }) {
  const { event } = route.params;
  const [accessToken, setAccessToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [enchere, setEnchere] = useState(0);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const clientid = '15bc2c43418a43699f3aa638e67ec78f';
  const secret = '487bf1340feb43b18118e9495836c7fd';

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

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
        `https://api.spotify.com/v1/search?q=track:"${searchQuery}" genre:${event.type}&type=track&market=FR`,
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

  async function handlePlayPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

  async function loadAudio(track) {
    try {
      if (track.preview_url) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: track.preview_url },
          { shouldPlay: false },
          onPlaybackStatusUpdate,
        );
        setSound(newSound);
      } else {
        console.log("This track doesn't have a preview URL.");
        setIsPlaying(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
  };

  function selectTrack(track) {
    setSelectedTrack(track);
    loadAudio(track);
  }

  function clearSelectedTrack() {
    if (sound) {
      sound.unloadAsync();
    }
    setSelectedTrack(null);
    setEnchere(0);
    setIsPlaying(false);
    Keyboard.dismiss();
  }

  async function handleEncherir() {
    AsyncStorage.getItem('userId')
      .then((userId) => {
        const musicVoted = {
          eventId: event.id.toString(),
          userId: userId,
          prix: enchere,
          nomMusique: selectedTrack.artists[0].name,
          artisteMusique: selectedTrack.name,
          album: selectedTrack.album.images[0].url,
        };
        axiosApiInstance
          .post(backendUrl + 'encheres', musicVoted)
          .then((response) => {
            // Déchargez le son lorsque vous avez terminé avec lui
            if (sound) {
              sound.unloadAsync();
            }
            navigation.navigate('Event');
          })
          .catch((error) => {
            console.log(error);
            setMessageError(error.response.data.message);
            setVisible(true);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDismissSnackBar = () => setVisible(false);

  // Utilisez useFocusEffect pour décharger le son lorsque la page perd le focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [])
  );

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
                  {selectedTrack.preview_url && (
                    <Button
                      mode="contained"
                      onPress={handlePlayPause}
                      style={styles.playPauseButton}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                  )}
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
                <Snackbar
                  wrapperStyle={{ top: 0 }}
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                >
                  {messageError}
                </Snackbar>
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
    marginTop: 0,
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
  playPauseButton: {
    marginTop: 8,
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
