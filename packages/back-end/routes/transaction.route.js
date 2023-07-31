const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');

router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransaction);
router.get('/user/:userId', transactionController.getUserTransactions);

module.exports = router;
