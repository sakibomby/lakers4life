const Post = require('../models/post');

module.exports = {
    create,
};

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
