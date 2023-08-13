import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { axiosApiInstance } from "../../../axios.config";
import { backendUrl } from "../../backendUrl";
import { useSelector } from "react-redux";
import TransactionCard from "../../components/TransactionCard";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import styles from "../styles";

export default function AddDedicoin() {
    const userId = useSelector(state => state.auth.userId);
    const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState(null);
    const amounts = [10, 20, 30, 40, 50, 100];

    const navigation = useNavigation();

    useEffect(() => {
        axiosApiInstance
            .get(backendUrl + "paymentMethods/user/default/" + userId)
            .then((response) => {
                if (response.data && response.data.id) {
                    setDefaultPaymentMethodId(response.data.id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const redirectToBankDetails = () => {
        navigation.navigate('Bank Details');
    }

    function addDedicoins(amount) {
        axiosApiInstance
            .get(backendUrl + "paymentMethods/user/default/" + userId)
            .then((response) => {
                if (response.data && response.data.id) {
                    // alerte pour la confirmation si un moyen de paiement valide est trouvé
                    Alert.alert(
                        "Confirmation d'achat",
                        `Êtes-vous sûr de vouloir acheter ${amount} DediCoins pour ${amount} Euros ?`,
                        [
                            {
                                text: "Annuler",
                                style: "cancel"
                            },
                            {
                                text: "Confirmer",
                                onPress: () => processPurchase(amount, response.data.id) // procéder à l'achat
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    // alerte si aucun moyen de paiement valide n'est trouvé
                    Alert.alert(
                        "Méthode de paiement manquante",
                        "Veuillez sélectionner une méthode de paiement par défaut ou en ajouter une.",
                        [
                            {
                                text: "Annuler",
                                style: "cancel"
                            },
                            { text: "Ajouter", onPress: redirectToBankDetails }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function processPurchase(amount, paymentMethodId) {
        const data = {
            userId: userId,
            amount: amount,
            paymentMethodId: paymentMethodId,
        };

        useEffect(() => {
            axiosApiInstance
                .get(backendUrl + "paymentMethods/user/default/" + userId)
                .then((response) => {
                    if (response.data && response.data.id) {
                        setDefaultPaymentMethodId(response.data.id);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);

        const redirectToBankDetails = () => {
            navigation.navigate('Bank Details');
        }

        function addDedicoins(amount) {
            axiosApiInstance
                .get(backendUrl + "paymentMethods/user/default/" + userId)
                .then((response) => {
                    if (response.data && response.data.id) {
                        const data = {
                            userId: userId,
                            amount: amount,
                            paymentMethodId: response.data.id,
                        };

                        axiosApiInstance
                            .post(backendUrl + "transactions/", data)
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        Alert.alert(
                            "Méthode de paiement manquante",
                            "Veuillez sélectionner une méthode de paiement par défaut ou en ajouter une.",
                            [
                                {
                                    text: "Annuler",
                                    style: "cancel"
                                },
                                { text: "Ajouter", onPress: redirectToBankDetails }
                            ],
                            { cancelable: false }
                        );
                    }
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
