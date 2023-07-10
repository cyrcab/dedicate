import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import { Avatar, Button } from "react-native-paper";
import { logo } from "../../assets/oclub.png";

export default function ReadMore({ route }) {
  const { event } = route.params;

  return (
    <ScrollView style={styles.containerReadMore}>
      <View style={styles.etablissementInformation}>
        <Avatar.Image size={100} source={require("../../assets/oclub.png")} />
        <View style={styles.containerEtablissementInformation}>
          <Text>{event.Etablissement.nom}</Text>
          <Text>{event.Etablissement.adresse}</Text>
          <Text>{event.Etablissement.ville}</Text>
        </View>
      </View>
      <View style={styles.readMorePresentation}>
        <Text style={styles.title}>{event.nom}</Text>
        <Text style={styles.price}>
          Prix de base des musiques: {event.prix}€
        </Text>
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
      <Button
        mode="contained"
        style={styles.qrCodeButton}
        onPress={() => console.log('Pressed')}
      >
        SCANNEZ LE QR CODE
      </Button>
    </ScrollView>
  );
}
