const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const express        = require('express');
const path           = require('path');
const port           = 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'));

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