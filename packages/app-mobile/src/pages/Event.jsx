import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, Image } from "react-native";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import { Button, Card } from "react-native-paper";

import styles from "./styles";

export default function Event({ navigation }) {
  const idEvent = "1";
  const [music, setMusic] = useState([]);
  const [event, setEvent] = useState([]);

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + "encheres/" + idEvent)
      .then((response) => {
        setMusic(response.data.votes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function EventInfos() {
    axiosApiInstance
      .get(backendUrl + "events/one/" + idEvent)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    EventInfos();
    musicInfos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.containerEvent}>
      <Text style={styles.eventNameEvent}>{event.nom}</Text>

      {music.map((item, index) => (
        <Card
          key={index}
          style={styles.cardEvent}
          onPress={() => navigation.navigate("SlotsInformation")}
        >
          <Card.Title
            title={item.Musique.artiste}
            subtitle={item.Musique.titre}
            left={() => (
              <Image
                source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
                style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
              />
            )}
            right={() => <Text style={{ marginRight: 10 }}>{item.prix}€</Text>}
          />
        </Card>
      ))}

      <Button
        mode="contained"
        style={styles.buttonEvent}
        onPress={() => navigation.navigate("SlotsInformation")}
      >
        Ajoutez un titre
      </Button>
    </ScrollView>
  );
}
