const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {
  authTokenEta,
  authTokenAdmin,
  checkToken,
  checkTokenEtaForEvents,
  checkTokenForParticipeEvent,
  checkTokenForUpdateEvents,
} = require('../middleware/auth.middleware');

router.post('/', authTokenEta, eventController.create);
router.get('/', authTokenAdmin, eventController.getAll);
router.get('/:idEtablissement', checkToken, eventController.getAllOfCompany);
router.get('/one/:id', checkToken, eventController.getOne);
router.get('/users/:idEvent', checkTokenEtaForEvents, eventController.getUserOfEvents);
router.get('/musiques/:idEvent', checkToken, eventController.getMusiqueOfEvent);
router.put('/add/:idEvent', checkTokenForParticipeEvent, eventController.addUserToEvent);
router.put('/:idEvent', checkTokenForUpdateEvents, eventController.update);

module.exports = router;
