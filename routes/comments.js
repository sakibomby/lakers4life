const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// GET /comments/:id/edit
router.get('/comments/:id/edit', ensureLoggedIn, commentsCtrl.edit);
// POST /posts/:id/comments
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
// PUT /comments/:id
router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update); 
// DELETE /comments/:id
router.delete('comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;