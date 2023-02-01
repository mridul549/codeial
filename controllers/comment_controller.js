const Comment = require('../models/comments');
const Post    = require('../models/post');
const mongoose = require('mongoose');

// creating a comment action
module.exports.create = function(req,res){
    // get id from the hidden input
    let id = req.body.post;
    Post.findById (id, function(err, post){
        if(err){
            return console.log(err);
        }
        // if the post is found on which to add comment
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // pushing comment in the comment array of the post
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}
                  
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            // finds the comment in the post and pulls it out of the array
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    })
}
