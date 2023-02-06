const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.createPosts = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    } catch (error) {
        console.log(error);
    }
    return res.redirect('/');
}

module.exports.destroyPost = async function(req,res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id means _id has been converted to string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id});
        }
    } catch (error) {
        console.log(error);
    }
    return res.redirect('back');
}
