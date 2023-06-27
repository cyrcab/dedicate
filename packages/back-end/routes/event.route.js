const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const { authTokenEta } = require('../middleware/auth.middleware');

router.post('/', authTokenEta, eventController.create);

module.exports = router;
