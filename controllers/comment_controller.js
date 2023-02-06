const Comment = require('../models/comments');
const Post    = require('../models/post');
const mongoose = require('mongoose');

// creating a comment action
module.exports.create = async function(req,res){
    // get id from the hidden input
    let id = req.body.post;
    
    let post = await Post.findById(id);
    try {
        // if the post is found on which to add comment
        if(post){

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // pushing comment in the comment array of the post
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}
                  
module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            // finds the comment in the post and pulls it out of the array
            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
        } 
        return res.redirect('back');

    } catch(err){
        console.log(err);
    }
}
