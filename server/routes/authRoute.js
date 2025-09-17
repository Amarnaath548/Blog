const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const express = require('express');
const router = express.Router();
const { register, login } = require('../countrollers/authController.js');
const auth = require('../middlewares/authMiddlewares.js');

router.post('/login', login);

router.post('/register', register);

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.id }).select('-password');
        res.json({ user })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }

})

module.exports = router