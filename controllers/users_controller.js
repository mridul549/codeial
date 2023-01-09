const User = require('../models/user');

module.exports.profile = function(req,res){
    let id = req.cookies.user_id;
    if(!id){
        return res.redirect('/users/signin');
    }

    User.findById(id, function(err, user){
        if(err){
            console.log('cant find user');
        } else {
            const disp = `Email: ${user.email}, name: ${user.name}`;
            res.send(disp);
        }
    }) 
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
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error at sign in 1");
        }
        // handle user found
        if(user){
            // handle password which dont match
            if(user.password!==req.body.password){
                return res.redirect('back');
            } 
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            console.log('signed in err');
            // handle user not found
            return res.redirect('back');
        }
    })
}