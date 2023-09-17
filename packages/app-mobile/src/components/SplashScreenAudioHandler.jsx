// SplashScreenAudioHandler.jsx
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';

function SplashScreenAudioHandler() {
    const [sound, setSound] = useState();

    useEffect(() => {
        const playSound = async () => {
            try {
                console.log("Lecture du son de l'écran de démarrage...");
                await SplashScreen.preventAutoHideAsync();

                const { sound: newSound } = await Audio.Sound.createAsync(require('../../assets/sounds/dedicate_slogan1.mp3'));
                setSound(newSound);
                await newSound.playAsync();
            } catch (error) {
                console.error("Erreur lors de la lecture du son:", error);
                SplashScreen.hideAsync();
            }
        }

        playSound();
    }, []);

    useEffect(() => {
        if (sound) {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    SplashScreen.hideAsync();
                    sound.unloadAsync();
                }
            });
        }
    }, [sound]);

    return null;  // Pas de rendu visuel pour ce composant
}

export default SplashScreenAudioHandler;
