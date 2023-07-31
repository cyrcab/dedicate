const router = require('express').Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Authentification
 * description: Gestion de l'authentification
 */

// router.post('/registerEta', authController.registerEta);
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: Connexion d'un utilisateur
 *   description: Connexion d'un utilisateur
 *   tags: [Authentification]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *      example:
 *       email: example@example.com
 *       password: 123456
 *   responses:
 *    200:
 *     description: Vous êtes connecté
 *    400:
 *     description: Identifiant incorect
 *    500:
 *     description: Erreur lors de la connexion
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /api/auth/loginEta:
 *  post:
 *   summary: Connexion d'un utilisateur établissement
 *   description: Connexion d'un utilisateur établissement
 *   tags: [Authentification]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *      example:
 *       email: example@example.com
 *       password: 123456
 *   responses:
 *    200:
 *     description: Vous êtes connecté
 *    400:
 *     description: Identifiant incorect
 *    500:
 *     description: Erreur lors de la connexion
 */
router.post('/loginEta', authController.loginEta);

module.exports = router;
