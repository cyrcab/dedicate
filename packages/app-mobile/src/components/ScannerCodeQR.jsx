import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';

import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

import styles from "../pages/styles";
import { Alert } from 'react-native';

import { useNavigation } from "@react-navigation/native";

export default function ScannerCodeQR({ startScanning, resetScanning }) {
    const [scanning, setScanning] = useState(false);
    // const [hasPermission, setHasPermission] = useState(null);
    const navigation = useNavigation();

    const onScan = ({ type, data }) => {
        //Alert.alert("Scan effectué", `Type: ${type}\nData: ${data}`);
    };

    const onSuccess = () => {
        Alert.alert("Succès", "L'événement a été ajouté avec succès.");
    };

    const onError = (message) => {
        // console.log("Message d'erreur reçu du serveur:", message);
        Alert.alert("Erreur", message);
    };

    // useEffect(() => {
    //     (async () => {
    //         Alert.alert(
    //             "Accès à l'appareil photo",
    //             "Nous avons besoin de votre permission pour accéder à l'appareil photo afin de scanner les codes QR.",
    //             [
    //                 {
    //                     text: "Annuler",
    //                     style: "cancel"
    //                 },
    //                 {
    //                     text: "OK",
    //                     onPress: async () => {
    //                         const { status } = await BarCodeScanner.requestPermissionsAsync();
    //                         setHasPermission(status === 'granted');
    //                     }
    //                 }
    //             ],
    //             { cancelable: false }
    //         );
    //     })();
    // }, []);


    useEffect(() => {
        if (startScanning) {
            setScanning(true);
        }
    }, [startScanning]);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanning(false);
        resetScanning();
        onScan({ type, data });

        const scannedData = JSON.parse(data);
        try {
            await axiosApiInstance.put(backendUrl + 'events/add/' + scannedData.idEvent);
            onSuccess();
            navigation.navigate("Event");
        } catch (err) {
            if (err.response && err.response.data) {
                onError(err.response.data.message);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <>
            {scanning ? (
                <View style={styles.containerCodeQR}>
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <IconButton
                        icon="close"
                        color="white"
                        size={24}
                        onPress={() => { setScanning(false); resetScanning(); }}
                        style={styles.closeIconCodeQR}
                    />
                </View>
            ) : (
                <View />
            )}
        </>
    );
}
