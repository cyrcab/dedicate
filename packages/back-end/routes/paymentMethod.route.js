const router = require('express').Router();
const paymentMethodController = require('../controllers/paymentMethod.controller');

router.post('/', paymentMethodController.createPaymentMethod);
router.get('/:id', paymentMethodController.getPaymentMethod);
router.get('/user/:userId', paymentMethodController.getPaymentMethodsByUser);
router.put('/:id', paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;