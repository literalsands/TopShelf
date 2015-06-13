'use strict';

var express    = require('express'),
    controller = require('./user.controller'),
    auth       = require('../../auth/auth.service'),
    router     = express.Router();

//router.get('/me', auth.isAuthenticated, controller.getMe);
//router.put('/me', auth.isAuthenticated, controller.editMe);
router.get('/', controller.index);
router.post('/login', controller.loginUser);
router.delete('/:id', controller.deleteUser);
//router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.showUser);
router.post('/', controller.signupUser);

module.exports = router;
