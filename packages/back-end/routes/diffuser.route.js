const router = require('express').Router();
const {checkTokenDiffuser, checkToken} = require('../middleware/auth.middleware');

const diffuserController = require('../controllers/diffuser.controller');

router.get('/:idEvent',checkTokenDiffuser, diffuserController.diffuser);
router.get('/vote/:idEvent', checkToken,  diffuserController.vote);


module.exports = router;
