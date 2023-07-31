import { View, Text, ScrollView, ImageBackground } from "react-native";
import styles from "./styles";
import { Avatar, Button } from "react-native-paper";
import MusicList from "../components/MusicList";
import { backendUrlImages } from '../backendUrl';

export default function EventInformation({ route }) {
  const { event } = route.params;
  const url = event.photo ? event.photo.replace(/\\/g, '/') : null;

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
        {event.enchere.map((item, index) => (
          <MusicList item={item} key={index} />
        ))}
      </ScrollView>
    </View>
    </ImageBackground>
  );
}
