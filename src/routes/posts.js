const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const { authenticate } = require("../middlewares/authMiddleware");

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:slug', postsController.getPostBySlug);

// Protected routes
router.use(authenticate);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;