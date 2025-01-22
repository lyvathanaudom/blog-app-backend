// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');

// GET all posts
router.get('/', postsController.getAllPosts);

// GET single post by ID
router.get('/:id', postsController.getPostById);

module.exports = router;