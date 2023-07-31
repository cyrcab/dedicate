const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.createPaymentMethod = async (req, res) => {
    const { userId, cardNumber, expDate } = req.body;
    try {
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                cardNumber,
                expDate,
                user: {
                    connect: { id: Number(userId) },
                },
            },
        });
        res.status(201).json(paymentMethod);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating payment method' });
    }
};

module.exports.getPaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
        const paymentMethod = await prisma.paymentMethod.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment method' });
    }
};

module.exports.getPaymentMethodsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const paymentMethods = await prisma.paymentMethod.findMany({
            where: {
                userId: Number(userId),
            },
        });
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment methods' });
    }
};

module.exports.updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { cardNumber, expDate } = req.body;
    try {
        const paymentMethod = await prisma.paymentMethod.update({
            where: { id: Number(id) },
            data: {
                cardNumber,
                expDate,
            },
        });
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: 'Error updating payment method' });
    }
};

module.exports.deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.paymentMethod.delete({
            where: { id: Number(id) },
        });
        res.status(204).json({ message: 'Payment method deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment method' });
    }
};
