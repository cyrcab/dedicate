import { Card } from "react-native-paper";
import { Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../pages/styles";

export default function EventsHistoric({ item }) {
  const navigation = useNavigation();
  const date = new Date(item.date);
  const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant le jour si nécessaire
  const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Ajoute un zéro devant le mois si nécessaire
  const annee = date.getFullYear();
  return (
    <Card
      onPress={() => {
        navigation.navigate("Informations de la soirée", { event: item });
      }}
      style={styles.CardEvent}
    >
      <Card.Title
        title={item.nom}
        subtitle={item.type}
        left={() => (
          <Image
            source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
            style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
          />
        )}
        right={() => (
          <Text style={{ marginRight: 10 }}>
            {jour}/{mois}/{annee}
          </Text>
        )}
      />
    </Card>
  );
}
