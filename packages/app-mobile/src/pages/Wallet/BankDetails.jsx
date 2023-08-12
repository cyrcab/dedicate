import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, Button } from "react-native";
import PaymentMethodCard from "../../components/PaymentMethodCard";
import { axiosApiInstance } from "../../../axios.config";
import { backendUrl } from "../../backendUrl";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles";

export default function BankDetails() {
    const userId = useSelector(state => state.auth.userId);
    const [methods, setMethods] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    function fetchPaymentMethods() {
        axiosApiInstance.get(backendUrl + "paymentMethods/user/" + userId)
            .then((response) => {
                setMethods(response.data);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error("Error fetching payment methods: ", error);
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchPaymentMethods();
    };

    useEffect(() => {
        fetchPaymentMethods();
    }, [isFocused]);

    return (
        <View style={styles.containerHome}>
            <Button
                title="Ajouter une méthode de paiement"
                onPress={() => navigation.navigate('PaymentMethodForm')}
            />
            <ScrollView
                style={styles.eventListHome}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {methods.map((method, index) => (
                    <PaymentMethodCard method={method} key={index} onRefresh={onRefresh} />
                ))}
            </ScrollView>
        </View>
    );
}
