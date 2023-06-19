const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {
    authTokenAdmin,
    checkMe
} = require('../middleware/auth.middleware');

router.get('/', authTokenAdmin, userController.getAllUsers);
router.get('/:id', checkMe, userController.getUser);
router.put('/:id', checkMe, userController.updateUser);
router.delete('/:id', checkMe, userController.deleteUser);

module.exports = router;
