// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');

// GET all posts
router.get('/', postsController.getAllPosts);

// GET single post by slug - matches frontend's /posts/:slug pattern
router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    
    // If slug is a valid UUID or numeric ID, use getPostById
    const isId = /^[0-9a-fA-F-]+$/.test(slug) || !isNaN(slug);
    
    if (isId) {
        return postsController.getPostById(req, res);
    }
    
    // Otherwise, treat it as a slug
    return postsController.getPostBySlug(req, res);
});

module.exports = router;