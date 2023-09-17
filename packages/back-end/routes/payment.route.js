const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const {
    checkToken,
} = require('../middleware/auth.middleware');

router.post('/create-session', checkToken, paymentController.createStripeSession);
router.post('/create-payment-intent', checkToken, paymentController.createPaymentIntent);
router.post('/create-transaction', checkToken, paymentController.createTransaction);
router.get('/public-key', checkToken, paymentController.getPublicStripeKey);

module.exports = router;