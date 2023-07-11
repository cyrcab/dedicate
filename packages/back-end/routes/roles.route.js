const router = require('express').Router();
const roleController = require('../controllers/roles.controller');
const { authTokenAdmin } = require('../middleware/auth.middleware');

router.post('/', authTokenAdmin, roleController.createRole);
router.get('/', authTokenAdmin, roleController.getRoles);
router.get('/:id', authTokenAdmin, roleController.getRole);
router.put('/:id', authTokenAdmin, roleController.updateRole);

module.exports = router;
