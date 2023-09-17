import React from 'react';
import { View, ScrollView } from "react-native";
import styles from "../pages/styles";
import { useSelector } from "react-redux";
import TransactionCard from "./TransactionCard";
import { useStripePayments } from "../hooks/useStripePayments";
import { updateDedicoins } from "../services/transactionManager";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function TransactionCardList({ onTransactionSuccess }) {
    const amounts = [10, 20, 30, 40, 50, 100];

    const {
        initializePaymentSheet,
        presentPaymentSheet,
        publicKey,
        loading,
        setLoading
    } = useStripePayments();

    const userId = useSelector(state => state.auth.userId);

    const addDedicoins = async (amount) => {
        const isInitialized = await initializePaymentSheet(amount);
        if (isInitialized) {
            const { error } = await presentPaymentSheet();
            if (error) {
                console.log(`Error code: ${error.code}`, error.message);
            } else {
                console.log('Success', 'Your order is confirmed!');
                const newDediCoinsValue = await updateDedicoins(userId, amount);
                if (newDediCoinsValue !== null) {
                    onTransactionSuccess(newDediCoinsValue);
                }
            }
            setLoading(false);
        }
    };

    return (
        <StripeProvider publishableKey={publicKey}>
            <View style={styles.containerHome}>
                <ScrollView style={styles.eventListHome}>
                    {amounts.map((amount, index) => (
                        <TransactionCard
                            key={index}
                            amount={amount}
                            onPress={() => addDedicoins(amount)}
                        />
                    ))}
                </ScrollView>
            </View>
        </StripeProvider>
    );
}
