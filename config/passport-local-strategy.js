const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function(email,password,done){
        // this function takes three args, email and pass being values and done being a seperate function
        // done has two args, error and auth true or false
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            // three steps
            // 1. Error
            if(err){
                console.log('Error in finding user -> from Passport');
                return done(err);
            }

            // 2. Wrong password entered or user not found
            if(!user || user.password!==password){
                console.log('Invalid Username or password');
                return done(null, false);
            }

            // 3. Successful auth
            return done(null, user);
        })
    }
))

/*------- Serialising and deserialising -------*/
// 1. Serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
})

// 2. Deserialising the user from the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user -> from Passport deserialiser');
            return done(err);
        }

        return done(null, user);
    })
})

module.exports = passport;