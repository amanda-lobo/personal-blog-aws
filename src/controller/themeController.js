const express = require('express');
const router = express.Router();
const themeService = require('../service/themeService');
const authenticateToken = require('../../middleware/auth');

router.post('/themes', authenticateToken, themeService.createTheme);
router.get('/themes', authenticateToken, themeService.getAllThemes);
router.get('/themes/:themeId', authenticateToken, themeService.getThemeById);
router.put('/themes/:themeId', authenticateToken, themeService.updateThemeById);
router.delete('/themes/:themeId', authenticateToken, themeService.deleteThemeById);


module.exports = router;
