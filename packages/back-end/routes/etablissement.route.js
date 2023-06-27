const router = require('express').Router();
// eslint-disable-next-line no-unused-vars
const etablissementController = require('../controllers/etablissement.controller');
const {
  authTokenAdmin,
  authTokenEta,
} = require('../middleware/auth.middleware');

router.get('/', authTokenAdmin, etablissementController.getAll);
router.get('/:id', authTokenEta, etablissementController.getOne);
router.put('/:id', authTokenEta, etablissementController.update);
router.delete('/:id', authTokenEta, etablissementController.delete);

module.exports = router;
