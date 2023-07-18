import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from "../pages/styles";
import ScannerCodeQR from "./ScannerCodeQR";

export default function CodeQR() {
  const [startScanning, setStartScanning] = useState(false);

  return (
    <>
      <ScannerCodeQR
        startScanning={startScanning}
        resetScanning={() => setStartScanning(false)}
      />

      <Button
        icon="qrcode"
        mode="contained"
        style={styles.buttonCodeQR}
        contentStyle={{ width: 80, height: 60 }}
        labelStyle={{ fontSize: 40 }}
        onPress={() => setStartScanning(true)}
      />
    </>
  );
}
