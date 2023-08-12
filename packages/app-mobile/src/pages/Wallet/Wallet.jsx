import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { axiosApiInstance } from "../../../axios.config";
import { backendUrl } from "../../backendUrl";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles";

export default function Wallet({ navigation }) {
    const [dediCoins, setDediCoins] = useState(0);
    const isFocused = useIsFocused();
    const userId = useSelector(state => state.auth.userId);

    function UserDedicoins() {
        axiosApiInstance.get(backendUrl + "users/dedicoins/" + userId).then((response) => {
            setDediCoins(response.data.data);
        });
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
