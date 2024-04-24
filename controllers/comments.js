const Post = require('../models/post');

module.exports = {
    create,
    edit,
    update,
    delete: deleteComment
};

async function deleteComment(req, res) {
    const post = await Post.findOne({'comments._id': req.params.id, 'user': req.user._id});
    if (!post) return res.redirect(`/posts/${post._id}`);
    post.comments.remove(req.params.id);
    await post.save();
    res.redirect(`/posts/${post._id}`);
}

async function update(req, res) {
    const post = await Post.findOne({ 'comments._id': req.params.id, 'user': req.user._id });
    const comment = post.comments.id(req.params.id);
    if (!comment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
    comment.content = req.body.content;
    try {
        await post.save();
    } catch (err) {
        console.log(err.message);
    }
    res.redirect(`/posts/${post._id}`);
}

async function edit(req, res) {
    const post = await Post.findOne({'comments._id': req.params.id});
    const comment = post.comments.id(req.params.id);
    res.render('comments/edit', {post, comment});
  }


async function create(req, res) {
    try {
    const post = await Post.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    post.comments.push(req.body);
    await post.save();
    } catch (e) {
        console.log(e.message);
    }
    res.redirect(`/posts/${req.params.id}`);
}
