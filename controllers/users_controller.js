const User = require('../models/user');

module.exports.profile = function(req,res){
    res.send('This is user profile path');
}

module.exports.home = function(req,res){
    res.send('This is user home path');
}

module.exports.signIn = function(req,res){
    res.render('sign-in');
}

module.exports.signUp = function(req,res){
    res.render('sign-up');
}

module.exports.create = function(req,res){
    if(req.body.password!==req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err, user){
        if(err){
            console.log('Error at find One1');
        } 
        if(!user) {
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error at find One2');
                } else {
                    return res.redirect('/users/signin');
                }
            })
        } else {
            res.redirect('back');
        }
    })
}

module.exports.createSession = function(req,res){
    
}