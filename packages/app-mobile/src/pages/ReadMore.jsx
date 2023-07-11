import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import styles from "./styles";
import { Avatar, Button, IconButton } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ReadMore({ route }) {
  const { event } = route.params;
  const [scanning, setScanning] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {scanning && (
        <View style={StyleSheet.absoluteFillObject}>
          <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
          <IconButton
            icon="close"
            color="white"
            size={24}
            onPress={() => setScanning(false)}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
            }}
          />
        </View>
      )}

      {!scanning && (
        <ScrollView style={styles.containerReadMore}>
          <View style={styles.etablissementInformation}>
            <Avatar.Image size={100} source={require("../../assets/oclub.png")} />
            <View style={styles.containerEtablissementInformation}>
              <Text>{event.Etablissement.nom}</Text>
              <Text>{event.Etablissement.adresse}</Text>
              <Text>{event.Etablissement.ville}</Text>
            </View>
          </View>
          <View style={styles.readMorePresentation}>
            <Text style={styles.title}>{event.nom}</Text>
            <Text style={styles.price}>
              Prix de base des musiques: {event.prix}€
            </Text>
          </View>
          <Text style={styles.description}>
            Venez nombreux, super soirée électro !
          </Text>
          <View style={styles.musicTypeContainer}>
            <Text style={styles.musicTypeLabel}>Type de musique :</Text>
            <Button mode="elevated" style={styles.musicTypeButton}>
              {event.type}
            </Button>
          </View>
          <Button
            mode="contained"
            style={styles.qrCodeButton}
            onPress={() => setScanning(true)}
          >
            SCANNEZ LE QR CODE
          </Button>
        </ScrollView>
      )}
    </View>
  );
}
