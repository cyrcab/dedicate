import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { axiosApiInstance } from "../../../axios.config";
import { backendUrl } from "../../backendUrl";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TransactionCardList from "../../components/TransactionCardList";

import styles from "../styles";

export default function Wallet() {
    const [dediCoins, setDediCoins] = useState(0);
    const isFocused = useIsFocused();
    const userId = useSelector(state => state.auth.userId);

    function UserDedicoins(newDediCoinsValue) {
        if (newDediCoinsValue !== undefined) {
            setDediCoins(newDediCoinsValue);
        } else {
            axiosApiInstance.get(backendUrl + "users/dedicoins/" + userId).then((response) => {
                setDediCoins(response.data.data);
            });
        }
    }

    useEffect(() => {
        UserDedicoins();
    }, [isFocused]);

    return (
        <View style={styles.containerHome}>
            <View style={styles.headerHome}>
                <Text style={styles.logoHome}>Wallet</Text>
                <Text style={styles.logoHome}>Dedicoins: {dediCoins}</Text>
            </View>
            <TransactionCardList onTransactionSuccess={(newVal) => UserDedicoins(newVal)} />
        </View >
    );
}
