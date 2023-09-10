import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ImageBackground,

} from 'react-native';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import CloseAuctions from '../components/CloseAuctions';

export default function Event({ navigation }) {
  const [idEvent, setIdEvent] = useState(0);
  const [music, setMusic] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [event, setEvent] = useState([]);
  const idEventRef = useRef(0);
  const [intervalId, setIntervalId] = useState(null);

  function updateIdEvent(newIdEvent) {
    setIdEvent(newIdEvent);
    idEventRef.current = newIdEvent;
  }

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + 'encheres/' + idEventRef.current)
      .then((response) => {
        setMusic(response.data.votes);
        setIsActive(response.data.actif.isActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function EventInfos() {
    axiosApiInstance
      .get(backendUrl + 'events/one/' + idEventRef.current)
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
        // console.log(error);
      });
  }

  function startInterval() {
    const intervalDelay = 10000; // 5 minutes in milliseconds
    const id = setInterval(() => {
      musicInfos();
    }, intervalDelay);

    setIntervalId(id);
  }

  function stopInterval() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      EventActif();
      // Start the interval when the component is focused
      startInterval();
      // Clean up the interval and stop it when the component is unfocused or unmounts
      return () => {
        stopInterval();
      };
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/fondHome.jpg')}
      style={styles.backgroundImage}
    >
      {idEvent !== 0 ? (
        <>
          {isActive ? (
            <>
              <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.eventName}>{event.nom}</Text>

                {music.map((item, index) => {
                  const isTopTen = index < event.nbSlots;

                  return (
                    <Card
                      key={index}
                      style={[styles.card, isTopTen && styles.topTenCard]}
                      onPress={() =>
                        navigation.navigate('Enchérir', {
                          event: event,
                          item: item,
                        })
                      }
                    >
                      <Card.Title
                        title={item.Musique.artiste}
                        subtitle={item.Musique.titre}
                        left={() => (
                          <Image
                            source={{ uri: item.Musique.album }}
                            style={{ width: 50, height: 50, borderRadius: 10 }}
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
                    navigation.navigate('Musique', { event: event })
                  }
                >
                  Ajoutez un titre
                </Button>
              </ScrollView>
            </>
          ) : (
              <CloseAuctions idEventRef={idEventRef.current} />
          )}
        </>
      ) : (
        <Text style={styles.noEventMessage}>
          Vous n'avez aucun événement actif
        </Text>
      )}
    </ImageBackground>
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
  noEventMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    marginTop: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
