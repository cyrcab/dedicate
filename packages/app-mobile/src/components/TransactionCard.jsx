import React from 'react';
import { Text } from "react-native";
import { Card, Button } from "react-native-paper";
import styles from "../pages/styles";

export default function TransactionCard({ amount, onPress }) {
    return (
        <Card style={styles.CardEvent}>
            <Card.Content style={styles.contentCentered}>
                <Text style={styles.centeredText}>{amount} DediCoins</Text>
            </Card.Content>

            <Button onPress={() => onPress(amount)}>Acheter pour {amount} Euros</Button>
        </Card>
    );
}
