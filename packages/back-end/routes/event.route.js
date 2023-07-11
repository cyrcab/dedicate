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

router.post('/', authTokenEta, eventController.create);
router.get('/', authTokenAdmin, eventController.getAll);
router.get('/:idEtablissement', checkToken, eventController.getAllOfCompany);
router.get('/one/:id', checkToken, eventController.getOne);
router.get(
  '/users/:idEvent',
  checkTokenEtaForEvents,
  eventController.getUserOfEvents,
);
router.get('/musiques/:idEvent', checkToken, eventController.getMusiqueOfEvent);
router.get('/next/next/:ville?', checkToken, eventController.getNextEvent);
router.get('/me/:id', checkMe, eventController.getMyEvent);
router.put(
  '/add/:idEvent',
  checkTokenForParticipeEvent,
  eventController.addUserToEvent,
);
router.put('/:idEvent', checkTokenForUpdateEvents, eventController.update);
router.delete('/:idEvent', checkTokenForUpdateEvents, eventController.delete);

module.exports = router;
