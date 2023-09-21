const router = require('express').Router();

const enchereController = require('../controllers/enchere.controller');

const {checkToken} = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *  name: Enchere
 *  description: Gestion des enchères
 */ 


/**
 * @swagger
 * /api/encheres/:
 *   post:
 *     summary: Enchérir sur une musique
 *     description: Créer une nouvelle enchère sur une musique ou augmenter le montant d'une enchère existante
 *     security:
 *       - bearerAuth: []
 *     tags: [Enchere]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               enchereId:
 *                 type: integer
 *               nomMusique:
 *                 type: string
 *               artisteMusique:
 *                 type: string
 *               album:
 *                 type: string
 *               prix:
 *                 type: integer
 *           examples:
 *             Renchérir:
 *               value:
 *                 enchereId: 1
 *                 eventId: 1
 *                 userId: 1
 *                 prix: 10
 *             Nouvelle enchere:
 *               value:
 *                 eventId: 1
 *                 userId: 1
 *                 nomMusique: "nomMusique"
 *                 artisteMusique: "artisteMusique"
 *                 album: "album"
 *                 prix: 10
 *     responses:
 *       200:
 *         description: L'enchère a bien été mise à jour
 *       201:
 *         description: L'enchère a bien été créée
 *       400:
 *         description: |-
 *           Il manque des informations / Cet événement n'est plus actif / Cet événement est terminé /
 *           Cet utilisateur n'est pas inscrit à cet événement / Vous n'avez pas assez de dédiCoins /
 *           Le prix de l'enchère est supérieur à celui proposé / Vous ne pouvez pas renchérir pour votre propre enchère /
 *           La musique ne correspond pas à celle de l'enchère / Une enchère existe déjà pour cette musique
 *       401:
 *         description: Vous n'êtes pas connecté
 *       403:
 *         description: Vous n'êtes pas autorisé à faire ça
 *       404:
 *         description: |-
 *           Cet événement n'existe pas / Cet utilisateur n'existe pas / Cette enchère n'existe pas
 *       500:
 *         description: Une erreur s'est produite
 */
router.post('/', checkToken, enchereController.vote);

/**
 * @swagger
 * /api/encheres/{id}:
 *  get:
 *   summary: Récupère les enchères d'un événement
 *   description: Récupère les enchères d'un événement en cours ou passé si l'utilisateur est un administrateur ou le gérant de l'établissement ou un utilisateur ayant participé à l'événement
 *   security:
 *    - bearerAuth: []
 *   tags: [Enchere]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: L'id de l'événement
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: [encheres]
 *    400:
 *     description: Il manque des informations
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    500:
 *     description: Une erreur s'est produite
 */
router.get('/:id', checkToken, enchereController.getVotes);

module.exports = router;
