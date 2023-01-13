const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/users_controller');
const passport       = require('passport');

// upon coming here, the final route that is served is
// localhost:3000/users/profile
router.get('/profile', passport.checkAuthentication, userController.profile);

// if we want to get a simple '/users/' path, we use this
router.get('/', userController.home);
router.get('/signin', userController.signIn );
router.get('/signup', userController.signUp);

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
), userController.createSession);

module.exports = router;
