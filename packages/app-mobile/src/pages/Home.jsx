import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';
import EventsCard from '../components/EventsCard';
import { axiosApiInstance } from '../../axios.config';
import { backendUrl } from '../backendUrl';
import CodeQR from '../components/CodeQR';
import { Button, Chip } from 'react-native-paper';

export default function Home() {
  const [event, setEvent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState('');

  function EventInfo(city) {
    axiosApiInstance
      .get(backendUrl + 'events/next/next/' + city)
      .then((response) => {
        setEvent(response.data.data);
        setRefreshing(false);
      });
  }

  const onRefresh = () => {
    setRefreshing(true);
    EventInfo(city);
  };

  useEffect(() => {
    EventInfo(city);
  }, [city]);

  const getCityNameFromLocation = async (location) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords.latitude}&lon=${location.coords.longitude}`,
      );
      if (response.data && response.data.address) {
        EventInfo(response.data.address.municipality);
        setCity(response.data.address.municipality);
      }
      setLoadingLocation(false);
    } catch (error) {
      console.log('Erreur lors de la récupération du nom de la ville', error);
      setLoadingLocation(false);
    }
  };

  const getLocation = async () => {
    try {
      setLoadingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission de géolocalisation refusée');
        setLoadingLocation(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Lowest,
      });
      setLocation(location);
      getCityNameFromLocation(location);
    } catch (error) {
      console.log(
        'Erreur lors de la récupération de la géolocalisation',
        error,
      );
      setLoadingLocation(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DEDICATE</Text>
        <Button
          icon={({ size, color }) => (
            <FontAwesome name="map-marker" size={size} color={color} />
          )}
          style={styles.locationButton}
          onPress={getLocation}
          mode="contained"
        >
          Localisation
        </Button>
      </View>
      {city && (
        <View style={styles.chipContainer}>
          <Chip
            icon={'trash-can-outline'}
            mode="outlined"
            onPress={() => setCity('')}
            style={styles.chip}
          >
            {city}
          </Chip>
        </View>
      )}
      <ScrollView
        style={styles.eventList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {event.map((item, index) => (
          <EventsCard item={item} key={index} />
        ))}
      </ScrollView>

      <CodeQR />

      {loadingLocation && (
        <View style={styles.loadingContainer}>
          <Text>Chargement...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  locationButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 231, 254, 0.8)',
  },
  chip: {
    width: 110,
    margin: 6,
  },
  chipContainer: {
    overflow: 'hidden'
  },
});
