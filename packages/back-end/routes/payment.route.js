const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const {
    checkToken,
} = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *  name: Payment
 *  description: Gestion des paiements 
 */

/**
 * @swagger
 * /api/payment/create-payment-intent:
 *  post:
 *   summary: Créer une session de paiement
 *   description: Créer une session de paiement sur Stripe pour un utilisateur connecté pour un montant donné
 *   security:
 *    - bearerAuth: []
 *   tags: [Payment]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        amount:
 *         type: integer
 *      example:
 *       amount: 1000
 *   responses:
 *    200:
 *     description: Session de paiement créée
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    500:
 *     description: Erreur serveur 
 */
router.post('/create-payment-intent', checkToken, paymentController.createPaymentIntent);

/**
 * @swagger
 * /api/payment/create-transaction:
 *  post:
 *   summary: Créer une transaction
 *   description: Créer une transaction pour un utilisateur connecté pour un montant donné et lui ajoute des dedicoins
 *   security:
 *    - bearerAuth: []
 *   tags: [Payment]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userId:
 *         type: integer
 *        amount:
 *         type: integer
 *      example:
 *       userId: 1
 *       amount: 1000
 *   responses:
 *    201:
 *     description: Transaction créée
 *    400:
 *     description: L'utilisateur sepécifié n'existe pas
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    500:
 *     description: Erreur serveur
 */
router.post('/create-transaction', checkToken, paymentController.createTransaction);

/**
 * @swagger
 * /api/payment/public-key:
 *  get:
 *   summary: Récupérer la clé publique Stripe
 *   description: Récupérer la clé publique Stripe pour pouvoir créer une session de paiement côté front
 *   security:
 *    - bearerAuth: []
 *   tags: [Payment]
 *   responses:
 *    200:
 *     description: Clé publique Stripe récupérée
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    500:
 *     description: Une erreur s'est produite lors de la récupération de la clé publique Stripe
 */
router.get('/public-key', checkToken, paymentController.getPublicStripeKey);

module.exports = router;