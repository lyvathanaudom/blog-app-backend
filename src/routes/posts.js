// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const { authenticate } = require("../middlewares/authMiddleware");
// GET all posts
router.get('/', postsController.getAllPosts);

// GET single post by slug
router.get('/:slug', async (req, res) => {
        return postsController.getPostBySlug(req, res);
});

// Admin routes (protected by JWT authentication)

// Create
router.post("/posts", authenticate, postsController.createPost);
// Update
router.put("/posts/:id", authenticate, postsController.updatePost);
// Delete
router.delete("/posts/:id", authenticate, postsController.deletePost);

module.exports = router;