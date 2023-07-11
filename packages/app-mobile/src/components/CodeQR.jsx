import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';

import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

export default function CodeQR() {
  const [scanning, setScanning] = useState(false); // utilisez un état local ici

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanning(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const scannedData = JSON.parse(data);
    try {
      //console.log(token)
      console.log(scannedData);
      axiosApiInstance.post(backendUrl + 'events/add/' + scannedData.idEvent);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {scanning && (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <IconButton
            icon="close"
            color="white"
            size={24}
            onPress={() => setScanning(false)}
            style={styles.closeIcon}
          />
        </View>
      )}

      <Button
        icon="qrcode"
        mode="contained"
        style={{
          borderRadius: 50,
          width: 60,
          height: 62,
          position: "absolute",
          bottom: 20,
          left: "41%",
        }}
        contentStyle={{ width: 80, height: 60 }}
        labelStyle={{ fontSize: 40 }}
        onPress={() => setScanning(true)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});
