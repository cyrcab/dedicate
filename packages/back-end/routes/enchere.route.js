const router = require('express').Router();

const enchereController = require('../controllers/enchere.controller');

router.post('/', enchereController.vote);

module.exports = router;
