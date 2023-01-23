// just add all the callback functions here called actions
// the entire collections of these functions is called a controller
const db = require('../config/mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const contactsArr = [
    {
        name: "Mridul Verma",
        phone: "7009100026"
    },
    {
        name: "Chahat",
        phone: "6239412196"
    }
]

module.exports.homeGet = async function(req,res){
    // if(req.isAuthenticated()){
    //     const user_id = req.user._id;
    //     Post.find({user: user_id}, function(err,postArr){
    //         res.render('home', {
    //             random: contactsArr,
    //             posts: postArr
    //         });
    //     })
    // } else {
    //     res.render('home', {
    //         random: contactsArr
    //     });
    // }

    await Post.find({}).populate('user','name').exec(function(err, posts){
        console.log(err);
        return res.render('home', {
            random: contactsArr,
            posts: posts
        })
    })
}

module.exports.homePost = function(req,res){
    let name = req.body.name;
    let phone = req.body.phone;

    console.log(`${name}, ${phone}`);
    res.redirect('back');
}

// module.exports.actionName = function(req,res){}