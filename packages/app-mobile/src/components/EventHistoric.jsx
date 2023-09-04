import { Card } from "react-native-paper";
import { Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { backendUrlImages } from "../backendUrl";

export default function EventsHistoric({ item }) {
  const navigation = useNavigation();
  const date = new Date(item.date);
  const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant le jour si nécessaire
  const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Ajoute un zéro devant le mois si nécessaire
  const annee = date.getFullYear();
  const url = item.photo === "defaultEvent.jpg" ? item.photo = "images/default.jpeg" : item.photo.replace(/\\/g, '/') ;

  return (
    <Card
      onPress={() => {
        navigation.navigate("Récapitulatif de la soirée", { event: item });
      }}
      style={{width : ('90%'), alignSelf:'center', marginBottom: 20 }}
    >
      <Card.Title
        title={item.nom}
        subtitle={item.type}
        left={() => (
          url ? (
            <Image
              source={{ uri: backendUrlImages + url }}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
          ) : null
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
