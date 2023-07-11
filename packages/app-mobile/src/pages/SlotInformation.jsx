import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

export default function SlotInformation({}) {
  const [accessToken, setAccessToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const clientid = '15bc2c43418a43699f3aa638e67ec78f';
  const secret = '487bf1340feb43b18118e9495836c7fd';


  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials&client_id=" + clientid + "&client_secret=" + secret,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
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
        }
      );
      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Prix actuel : </Text>
      <Button>
        Enchérir
      </Button>
      <TextInput
        style={styles.input}
        label="Rechercher"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <ScrollView style={styles.scrollView}>
        {tracks.map((track) => (
          <View key={track.id} style={styles.trackContainer}>
            <Image
              source={{ uri: track.album.images[0].url }}
              style={styles.albumImage}
            />
            <View style={styles.trackInfo}>
              <Text style={styles.artistName}>{track.artists[0].name}</Text>
              <Text style={styles.trackName}>{track.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 40,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  trackContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 4,
  },
  trackName: {
    fontSize: 14,
  },
});