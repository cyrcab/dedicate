import { Card, Button } from "react-native-paper";
import { Alert } from "react-native";
import styles from "../pages/styles";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import { useNavigation } from "@react-navigation/native";

export default function PaymentMethodCard({ method, onRefresh }) {
    const navigation = useNavigation();

    const deletePaymentMethod = () => {
        axiosApiInstance.delete(backendUrl + "paymentMethods/" + method.id)
            .then(() => {
                onRefresh();  // Rafraîchir la liste des méthodes de paiement
            })
            .catch((error) => {
                console.error("Error deleting payment method: ", error);
            });
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Payment Method",
            "Are you sure you want to delete this payment method?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: deletePaymentMethod
                }
            ],
            { cancelable: false }
        );
    };

    const modifyPaymentMethod = () => {
        navigation.navigate('PaymentMethodForm', {
            id: method.id,
            cardNumber: method.cardNumber,
            expDate: method.expDate
        });
    };

    return (
        <Card style={styles.CardEvent}>
            <Card.Title
                title={"Card Number: " + method.cardNumber}
                subtitle={"Expiration Date: " + method.expDate}
            />
            <Card.Actions>
                <Button onPress={modifyPaymentMethod}>Modify</Button>
                <Button onPress={confirmDelete}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}
