import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import { Button, Card } from 'react-native-paper';

export default function Event({ navigation }) {
  const idEvent = '1';
  const [music, setMusic] = useState([]);
  const [event, setEvent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + 'encheres/' + idEvent)
      .then((response) => {
        setMusic(response.data.votes);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onRefresh = () => {
    setRefreshing(true);
    musicInfos();
  };

  function EventInfos() {
    axiosApiInstance
      .get(backendUrl + 'events/one/' + idEvent)
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.eventName}>{event.nom}</Text>

      {music.map((item, index) => {
        const isTopTen = index < event.nbSlots; // Vérifie si l'index est inférieur à 10

        return (
          <Card
            key={index}
            style={[styles.card, isTopTen && styles.topTenCard]} // Applique le style "topTenCard" si c'est l'une des 10 premières musiques
            onPress={() => navigation.navigate('Enchérir', { event: event, item : item, index : index })}
          >
            <Card.Title
              title={item.Musique.artiste}
              subtitle={item.Musique.titre}
              left={() => (
                <Image
                  source={{ uri: item.Musique.album }} // Remplacez le chemin par le chemin réel de votre image
                  style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
                />
              )}
              right={() => (
                <Text style={{ marginRight: 10 }}>{item.prix}€</Text>
              )}
            />
          </Card>
        );
      })}

      <Button
        mode="contained"
        style={styles.button}
        onPress={() =>
          navigation.navigate('SlotsInformation', { event: event })
        }
      >
        Ajoutez un titre
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    marginBottom: 10,
  },
  topTenCard: {
    borderWidth: 2,
    borderColor: 'red',
  },
  button: {
    width: 'auto',
    alignSelf: 'center',
  },
});
