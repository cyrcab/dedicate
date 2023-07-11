const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {
  authTokenEta,
  authTokenAdmin,
  checkToken,
  checkTokenEtaForEvents,
  checkTokenForParticipeEvent,
  checkTokenForUpdateEvents,
  checkMe,
} = require('../middleware/auth.middleware');
/* eslint-disable */
/**
 * @swagger
 * tags:
 *   name: Events
 * description: Gestion des événements
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Créer un événement
 *     description: Créer un événement si l'utilisateur est associé à un établissement et la date de l'événement est supérieur à la date du jour
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               lieu:
 *                 type: string
 *               date:
 *                 type: string
 *               type:
 *                 type: string
 *               prix:
 *                 type: number
 *               nbSlots:
 *                 type: number
 *               description:
 *                 type: string
 *           example:
 *             nom: Soirée de l'été
 *             lieu: 1 rue de la paix
 *             date: 2021-07-01 20:00:00
 *             type: Rock
 *             prix: 10
 *             nbSlots: 5
 *             description: Soirée de l'été avec un concert de rock
 *     responses:
 *       201:
 *         description: Evénement créé
 *       400:
 *         description: Il manque des informations / La date de l'événement est inférieur à la date du jour / Date au mauvais format / Le prix ou le nombre de slots est inférieur ou egale à 0
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       404:
 *         description: Cet établissement n'existe pas / Cet utilisateur n'est pas associé à un établissement
 *       500:
 *         description: Erreur du serveur
 *
 *
 */
router.post('/', authTokenEta, eventController.create);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupère la liste des événements
 *     description: Récupère la liste complète des événements si l'utilisateur est admin
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Événements récupérés
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', authTokenAdmin, eventController.getAll);

/**
 * @swagger
 * /api/events/{idEtablissement}:
 *   get:
 *     summary: Récupère la liste des événements d'un établissement
 *     description: Récupère la liste de tous les événements d'un établissement
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: idEtablissement
 *         required: true
 *         description: L'id de l'établissement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Événements récupérés
 *       400:
 *         description: Il manque des informations / Cet établissement n'existe pas / Cet etablissement n'a pas d'événements
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/:idEtablissement', checkToken, eventController.getAllOfCompany);

/**
 * @swagger
 * /api/events/one/{id}:
 *   get:
 *     summary: Récupère un événement
 *     description: Récupère un événement
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'id de l'événement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Événement récupéré
 *       400:
 *         description: Il manque des informations / Cet événement n'existe pas
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/one/:id', checkToken, eventController.getOne);

/**
 * @swagger
 * /api/events/users/{idEvent}:
 *   get:
 *     summary: Récupère la liste des utilisateurs d'un événement
 *     description: Récupère la liste des utilisateurs d'un événement
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: idEvent
 *         required: true
 *         description: L'id de l'événement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Infos événements récupérés
 *       400:
 *         description: Il manque des informations
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       404:
 *         description: Cet événement n'existe pas / Cet etablissement n'existe pas
 *       500:
 *         description: Erreur du serveur
 */
router.get(
  '/users/:idEvent',
  checkTokenEtaForEvents,
  eventController.getUserOfEvents,
);

/**
 * @swagger
 * /api/events/musiques/{idEvent}:
 *   get:
 *     summary: Récupère la liste des musiques d'un événement
 *     description: Récupère la liste des musiques diffusées lors d'un événement
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: idEvent
 *         required: true
 *         description: L'id de l'événement
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Musiques récupérées
 *       400:
 *         description: Il manque des informations / Cet événement n'existe pas
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/musiques/:idEvent', checkToken, eventController.getMusiqueOfEvent);

/**
 * @swagger
 * /api/events/next/next/{ville}?:
 *   get:
 *     summary: Récupère les prochains événements
 *     description: Récupère les prochains événements d'une ville si elle est précisée, sinon récupère les prochains événements de toutes les villes
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *      - in: path
 *        name: ville
 *        required: false
 *        description: La ville
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Liste des événements
 *      401:
 *        description: Vous n'êtes pas connecté
 *      403:
 *        description: Vous n'êtes pas authorisé à faire ça
 *      500:
 *        description: Erreur du serveur
 */
router.get('/next/next/:ville?', checkToken, eventController.getNextEvent);

/**
 * @swagger
 * /api/events/me/{id}:
 *   get:
 *     summary: Récupère les événements d'un utilisateur
 *     description: Récupère les événements d'un utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'id de l'utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des événements
 *       400:
 *         description: Il manque des informations / Cet utilisateur n'existe pas
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas authorisé à faire ça
 *       500:
 *         description: Erreur du serveur
 */
router.get('/me/:id', checkMe, eventController.getMyEvent);
router.put(
  '/add/:idEvent',
  checkTokenForParticipeEvent,
  eventController.addUserToEvent,
);
router.put('/:idEvent', checkTokenForUpdateEvents, eventController.update);
router.delete('/:idEvent', checkTokenForUpdateEvents, eventController.delete);

module.exports = router;
