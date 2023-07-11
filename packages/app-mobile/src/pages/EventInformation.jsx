import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import { Avatar, Button } from "react-native-paper";
import MusicList from "../components/MusicList";

export default function EventInformation({ route }) {
  const { event } = route.params;
  const musique = [
    { titre: "La puissance", artiste: "Rohff" },
    { titre: "Galerie", artiste: "Ziak" },
    { titre: "Chiraq", artiste: "Ninho" },
  ];
  return (
    <View style={styles.containerEventInformation}>
      <View style={styles.etablissementInformationHistoric}>
        <Avatar.Image size={100} source={require("../../assets/oclub.png")} />
        <View style={styles.containerEtablissementInformation}>
          <Text>{event.lieu}</Text>
        </View>
      </View>
      <View style={styles.readMorePresentation}>
        <Text style={styles.title}>{event.nom}</Text>
      </View>
      <Text style={styles.description}>
        Venez nombreux, super soirée électro !
      </Text>
      <View style={styles.musicTypeContainer}>
        <Text style={styles.musicTypeLabel}>Type de musique :</Text>
        <Button mode="elevated" style={styles.musicTypeButton}>
          {event.type}
        </Button>
      </View>
      <ScrollView>
        {musique.map((item, index) => (
          <MusicList item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}
