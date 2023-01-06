const express        = require('express');
const router         = express.Router();
const homeController = require('../controllers/home_controller');

// now all the further routes to the '/' route are also passed from here
// if a user want to go to '/users' route, the server will use the next
// middleware and go to the users route
router.use('/users', require('./users'));


// whenever a user makes a get request on '/' route, the server will come here to 
// determine on what to do next
// now we make seperate file for all the callback functions (called controllers)
// since these are present in a seperate file, we first require them and then
// pass it as a second argumnet in the requests
router.get('/', homeController.homeGet);

router.post('/', homeController.homePost)

module.exports = router;

