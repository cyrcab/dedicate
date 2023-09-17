import { useStripe } from '@stripe/stripe-react-native';
import { useState, useEffect } from "react";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

export const useStripePayments = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [publicKey, setPublicKey] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPublicKey = async () => {
        try {
            const response = await axiosApiInstance.get(backendUrl + "payments/public-key");
            setPublicKey(response.data.publicKey);
        } catch (error) {
            console.error("Erreur lors de la récupération de la clé publique Stripe:", error);
        }
    };

    const initializePaymentSheet = async (amount) => {
        try {
            const response = await axiosApiInstance.post(backendUrl + "payments/create-payment-intent", {
                amount
            });
            const { clientSecret, customer } = response.data;

            const { error } = await initPaymentSheet({
                customerId: customer,
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: 'Merchant Name',
            });
            if (!error) {
                setLoading(true);
                return true;
            }
        } catch (error) {
            console.error("Erreur lors de l'initialisation du PaymentSheet:", error);
        }
        return false;
    };

    useEffect(() => {
        fetchPublicKey();
    }, []);

    return {
        initializePaymentSheet,
        presentPaymentSheet,
        publicKey,
        loading,
        setLoading
    };
}
