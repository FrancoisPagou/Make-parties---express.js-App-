const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:id/comment', async (req, res) => {
    commentController.addComment(req, res);
});

module.exports = router;