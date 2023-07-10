const router = require('express').Router();

const enchereController = require('../controllers/enchere.controller');

router.post('/', enchereController.vote);
router.get('/:id', enchereController.getVotes);

module.exports = router;
