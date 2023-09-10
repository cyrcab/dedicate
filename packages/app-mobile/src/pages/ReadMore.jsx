import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import styles from './styles';
import { Avatar, Button } from 'react-native-paper';
import ScannerCodeQR from '../components/ScannerCodeQR';
import { backendUrlImages } from '../backendUrl';

export default function ReadMore({ route }) {
  const { event } = route.params;
  const [startScanning, setStartScanning] = useState(false);
  const url = event.photo ? event.photo.replace(/\\/g, '/') : null;

  return (
    <ImageBackground
      source={require('../../assets/fondReadMore.jpg')}
      style={styles.backgroundImage}
    >
      <View style={StyleSheet.absoluteFillObject}>
        <ScannerCodeQR
          startScanning={startScanning}
          resetScanning={() => setStartScanning(false)}
        />

        {!startScanning && (
          <ScrollView style={styles.containerReadMore}>
            <View style={styles.etablissementInformation}>
              <Avatar.Image
                size={150}
                source={{ uri: backendUrlImages + url }}
              />
              <View style={styles.containerEtablissementInformation}>
                <Text style={styles.EtablissementNom}>{event.Etablissement.nom}</Text>
                <Text style={styles.EtablissementNom}>{event.Etablissement.adresse}</Text>
                <Text style={styles.EtablissementNom}>{event.Etablissement.ville}</Text>
              </View>
            </View>
            <View style={styles.readMorePresentation}>
              <Text style={styles.title}>{event.nom}</Text>
              <Text style={styles.price}>
                Prix de base des musiques: {event.prix}€
              </Text>
            </View>
            <Text style={styles.description}>{event.description}</Text>
            <View style={styles.musicTypeContainer}>
              <Text style={styles.musicTypeLabel}>Type de musique :</Text>
              <Button mode="elevated" style={styles.musicTypeButton}>
                {event.type}
              </Button>
            </View>
            <Button
              mode="contained"
              style={styles.qrCodeButton}
              onPress={() => setStartScanning(true)}
            >
              SCANNEZ LE QR CODE
            </Button>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}
