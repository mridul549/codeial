const express        = require('express');
const router         = express.Router();
const postController = require('../controllers/posts_controller');
const passport       = require('passport')

router.post('/create', passport.checkAuthentication, postController.createPosts);

module.exports = router;