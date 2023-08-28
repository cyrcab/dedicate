import { Card } from "react-native-paper";
import { Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../pages/styles";
import { backendUrlImages } from "../backendUrl";

export default function EventsCard({ item }) {
  const navigation = useNavigation();
  const url = item.photo ? item.photo.replace(/\\/g, '/') : null;
  const date = new Date(item.date);
  const jour = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant le jour si nécessaire
  const mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Ajoute un zéro devant le mois si nécessaire

  return (
    <Card
      onPress={() => {
        navigation.navigate("Information sur la soirée", { event: item });
      }}
      style={styles.CardEvent}
      mode="elevated"
    >
      <Card.Title
        title={item.nom}
        subtitle={item.type}
        left={() => (
          url ? (
            <Image
              source={{ uri: backendUrlImages + url }}
              style={{ width: 50, height: 50 }}
            />
          ) : null
        )}
        right={() => (
          <Text style={{ marginRight: 20 }}>
            {jour}/{mois}
          </Text>
        )}
      />
    </Card>
  );
}

