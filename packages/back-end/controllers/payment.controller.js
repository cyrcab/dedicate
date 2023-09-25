const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (req, res) => {
    const customer = await stripe.customers.create();

    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "eur",
        customer: customer.id,
    });
    const clientSecret = paymentIntent.client_secret;

    res.status(200).json({ clientSecret, customer: customer.id });
};

module.exports.createTransaction = async (req, res) => {
    const { userId, amount } = req.body;

    // Créer une nouvelle transaction
    const transaction = await prisma.transaction.create({
        data: {
            userId,
            amount,
            type: 'purchase',
            date: new Date(),
        },
    });

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(400).json({ error: "L'utilisateur spécifié n'existe pas" });
    }

    // Mettre à jour les dediCoins de l'utilisateur
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { dediCoins: user.dediCoins + amount },
    });

    // Retourner la transaction et le nouvel état de l'utilisateur
    return res.status(201).json({ transaction, user: updatedUser });
};

module.exports.createStripeSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur', // ou 'usd' selon votre choix
                        product_data: {
                            name: 'Dedicoins',
                        },
                        unit_amount: 2000, // Montant en centimes
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Erreur lors de la création de la session Stripe:', error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création de la session Stripe." });
    }
};

module.exports.getPublicStripeKey = async (req, res) => {
    try {
        res.status(200).json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
    } catch (error) {
        console.error('Erreur lors de la récupération de la clé publique Stripe:', error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la clé publique Stripe." });
    }
};

