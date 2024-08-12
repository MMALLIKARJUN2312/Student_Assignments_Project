const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', authenticateJWT, authorizeAdmin, getAllUsers);
router.put('/users/:id', authenticateJWT, authorizeAdmin, updateUser);
router.delete('/users/:id', authenticateJWT, authorizeAdmin, deleteUser);

module.exports = router;
