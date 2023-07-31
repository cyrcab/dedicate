import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import EventsHistoric from '../components/EventHistoric';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import background from '../../assets/fondHome.jpg'

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('');
  const [event, setEvent] = useState([]);

  const profileInfo = () => {
    axiosApiInstance
      .get(backendUrl + 'users/' + userId)
      .then((data) => {
        setUser(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const historicalEventInfo = () => {
    axiosApiInstance
      .get(backendUrl + 'events/me/' + userId)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then((userId) => {
        setUserId(userId);
      })
      .catch((error) => {
        console.log(
          "Une erreur s'est produite lors de la récupération de userId :",
          error,
        );
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      profileInfo();
      historicalEventInfo();
    }, [userId]),
  );

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Avatar.Image size={100} source={require("../../assets/profile.jpg")} />
          <IconButton
            icon="cog"
            size={30}
            onPress={() =>
              navigation.navigate('Modifier votre profil', { user, setUser })
            }
          />
        </View>

        <Text style={styles.profileName}>
          {user.nom} {user.prenom}
        </Text>

        <Text style={styles.eventsTitle}>Vos derniers événements</Text>

        <ScrollView style={styles.eventsContainer}>
          {event.length === 0 ? (
            <Text style={styles.noEventsText}>Vous n'avez participé à aucun événement</Text>
          ) : (
            event.map((item, index) =>  <EventsHistoric item={item} key={index}  />)
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fun translucent background
    borderRadius: 10,
    paddingTop: 20
  },
  noEventsText: {
    fontSize: 16,
    color: 'black', // Fun text color
    textAlign: 'center',
    
  },
});

export default ProfilePage;