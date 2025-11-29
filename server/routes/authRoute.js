const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const express = require('express');
const router = express.Router();
const { register, login,me } = require('../countrollers/authController.js');
const auth = require('../middlewares/authMiddlewares.js');

router.post('/login', login);

router.post('/register', register);

router.get('/me', auth, me);

module.exports = router