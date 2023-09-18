const router = require('express').Router();
const {checkTokenDiffuser, checkToken} = require('../middleware/auth.middleware');
const diffuserController = require('../controllers/diffuser.controller');


/**
 * @swagger
 * tags:
 *  name: Diffuser
 *  description: Gestion de la diffusion
 */


/**
 * @swagger
 * /api/diffuser/{idEvent}:
 *  get:
 *   summary: Diffuser un événement
 *   description: Met fin aux enchères d'un événement et génère la playlist qui sera diffusée
 *   security:
 *    - bearerAuth: []
 *   tags: [Diffuser]
 *   parameters:
 *    - in: path
 *      name: idEvent
 *      required: true
 *      description: L'id de l'événement
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *      description: Les enchères ont bien été diffusées
 *    401:
 *      description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'etes pas authorisé à faire ça
 *    404:
 *     description: Cet événement n'existe pas / Il n'y a pas d'enchères pour cet événement / Cet utilisateur n'existe pas
 *    500:
 *     description: Une erreur s'est produite
 */
router.get('/:idEvent',checkTokenDiffuser, diffuserController.diffuser);


/**
 * @swagger
 * /api/diffuser/vote/{idEvent}:
 *  get:
 *   summary: Recupère les musiques diffusé d'un événement
 *   description: Recupère les musiques diffusé d'un événement passé si l'utilisateur est un administrateur ou le gérant de l'établissement ou un utilisateur ayant participé à l'événement
 *   security:
 *    - bearerAuth: []
 *   tags: [Diffuser]
 *   parameters:
 *    - in: path
 *      name: idEvent
 *      required: true
 *      description: L'id de l'événement
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Les musiques diffusées ont bien été récupéré
 *    400:
 *     description: Il manque des informations
 *    401:
 *     description: Vous n'êtes pas connecté
 *    403:
 *     description: Vous n'êtes pas authorisé à faire ça
 *    500:
 *     description: Une erreur s'est produite
 *   
*/
router.get('/vote/:idEvent', checkToken,  diffuserController.vote);


module.exports = router;
