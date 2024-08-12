const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);

module.exports = router;
