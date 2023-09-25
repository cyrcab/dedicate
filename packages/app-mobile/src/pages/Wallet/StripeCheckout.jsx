import StripeCheckoutWebView from 'react-native-stripe-checkout-webview';

export default function StripeCheckout({ route }) {
    const { sessionId } = route.params;

    return (
        <StripeCheckoutWebView
            stripePublicKey={publicKey}

            checkoutSessionInput={{
                sessionId,
            }}
            onSuccess={(url) => {
                console.log("Paiement réussi:", url);
                // Traiter le succès du paiement
            }}
            onCancel={(url) => {
                console.log("Paiement annulé:", url);
                // Traiter l'annulation du paiement
            }}
        />
    );
}
