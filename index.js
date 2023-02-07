const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const express        = require('express');
const mongoose       = require('mongoose');
const path           = require('path');
const port           = 3000;
const flash          = require('connect-flash');
// Auth
const session        = require('express-session');
const passport       = require('passport');
const passportLocal  = require('./config/passport-local-strategy');

// to store cookies permanently even after server reboots
const MongoStore     = require('connect-mongo');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('./public'));

// Middleware for session cookie
app.use(session({
    name: 'codeial',
    // TODO- change the secret before deployment
    secret: 'blahsomething', // encryption
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create ({
        mongoUrl: "mongodb://localhost/codeial",
        autoRemove: 'disabled'
    }, function(err){
        if(err){
            console.log(err);
        }
    })
}))

// auths middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// middleware for flash message, to be declared after session is created (session middleware)
app.use(flash());

// Using express router
// Now instead of writing the entire code in just one file, we are breaking the code
// now all the different routes like '/', '/users', '/create-contact', will have a different js file
// look in routes folder
// this folder contains all the required routes, to access those routes, we use a middleware
// this middleware points to the root route
app.use('/', require('./routes/home'));

app.listen(port, function(err){
    if(!err){
        console.log('Server started');
    }
})