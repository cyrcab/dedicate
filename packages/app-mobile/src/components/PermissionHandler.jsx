import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function PermissionHandler() {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
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
                            const { status } = await BarCodeScanner.requestPermissionsAsync();
                            setHasPermission(status === 'granted');
                        }
                    }
                ],
                { cancelable: false }
            );
        })();
    }, []);

    return null;
}
