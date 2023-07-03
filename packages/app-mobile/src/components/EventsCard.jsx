import { View } from "react-native";
import { Card } from "react-native-paper";
import { Image } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function EventsCard() {
  const navigation = useNavigation();
  return (
    <Card
    onPress={() => {
      navigation.navigate("ReadMore");
    }}
    >
      <Card.Title
        title="Oclub"
        subtitle="Soirée électro-funk"
        left={() => (
          <Image
            source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
            style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
          />
        )}
      />
    </Card>
  );
}