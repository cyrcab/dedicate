const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.createTransaction = async (req, res) => {
    const { userId, paymentMethodId, amount } = req.body;

    // Vérifier si l'utilisateur a au moins un moyen de paiement
    const userPaymentMethods = await prisma.paymentMethod.findMany({ where: { userId } });
    if (userPaymentMethods.length === 0) {
        return res.status(400).json({ error: "L'utilisateur n'a aucun moyen de paiement enregistré" });
    }

    // Vérifier si le moyen de paiement spécifié est valide
    const paymentMethod = userPaymentMethods.find(method => method.id === paymentMethodId);
    if (!paymentMethod) {
        return res.status(400).json({ error: "Le moyen de paiement spécifié est invalide" });
    }

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
    return res.json({ transaction, user: updatedUser });
};

module.exports.getTransaction = async (req, res) => {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({ where: { id: Number(id) } });

    if (!transaction) {
        return res.status(404).json({ error: "Transaction non trouvée" });
    }

    return res.json(transaction);
};

module.exports.getUserTransactions = async (req, res) => {
    const { userId } = req.params;

    const transactions = await prisma.transaction.findMany({ where: { userId: Number(userId) } });

    return res.json(transactions);
};
