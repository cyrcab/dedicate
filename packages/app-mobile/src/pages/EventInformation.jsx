import { View, Text, ScrollView, ImageBackground } from "react-native";
import styles from "./styles";
import { Avatar, Button } from "react-native-paper";
import MusicList from "../components/MusicList";
import { backendUrlImages } from '../backendUrl';
import { useState, useEffect } from "react";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

export default function EventInformation({ route }) {
  const { event } = route.params;
  const url = event.photo ? event.photo.replace(/\\/g, '/') : null;
  const [music, setMusic] = useState([]);

  useEffect(() => {
    musicInfos();
  }, []);

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + 'diffuser/vote/' + event.id)
      .then((response) => {
        setMusic(response.data.enchere.diffuser);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <ImageBackground
    source={require('../../assets/fondReadMore.jpg')}
    style={styles.backgroundImage}
  >  
    <View style={styles.containerEventInformation}>
    <View style={styles.etablissementInformation}>
              <Avatar.Image
                size={150}
                source={{ uri: backendUrlImages + url }}
              />
              <View style={styles.containerEtablissementInformation}>
                <Text style={styles.EtablissementNom}>{event.nom}</Text>
                <Text style={styles.EtablissementNom}>{event.lieu}</Text>
                <Text style={styles.EtablissementNom}>{event.ville}</Text>
              </View>
            </View>
            <Text style={styles.description}>{event.description}</Text>
            <View style={styles.musicTypeContainer}>
              <Text style={styles.musicTypeLabel}>Type de musique :</Text>
              <Button mode="elevated" style={styles.musicTypeButton}>
                {event.type}
              </Button>
            </View>
      <ScrollView>
        {music.map((item, index) => (
          <MusicList item={item} key={index} />
        ))}
      </ScrollView>
    </View>
    </ImageBackground>
  );
}
