import React from 'react';
import { Card, Button } from "react-native-paper";
import styles from "../pages/styles";

export default function TransactionCard({ amount, onPress }) {
    return (
        <Card style={styles.CardEvent}>
            <Card.Title
                title={`${amount} Euros`}
                subtitle={`${amount} DediCoins`}
            />
            <Card.Actions>
                <Button onPress={() => onPress(amount)}>Acheter</Button>
            </Card.Actions>
        </Card>
    );
}
