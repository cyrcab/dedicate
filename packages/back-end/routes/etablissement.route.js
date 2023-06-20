const router = require('express').Router();
const etablissementController = require('../controllers/etablissement.controller');
const {
    authTokenAdmin,
    checkMe,
    authTokenEta
} = require('../middleware/auth.middleware');

router.get('/', authTokenAdmin, etablissementController.getAll);
router.get('/:id', authTokenEta, etablissementController.getOne);
router.put('/:id', authTokenEta, etablissementController.update);

module.exports = router;