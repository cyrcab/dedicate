import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import EventsCard from '../components/EventsCard';

export default function Home(){ 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DEDICATE</Text>
        <FontAwesome name="search" size={24} style={styles.searchIcon} />
      </View>
      <ScrollView style={styles.eventList}>

          <EventsCard />
      </ScrollView>
    </View>
  );
};

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
    marginTop: 30
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIcon: {
    marginLeft: 16,
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  eventItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
