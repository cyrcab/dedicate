const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { authTokenAdmin, checkMe } = require('../middleware/auth.middleware');
/* eslint-disable */
/**
 * @swagger
 * tags:
 *  name: Users
 * description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     description: Récupère la liste complète des utilisateurs enregistrés si l'utilisateur est admin
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', authTokenAdmin, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *    summary: Récupère un utilisateur
 *    description: Récupère un utilisateur en fonction de son id si l'utilisateur est admin ou si c'est lui-même
 *    security:
 *     - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: L'id de l'utilisateur
 *       schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Succès
 *      401:
 *        description: Vous n'êtes pas connecté
 *      403:
 *        description: Vous n'êtes pas authorisé à faire ça
 *      404:
 *        description: Cet utilisateur n'existe pas
 *      500:
 *        description: Erreur du serveur
 */
router.get('/:id', checkMe, userController.getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *    summary: Met à jour un utilisateur
 *    description: Met à jour un utilisateur en fonction de son id si l'utilisateur est admin ou si c'est lui-même
 *    security:
 *      - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: L'id de l'utilisateur
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: Les champs à mettre à jour (nom, prénom, email, téléphone) - au moins un champ est requis
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nom:
 *                type: string
 *              prenom:
 *                type: string
 *              email:
 *                type: string
 *              tel:
 *                type: string
 *          example:
 *            nom: Dupont
 *            prenom: Jean
 *            email: dupont.jean@gmail.com
 *            tel: 0606060606
 *    responses:
 *      200:
 *        description: Succès
 *      400:
 *        description: Cet email ou ce numéro de téléphone est déjà utilisé ou sont invalides
 *      401:
 *        description: Vous n'êtes pas connecté
 *      403:
 *        description: Vous n'êtes pas authorisé à faire ça
 *      404:
 *        description: Cet utilisateur n'existe pas
 *      500:
 *        description: Erreur du serveur
 */
router.put('/:id', checkMe, userController.updateUser);

router.put('/password/:id', checkMe, userController.updatePassword);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *   summary: Supprime un utilisateur
 *   description: Supprime un utilisateur en fonction de son id si l'utilisateur est admin ou si c'est lui-même
 *   security:
 *     - bearerAuth: []
 *   tags: [Users]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: L'id de l'utilisateur
 *       schema:
 *         type: integer
 *   responses:
 *    200:
 *     description: Succès
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    404:
 *     description: Cet utilisateur n'existe pas
 *    500:
 *     description: Erreur du serveur
 */
router.delete('/:id', checkMe, userController.deleteUser);

module.exports = router;
