import { Text, Card, Divider } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';
import { axiosApiInstance } from '../../axios.config';
import { useState, useEffect } from 'react';
import { backendUrl } from '../backendUrl';
import MusicList from './MusicList';
import ConfettiCannon from 'react-native-confetti-cannon'; // Importez ConfettiCannon

export default function closeAuctions({ idEventRef }) {
  const [music, setMusic] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false); // État pour contrôler l'affichage des confettis

  useEffect(() => {
    musicInfos();
  }, []);

  function musicInfos() {
    axiosApiInstance
      .get(backendUrl + 'diffuser/vote/' + idEventRef)
      .then((response) => {
        setMusic(response.data.enchere.diffuser);
        setShowConfetti(true); // Activer les confettis après le chargement des données
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.containerRecap}>
      <Text style={styles.noEventMessage}>Enchère clôturée 🚫</Text>
      <ScrollView style={styles.eventsContainer}>
        <Text style={styles.noEventMessage}>
          Voici les musiques sélectionnées
        </Text>
        {music.map((item, index) => (
          <MusicList item={item} key={index} />
        ))}
      </ScrollView>

      {showConfetti && (
        <ConfettiCannon
          count={100} // Nombre de confettis
          origin={{ x: -10, y: 0 }} // Position de départ
          autoStart={true}
          fadeOut={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noEventMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  eventsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fun translucent background
    borderRadius: 10,
    paddingTop: 20,
  },
  containerRecap: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
});
