import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { axiosApiInstance } from "../../../axios.config";
import { backendUrl } from "../../backendUrl";
import { useSelector } from "react-redux";
import TransactionCard from "../../components/TransactionCard";
import styles from "../styles";

export default function AddDedicoin() {
    const userId = useSelector(state => state.auth.userId);

    const amounts = [10, 20, 30, 40, 50, 100];

    function addDedicoins(amount) {
        const data = {
            userId: userId,
            amount: amount,
            paymentMethodId: 10, // Assurez-vous que l'ID de la méthode de paiement est correct pour chaque utilisateur
        };

        axiosApiInstance
            .post(backendUrl + "transactions/", data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.containerHome}>
            <ScrollView
                style={styles.eventListHome}
            >
                {amounts.map((amount, index) => (
                    <TransactionCard
                        key={index}
                        amount={amount}
                        onPress={addDedicoins}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
