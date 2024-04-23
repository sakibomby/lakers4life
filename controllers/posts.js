const Post = require('../models/post');

module.exports = {
    index,
    show,
    new: newPost,
    create,
    update,
    delete: deletePost
};

async function deletePost(req, res) {
    await Post.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.redirect('/posts');
}

async function update(req, res) {
    try{
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id}, 
            req.body,
            {new: true}
        );
        return res.redirect(`/posts/${updatedPost._id}`);
    } catch (e) {
        console.log(e.message);
        return res.redirect('/posts');
    }
}

async function index(req, res) {
    const posts = await Post.find({});
    res.render('posts/index', { title: 'All Posts', posts});
}

async function show(req, res) {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', {title: 'Post', post});
}

function newPost(req, res) {
    res.render('posts/new', {title: 'Add Post', errorMsg: ''});
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar= req.user.avatar;
    try {
        const post = await Post.create(req.body);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.redirect('/posts/new');
    }
}


