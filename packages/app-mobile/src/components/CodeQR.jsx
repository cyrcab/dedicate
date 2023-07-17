import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';

import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

import styles from "../pages/styles";

export default function CodeQR() {
  const [scanning, setScanning] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanning(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const scannedData = JSON.parse(data);
    try {
      axiosApiInstance.post(backendUrl + 'events/add/' + scannedData.idEvent);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {scanning && (
        <View style={styles.containerCodeQR}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <IconButton
            icon="close"
            color="white"
            size={24}
            onPress={() => setScanning(false)}
            style={styles.closeIconCodeQR}
          />
        </View>
      )}

      <Button
        icon="qrcode"
        mode="contained"
        style={styles.buttonCodeQR}
        contentStyle={{ width: 80, height: 60 }}
        labelStyle={{ fontSize: 40 }}
        onPress={() => setScanning(true)}
      />
    </>
  );
}
