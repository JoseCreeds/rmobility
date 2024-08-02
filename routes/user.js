const express = require('express');
const router = express.Router();

// authMiddlewares
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

//public routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
