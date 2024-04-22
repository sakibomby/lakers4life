const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /posts
router.get('/', ensureLoggedIn, postsCtrl.index);
// GET /posts/new
router.get('/new', ensureLoggedIn, postsCtrl.new);
// GET /posts/:id
router.get('/:id',ensureLoggedIn, postsCtrl.show);
// POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);


module.exports = router;