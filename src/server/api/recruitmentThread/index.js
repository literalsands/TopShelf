'use strict';

var express = require('express');
var controller = require('./recruitmentThread.controller');
var RecruitmentThread = require('./recruitmentThread.model');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.allThreads);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);
router.post('/', controller.createThread);
router.put('/:id', controller.updateThread);

module.exports = router;
