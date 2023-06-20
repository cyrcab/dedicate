const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/registerEta', authController.registerEta);
router.post('/register', authController.register);
router.post('/login', authController.loginUser);
router.post('/loginEta', authController.loginEta);

module.exports = router;
