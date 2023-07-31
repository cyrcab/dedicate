import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles";

export default function Wallet({ navigation }) {

    return (
        <View style={styles.containerHome}>
            <View style={styles.headerHome}>
                <Text style={styles.logoHome}>Wallet</Text>
            </View>
            <View style={styles.centerView}>
                <Button
                    title="Bank Details"
                    onPress={() => navigation.navigate('Bank Details')}
                    color="#841584"
                />
            </View>
            <View style={styles.centerView}>
                <Button
                    title="Add Dedicoin"
                    onPress={() => navigation.navigate('Ajouter')}
                    color="#841584"
                />
            </View>
        </View>
    );
}
