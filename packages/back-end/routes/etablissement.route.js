const router = require('express').Router();

const etablissementController = require('../controllers/etablissement.controller');
const {
  authTokenAdmin,
  authTokenEta,
} = require('../middleware/auth.middleware');
/* eslint-disable */
/**
 * @swagger
 * tags:
 *  name: Etablissement
 * description: Gestion des établissements
 */

/**
 * @swagger
 * /api/etablissement:
 *   get:
 *    summary: Retourne la liste des établissements
 *    description: Retourne la liste de tous les établissements si l'utilisateur est un administrateur
 *    security:
 *     - bearerAuth: []
 *    tags: [Etablissement]
 *    responses:
 *     200:
 *      description: Etablissements récupérés
 *     401:
 *      description: Vous n'êtes pas connecté
 *     403:
 *      description: Vous n'êtes pas authorisé à faire ça
 *     500:
 *      description: Erreur serveur
 */
router.get('/', authTokenAdmin, etablissementController.getAll);

/**
 * @swagger
 * /api/etablissement/{id}:
 *  get:
 *   summary: Retourne un établissement
 *   description: Retourne un établissement si l'utilisateur est un administrateur ou le gérant de l'établissement
 *   security:
 *     - bearerAuth: []
 *   tags: [Etablissement]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID de l'établissement
 *       schema:
 *         type: integer
 *   responses:
 *    200:
 *     description: Etablissement récupéré
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    404:
 *     description: Cet établissement n'existe pas
 *    500:
 *     description: Erreur serveur
 */
router.get('/:id', authTokenEta, etablissementController.getOne);

/**
 * @swagger
 * /api/etablissement:
 *  put:
 *   summary: Met à jour un établissement
 *   description: Met à jour un établissement si l'utilisateur est un administrateur ou le gérant de l'établissement
 *   security:
 *    - bearerAuth: []
 *   tags: [Etablissement]
 *   requestBody:
 *    required: false
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        nom:
 *         type: string
 *        adresse:
 *         type: string
 *        codePostal:
 *         type: string
 *        ville:
 *         type: string
 *      example:
 *       nom: L'OClub
 *       adresse: 1 rue de la paix
 *       codePostal: 75000
 *       ville: Paris
 *   responses:
 *    200:
 *     description: Etablissement mis à jour
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    404:
 *     description: Cet établissement n'existe pas
 *    500:
 *     description: Erreur serveur
 *
 */
router.put('/:id', authTokenEta, etablissementController.update);

/**
 * @swagger
 * /api/etablissement/{id}:
 *  delete:
 *   summary: Supprime un établissement
 *   description: Supprime un établissement si l'utilisateur est un administrateur ou le gérant de l'établissement
 *   security:
 *    - bearerAuth: []
 *   tags: [Etablissement]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID de l'établissement
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Etablissement supprimé
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    404:
 *     description: Cet établissement n'existe pas
 *    500:
 *     description: Erreur serveur
 */
router.delete('/:id', authTokenEta, etablissementController.delete);

module.exports = router;
