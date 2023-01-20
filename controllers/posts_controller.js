const Post = require('../models/post');

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

