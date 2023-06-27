const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {
  authTokenEta, authTokenAdmin, checkToken, checkTokenEtaForEvents, checkTokenForParticipeEvent,
} = require('../middleware/auth.middleware');

router.post('/', authTokenEta, eventController.create);
router.get('/', authTokenAdmin, eventController.getAll);
router.get('/:idEtablissement', checkToken, eventController.getAllOfCompany);
router.get('/one/:id', checkToken, eventController.getOne);
router.get('/users/:idEvent', checkTokenEtaForEvents, eventController.getUserOfEvents);
router.get('/musiques/:idEvent', checkToken, eventController.getMusiqueOfEvent);
router.put('/:idEvent', checkTokenForParticipeEvent, eventController.addUserToEvent);

module.exports = router;
