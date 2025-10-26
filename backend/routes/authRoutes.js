const express = require('express');
const router = express.Router();
const { signup, login, upgradeRole } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route (only admin or current user can upgrade role)
router.post('/upgrade-role', authMiddleware, upgradeRole);

module.exports = router;
