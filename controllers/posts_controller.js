const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.createPosts = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err){
        if(err){
            console.log('Error at creating posts');
        }
    })
    return res.redirect('/');
}

module.exports.destroyPost = function(req,res) {

    Post.findById(req.params.id, function(err, post){
        // .id means _id has been converted to string
        if(post.user === req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        } else {
            res.redirect('back');
        }
    })
}
