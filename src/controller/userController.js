const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const authenticateToken = require('../../middleware/auth');

router.post('/register/user', userService.createUser);
router.post('/login', userService.loginUser);
router.get('/users', authenticateToken, userService.getAllUsers);
router.get('/users/:userId', authenticateToken, userService.getByUserId);
router.put('/users/:userId', authenticateToken, userService.updateUserById);
router.delete('/users/:userId', authenticateToken, userService.deleteById);

module.exports = router;
