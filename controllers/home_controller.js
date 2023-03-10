// just add all the callback functions here called actions
// the entire collections of these functions is called a controller
const db = require('../config/mongoose');
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

module.exports.homeGet = function(req,res){

    // populate the user of each post
    Post.find({}).populate('user','name').exec(function(err, posts){
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