import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import styles from "./styles";

import styles from "./styles";

export default function Event({ navigation }) {
  const [idEvent, setIdEvent] = useState(0);
  const [music, setMusic] = useState([]);
  const [event, setEvent] = useState([]);
  const idEventRef = useRef(0);

  function updateIdEvent(newIdEvent) {
    setIdEvent(newIdEvent);
    idEventRef.current = newIdEvent;
  }

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + 'encheres/' + idEventRef.current) // Use the ref value instead of the state value
      .then((response) => {
        setMusic(response.data.votes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function EventInfos() {
    axiosApiInstance
      .get(backendUrl + 'events/one/' + idEventRef.current) // Use the ref value instead of the state value
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function EventActif() {
    axiosApiInstance
      .get(backendUrl + 'events/eventActif/me')
      .then((response) => {
        updateIdEvent(response.data.data.id);
        EventInfos();
        musicInfos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      EventActif();
    }, []),
  );



  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {idEvent !== 0 ? (
        <>
          <Text style={styles.eventName}>{event.nom}</Text>

          {music.map((item, index) => {
            const isTopTen = index < event.nbSlots; // Vérifie si l'index est inférieur à 10

            return (
              <Card
                key={index}
                style={[styles.card, isTopTen && styles.topTenCard]} // Applique le style "topTenCard" si c'est l'une des 10 premières musiques
                onPress={() =>
                  navigation.navigate('Enchérir', {
                    event: event,
                    item: item,
                    index: index,
                  })
                }
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
        </>
      ) : (
        <Text style={styles.noEventMessage}>
          Vous n'avez aucun événement actif
        </Text>
      )}
    </ScrollView>
  );
}
