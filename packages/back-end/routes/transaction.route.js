const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Assumons que seulement les clients peuvent créer des transactions.
router.post('/', authMiddleware.authTokenUser, transactionController.createTransaction);

// Assumons que seulement les clients et le SuperAdmin peuvent accéder à une transaction spécifique
router.get('/:id', authMiddleware.checkMe, transactionController.getTransaction);

// Assumons que seulement le SuperAdmin peut accéder aux transactions d'un utilisateur spécifique
router.get('/user/:userId', authMiddleware.authTokenAdmin, transactionController.getUserTransactions);

module.exports = router;
