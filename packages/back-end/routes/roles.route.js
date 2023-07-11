const router = require('express').Router();
const roleController = require('../controllers/roles.controller');
const { authTokenAdmin } = require('../middleware/auth.middleware');
/* eslint-disable */
/**
 * @swagger
 * tags:
 *   name: Roles
 * description: Gestion des rôles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crée un rôle
 *     description: Crée un rôle si l'utilisateur est admin
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     requestBody:
 *       description: Objet JSON représentant le rôle à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Le rôle a bien été créé
 *       400:
 *         description: Ce rôle existe déjà ou il manque des informations
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 *
 */
router.post('/', authTokenAdmin, roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Récupère la liste des rôles
 *     description: Récupère la liste complète des rôles enregistrés si l'utilisateur est admin
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 *
 */
router.get('/', authTokenAdmin, roleController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Récupère un rôle
 *     description: Récupère un rôle en fonction de son id si l'utilisateur est admin
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'id du rôle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       404:
 *         description: Ce rôle n'existe pas
 *       500:
 *         description: Erreur du serveur
 */
router.get('/:id', authTokenAdmin, roleController.getRole);

/**
 * @swagger
 * /api/roles/{id}:
 *  put:
 *    summary: Modifie un rôle
 *    description: Modifie un rôle en fonction de son id si l'utilisateur est admin sauf sauf Gérant/Client/Admin/Supprime
 *    security:
 *      - bearerAuth: []
 *    tags: [Roles]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: L'id du rôle
 *        schema:
 *        type: integer
 *    requestBody:
 *      description: Objet JSON représentant le rôle à modifier
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nom:
 *                type: string
 *    responses:
 *      200:
 *        description: Le rôle a bien été modifié
 *      400:
 *        description: Vous ne pouvez pas modifier ce rôle ou il manque des informations
 *      401:
 *        description: Vous n'êtes pas connecté
 *      403:
 *        description: Vous n'êtes pas authorisé à faire ça
 *      404:
 *        description: Ce rôle n'existe pas
 *      500:
 *        description: Erreur du serveur
 *
 */
router.put('/:id', authTokenAdmin, roleController.updateRole);

module.exports = router;
