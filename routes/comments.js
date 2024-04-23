const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /posts/:id/comments
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);

module.exports = router;