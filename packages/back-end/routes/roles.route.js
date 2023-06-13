const router = require('express').Router();
const roleController = require('../controllers/roles.controller');

router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRole)
router.put('/:id', roleController.updateRole);

module.exports = router;