import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function PermissionHandler() {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.getPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    "Accès à l'appareil photo",
                    "Nous avons besoin de votre permission pour accéder à l'appareil photo afin de scanner les codes QR.",
                    [
                        {
                            text: "Annuler",
                            style: "cancel"
                        },
                        {
                            text: "OK",
                            onPress: async () => {
                                const response = await BarCodeScanner.requestPermissionsAsync();
                                setHasPermission(response.status === 'granted');
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    return null;
}
