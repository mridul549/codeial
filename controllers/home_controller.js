// just add all the callback functions here called actions
// the entire collections of these functions is called a controller
const db = require('../config/mongoose');
const Post = require('../models/post');
const User = require('../models/user');

// in the branch codeial_V3.0, we are gonna start using async awaits 
// and change the code further according to it
module.exports.homeGet = async function(req,res){
    // populate the user of each post
    // The code in the try block is executed first, and if it throws an exception, 
    // the code in the catch block will be executed. 
    try {
        let posts = await Post.find({})
        .populate('user','name')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        let users = await User.find({});

        return res.render('home', {
            posts: posts,
            all_friends: users
        })

    } catch(err) {
        console.log('Error', err);
        return;
    }
}

module.exports.homePost = function(req,res){
    let name = req.body.name;
    let phone = req.body.phone;

    console.log(`${name}, ${phone}`);
    res.redirect('back');
}

// module.exports.actionName = function(req,res){}