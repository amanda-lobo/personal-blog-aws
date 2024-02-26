const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');
const authenticateToken = require('../../middleware/auth');

router.post('/create/post', authenticateToken, postsService.createNewPost);
router.get('/posts', authenticateToken, postsService.getAllPosts);
router.get('/posts/:postsId', authenticateToken, postsService.getPostById);
router.put('/posts/:postsId', authenticateToken, postsService.updatePostById);
router.delete('/posts/:postsId', authenticateToken, postsService.deletePostById);

module.exports = router;
