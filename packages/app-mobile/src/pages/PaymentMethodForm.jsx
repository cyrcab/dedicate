import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import { useNavigation } from "@react-navigation/native";

export default function PaymentMethodForm({ route }) {
    const navigation = useNavigation();

    const { id = null, cardNumber: cardNum = "", expDate: expiryDate = "" } = route.params ? route.params : {};

    const [methodId, setMethodId] = useState(id);
    const [cardNumber, setCardNumber] = useState(cardNum);
    const [expDate, setExpDate] = useState(expiryDate);

    // const [cardNumber, setCardNumber] = useState("");
    // const [expDate, setExpDate] = useState("");

    const [visible, setVisible] = useState(false);
    const [messageError, setMessageError] = useState("");

    const onDismissSnackBar = () => setVisible(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleAddMethod = () => {
        const data = {
            userId: 1, // Remplacez cette ligne par le moyen que vous utilisez pour obtenir l'ID de l'utilisateur actuellement connecté
            cardNumber: cardNumber,
            expDate: expDate,
        };

        if (methodId) {
            axiosApiInstance
                .put(backendUrl + "paymentMethods/" + methodId, data)
                .then(() => {
                    navigation.navigate('Bank Details');
                })
                .catch((error) => {
                    setMessageError(error.response.data.message);
                    setVisible(true);
                });
        } else {
            axiosApiInstance
                .post(backendUrl + "paymentMethods", data)
                .then(() => {
                    navigation.navigate('Bank Details');
                })
                .catch((error) => {
                    setMessageError(error.response.data.message);
                    setVisible(true);
                });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TextInput
                    style={styles.textInput}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    mode="outlined"
                    label="Numéro de carte"
                    placeholder="Entrez votre numéro de carte"
                />
                <TextInput
                    style={styles.textInput}
                    value={expDate}
                    onChangeText={setExpDate}
                    mode="outlined"
                    label="Date d'expiration"
                    placeholder="Entrez votre date d'expiration"
                />
                <Button
                    mode="contained"
                    onPress={handleAddMethod} // Appeler la fonction handleAddMethod lors du clic sur le bouton
                    style={styles.addButton}
                >
                    {methodId ? "Modifier" : "Ajouter"}
                </Button>
                <Snackbar
                    wrapperStyle={{ top: 0 }}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                >
                    {messageError}
                </Snackbar>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        width: "50%",
    },
    addButton: {
        marginTop: 10,
    },
});
